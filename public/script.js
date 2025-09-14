// Dados dos municípios do Paraná (carregados do servidor)
let municipiosPR = [];

// Grupos de cidades para seleção rápida
const cityGroups = {
    principais: [
        "CURITIBA", "LONDRINA", "MARINGÁ", "PONTA GROSSA", "CASCÁVEL",
        "SÃO JOSÉ DOS PINHAIS", "FOZ DO IGUAÇU", "COLOMBO", "GUARAPUAVA", "PARANAGUÁ",
        "ARAPONGAS", "APUCARANA", "CAMPO LARGO", "CASTRO", "FRANCISCO BELTRÃO",
        "PARANAVAÍ", "TOLEDO", "UMUARAMA", "UNIÃO DA VITÓRIA", "PATO BRANCO"
    ],
    norte: [
        "APUCARANA", "ARAPONGAS", "ASTORGA", "BANDEIRANTES", "BARBOSA FERRAZ",
        "BOM SUCESSO", "BORRAZÓPOLIS", "CALDAS", "CAMBARÁ", "CAMBIRA",
        "CARLÓPOLIS", "CORNÉLIO PROCÓPIO", "CRUZ MACHADO", "FAXINAL", "FIGUEIRA",
        "GODOY MOREIRA", "GUARACI", "IBIPORÃ", "JAGUAPITÃ", "JANDAIA DO SUL",
        "KALORÉ", "LONDRINA", "MARILÂNDIA DO SUL", "MARINGÁ", "MARILENA",
        "MARILUZ", "MARIÓPOLIS", "MARIPÁ", "MARMELEIRO", "MARQUINHO",
        "MARUMBI", "MATELÂNDIA", "MAUÁ DA SERRA", "MERCEDES", "MIRASELVA",
        "MOREIRA SALES", "MUNHOZ DE MELO", "NOVA ALIANÇA DO IVAÍ", "NOVA AMÉRICA DA COLINA",
        "NOVA AURORA", "NOVA CANTU", "NOVA ESPERANÇA", "NOVA FÁTIMA", "NOVA LARANJEIRAS",
        "NOVA LONDRINA", "NOVA OLÍMPIA", "NOVA PRATA DO IGUAÇU", "NOVA SANTA BÁRBARA",
        "NOVA SANTA ROSA", "NOVA TEBAS", "NOVO ITACOLOMI", "ORTIGUEIRA", "OURIZONA",
        "PAIÇANDU", "PALMEIRA", "PALMITAL", "PARANACITY", "PARANAPOEMA",
        "PARANAVAÍ", "PAULA FREITAS", "PAULO FRONTIN", "PEABIRU", "PEROBAL",
        "PÉROLA", "PÉROLA D'OESTE", "PINHALÃO", "PIRAÍ DO SUL", "PIRAIAS",
        "PIRAPOZINHO", "PIRAQUARA", "PITANGA", "PITANGUEIRAS", "PLANALTINA DO PARANÁ",
        "PLANALTO", "PONTA GROSSA", "PORECATU", "PRESIDENTE CASTELO BRANCO", "PRIMEIRO DE MAIO",
        "PRUDENTÓPOLIS", "QUARTO CENTENÁRIO", "QUATIGUÁ", "QUATRO BARRAS", "QUATRO PONTES",
        "QUEDAS DO IGUAÇU", "QUITANDINHA", "RAMILÂNDIA", "RANCHO ALEGRE", "RANCHO ALEGRE D'OESTE",
        "REALEZA", "REBOUÇAS", "RENASCENÇA", "RESERVA", "RESERVA DO IGUAÇU",
        "RIBEIRÃO CLARO", "RIBEIRÃO DO PINHAL", "RIO AZUL", "RIO BRANCO DO IVAÍ",
        "RIO BRANCO DO SUL", "RIO BOM", "RIO NEGRO", "ROLÂNDIA", "RONCADOR",
        "ROSÁRIO DO IVAÍ", "SABAUDIA", "SALGADO FILHO", "SALTO DO ITARARÉ", "SALTO DO LONTRA",
        "SANTA AMÉLIA", "SANTA CECÍLIA DO PAVÃO", "SANTA CRUZ DE MONTE CASTELO", "SANTA FÉ",
        "SANTA HELENA", "SANTA INÊS", "SANTA ISABEL DO IVAÍ", "SANTA IZABEL DO OESTE",
        "SANTA LÚCIA", "SANTA MARIA DO OESTE", "SANTA MARIANA", "SANTA MÔNICA",
        "SANTA TEREZA DO OESTE", "SANTA TEREZINHA DE ITAIPU", "SANTANA DO ITARARÉ",
        "SANTO ANTONIO DA PLATINA", "SANTO ANTONIO DO CAIUÁ", "SANTO ANTONIO DO PARAÍSO",
        "SANTO ANTONIO DO SUDOESTE", "SANTO INÁCIO", "SÃO CARLOS DO IVAÍ",
        "SÃO JERÔNIMO DA SERRA", "SÃO JOÃO", "SÃO JOÃO DO CAIUÁ", "SÃO JOÃO DO IVAÍ",
        "SÃO JOÃO DO TRIUNFO", "SÃO JORGE D'OESTE", "SÃO JORGE DO IVAÍ",
        "SÃO JORGE DO PATROCÍNIO", "SÃO JOSÉ DA BOA VISTA", "SÃO JOSÉ DAS PALMEIRAS",
        "SÃO JOSÉ DO PIAUÍ", "SÃO MANOEL DO PARANÁ", "SÃO MATEUS DO SUL",
        "SÃO MIGUEL DO IGUAÇU", "SÃO PEDRO DO IGUAÇU", "SÃO PEDRO DO IVAÍ",
        "SÃO PEDRO DO PARANÁ", "SÃO SEBASTIÃO DA AMOREIRA", "SÃO TOMÉ", "SAPOPEMA",
        "SARANDI", "SENGÉS", "SERRANÓPOLIS DO IGUAÇU", "SERTANEJA", "SERTANÓPOLIS",
        "SIQUEIRA CAMPOS", "SULINA", "TAMARANA", "TAMBOARA", "TAPEJARA",
        "TAPIRA", "TEIXEIRA SOARES", "TELÊMACO BORBA", "TERRA BOA", "TERRA RICA",
        "TERRA ROXA", "TIBAGI", "TIJUCAS DO SUL", "TOLEDO", "TOMAZINA",
        "TRÊS BARRAS DO PARANÁ", "TUNAS DO PARANÁ", "TUNEIRAS DO OESTE",
        "TUPÃSSI", "TURVO", "UBIRATÃ", "UMUARAMA", "UNIÃO DA VITÓRIA",
        "UNIFLOR", "URAÍ", "VALE DO SOL", "VALINHOS", "VASSOURAS",
        "VERÊ", "VILA ALTA", "VIRMOND", "VITORINO", "WENCESLAU BRAZ", "XAMBRÊ"
    ],
    oeste: [
        "CASCAVEL", "FOZ DO IGUAÇU", "TOLEDO", "FRANCISCO BELTRÃO", "PATOS BRANCO",
        "MEDIANEIRA", "SANTA TEREZINHA DE ITAIPU", "MISSAL", "SÃO MIGUEL DO IGUAÇU",
        "SANTA HELENA", "MATELÂNDIA", "MARECHAL CÂNDIDO RONDON", "PALOTINA",
        "TERRA ROXA", "QUEDAS DO IGUAÇU", "LARANJEIRAS DO SUL", "CHOPINZINHO",
        "CORBELO", "VERÊ", "SALTO DO LONTRA", "BOM SUCESSO DO SUL", "DOIS VIZINHOS",
        "SANTA TEREZA DO OESTE", "DIAMANTE DO SUL", "DIAMANTE D'OESTE", "DIAMANTE DO NORTE",
        "SANTA ISABEL DO OESTE", "SANTA LÚCIA", "SANTA MARIA DO OESTE", "SANTA MARIANA",
        "SANTA MÔNICA", "SANTA TEREZA DO OESTE", "SANTA TEREZINHA DE ITAIPU",
        "SÃO JORGE D'OESTE", "SÃO JORGE DO PATROCÍNIO", "SÃO JOSÉ DA BOA VISTA",
        "SÃO JOSÉ DAS PALMEIRAS", "SÃO JOSÉ DO PIAUÍ", "SÃO MANOEL DO PARANÁ",
        "SÃO MATEUS DO SUL", "SÃO MIGUEL DO IGUAÇU", "SÃO PEDRO DO IGUAÇU",
        "SERRANÓPOLIS DO IGUAÇU", "TUNEIRAS DO OESTE", "TUPÃSSI", "TURVO"
    ],
    sul: [
        "CURITIBA", "SÃO JOSÉ DOS PINHAIS", "COLOMBO", "PONTA GROSSA", "CAMPO LARGO",
        "ARAUCÁRIA", "FAZENDA RIO GRANDE", "PINHAIS", "PIRAIAS", "PIRAQUARA",
        "QUATRO BARRAS", "ALMIRANTE TAMANDARÉ", "BOCAIÚVA DO SUL", "CAMPINA GRANDE DO SUL",
        "CAMPO DO TENENTE", "CAMPO MOURÃO", "CÂNDIDO DE ABREU", "CARAMBEÍ",
        "CASTRO", "CERRO AZUL", "CÉU AZUL", "CONGONHINHAS", "CONSELHEIRO MAIRINCK",
        "CONTENDA", "CURIUVA", "DOIS VIZINHOS", "FERNANDES PINHEIRO", "FIGUEIRA",
        "GENERAL CARNEIRO", "GUAMIRANGA", "GUAPIRAMA", "GUAPOREMA", "GUARANIAÇU",
        "GUARATUBA", "HONÓRIO SERPA", "IBAITI", "IBEMA", "IGUARAÇU",
        "IGUATU", "IMBAÚ", "IMBITUVA", "INÁCIO MARTINS", "INAJÁ",
        "INDIANÓPOLIS", "IPIRANGA", "IPORÃ", "IRACEMA DO OESTE", "IRATI",
        "IRETAMA", "ITAGUAJÉ", "ITAIPULÂNDIA", "ITAMBARACÁ", "ITAMBÉ",
        "ITAPEJARA D'OESTE", "ITAPERUÇU", "ITAÚNA DO SUL", "IVAÍ", "IVAIPORÃ",
        "IVATÉ", "IVATUBA", "JABOTI", "JACAREZINHO", "JAGUARIAÍVA",
        "JANIÓPOLIS", "JAPIRA", "JAPURÁ", "JARDIM ALEGRE", "JARDIM OLINDA",
        "JATAIZINHO", "JESUÍTAS", "JOAQUIM TÁVORA", "JUNDIAÍ DO SUL", "JURANDA",
        "JUSSARA", "LAPA", "LARANJAL", "LINDOESTE", "LOANDA",
        "LOBATO", "LUIZIANA", "LUNARDELLI", "LUPIONÓPOLIS", "MALLET",
        "MAMBORÊ", "MANDAGUAÇU", "MANDAGUARI", "MANDIRITUBA", "MANFRINÓPOLIS",
        "MANGUEIRINHA", "MANOEL RIBAS", "MARIA HELENA", "MARIALVA", "MARILÂNDIA DO SUL",
        "MARILENA", "MARILUZ", "MARIÓPOLIS", "MARIPÁ", "MARMELEIRO",
        "MARQUINHO", "MARUMBI", "MATO RICO", "MAUÁ DA SERRA", "MERCEDES",
        "MIRADOR", "MIRASELVA", "MISSAL", "MOREIRA SALES", "MORRETES",
        "MUNHOZ DE MELO", "NOSSA SENHORA DAS GRAÇAS", "NOVA ALIANÇA DO IVAÍ",
        "NOVA AMÉRICA DA COLINA", "NOVA AURORA", "NOVA CANTU", "NOVA ESPERANÇA",
        "NOVA ESPERANÇA DO SUDOESTE", "NOVA FÁTIMA", "NOVA LARANJEIRAS", "NOVA LONDRINA",
        "NOVA OLÍMPIA", "NOVA PRATA DO IGUAÇU", "NOVA SANTA BÁRBARA", "NOVA SANTA ROSA",
        "NOVA TEBAS", "NOVO ITACOLOMI", "ORTIGUEIRA", "OURIZONA", "OURO VERDE DO OESTE",
        "PAIÇANDU", "PALMAS", "PALMEIRA", "PALMITAL", "PALOTINA",
        "PARANACITY", "PARANAGUÁ", "PARANAPOEMA", "PARANAVAÍ", "PATO BRAGADO",
        "PATO BRANCO", "PAULA FREITAS", "PAULO FRONTIN", "PEABIRU", "PEROBAL",
        "PÉROLA", "PÉROLA D'OESTE", "PIÊN", "PINHAIS", "PINHAL DE SÃO BENTO",
        "PINHALÃO", "PINHÃO", "PIRAÍ DO SUL", "PIRAIAS", "PIRAPOZINHO",
        "PIRAQUARA", "PITANGA", "PITANGUEIRAS", "PLANALTINA DO PARANÁ", "PLANALTO",
        "PONTA GROSSA", "PONTAL DO PARANÁ", "PORECATU", "PORTO AMAZONAS",
        "PORTO BARREIRO", "PORTO RICO", "PORTO VITÓRIA", "PRADO FERREIRA",
        "PRANCHITA", "PRESIDENTE CASTELO BRANCO", "PRIMEIRO DE MAIO", "PRUDENTÓPOLIS",
        "QUARTO CENTENÁRIO", "QUATIGUÁ", "QUATRO BARRAS", "QUATRO PONTES",
        "QUEDAS DO IGUAÇU", "QUERÊNCIA DO NORTE", "QUINTA DO SOL", "QUITANDINHA",
        "RAMILÂNDIA", "RANCHO ALEGRE", "RANCHO ALEGRE D'OESTE", "REALEZA",
        "REBOUÇAS", "RENASCENÇA", "RESERVA", "RESERVA DO IGUAÇU", "RIBEIRÃO CLARO",
        "RIBEIRÃO DO PINHAL", "RIO AZUL", "RIO BRANCO DO IVAÍ", "RIO BRANCO DO SUL",
        "RIO BOM", "RIO NEGRO", "ROLÂNDIA", "RONCADOR", "ROSÁRIO DO IVAÍ",
        "SABAUDIA", "SALGADO FILHO", "SALTO DO ITARARÉ", "SALTO DO LONTRA",
        "SANTA AMÉLIA", "SANTA CECÍLIA DO PAVÃO", "SANTA CRUZ DE MONTE CASTELO",
        "SANTA FÉ", "SANTA HELENA", "SANTA INÊS", "SANTA ISABEL DO IVAÍ",
        "SANTA IZABEL DO OESTE", "SANTA LÚCIA", "SANTA MARIA DO OESTE",
        "SANTA MARIANA", "SANTA MÔNICA", "SANTA TEREZA DO OESTE",
        "SANTA TEREZINHA DE ITAIPU", "SANTANA DO ITARARÉ", "SANTO ANTONIO DA PLATINA",
        "SANTO ANTONIO DO CAIUÁ", "SANTO ANTONIO DO PARAÍSO", "SANTO ANTONIO DO SUDOESTE",
        "SANTO INÁCIO", "SÃO CARLOS DO IVAÍ", "SÃO JERÔNIMO DA SERRA", "SÃO JOÃO",
        "SÃO JOÃO DO CAIUÁ", "SÃO JOÃO DO IVAÍ", "SÃO JOÃO DO TRIUNFO",
        "SÃO JORGE D'OESTE", "SÃO JORGE DO IVAÍ", "SÃO JORGE DO PATROCÍNIO",
        "SÃO JOSÉ DA BOA VISTA", "SÃO JOSÉ DAS PALMEIRAS", "SÃO JOSÉ DO PIAUÍ",
        "SÃO MANOEL DO PARANÁ", "SÃO MATEUS DO SUL", "SÃO MIGUEL DO IGUAÇU",
        "SÃO PEDRO DO IGUAÇU", "SÃO PEDRO DO IVAÍ", "SÃO PEDRO DO PARANÁ",
        "SÃO SEBASTIÃO DA AMOREIRA", "SÃO TOMÉ", "SAPOPEMA", "SARANDI", "SENGÉS",
        "SERRANÓPOLIS DO IGUAÇU", "SERTANEJA", "SERTANÓPOLIS", "SIQUEIRA CAMPOS",
        "SULINA", "TAMARANA", "TAMBOARA", "TAPEJARA", "TAPIRA",
        "TEIXEIRA SOARES", "TELÊMACO BORBA", "TERRA BOA", "TERRA RICA", "TERRA ROXA",
        "TIBAGI", "TIJUCAS DO SUL", "TOLEDO", "TOMAZINA", "TRÊS BARRAS DO PARANÁ",
        "TUNAS DO PARANÁ", "TUNEIRAS DO OESTE", "TUPÃSSI", "TURVO", "UBIRATÃ",
        "UMUARAMA", "UNIÃO DA VITÓRIA", "UNIFLOR", "URAÍ", "VALE DO SOL",
        "VALINHOS", "VASSOURAS", "VERÊ", "VILA ALTA", "VIRMOND",
        "VITORINO", "WENCESLAU BRAZ", "XAMBRÊ"
    ],
    litoral: [
        "PARANAGUÁ", "GUARATUBA", "MATINHOS", "PONTAL DO PARANÁ", "ANTONINA",
        "MORRETES", "GUARAQUEÇABA", "CERRO AZUL", "ADRIANÓPOLIS", "BOCAIÚVA DO SUL",
        "CAMPINA GRANDE DO SUL", "CERRO AZUL", "COLOMBO", "CURITIBA", "PINHAIS",
        "PIRAIAS", "PIRAQUARA", "QUATRO BARRAS", "SÃO JOSÉ DOS PINHAIS", "TUNAS DO PARANÁ"
    ]
};

