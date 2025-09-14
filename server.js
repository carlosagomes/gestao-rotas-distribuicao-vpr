import express from "express";
import axios from "axios";
import * as turf from "@turf/turf";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ORS_KEY = process.env.ORS_KEY;
const app = express();
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Carregar dados dos municípios do Paraná do arquivo JSON
let municipiosPR = [];
try {
    const municipiosPath = path.join(__dirname, 'data', 'municipios-pr.json');
    const municipiosData = fs.readFileSync(municipiosPath, 'utf8');
    municipiosPR = JSON.parse(municipiosData);
    console.log(`Carregados ${municipiosPR.length} municípios do Paraná`);
} catch (error) {
    console.error('Erro ao carregar municípios:', error);
    // Fallback para lista básica
    municipiosPR = [
        "CURITIBA", "LONDRINA", "MARINGÁ", "PONTA GROSSA", "CASCÁVEL",
        "SÃO JOSÉ DOS PINHAIS", "FOZ DO IGUAÇU", "COLOMBO", "GUARAPUAVA", "PARANAGUÁ"
    ];
}

// Armazenamento em memória para rotas salvas (em produção, usar banco de dados)
let savedRoutes = [];

// Cache para geocoding
const geocodeCache = new Map();

// Rate limiting
let lastGeocodeTime = 0;
const GEOCODE_DELAY = 100; // 100ms entre requests

async function geocode(q) {
  // Verificar cache primeiro
  if (geocodeCache.has(q)) {
    return geocodeCache.get(q);
  }

  // Rate limiting
  const now = Date.now();
  const timeSinceLastRequest = now - lastGeocodeTime;
  if (timeSinceLastRequest < GEOCODE_DELAY) {
    await new Promise(resolve => setTimeout(resolve, GEOCODE_DELAY - timeSinceLastRequest));
  }

  try {
    const { data } = await axios.get("https://api.openrouteservice.org/geocode/search", {
      params: { api_key: ORS_KEY, text: q, boundary_country: "BR", size: 1 }
    });
    
    const f = data.features?.[0];
    if (!f) {
      geocodeCache.set(q, null);
      return null;
    }
    
    const [lng, lat] = f.geometry.coordinates;
    const result = { name: q, lat, lng };
    
    // Salvar no cache
    geocodeCache.set(q, result);
    lastGeocodeTime = Date.now();
    
    return result;
  } catch (error) {
    console.error(`Erro no geocoding para ${q}:`, error.message);
    geocodeCache.set(q, null);
    return null;
  }
}

async function routeLine(origin, dest) {
  const body = {
    coordinates: [[origin.lng, origin.lat], [dest.lng, dest.lat]],
    instructions: false
  };
  const { data } = await axios.post(
    "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
    body,
    { headers: { Authorization: ORS_KEY } }
  );
  return data;
}

async function routeWithWaypoints(waypoints) {
  const body = {
    coordinates: waypoints,
    instructions: false,
    format: "geojson"
  };
  const { data } = await axios.post(
    "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
    body,
    { headers: { Authorization: ORS_KEY, "Content-Type": "application/json" } }
  );
  return data;
}

