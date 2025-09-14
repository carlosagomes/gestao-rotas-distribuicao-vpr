# Sistema de Roteirização - VPR

Sistema completo para otimização e gerenciamento de rotas de distribuição com interface web interativa e mapa visual.

## 🚀 Funcionalidades

### ✨ Otimização de Rotas
- **Algoritmo de otimização** usando OpenRouteService API
- **Geocoding automático** de cidades do Paraná
- **Cálculo de distância e duração** otimizada
- **Filtro por raio** de busca configurável
- **Visualização no mapa** com marcadores interativos

### 🗺️ Interface de Mapa
- **Mapa interativo** usando Leaflet
- **Marcadores personalizados** para origem, destino e paradas
- **Geocoding em tempo real** para posicionamento preciso
- **Controles de navegação** (limpar, ajustar visualização)

### 📝 Gerenciamento de Rotas Manuais
- **Criação de rotas personalizadas** com nome e frequência
- **Lista de cidades** editável
- **Salvamento e edição** de rotas
- **Carregamento rápido** para otimização

### 💾 Persistência de Dados
- **API REST** completa para CRUD de rotas
- **Armazenamento em memória** (pronto para banco de dados)
- **Sincronização** entre frontend e backend

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** com Express
- **OpenRouteService API** para otimização e geocoding
- **Turf.js** para cálculos geoespaciais
- **Axios** para requisições HTTP

### Frontend
- **HTML5** semântico
- **CSS3** com design responsivo
- **JavaScript ES6+** modular
- **Leaflet** para mapas interativos
- **Font Awesome** para ícones

### Infraestrutura
- **Docker** para containerização
- **Docker Compose** para orquestração

## 📦 Instalação e Execução

### Pré-requisitos
- Docker e Docker Compose instalados
- Chave da API OpenRouteService

### 1. Configuração
```bash
# Clone o repositório
git clone <repository-url>
cd rotas

# Configure a chave da API no docker-compose.yml
# Edite a linha ORS_KEY com sua chave
```

### 2. Execução com Docker
```bash
# Construir e executar
docker-compose up --build

# Acesse no navegador
http://localhost:3000
```

### 3. Execução Local (Desenvolvimento)
```bash
# Instalar dependências
npm install

# Configurar variável de ambiente
export ORS_KEY="sua-chave-aqui"

# Executar servidor
npm start
```

## 🎯 Como Usar

### 1. Otimização de Rotas
1. Acesse a aba **"Otimização de Rotas"**
2. Defina origem e destino
3. Ajuste o raio de busca (km)
4. Selecione cidades do Paraná na grade
5. Clique em **"Otimizar Rota"**
6. Visualize o resultado no mapa e painel de resultados

### 2. Rotas Manuais
1. Acesse a aba **"Rotas Manuais"**
2. Preencha nome da rota, origem e destino
3. Digite as cidades (uma por linha)
4. Selecione a frequência
5. Clique em **"Salvar Rota"**

### 3. Gerenciar Rotas Salvas
1. Acesse a aba **"Rotas Salvas"**
2. Visualize todas as rotas criadas
3. Use os botões para **Ver**, **Editar** ou **Excluir**
4. Clique em **"Ver"** para carregar na otimização

## 🔧 API Endpoints

### Rotas
- `GET /rotas` - Listar todas as rotas
- `POST /rotas` - Criar nova rota
- `PUT /rotas/:id` - Atualizar rota
- `DELETE /rotas/:id` - Excluir rota

### Geocoding
- `GET /geocode/:cidade` - Obter coordenadas de uma cidade
- `POST /geocode` - Geocoding em lote

### Otimização
- `POST /roteiro` - Otimizar rota com parâmetros

### Dados
- `GET /municipios` - Listar municípios do Paraná

## 📊 Estrutura do Projeto

```
rotas/
├── public/                 # Arquivos estáticos
│   ├── index.html         # Interface principal
│   ├── style.css          # Estilos CSS
│   └── script.js          # Lógica JavaScript
├── server.js              # Servidor Express
├── package.json           # Dependências Node.js
├── Dockerfile            # Configuração Docker
├── docker-compose.yml    # Orquestração Docker
└── README.md            # Documentação
```

## 🎨 Interface

### Design Responsivo
- **Desktop**: Layout em duas colunas (sidebar + mapa)
- **Mobile**: Layout empilhado verticalmente
- **Cores**: Gradiente azul/roxo com acentos verdes/vermelhos
- **Tipografia**: Segoe UI com hierarquia clara

### Componentes
- **Sidebar**: Navegação por abas e formulários
- **Mapa**: Visualização interativa com controles
- **Painel de Resultados**: Informações detalhadas da otimização
- **Grid de Cidades**: Seleção visual das cidades do PR

## 🔍 Exemplo de Uso

### Cenário: Rota Maringá → Paranavaí
1. **Origem**: Maringá, PR
2. **Destino**: Paranavaí, PR
3. **Raio**: 20 km
4. **Cidades selecionadas**: Sarandi, Paiçandu, Doutor Camargo, etc.
5. **Resultado**: Rota otimizada com distância e duração calculadas

### Dados de Exemplo
O sistema inclui todos os 67 municípios do Paraná fornecidos:
- TERRA RICA, TAMBOARA, SARANDI, etc.
- Geocoding automático para posicionamento no mapa
- Integração com API de otimização de rotas

## 🚀 Próximas Melhorias

- [ ] Integração com banco de dados (PostgreSQL/MongoDB)
- [ ] Autenticação e autorização de usuários
- [ ] Relatórios e exportação de dados
- [ ] Integração com sistemas de GPS
- [ ] Notificações em tempo real
- [ ] API de terceiros para dados de tráfego

## 🌐 Deploy em Produção

### Opção 1: Vercel (Recomendado) ⭐
1. **Conecte seu GitHub** ao [Vercel](https://vercel.com)
2. **Importe o repositório** do projeto
3. **Configure a variável de ambiente:**
   - `ORS_KEY` = sua chave da API OpenRouteService
4. **Deploy automático** em segundos!

**URL de exemplo:** `https://gestao-rotas-vpr.vercel.app`

### Opção 2: Railway
1. **Conecte GitHub** ao [Railway](https://railway.app)
2. **Selecione o projeto**
3. **Configure ORS_KEY** nas variáveis de ambiente
4. **Deploy instantâneo**

### Opção 3: Render
1. **Conecte GitHub** ao [Render](https://render.com)
2. **Crie novo Web Service**
3. **Configure ORS_KEY** nas variáveis
4. **Deploy automático**

### Obter Chave da API
1. Acesse: https://openrouteservice.org/dev/#/signup
2. **Crie uma conta gratuita**
3. **Copie sua chave API**
4. **Configure nas variáveis de ambiente** da plataforma escolhida

### Configuração de Variáveis
```bash
# Variável obrigatória
ORS_KEY=sua_chave_da_api_openrouteservice

# Opcionais
PORT=3000
NODE_ENV=production
```

## 📝 Licença

Este projeto foi desenvolvido para a VPR como sistema interno de roteirização.

## 🤝 Suporte

Para dúvidas ou sugestões, entre em contato com a equipe de desenvolvimento.