class RouteManager {
    constructor() {
        this.map = null;
        this.markers = [];
        this.routeLayer = null;
        this.savedRoutes = [];
        this.selectedCities = new Set();
        this.showNumbers = true; // Por padrão, mostrar números
        this.useRealRoute = true; // Por padrão, usar rota real
        this.currentRoute = null; // Armazenar rota atual para re-renderizar
        this.optimizedRoute = null; // Armazenar rota otimizada para navegação externa
        this.filteredCities = []; // Cidades filtradas
        this.currentFilters = {
            search: '',
            region: '',
            alphabet: ''
        };
        this.isMobile = window.innerWidth <= 768; // Detectar se é mobile
        this.mapVisible = false; // Estado do mapa no mobile
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
        
        // Configurar visibilidade inicial do mapa
        this.updateMapVisibility();
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

        // Botão de alternar tipo de rota
        document.getElementById('toggle-route-type').addEventListener('click', () => {
            this.toggleRouteType();
        });

        // Filtros de cidades
        document.getElementById('city-search').addEventListener('input', (e) => {
            this.currentFilters.search = e.target.value.toLowerCase();
            this.applyFilters();
        });

        document.getElementById('region-filter').addEventListener('change', (e) => {
            this.currentFilters.region = e.target.value;
            this.applyFilters();
        });

        document.getElementById('alphabet-filter').addEventListener('change', (e) => {
            this.currentFilters.alphabet = e.target.value;
            this.applyFilters();
        });

        // Botões de seleção rápida
        document.getElementById('select-visible-cities').addEventListener('click', () => {
            this.selectVisibleCities();
        });

        document.getElementById('clear-filters').addEventListener('click', () => {
            this.clearFilters();
        });

        // Grupos rápidos
        document.querySelectorAll('.quick-group-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectQuickGroup(e.target.dataset.group);
            });
        });

        // Botões de navegação externa
        document.getElementById('open-google-maps').addEventListener('click', () => {
            this.openInGoogleMaps();
        });

        document.getElementById('copy-route-link').addEventListener('click', () => {
            this.copyRouteLink();
        });

        document.getElementById('test-google-maps-url').addEventListener('click', () => {
            this.testGoogleMapsUrl();
        });

        // Botão de toggle do mapa no mobile
        document.getElementById('toggle-map-mobile').addEventListener('click', () => {
            this.toggleMapVisibility();
        });

        // Detectar mudanças de tamanho da tela
        window.addEventListener('resize', () => {
            this.isMobile = window.innerWidth <= 768;
            this.updateMapVisibility();
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
        this.filteredCities = [...municipiosPR];
        this.renderCities();
    }

    renderCities() {
        const citiesGrid = document.getElementById('cities-grid');
        citiesGrid.innerHTML = '';

        this.filteredCities.forEach(city => {
            const cityItem = document.createElement('div');
            cityItem.className = 'city-item';
            cityItem.textContent = city;
            
            // Destacar se selecionada
            if (this.selectedCities.has(city)) {
                cityItem.classList.add('selected');
            }
            
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

    applyFilters() {
        this.filteredCities = municipiosPR.filter(city => {
            const cityLower = city.toLowerCase();
            
            // Filtro de busca
            if (this.currentFilters.search && !cityLower.includes(this.currentFilters.search)) {
                return false;
            }
            
            // Filtro de região (simplificado)
            if (this.currentFilters.region) {
                const regionGroups = {
                    'metropolitana': ['CURITIBA', 'SÃO JOSÉ DOS PINHAIS', 'COLOMBO', 'PONTA GROSSA', 'CAMPO LARGO', 'ARAUCÁRIA', 'FAZENDA RIO GRANDE', 'PINHAIS', 'PIRAIAS', 'PIRAQUARA', 'QUATRO BARRAS', 'ALMIRANTE TAMANDARÉ'],
                    'norte': ['LONDRINA', 'MARINGÁ', 'APUCARANA', 'ARAPONGAS', 'PONTA GROSSA', 'CASTRO', 'PARANAVAÍ', 'UMUARAMA', 'UNIÃO DA VITÓRIA', 'PATO BRANCO'],
                    'noroeste': ['CASCAVEL', 'FOZ DO IGUAÇU', 'TOLEDO', 'FRANCISCO BELTRÃO', 'MEDIANEIRA', 'SANTA TEREZINHA DE ITAIPU', 'MISSAL', 'SÃO MIGUEL DO IGUAÇU'],
                    'oeste': ['CASCAVEL', 'FOZ DO IGUAÇU', 'TOLEDO', 'FRANCISCO BELTRÃO', 'MEDIANEIRA', 'SANTA TEREZINHA DE ITAIPU', 'MISSAL', 'SÃO MIGUEL DO IGUAÇU'],
                    'sul': ['CURITIBA', 'SÃO JOSÉ DOS PINHAIS', 'COLOMBO', 'PONTA GROSSA', 'CAMPO LARGO', 'ARAUCÁRIA', 'FAZENDA RIO GRANDE', 'PINHAIS', 'PIRAIAS', 'PIRAQUARA'],
                    'sudeste': ['CURITIBA', 'SÃO JOSÉ DOS PINHAIS', 'COLOMBO', 'PONTA GROSSA', 'CAMPO LARGO', 'ARAUCÁRIA', 'FAZENDA RIO GRANDE', 'PINHAIS', 'PIRAIAS', 'PIRAQUARA'],
                    'centro': ['CURITIBA', 'SÃO JOSÉ DOS PINHAIS', 'COLOMBO', 'PONTA GROSSA', 'CAMPO LARGO', 'ARAUCÁRIA', 'FAZENDA RIO GRANDE', 'PINHAIS', 'PIRAIAS', 'PIRAQUARA']
                };
                
                if (regionGroups[this.currentFilters.region] && !regionGroups[this.currentFilters.region].includes(city)) {
                    return false;
                }
            }
            
            // Filtro alfabético
            if (this.currentFilters.alphabet && !city.startsWith(this.currentFilters.alphabet)) {
                return false;
            }
            
            return true;
        });
        
        this.renderCities();
    }

    selectVisibleCities() {
        const maxCities = Math.min(20, this.filteredCities.length);
        let selected = 0;
        
        this.filteredCities.forEach(city => {
            if (selected < maxCities && !this.selectedCities.has(city)) {
                this.selectedCities.add(city);
                selected++;
            }
        });
        
        this.updateCityCounter();
        this.renderCities();
    }

    clearFilters() {
        this.currentFilters = {
            search: '',
            region: '',
            alphabet: ''
        };
        
        // Limpar campos
        document.getElementById('city-search').value = '';
        document.getElementById('region-filter').value = '';
        document.getElementById('alphabet-filter').value = '';
        
        this.applyFilters();
    }

    selectQuickGroup(groupName) {
        if (cityGroups[groupName]) {
            const groupCities = cityGroups[groupName];
            const maxCities = Math.min(20, groupCities.length);
            let selected = 0;
            
            // Limpar seleções atuais
            this.selectedCities.clear();
            
            groupCities.forEach(city => {
                if (selected < maxCities && municipiosPR.includes(city)) {
                    this.selectedCities.add(city);
                    selected++;
                }
            });
            
            this.updateCityCounter();
            this.renderCities();
            
            // Destacar botão do grupo
            document.querySelectorAll('.quick-group-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector(`[data-group="${groupName}"]`).classList.add('active');
        }
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

        // Validação adicional: verificar se o raio não é muito pequeno
        if (parseInt(raio) < 5) {
            alert('⚠️ Raio muito pequeno! Recomendamos usar pelo menos 5km para encontrar cidades próximas à rota.');
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
                this.optimizedRoute = result; // Armazenar rota otimizada para navegação externa
                await this.displayRouteOnMap(result);
                this.showExternalNavButtons(); // Mostrar botões de navegação externa
                this.showMapOnRouteReady(); // Mostrar mapa quando rota estiver pronta no mobile
            } else {
                if (response.status === 429) {
                    alert('Muitas requisições simultâneas. Aguarde alguns segundos e tente novamente com menos cidades.');
                } else if (response.status === 400) {
                    // Erro específico para quando não há cidades no raio
                    const errorMessage = result.error || 'Erro na requisição';
                    const sugestao = result.sugestao || '';
                    
                    // Sugerir raio maior
                    const raioAtual = parseInt(document.getElementById('raio').value);
                    const novoRaio = Math.min(raioAtual * 2, 100); // Dobrar o raio, máximo 100km
                    
                    const confirmar = confirm(`⚠️ ${errorMessage}\n\n💡 ${sugestao}\n\n🔄 Deseja tentar com raio de ${novoRaio}km?`);
                    
                    if (confirmar) {
                        document.getElementById('raio').value = novoRaio;
                        // Tentar novamente automaticamente
                        setTimeout(() => {
                            this.optimizeRoute();
                        }, 1000);
                    }
                } else {
                    alert('Erro: ' + (result.error || 'Erro desconhecido'));
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
        // Debug: Log do resultado recebido
        console.log('Result received:', result);
        console.log('Distance:', result.distancia_km);
        console.log('Duration:', result.duracao_min);
        
        const resultsContent = document.getElementById('results-content');
        
        // Verificar e formatar valores
        const distancia = result.distancia_km ? 
            (typeof result.distancia_km === 'number' ? result.distancia_km.toFixed(1) + ' km' : result.distancia_km) : 
            'N/A';
        
        const duracao = result.duracao_min ? 
            (typeof result.duracao_min === 'number' ? Math.round(result.duracao_min) + ' min' : result.duracao_min) : 
            'N/A';
        
        resultsContent.innerHTML = `
            <div class="route-info">
                <div class="info-card">
                    <h4>Distância Total</h4>
                    <p>${distancia}</p>
                </div>
                <div class="info-card">
                    <h4>Duração Estimada</h4>
                    <p>${duracao}</p>
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

            // Desenhar rota seguindo estradas reais ou linha reta
            if (routeCoordinates.length > 1) {
                if (this.useRealRoute) {
                    await this.drawRealRoute(routeCoordinates);
                } else {
                    this.drawStraightLine(routeCoordinates);
                }
            }
        }

        this.fitMapToMarkers();
    }

    async drawRealRoute(waypoints) {
        try {
            // Preparar waypoints para a API
            const waypointData = waypoints.map(coord => ({
                lng: coord[1],
                lat: coord[0]
            }));

            const response = await fetch('/route-waypoints', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    waypoints: waypointData
                })
            });

            if (response.ok) {
                const routeData = await response.json();
                
                if (routeData.features && routeData.features.length > 0) {
                    const route = routeData.features[0];
                    const coordinates = route.geometry.coordinates;
                    
                    // Converter coordenadas para formato [lat, lng] do Leaflet
                    const leafletCoords = coordinates.map(coord => [coord[1], coord[0]]);
                    
                    // Criar polyline com a rota real
                    const routeLine = L.polyline(leafletCoords, {
                        color: '#667eea',
                        weight: 5,
                        opacity: 0.8,
                        smoothFactor: 1
                    }).addTo(this.routeLayer);
                    
                    // Adicionar popup na linha da rota
                    const distance = route.properties.summary ? 
                        (route.properties.summary.distance / 1000).toFixed(1) : 'N/A';
                    const duration = route.properties.summary ? 
                        Math.round(route.properties.summary.duration / 60) : 'N/A';
                    
                    routeLine.bindPopup(`
                        <div style="text-align: center;">
                            <strong>🚛 Rota Otimizada</strong><br>
                            <small>${waypoints.length - 2} paradas + origem e destino</small><br>
                            <strong>Distância:</strong> ${distance} km<br>
                            <strong>Duração:</strong> ${duration} min
                        </div>
                    `);
                    
                    console.log('Rota real desenhada com sucesso');
                } else {
                    // Fallback para linha reta se a API falhar
                    this.drawStraightLine(waypoints);
                }
            } else {
                console.warn('Erro ao calcular rota real, usando linha reta');
                this.drawStraightLine(waypoints);
            }
        } catch (error) {
            console.warn('Erro ao desenhar rota real:', error);
            this.drawStraightLine(waypoints);
        }
    }

    drawStraightLine(waypoints) {
        // Fallback para linha reta
        const routeLine = L.polyline(waypoints, {
            color: '#667eea',
            weight: 4,
            opacity: 0.8,
            dashArray: '10, 10'
        }).addTo(this.routeLayer);
        
        routeLine.bindPopup(`
            <div style="text-align: center;">
                <strong>🚛 Rota Otimizada</strong><br>
                <small>${waypoints.length - 2} paradas + origem e destino</small><br>
                <em>Linha reta (rota real indisponível)</em>
            </div>
        `);
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

    toggleRouteType() {
        this.useRealRoute = !this.useRealRoute;
        const button = document.getElementById('toggle-route-type');
        
        if (this.useRealRoute) {
            button.innerHTML = '<i class="fas fa-road"></i> Rota Real';
            button.classList.remove('btn-primary');
            button.classList.add('btn-secondary');
        } else {
            button.innerHTML = '<i class="fas fa-arrows-alt-h"></i> Linha Reta';
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

    showExternalNavButtons() {
        const externalNavSection = document.getElementById('external-nav-section');
        if (externalNavSection) {
            externalNavSection.style.display = 'block';
        }
    }

    hideExternalNavButtons() {
        const externalNavSection = document.getElementById('external-nav-section');
        if (externalNavSection) {
            externalNavSection.style.display = 'none';
        }
    }

    openInGoogleMaps() {
        if (!this.optimizedRoute) {
            alert('Nenhuma rota otimizada disponível');
            return;
        }

        try {
            const waypoints = this.optimizedRoute.roteiro || [];
            const origem = this.optimizedRoute.origem;
            const destino = this.optimizedRoute.destino;

            console.log('Dados da rota para Google Maps:', {
                waypoints,
                origem,
                destino
            });

            if (!origem || !destino) {
                alert('Dados de origem ou destino não disponíveis');
                return;
            }

            // Filtrar waypoints válidos
            const validWaypoints = waypoints.filter(city => 
                city && city !== 'ORIGEM' && city !== 'DESTINO' && city.trim() !== ''
            );

            // Construir URL do Google Maps - usar formato mais simples e confiável
            let googleMapsUrl;
            
            if (validWaypoints.length === 0) {
                // Apenas origem e destino
                googleMapsUrl = `https://www.google.com/maps/dir/${origem.lat},${origem.lng}/${destino.lat},${destino.lng}`;
            } else {
                // Com waypoints - tentar usar coordenadas se disponíveis, senão usar nomes
                const waypointCoords = [];
                const waypointNames = [];
                
                // Tentar obter coordenadas dos waypoints (se disponíveis no raw data)
                if (this.optimizedRoute.raw && this.optimizedRoute.raw.steps) {
                    this.optimizedRoute.raw.steps.forEach(step => {
                        if (step.type === 'job' && step.location) {
                            waypointCoords.push(`${step.location[1]},${step.location[0]}`);
                        }
                    });
                }
                
                // Se temos coordenadas, usar elas; senão usar nomes das cidades
                if (waypointCoords.length > 0) {
                    const waypoints = waypointCoords.slice(0, 8).join('|');
                    googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origem.lat},${origem.lng}&destination=${destino.lat},${destino.lng}&waypoints=${waypoints}`;
                } else {
                    // Fallback para nomes das cidades
                    const waypoints = validWaypoints.slice(0, 8).map(city => 
                        `${city}, Paraná, Brasil`
                    ).join('|');
                    
                    googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origem.lat},${origem.lng}&destination=${destino.lat},${destino.lng}&waypoints=${encodeURIComponent(waypoints)}`;
                }
            }

            console.log('URL do Google Maps gerada:', googleMapsUrl);

            // Validar URL antes de abrir
            try {
                new URL(googleMapsUrl);
                window.open(googleMapsUrl, '_blank');
            } catch (urlError) {
                console.error('URL inválida gerada:', urlError);
                // Fallback: abrir apenas com origem e destino
                const fallbackUrl = `https://www.google.com/maps/dir/${origem.lat},${origem.lng}/${destino.lat},${destino.lng}`;
                console.log('Usando URL de fallback:', fallbackUrl);
                window.open(fallbackUrl, '_blank');
            }
        } catch (error) {
            console.error('Erro ao abrir no Google Maps:', error);
            alert('Erro ao abrir no Google Maps: ' + error.message);
        }
    }


    async copyRouteLink() {
        if (!this.optimizedRoute) {
            alert('Nenhuma rota otimizada disponível');
            return;
        }

        try {
            const waypoints = this.optimizedRoute.roteiro || [];
            const origem = this.optimizedRoute.origem;
            const destino = this.optimizedRoute.destino;

            if (!origem || !destino) {
                alert('Dados de origem ou destino não disponíveis');
                return;
            }

            // Construir texto da rota
            let routeText = `🚛 ROTA OTIMIZADA\n\n`;
            routeText += `📍 Origem: ${origem.name}\n`;
            routeText += `🏁 Destino: ${destino.name}\n\n`;
            
            if (waypoints.length > 0) {
                routeText += `🛣️ Paradas:\n`;
                waypoints.forEach((city, index) => {
                    if (city !== 'ORIGEM' && city !== 'DESTINO') {
                        routeText += `${index + 1}. ${city}\n`;
                    }
                });
            }
            
            routeText += `\n📊 Distância: ${this.optimizedRoute.distancia_km ? this.optimizedRoute.distancia_km.toFixed(1) + ' km' : 'N/A'}\n`;
            routeText += `⏱️ Duração: ${this.optimizedRoute.duracao_min ? Math.round(this.optimizedRoute.duracao_min) + ' min' : 'N/A'}\n`;
            routeText += `\n🗓️ Gerado em: ${new Date().toLocaleString('pt-BR')}`;

            // Copiar para área de transferência
            await navigator.clipboard.writeText(routeText);
            
            // Mostrar feedback visual
            const copyBtn = document.getElementById('copy-route-link');
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
            copyBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.background = 'linear-gradient(135deg, #6c757d, #495057)';
            }, 2000);
            
        } catch (error) {
            console.error('Erro ao copiar rota:', error);
            alert('Erro ao copiar rota. Tente novamente.');
        }
    }

    testGoogleMapsUrl() {
        if (!this.optimizedRoute) {
            alert('Nenhuma rota otimizada disponível');
            return;
        }

        try {
            const waypoints = this.optimizedRoute.roteiro || [];
            const origem = this.optimizedRoute.origem;
            const destino = this.optimizedRoute.destino;

            console.log('=== TESTE DE URL DO GOOGLE MAPS ===');
            console.log('Dados da rota:', {
                waypoints,
                origem,
                destino,
                raw: this.optimizedRoute.raw
            });

            if (!origem || !destino) {
                alert('Dados de origem ou destino não disponíveis');
                return;
            }

            // Filtrar waypoints válidos
            const validWaypoints = waypoints.filter(city => 
                city && city !== 'ORIGEM' && city !== 'DESTINO' && city.trim() !== ''
            );

            console.log('Waypoints válidos:', validWaypoints);

            // Testar diferentes formatos de URL
            const testUrls = [];

            // Formato 1: Apenas origem e destino
            testUrls.push({
                name: 'Apenas origem e destino',
                url: `https://www.google.com/maps/dir/${origem.lat},${origem.lng}/${destino.lat},${destino.lng}`
            });

            // Formato 2: Com waypoints usando nomes
            if (validWaypoints.length > 0) {
                const waypoints = validWaypoints.slice(0, 8).map(city => 
                    `${city}, Paraná, Brasil`
                ).join('|');
                
                testUrls.push({
                    name: 'Com waypoints (nomes)',
                    url: `https://www.google.com/maps/dir/?api=1&origin=${origem.lat},${origem.lng}&destination=${destino.lat},${destino.lng}&waypoints=${encodeURIComponent(waypoints)}`
                });
            }

            // Formato 3: Com waypoints usando coordenadas (se disponíveis)
            if (this.optimizedRoute.raw && this.optimizedRoute.raw.steps) {
                const waypointCoords = [];
                this.optimizedRoute.raw.steps.forEach(step => {
                    if (step.type === 'job' && step.location) {
                        waypointCoords.push(`${step.location[1]},${step.location[0]}`);
                    }
                });

                if (waypointCoords.length > 0) {
                    const waypoints = waypointCoords.slice(0, 8).join('|');
                    testUrls.push({
                        name: 'Com waypoints (coordenadas)',
                        url: `https://www.google.com/maps/dir/?api=1&origin=${origem.lat},${origem.lng}&destination=${destino.lat},${destino.lng}&waypoints=${waypoints}`
                    });
                }
            }

            // Exibir URLs de teste
            console.log('URLs de teste geradas:');
            testUrls.forEach((test, index) => {
                console.log(`${index + 1}. ${test.name}:`);
                console.log(`   ${test.url}`);
            });

            // Mostrar no alerta
            const urlList = testUrls.map((test, index) => 
                `${index + 1}. ${test.name}\n   ${test.url}`
            ).join('\n\n');

            alert(`URLs de teste geradas:\n\n${urlList}\n\nVerifique o console para mais detalhes.`);

        } catch (error) {
            console.error('Erro no teste de URL:', error);
            alert('Erro no teste: ' + error.message);
        }
    }

    toggleMapVisibility() {
        this.mapVisible = !this.mapVisible;
        this.updateMapVisibility();
    }

    updateMapVisibility() {
        const mapContainer = document.getElementById('map-container');
        const toggleBtn = document.getElementById('toggle-map-mobile');
        const toggleText = toggleBtn.querySelector('.toggle-text');
        
        if (this.isMobile) {
            // No mobile, controlar visibilidade
            if (this.mapVisible) {
                mapContainer.classList.remove('hide-map');
                toggleText.textContent = 'Esconder Mapa';
                toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i> <span class="toggle-text">Esconder Mapa</span>';
                
                // Redimensionar mapa após mostrar
                setTimeout(() => {
                    if (this.map) {
                        this.map.invalidateSize();
                    }
                }, 300);
            } else {
                mapContainer.classList.add('hide-map');
                toggleText.textContent = 'Mostrar Mapa';
                toggleBtn.innerHTML = '<i class="fas fa-map"></i> <span class="toggle-text">Mostrar Mapa</span>';
            }
        } else {
            // No desktop, sempre mostrar o mapa
            mapContainer.classList.remove('hide-map');
            toggleBtn.style.display = 'none';
        }
    }

    // Mostrar mapa automaticamente quando rota estiver pronta no mobile
    showMapOnRouteReady() {
        if (this.isMobile && !this.mapVisible) {
            this.mapVisible = true;
            this.updateMapVisibility();
        }
    }
}

// Inicializar o gerenciador de rotas quando a página carregar
let routeManager;
document.addEventListener('DOMContentLoaded', () => {
    routeManager = new RouteManager();
});
