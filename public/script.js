// Dados dos municípios do Paraná (carregados do servidor)
let municipiosPR = [];

class RouteManager {
    constructor() {
        this.map = null;
        this.markers = [];
        this.routeLayer = null;
        this.savedRoutes = [];
        this.selectedCities = new Set();
        this.showNumbers = true; // Por padrão, mostrar números
        this.currentRoute = null; // Armazenar rota atual para re-renderizar
        this.init();
    }

    async init() {
        this.initMap();
        this.initEventListeners();
        await this.loadMunicipios();
        this.loadCities();
        this.loadSavedRoutes();
        this.initAutocomplete();
    }

    async loadMunicipios() {
        try {
            const response = await fetch('/municipios');
            if (response.ok) {
                municipiosPR = await response.json();
                console.log(`Carregados ${municipiosPR.length} municípios do Paraná`);
            } else {
                console.error('Erro ao carregar municípios do servidor');
                // Fallback para lista básica
                municipiosPR = [
                    "CURITIBA", "LONDRINA", "MARINGÁ", "PONTA GROSSA", "CASCÁVEL",
                    "SÃO JOSÉ DOS PINHAIS", "FOZ DO IGUAÇU", "COLOMBO", "GUARAPUAVA", "PARANAGUÁ"
                ];
            }
        } catch (error) {
            console.error('Erro ao carregar municípios:', error);
            // Fallback para lista básica
            municipiosPR = [
                "CURITIBA", "LONDRINA", "MARINGÁ", "PONTA GROSSA", "CASCÁVEL",
                "SÃO JOSÉ DOS PINHAIS", "FOZ DO IGUAÇU", "COLOMBO", "GUARAPUAVA", "PARANAGUÁ"
            ];
        }
    }

    initMap() {
        // Inicializar o mapa centrado no Paraná
        this.map = L.map('map').setView([-23.5505, -46.6333], 7);
        
        // Adicionar camada de tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        // Adicionar camada para rotas
        this.routeLayer = L.layerGroup().addTo(this.map);
    }

    initEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Botão de otimização
        document.getElementById('otimizar-btn').addEventListener('click', () => {
            this.optimizeRoute();
        });

        // Botão de salvar rota manual
        document.getElementById('save-route-btn').addEventListener('click', () => {
            this.saveManualRoute();
        });

        // Botões de controle do mapa
        document.getElementById('clear-map').addEventListener('click', () => {
            this.clearMap();
        });

        document.getElementById('fit-bounds').addEventListener('click', () => {
            this.fitMapToMarkers();
        });

        // Fechar painel de resultados
        document.getElementById('close-results').addEventListener('click', () => {
            this.hideResults();
        });

        // Controles de seleção de cidades
        document.getElementById('select-all-cities').addEventListener('click', () => {
            this.selectAllCities();
        });

        document.getElementById('deselect-all-cities').addEventListener('click', () => {
            this.deselectAllCities();
        });