app.post("/roteiro", async (req, res) => {
  try {
    const { origem = "Maringá, PR", destino = "Paranavaí, PR", cidades = [], raio_km = 20 } = req.body;

    // 1) Geocode origem e destino
    const [o, d] = await Promise.all([geocode(origem), geocode(destino)]);
    if (!o || !d) return res.status(400).json({ error: "Origem ou destino não encontrados" });

    // 2) Geocode cidades candidatas
    const geos = await Promise.all(cidades.map(c => geocode(`${c.nome}, ${c.uf}`)));
    const pontos = geos.filter(Boolean).map(g =>
      turf.point([g.lng, g.lat], { nome: g.name })
    );

    // 3) Linha da rota principal
    const lineGeo = await routeLine(o, d);
    const line = lineGeo.features[0];

    // 4) Buffer da rota
    const buffer = turf.buffer(line, raio_km * 1000, { units: "meters" });

    // 5) Filtrar cidades que caem dentro do buffer
    const candidatos = pontos.filter(p => turf.booleanPointInPolygon(p, buffer));

    // 6) Criar payload para ORS Optimization API
    const jobs = candidatos.map((p, idx) => ({
      id: idx + 1,
      location: p.geometry.coordinates,
      description: p.properties.nome
    }));

    const body = {
      jobs,
      vehicles: [
        {
          id: 1,
          profile: "driving-car",
          start: [o.lng, o.lat],
          end: [d.lng, d.lat]
        }
      ]
    };

    // 7) Chamar Optimization API
    const { data } = await axios.post(
      "https://api.openrouteservice.org/optimization",
      body,
      { headers: { Authorization: ORS_KEY, "Content-Type": "application/json" } }
    );

    // 8) Montar resultado
    const steps = data.routes[0].steps.map(s => {
      if (s.type === "job") {
        const job = jobs.find(j => j.id === s.job);
        return job ? job.description : `Job ${s.job}`;
      }
      if (s.type === "start") return "ORIGEM";
      if (s.type === "end") return "DESTINO";
      return s.type;
    });
    const rota = data.routes[0];
    res.json({
        origem: o,
        destino: d,
        raio_km,
        candidatos: candidatos.map(p => p.properties.nome),
        roteiro: steps,
        distancia_km: rota.summary ? rota.summary.distance / 1000 : (rota.distance ? rota.distance / 1000 : null),
        duracao_min: rota.summary ? rota.summary.duration / 60 : (rota.duration ? rota.duration / 60 : null),
        raw: rota // opcional, pra debug
      });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Endpoint para listar municípios
app.get("/municipios", (req, res) => {
  res.json(municipiosPR);
});

// Endpoint para geocoding de múltiplas cidades
app.post("/geocode", async (req, res) => {
  try {
    const { cidades } = req.body;
    if (!Array.isArray(cidades)) {
      return res.status(400).json({ error: "Cidades deve ser um array" });
    }

    const geocoded = await Promise.all(
      cidades.map(async (cidade) => {
        const geo = await geocode(`${cidade}, PR`);
        return geo ? { nome: cidade, ...geo } : null;
      })
    );

    res.json(geocoded.filter(Boolean));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoints para gerenciar rotas salvas
app.get("/rotas", (req, res) => {
  res.json(savedRoutes);
});

app.post("/rotas", (req, res) => {
  try {
    const { nome, origem, destino, cidades, frequencia } = req.body;
    
    if (!nome || !origem || !destino || !cidades || !Array.isArray(cidades)) {
      return res.status(400).json({ error: "Dados obrigatórios: nome, origem, destino, cidades" });
    }

    const rota = {
      id: Date.now(),
      nome,
      origem,
      destino,
      cidades,
      frequencia: frequencia || 'semanal',
      createdAt: new Date().toISOString()
    };

    savedRoutes.push(rota);
    res.json(rota);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/rotas/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { nome, origem, destino, cidades, frequencia } = req.body;
    
    const index = savedRoutes.findIndex(r => r.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ error: "Rota não encontrada" });
    }

    savedRoutes[index] = {
      ...savedRoutes[index],
      nome: nome || savedRoutes[index].nome,
      origem: origem || savedRoutes[index].origem,
      destino: destino || savedRoutes[index].destino,
      cidades: cidades || savedRoutes[index].cidades,
      frequencia: frequencia || savedRoutes[index].frequencia,
      updatedAt: new Date().toISOString()
    };

    res.json(savedRoutes[index]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/rotas/:id", (req, res) => {
  try {
    const { id } = req.params;
    const index = savedRoutes.findIndex(r => r.id === parseInt(id));
    
    if (index === -1) {
      return res.status(404).json({ error: "Rota não encontrada" });
    }

    const deleted = savedRoutes.splice(index, 1)[0];
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para obter coordenadas de uma cidade específica
app.get("/geocode/:cidade", async (req, res) => {
  try {
    const { cidade } = req.params;
    const geo = await geocode(`${cidade}, PR`);
    
    if (!geo) {
      return res.status(404).json({ error: "Cidade não encontrada" });
    }
    
    res.json(geo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para calcular rota com waypoints seguindo estradas
app.post("/route-waypoints", async (req, res) => {
  try {
    const { waypoints } = req.body;
    
    if (!waypoints || waypoints.length < 2) {
      return res.status(400).json({ error: "Pelo menos 2 waypoints são necessários" });
    }

    // Geocodificar waypoints se necessário
    const geocodedWaypoints = await Promise.all(
      waypoints.map(async (wp) => {
        if (typeof wp === 'string') {
          const geo = await geocode(`${wp}, PR`);
          return geo ? [geo.lng, geo.lat] : null;
        }
        return [wp.lng, wp.lat];
      })
    );

    const validWaypoints = geocodedWaypoints.filter(Boolean);
    
    if (validWaypoints.length < 2) {
      return res.status(400).json({ error: "Waypoints inválidos" });
    }

    const routeData = await routeWithWaypoints(validWaypoints);
    res.json(routeData);
  } catch (error) {
    console.error('Erro ao calcular rota:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000 - http://localhost:3000"));