        // Botão de alternar numeração
        document.getElementById('toggle-numbers').addEventListener('click', () => {
            this.toggleNumbers();
        });
    }

    initAutocomplete() {
        // Configurar autocomplete para origem
        this.setupAutocomplete('origem', 'origem-suggestions');
        
        // Configurar autocomplete para destino
        this.setupAutocomplete('destino', 'destino-suggestions');
    }

    setupAutocomplete(inputId, suggestionsId) {
        const input = document.getElementById(inputId);
        const suggestions = document.getElementById(suggestionsId);
        let currentSuggestions = [];
        let selectedIndex = -1;

        input.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length < 2) {
                this.hideSuggestions(suggestions);
                return;
            }

            // Filtrar municípios com busca inteligente
            currentSuggestions = municipiosPR.filter(city => {
                const cityLower = city.toLowerCase();
                return cityLower.includes(query) || 
                       cityLower.startsWith(query) ||
                       this.fuzzyMatch(cityLower, query);
            }).sort((a, b) => {
                // Priorizar cidades que começam com a query
                const aStarts = a.toLowerCase().startsWith(query);
                const bStarts = b.toLowerCase().startsWith(query);
                if (aStarts && !bStarts) return -1;
                if (!aStarts && bStarts) return 1;
                return a.localeCompare(b);
            }).slice(0, 10); // Limitar a 10 sugestões

            this.showSuggestions(suggestions, currentSuggestions, input);
            selectedIndex = -1;
        });

        input.addEventListener('keydown', (e) => {
            if (!suggestions.classList.contains('show')) return;

            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    selectedIndex = Math.min(selectedIndex + 1, currentSuggestions.length - 1);
                    this.highlightSuggestion(suggestions, selectedIndex);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    selectedIndex = Math.max(selectedIndex - 1, -1);
                    this.highlightSuggestion(suggestions, selectedIndex);
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (selectedIndex >= 0 && currentSuggestions[selectedIndex]) {
                        input.value = currentSuggestions[selectedIndex] + ', PR';
                        this.hideSuggestions(suggestions);
                    }
                    break;
                case 'Escape':
                    this.hideSuggestions(suggestions);
                    selectedIndex = -1;
                    break;
            }
        });

        input.addEventListener('blur', () => {
            // Delay para permitir cliques nas sugestões
            setTimeout(() => {
                this.hideSuggestions(suggestions);
            }, 200);
        });

        input.addEventListener('focus', () => {
            if (input.value.length >= 2) {
                const query = input.value.toLowerCase().trim();
                currentSuggestions = municipiosPR.filter(city => {
                    const cityLower = city.toLowerCase();
                    return cityLower.includes(query) || 
                           cityLower.startsWith(query) ||
                           this.fuzzyMatch(cityLower, query);
                }).sort((a, b) => {
                    const aStarts = a.toLowerCase().startsWith(query);
                    const bStarts = b.toLowerCase().startsWith(query);
                    if (aStarts && !bStarts) return -1;
                    if (!aStarts && bStarts) return 1;
                    return a.localeCompare(b);
                }).slice(0, 10);
                this.showSuggestions(suggestions, currentSuggestions, input);
            }
        });
    }

    showSuggestions(container, suggestions, input) {
        container.innerHTML = '';
        
        if (suggestions.length === 0) {
            container.innerHTML = '<div class="suggestion-item">Nenhuma cidade encontrada</div>';
        } else {
            suggestions.forEach((city, index) => {
                const item = document.createElement('div');
                item.className = 'suggestion-item';
                item.innerHTML = `
                    <span class="city-name">${city}</span>
                    <span class="city-state">PR</span>
                `;
                
                item.addEventListener('click', () => {
                    input.value = city + ', PR';
                    this.hideSuggestions(container);
                });
                
                container.appendChild(item);
            });
        }
        
        container.classList.add('show');
    }

    hideSuggestions(container) {
        container.classList.remove('show');
    }

    highlightSuggestion(container, index) {
        const items = container.querySelectorAll('.suggestion-item');
        items.forEach((item, i) => {
            if (i === index) {
                item.classList.add('highlighted');
            } else {
                item.classList.remove('highlighted');
            }
        });
    }

    validateCity(cityInput) {
        // Extrair nome da cidade (remover ", PR" se presente)
        const cityName = cityInput.replace(/,?\s*PR\s*$/i, '').trim();
        
        // Verificar se a cidade existe na lista de municípios
        return municipiosPR.some(city => 
            city.toLowerCase() === cityName.toLowerCase()
        );
    }

    fuzzyMatch(text, query) {
        // Busca fuzzy simples - verifica se todas as letras da query aparecem em ordem
        let textIndex = 0;
        for (let i = 0; i < query.length; i++) {
            const char = query[i];
            const foundIndex = text.indexOf(char, textIndex);
            if (foundIndex === -1) return false;
            textIndex = foundIndex + 1;
        }
        return true;
    }

    switchTab(tabName) {
        // Remover classe active de todas as tabs
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Ativar tab selecionada
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(tabName).classList.add('active');
    }

    loadCities() {
        const citiesGrid = document.getElementById('cities-grid');
        citiesGrid.innerHTML = '';

        municipiosPR.forEach(city => {
            const cityItem = document.createElement('div');
            cityItem.className = 'city-item';
            cityItem.textContent = city;
            cityItem.addEventListener('click', () => {
                this.toggleCitySelection(city, cityItem);
            });
            citiesGrid.appendChild(cityItem);
        });
    }

    toggleCitySelection(city, element) {
        if (this.selectedCities.has(city)) {
            this.selectedCities.delete(city);
            element.classList.remove('selected');
        } else {
            // Limite de 20 cidades para evitar rate limiting
            if (this.selectedCities.size >= 20) {
                alert('Limite máximo de 20 cidades selecionadas para evitar sobrecarga da API. Desmarque algumas cidades primeiro.');
                return;
            }
            this.selectedCities.add(city);
            element.classList.add('selected');
        }
        
        // Atualizar contador
        this.updateCityCounter();
    }

    updateCityCounter() {
        const counter = document.getElementById('city-counter');
        if (counter) {
            counter.textContent = `${this.selectedCities.size}/20 cidades selecionadas`;
            
            // Mudar cor do contador baseado na quantidade
            if (this.selectedCities.size >= 20) {
                counter.style.backgroundColor = '#f8d7da';
                counter.style.borderColor = '#dc3545';
                counter.style.color = '#dc3545';
            } else if (this.selectedCities.size >= 15) {
                counter.style.backgroundColor = '#fff3cd';
                counter.style.borderColor = '#ffc107';
                counter.style.color = '#856404';
            } else {
                counter.style.backgroundColor = '#f8f9fa';
                counter.style.borderColor = '#e9ecef';
                counter.style.color = '#667eea';
            }
        }
    }

    selectAllCities() {
        const maxCities = Math.min(20, municipiosPR.length);
        let selected = 0;
        
        document.querySelectorAll('.city-item').forEach((element, index) => {
            if (selected < maxCities && !this.selectedCities.has(element.textContent)) {
                this.selectedCities.add(element.textContent);
                element.classList.add('selected');
                selected++;
            }
        });
        
        this.updateCityCounter();
    }

    deselectAllCities() {
        this.selectedCities.clear();
        document.querySelectorAll('.city-item').forEach(element => {
            element.classList.remove('selected');
        });
        this.updateCityCounter();
    }

    async optimizeRoute() {
        const origem = document.getElementById('origem').value;
        const destino = document.getElementById('destino').value;
        const raio = document.getElementById('raio').value;

        if (!origem || !destino) {
            alert('Por favor, preencha origem e destino');
            return;
        }

        // Validar se as cidades existem
        if (!this.validateCity(origem)) {
            alert('Cidade de origem não encontrada. Use o autocomplete para selecionar uma cidade válida.');
            return;
        }

        if (!this.validateCity(destino)) {
            alert('Cidade de destino não encontrada. Use o autocomplete para selecionar uma cidade válida.');
            return;
        }

        if (this.selectedCities.size === 0) {
            alert('Por favor, selecione pelo menos uma cidade');
            return;
        }

        if (this.selectedCities.size > 20) {
            alert('Limite máximo de 20 cidades. Desmarque algumas cidades primeiro.');
            return;
        }

        this.showLoading();

        try {
            const cidades = Array.from(this.selectedCities).map(nome => ({ nome, uf: 'PR' }));
            
            const response = await fetch('/roteiro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    origem,
                    destino,
                    cidades,
                    raio_km: parseInt(raio)
                })
            });

            const result = await response.json();

            if (response.ok) {
                this.displayResults(result);
                this.currentRoute = result; // Armazenar rota atual
                await this.displayRouteOnMap(result);
            } else {
                if (response.status === 429) {
                    alert('Muitas requisições simultâneas. Aguarde alguns segundos e tente novamente com menos cidades.');
                } else {
                    alert('Erro: ' + result.error);
                }
            }
        } catch (error) {
            console.error('Erro:', error);
            if (error.message.includes('429')) {
                alert('Limite de requisições excedido. Aguarde alguns segundos e tente novamente com menos cidades.');
            } else {
                alert('Erro ao processar a solicitação');
            }
        } finally {
            this.hideLoading();
        }
    }

    showLoading() {
        const btn = document.getElementById('otimizar-btn');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Otimizando...';
        btn.disabled = true;
    }

    hideLoading() {
        const btn = document.getElementById('otimizar-btn');
        btn.innerHTML = '<i class="fas fa-calculator"></i> Otimizar Rota';
        btn.disabled = false;
    }

    displayResults(result) {
        const resultsContent = document.getElementById('results-content');
        
        resultsContent.innerHTML = `
            <div class="route-info">
                <div class="info-card">
                    <h4>Distância Total</h4>
                    <p>${result.distancia_km ? result.distancia_km.toFixed(1) + ' km' : 'N/A'}</p>
                </div>
                <div class="info-card">
                    <h4>Duração Estimada</h4>
                    <p>${result.duracao_min ? Math.round(result.duracao_min) + ' min' : 'N/A'}</p>
                </div>
                <div class="info-card">
                    <h4>Cidades Incluídas</h4>
                    <p>${result.candidatos ? result.candidatos.length : 0}</p>
                </div>
                <div class="info-card">
                    <h4>Raio de Busca</h4>
                    <p>${result.raio_km} km</p>
                </div>
            </div>
            
            <div class="route-steps">
                <h4>Roteiro Otimizado</h4>
                <ol class="step-list">
                    ${result.roteiro.map((step, index) => {
                        let className = '';
                        if (step === 'ORIGEM') className = 'origin';
                        else if (step === 'DESTINO') className = 'destination';
                        
                        return `<li class="step-item ${className}">${step}</li>`;
                    }).join('')}
                </ol>
            </div>
        `;

        this.showResults();
    }

    async displayRouteOnMap(result) {
        this.clearMap();

        // Adicionar marcador de origem
        if (result.origem) {
            const originMarker = L.marker([result.origem.lat, result.origem.lng])
                .bindPopup(`<strong>🏁 Origem:</strong> ${result.origem.name}`)
                .addTo(this.routeLayer);
            originMarker.setIcon(this.createCustomIcon('green', 'fa-play', 'ORIGEM'));
            this.markers.push(originMarker);
        }

        // Adicionar marcadores das cidades da rota com numeração
        if (result.roteiro) {
            let routeNumber = 1;
            const routeCoordinates = [];
            
            // Adicionar coordenadas da origem
            if (result.origem) {
                routeCoordinates.push([result.origem.lat, result.origem.lng]);
            }

            for (let i = 0; i < result.roteiro.length; i++) {
                const city = result.roteiro[i];
                if (city !== 'ORIGEM' && city !== 'DESTINO') {
                    const coords = await this.addCityMarkerWithGeocoding(city, routeNumber);
                    if (coords) {
                        routeCoordinates.push(coords);
                    }
                    routeNumber++;
                }
            }

            // Adicionar coordenadas do destino
            if (result.destino) {
                routeCoordinates.push([result.destino.lat, result.destino.lng]);
            }

            // Adicionar marcador de destino
            if (result.destino) {
                const destMarker = L.marker([result.destino.lat, result.destino.lng])
                    .bindPopup(`<strong>🏁 Destino:</strong> ${result.destino.name}`)
                    .addTo(this.routeLayer);
                destMarker.setIcon(this.createCustomIcon('red', 'fa-flag-checkered', 'DESTINO'));
                this.markers.push(destMarker);
            }

            // Desenhar linha conectando as paradas em sequência
            if (routeCoordinates.length > 1) {
                const routeLine = L.polyline(routeCoordinates, {
                    color: '#667eea',
                    weight: 4,
                    opacity: 0.8,
                    dashArray: '10, 10'
                }).addTo(this.routeLayer);
                
                // Adicionar popup na linha da rota
                routeLine.bindPopup(`
                    <div style="text-align: center;">
                        <strong>🚛 Rota Otimizada</strong><br>
                        <small>${routeCoordinates.length - 2} paradas + origem e destino</small>
                    </div>
                `);
            }
        }

        this.fitMapToMarkers();
    }

    async addCityMarkerWithGeocoding(cityName, routeNumber) {
        try {
            const response = await fetch(`/geocode/${encodeURIComponent(cityName)}`);
            if (response.ok) {
                const geo = await response.json();
                const marker = L.marker([geo.lat, geo.lng])
                    .bindPopup(`
                        <div style="text-align: center;">
                            <strong>📍 Parada ${routeNumber}</strong><br>
                            <strong>${cityName}</strong><br>
                            <small>Lat: ${geo.lat.toFixed(4)}<br>Lng: ${geo.lng.toFixed(4)}</small>
                        </div>
                    `)
                    .addTo(this.routeLayer);
                marker.setIcon(this.createCustomIcon('blue', 'fa-map-marker-alt', routeNumber.toString()));
                this.markers.push(marker);
                return [geo.lat, geo.lng];
            } else {
                // Fallback para coordenadas simuladas se geocoding falhar
                return this.addCityMarker(cityName, routeNumber);
            }
        } catch (error) {
            console.warn(`Erro ao geocodificar ${cityName}:`, error);
            return this.addCityMarker(cityName, routeNumber);
        }
    }

    addCityMarker(cityName, routeNumber) {
        // Simular coordenadas - fallback quando geocoding falha
        const lat = -23.5 + (Math.random() - 0.5) * 2;
        const lng = -51.5 + (Math.random() - 0.5) * 2;
        
        const marker = L.marker([lat, lng])
            .bindPopup(`
                <div style="text-align: center;">
                    <strong>📍 Parada ${routeNumber}</strong><br>
                    <strong>${cityName}</strong><br>
                    <small>Lat: ${lat.toFixed(4)}<br>Lng: ${lng.toFixed(4)}</small>
                </div>
            `)
            .addTo(this.routeLayer);
        marker.setIcon(this.createCustomIcon('blue', 'fa-map-marker-alt', routeNumber.toString()));
        this.markers.push(marker);
        return [lat, lng];
    }

    createCustomIcon(color, iconClass, number = null) {
        let content;
        
        if (number && this.showNumbers) {
            // Marcador numerado para paradas da rota
            content = `
                <div style="
                    background-color: ${color}; 
                    color: white; 
                    border-radius: 50%; 
                    width: 35px; 
                    height: 35px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    border: 3px solid white; 
                    box-shadow: 0 3px 8px rgba(0,0,0,0.4);
                    font-weight: bold;
                    font-size: 14px;
                ">
                    ${number}
                </div>
            `;
        } else {
            // Marcador com ícone para origem/destino ou paradas sem número
            const icon = number ? 'fa-map-marker-alt' : iconClass;
            content = `
                <div style="
                    background-color: ${color}; 
                    color: white; 
                    border-radius: 50%; 
                    width: 35px; 
                    height: 35px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    border: 3px solid white; 
                    box-shadow: 0 3px 8px rgba(0,0,0,0.4);
                ">
                    <i class="fas ${icon}" style="font-size: 16px;"></i>
                </div>
            `;
        }
        
        return L.divIcon({
            className: 'custom-marker',
            html: content,
            iconSize: [35, 35],
            iconAnchor: [17.5, 17.5]
        });
    }

    clearMap() {
        this.routeLayer.clearLayers();
        this.markers = [];
    }

    fitMapToMarkers() {
        if (this.markers.length > 0) {
            const group = new L.featureGroup(this.markers);
            this.map.fitBounds(group.getBounds().pad(0.1));
        }
    }

    toggleNumbers() {
        this.showNumbers = !this.showNumbers;
        const button = document.getElementById('toggle-numbers');
        
        if (this.showNumbers) {
            button.innerHTML = '<i class="fas fa-sort-numeric-up"></i> Mostrar Números';
            button.classList.remove('btn-primary');
            button.classList.add('btn-secondary');
        } else {
            button.innerHTML = '<i class="fas fa-eye-slash"></i> Ocultar Números';
            button.classList.remove('btn-secondary');
            button.classList.add('btn-primary');
        }
        
        // Re-renderizar mapa se houver rota atual
        if (this.currentRoute) {
            this.displayRouteOnMap(this.currentRoute);
        }
    }

    showResults() {
        document.getElementById('results-panel').classList.add('show');
    }

    hideResults() {
        document.getElementById('results-panel').classList.remove('show');
    }

    async saveManualRoute() {
        const name = document.getElementById('route-name').value;
        const origin = document.getElementById('route-origin').value;
        const destination = document.getElementById('route-destination').value;
        const cities = document.getElementById('route-cities').value.split('\n').filter(c => c.trim());
        const frequency = document.getElementById('route-frequency').value;

        if (!name || !origin || !destination || cities.length === 0) {
            alert('Por favor, preencha todos os campos obrigatórios');
            return;
        }

        try {
            const response = await fetch('/rotas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: name,
                    origem: origin,
                    destino: destination,
                    cidades: cities,
                    frequencia: frequency
                })
            });

            if (response.ok) {
                const route = await response.json();
                this.savedRoutes.push(route);
                this.loadSavedRoutes();

                // Limpar formulário
                document.getElementById('route-name').value = '';
                document.getElementById('route-origin').value = '';
                document.getElementById('route-destination').value = '';
                document.getElementById('route-cities').value = '';
                document.getElementById('route-frequency').value = 'semanal';

                alert('Rota salva com sucesso!');
            } else {
                const error = await response.json();
                alert('Erro ao salvar rota: ' + error.error);
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao salvar rota');
        }
    }

    async loadSavedRoutes() {
        const container = document.getElementById('saved-routes-list');
        container.innerHTML = '';

        try {
            const response = await fetch('/rotas');
            if (response.ok) {
                this.savedRoutes = await response.json();
            }
        } catch (error) {
            console.error('Erro ao carregar rotas:', error);
        }

        if (this.savedRoutes.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Nenhuma rota salva ainda</p>';
            return;
        }

        this.savedRoutes.forEach(route => {
            const routeElement = document.createElement('div');
            routeElement.className = 'saved-route-item';
            routeElement.innerHTML = `
                <div class="saved-route-header">
                    <div class="saved-route-name">${route.nome}</div>
                    <div class="saved-route-actions">
                        <button class="btn btn-primary btn-small" onclick="routeManager.loadRoute(${route.id})">
                            <i class="fas fa-eye"></i> Ver
                        </button>
                        <button class="btn btn-secondary btn-small" onclick="routeManager.editRoute(${route.id})">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                        <button class="btn btn-close btn-small" onclick="routeManager.deleteRoute(${route.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="saved-route-info">
                    <strong>Origem:</strong> ${route.origem} | 
                    <strong>Destino:</strong> ${route.destino} | 
                    <strong>Frequência:</strong> ${route.frequencia}
                </div>
                <div class="saved-route-cities">
                    <strong>Cidades:</strong> ${route.cidades.join(', ')}
                </div>
            `;
            container.appendChild(routeElement);
        });
    }

    loadRoute(routeId) {
        const route = this.savedRoutes.find(r => r.id === routeId);
        if (!route) return;

        // Preencher campos de otimização
        document.getElementById('origem').value = route.origem;
        document.getElementById('destino').value = route.destino;
        
        // Selecionar cidades
        this.selectedCities.clear();
        document.querySelectorAll('.city-item').forEach(item => {
            item.classList.remove('selected');
        });
        
        route.cidades.forEach(city => {
            this.selectedCities.add(city);
            const cityElement = Array.from(document.querySelectorAll('.city-item'))
                .find(el => el.textContent === city);
            if (cityElement) {
                cityElement.classList.add('selected');
            }
        });

        // Mudar para aba de otimização
        this.switchTab('route-optimization');
    }

    editRoute(routeId) {
        const route = this.savedRoutes.find(r => r.id === routeId);
        if (!route) return;

        // Preencher formulário de edição
        document.getElementById('route-name').value = route.nome;
        document.getElementById('route-origin').value = route.origem;
        document.getElementById('route-destination').value = route.destino;
        document.getElementById('route-cities').value = route.cidades.join('\n');
        document.getElementById('route-frequency').value = route.frequencia;

        // Mudar para aba de rotas manuais
        this.switchTab('manual-routes');
    }

    async deleteRoute(routeId) {
        if (confirm('Tem certeza que deseja excluir esta rota?')) {
            try {
                const response = await fetch(`/rotas/${routeId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    this.savedRoutes = this.savedRoutes.filter(r => r.id !== routeId);
                    this.loadSavedRoutes();
                    alert('Rota excluída com sucesso!');
                } else {
                    const error = await response.json();
                    alert('Erro ao excluir rota: ' + error.error);
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao excluir rota');
            }
        }
    }
}

// Inicializar o gerenciador de rotas quando a página carregar
let routeManager;
document.addEventListener('DOMContentLoaded', () => {
    routeManager = new RouteManager();
});
