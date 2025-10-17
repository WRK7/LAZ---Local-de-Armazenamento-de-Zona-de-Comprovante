// Variáveis globais
let currentUser = null;
let currentScreen = 'login';
let chartInstances = {}; // Para armazenar instâncias dos gráficos

// Dados de exemplo para os gráficos
const monthlyData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [{
        label: 'Comprovantes',
        data: [12, 19, 15, 25, 22, 30, 28, 35, 32, 40, 38, 45],
        borderColor: '#00bfff',
        backgroundColor: 'rgba(0, 191, 255, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
    }]
};

const weeklyData = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [{
        label: 'Comprovantes',
        data: [5, 8, 6, 9, 7, 4, 3],
        backgroundColor: [
            'rgba(0, 191, 255, 0.8)',
            'rgba(0, 191, 255, 0.6)',
            'rgba(0, 191, 255, 0.8)',
            'rgba(0, 191, 255, 0.9)',
            'rgba(0, 191, 255, 0.7)',
            'rgba(0, 191, 255, 0.5)',
            'rgba(0, 191, 255, 0.4)'
        ],
        borderColor: '#00bfff',
        borderWidth: 1
    }]
};

// Dados para gráficos do Supervisor
const supervisorPerformanceData = {
    labels: ['João Silva', 'Maria Santos', 'Pedro Costa', 'Ana Lima', 'Carlos Souza'],
    datasets: [{
        label: 'Comprovantes',
        data: [89, 76, 68, 55, 42],
        backgroundColor: 'rgba(0, 191, 255, 0.8)',
        borderColor: '#00bfff',
        borderWidth: 1
    }]
};

const supervisorStatusData = {
    labels: ['Aprovados', 'Pendentes', 'Rejeitados'],
    datasets: [{
        data: [65, 25, 10],
        backgroundColor: [
            'rgba(0, 255, 0, 0.8)',
            'rgba(255, 255, 0, 0.8)',
            'rgba(255, 0, 0, 0.8)'
        ],
        borderColor: [
            '#00ff00',
            '#ffff00',
            '#ff0000'
        ],
        borderWidth: 1
    }]
};

// Dados para gráficos do Admin
const adminEvolutionData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [{
        label: 'Comprovantes',
        data: [120, 150, 180, 200, 220, 250, 280, 300, 320, 350, 380, 420],
        borderColor: '#00bfff',
        backgroundColor: 'rgba(0, 191, 255, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
    }, {
        label: 'Valor Total (R$ mil)',
        data: [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80],
        borderColor: '#ff6b6b',
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        yAxisID: 'y1'
    }]
};

const adminRegionData = {
    labels: ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'],
    datasets: [{
        data: [15, 25, 10, 35, 15],
        backgroundColor: [
            'rgba(0, 191, 255, 0.8)',
            'rgba(0, 255, 191, 0.8)',
            'rgba(191, 0, 255, 0.8)',
            'rgba(255, 191, 0, 0.8)',
            'rgba(255, 0, 191, 0.8)'
        ],
        borderColor: [
            '#00bfff',
            '#00ffbf',
            '#bf00ff',
            '#ffbf00',
            '#ff00bf'
        ],
        borderWidth: 2
    }]
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    initializeScrollIndicator();
    initializeModal();
    initializeSearch();
    initializeKeyboardShortcuts();
    initializeFavoritos();
});

function initializeApp() {
    // Configurar formulário de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Configurar data atual nos filtros
    const today = new Date().toISOString().split('T')[0];
    const dataInicial = document.getElementById('dataInicial');
    const dataFinal = document.getElementById('dataFinal');
    
    if (dataInicial) dataInicial.value = today;
    if (dataFinal) dataFinal.value = today;
}

// Função de login
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const userType = document.getElementById('userType').value;
    
    if (!username || !password || !userType) {
        showNotification('Por favor, preencha todos os campos', 'error');
        return;
    }
    
    // Simular validação de login
    if (validateLogin(username, password, userType)) {
        currentUser = { username, userType };
        showScreen('main');
        showNotification(`Bem-vindo, ${username}!`, 'success');
        
        // Configurar menu baseado no tipo de usuário
        configureUserMenu(userType);
        
        // Inicializar gráficos após login
        setTimeout(() => {
            initializeCharts();
        }, 500);
    } else {
        showNotification('Credenciais inválidas', 'error');
    }
}

// Configurar menu baseado no tipo de usuário
function configureUserMenu(userType) {
    const btnSupervisor = document.getElementById('btn-supervisor');
    const btnAdmin = document.getElementById('btn-admin');
    const btnComprovantes = document.getElementById('btn-comprovantes');
    
    // Esconder todos os botões específicos primeiro
    if (btnSupervisor) btnSupervisor.style.display = 'none';
    if (btnAdmin) btnAdmin.style.display = 'none';
    
    // Mostrar botões baseado no tipo de usuário
    switch(userType) {
        case 'supervisor':
            if (btnSupervisor) btnSupervisor.style.display = 'flex';
            break;
        case 'admin':
            if (btnAdmin) btnAdmin.style.display = 'flex';
            break;
        case 'conciliador':
            // Conciliador só vê dashboard e comprovantes
            break;
    }
}

// Validação de login (simulada)
function validateLogin(username, password, userType) {
    // Simular validação - em produção, isso seria uma chamada para API
    const validUsers = {
        'admin': { password: 'admin123', type: 'admin' },
        'supervisor': { password: 'super123', type: 'supervisor' },
        'conciliador': { password: 'conc123', type: 'conciliador' }
    };
    
    return validUsers[username] && validUsers[username].password === password;
}

// Navegação entre telas
function showScreen(screenName) {
    // Esconder todas as telas principais
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    // Mostrar tela selecionada
    if (screenName === 'main') {
        document.getElementById('mainScreen').classList.add('active');
        currentScreen = 'main';
    } else if (screenName === 'login') {
        document.getElementById('loginScreen').classList.add('active');
        currentScreen = 'login';
    } else {
        // Mostrar tela principal e navegar para sub-tela
        document.getElementById('mainScreen').classList.add('active');
        
        // Esconder todas as sub-telas
        const contentScreens = document.querySelectorAll('.content-screen');
        contentScreens.forEach(screen => screen.classList.remove('active'));
        
        // Mostrar sub-tela selecionada
        const targetScreen = document.getElementById(screenName);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
        
        // Atualizar menu ativo
        const menuBtns = document.querySelectorAll('.menu-btn');
        menuBtns.forEach(btn => btn.classList.remove('active'));
        
        const activeBtn = document.querySelector(`[onclick="showScreen('${screenName}')"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        currentScreen = screenName;
        
        // Reinicializar gráficos se necessário
        setTimeout(() => {
            if (screenName === 'dashboard' || screenName === 'supervisor-dashboard' || screenName === 'admin-dashboard') {
                initializeCharts();
            }
        }, 300);
    }
}

// Logout
function logout() {
    currentUser = null;
    showScreen('login');
    
    // Limpar formulário
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.reset();
    }
    
    showNotification('Logout realizado com sucesso', 'success');
}

// Destruir gráficos existentes
function destroyCharts() {
    Object.keys(chartInstances).forEach(key => {
        if (chartInstances[key]) {
            chartInstances[key].destroy();
            chartInstances[key] = null;
        }
    });
}

// Inicializar gráficos
function initializeCharts() {
    // Destruir gráficos existentes primeiro
    destroyCharts();
    
    // Aguardar um pouco para garantir que os elementos estão prontos
    setTimeout(() => {
        // Gráfico mensal (Dashboard principal)
        const monthlyCtx = document.getElementById('monthlyChart');
        if (monthlyCtx && monthlyCtx.offsetParent !== null) {
            chartInstances.monthlyChart = new Chart(monthlyCtx, {
                type: 'line',
                data: monthlyData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: {
                                color: '#ffffff'
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: '#ffffff'
                            },
                            grid: {
                                color: 'rgba(0, 191, 255, 0.2)'
                            }
                        },
                        y: {
                            ticks: {
                                color: '#ffffff'
                            },
                            grid: {
                                color: 'rgba(0, 191, 255, 0.2)'
                            }
                        }
                    }
                }
            });
        }
        
        // Gráfico semanal (Dashboard principal)
        const weeklyCtx = document.getElementById('weeklyChart');
        if (weeklyCtx && weeklyCtx.offsetParent !== null) {
            chartInstances.weeklyChart = new Chart(weeklyCtx, {
                type: 'bar',
                data: weeklyData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: {
                                color: '#ffffff'
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: '#ffffff'
                            },
                            grid: {
                                color: 'rgba(0, 191, 255, 0.2)'
                            }
                        },
                        y: {
                            ticks: {
                                color: '#ffffff'
                            },
                            grid: {
                                color: 'rgba(0, 191, 255, 0.2)'
                            }
                        }
                    }
                }
            });
        }
        
        // Gráficos do Supervisor
        initializeSupervisorCharts();
        
        // Gráficos do Admin
        initializeAdminCharts();
    }, 200);
}

// Inicializar gráficos do Supervisor
function initializeSupervisorCharts() {
    // Performance por Conciliador
    const supervisorChart1Ctx = document.getElementById('supervisorChart1');
    if (supervisorChart1Ctx && supervisorChart1Ctx.offsetParent !== null) {
        chartInstances.supervisorChart1 = new Chart(supervisorChart1Ctx, {
            type: 'bar',
            data: supervisorPerformanceData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#ffffff'
                        },
                        grid: {
                            color: 'rgba(0, 191, 255, 0.2)'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#ffffff'
                        },
                        grid: {
                            color: 'rgba(0, 191, 255, 0.2)'
                        }
                    }
                }
            }
        });
    }
    
    // Status dos Comprovantes
    const supervisorChart2Ctx = document.getElementById('supervisorChart2');
    if (supervisorChart2Ctx && supervisorChart2Ctx.offsetParent !== null) {
        chartInstances.supervisorChart2 = new Chart(supervisorChart2Ctx, {
            type: 'doughnut',
            data: supervisorStatusData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff'
                        }
                    }
                }
            }
        });
    }
}

// Inicializar gráficos do Admin
function initializeAdminCharts() {
    // Evolução Geral do Sistema
    const adminChart1Ctx = document.getElementById('adminChart1');
    if (adminChart1Ctx && adminChart1Ctx.offsetParent !== null) {
        chartInstances.adminChart1 = new Chart(adminChart1Ctx, {
            type: 'line',
            data: adminEvolutionData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#ffffff'
                        },
                        grid: {
                            color: 'rgba(0, 191, 255, 0.2)'
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        ticks: {
                            color: '#ffffff'
                        },
                        grid: {
                            color: 'rgba(0, 191, 255, 0.2)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        ticks: {
                            color: '#ffffff'
                        },
                        grid: {
                            drawOnChartArea: false,
                        }
                    }
                }
            }
        });
    }
    
    // Distribuição por Região
    const adminChart2Ctx = document.getElementById('adminChart2');
    if (adminChart2Ctx && adminChart2Ctx.offsetParent !== null) {
        chartInstances.adminChart2 = new Chart(adminChart2Ctx, {
            type: 'pie',
            data: adminRegionData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff'
                        }
                    }
                }
            }
        });
    }
}

// Aplicar filtros
function aplicarFiltros() {
    const dataInicial = document.getElementById('dataInicial').value;
    const dataFinal = document.getElementById('dataFinal').value;
    const valorMinimo = document.getElementById('valorMinimo').value;
    const valorMaximo = document.getElementById('valorMaximo').value;
    
    // Simular aplicação de filtros
    showNotification('Filtros aplicados com sucesso!', 'success');
    
    // Aqui você implementaria a lógica real de filtro
    console.log('Filtros aplicados:', {
        dataInicial,
        dataFinal,
        valorMinimo,
        valorMaximo
    });
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Adicionar estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(0, 255, 0, 0.1)' : type === 'error' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 191, 255, 0.1)'};
        border: 1px solid ${type === 'success' ? '#00ff00' : type === 'error' ? '#ff0000' : '#00bfff'};
        color: ${type === 'success' ? '#00ff00' : type === 'error' ? '#ff0000' : '#00bfff'};
        padding: 15px 20px;
        border-radius: 8px;
        backdrop-filter: blur(10px);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
    `;
    
    // Adicionar ao DOM
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Adicionar animação de saída
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
`;
document.head.appendChild(style);

// Funções para ações dos botões
function visualizarComprovante(id) {
    abrirModal(id);
}

function baixarComprovante(id) {
    showNotification(`Baixando comprovante ${id}`, 'success');
    // Implementar download
}

// Adicionar event listeners para botões de ação
document.addEventListener('click', function(e) {
    if (e.target.closest('.action-btn.view')) {
        const row = e.target.closest('tr');
        const id = row.querySelector('td:first-child').textContent;
        visualizarComprovante(id);
    }
    
    if (e.target.closest('.action-btn.download')) {
        const row = e.target.closest('tr');
        const id = row.querySelector('td:first-child').textContent;
        baixarComprovante(id);
    }
});

// Efeitos visuais adicionais
document.addEventListener('mousemove', function(e) {
    // Efeito de partículas no fundo (opcional)
    if (Math.random() < 0.1) {
        createParticle(e.clientX, e.clientY);
    }
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 2px;
        height: 2px;
        background: #00bfff;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        animation: particleFloat 2s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 2000);
}

// Adicionar animação de partículas
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) scale(0);
        }
    }
`;
document.head.appendChild(particleStyle);

// Funções para controles administrativos
function gerenciarUsuarios() {
    showNotification('Abrindo gerenciamento de usuários...', 'info');
    // Implementar modal ou página de gerenciamento de usuários
}

function relatorios() {
    showNotification('Gerando relatórios...', 'info');
    // Implementar geração de relatórios
}

function configuracoes() {
    showNotification('Abrindo configurações do sistema...', 'info');
    // Implementar página de configurações
}

function backup() {
    showNotification('Iniciando backup do sistema...', 'info');
    // Implementar funcionalidade de backup
}

// Inicializar indicador de scroll
function initializeScrollIndicator() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    
    if (scrollIndicator) {
        // Adicionar evento de clique para scroll suave
        scrollIndicator.addEventListener('click', function() {
            const dashboard = document.getElementById('dashboard');
            if (dashboard) {
                dashboard.scrollTo({
                    top: dashboard.scrollHeight,
                    behavior: 'smooth'
                });
            }
        });
        
        // Esconder indicador após scroll
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (window.scrollY > 200) {
                    scrollIndicator.style.opacity = '0';
                    scrollIndicator.style.transform = 'translateY(-50%) scale(0.8)';
                } else {
                    scrollIndicator.style.opacity = '1';
                    scrollIndicator.style.transform = 'translateY(-50%) scale(1)';
                }
            }, 100);
        });
    }
}

// Dados de exemplo para comprovantes
const comprovantesData = [
    {
        id: '#001',
        data: '15/12/2024',
        valor: 'R$ 2.500,00',
        status: 'Aprovado',
        categoria: 'Boleto Bancário',
        observacoes: 'Comprovante de pagamento referente ao mês de dezembro',
        favorito: false
    },
    {
        id: '#002',
        data: '12/12/2024',
        valor: 'R$ 1.200,00',
        status: 'Pendente',
        categoria: 'Transferência',
        observacoes: 'Transferência bancária para conta corrente',
        favorito: false
    },
    {
        id: '#003',
        data: '10/12/2024',
        valor: 'R$ 800,00',
        status: 'Aprovado',
        categoria: 'PIX',
        observacoes: 'Pagamento via PIX instantâneo',
        favorito: false
    }
];

// Array para armazenar favoritos
let favoritos = [];

// Inicializar Modal
function initializeModal() {
    // Fechar modal ao clicar fora
    const modal = document.getElementById('comprovanteModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                fecharModal();
            }
        });
    }
}

// Abrir modal de comprovante
function abrirModal(comprovanteId) {
    const modal = document.getElementById('comprovanteModal');
    const comprovante = comprovantesData.find(c => c.id === comprovanteId);
    
    if (modal && comprovante) {
        // Preencher dados do modal
        document.getElementById('modalId').textContent = comprovante.id;
        document.getElementById('modalData').textContent = comprovante.data;
        document.getElementById('modalValor').textContent = comprovante.valor;
        document.getElementById('modalCategoria').textContent = comprovante.categoria;
        document.getElementById('modalObservacoes').textContent = comprovante.observacoes;
        
        // Atualizar status
        const statusElement = document.getElementById('modalStatus');
        statusElement.textContent = comprovante.status;
        statusElement.className = `status ${comprovante.status.toLowerCase().replace(' ', '')}`;
        
        // Mostrar modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Fechar modal
function fecharModal() {
    const modal = document.getElementById('comprovanteModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Ações do modal
function aprovarComprovante() {
    showNotification('Comprovante aprovado com sucesso!', 'success');
    fecharModal();
}

function rejeitarComprovante() {
    showNotification('Comprovante rejeitado!', 'error');
    fecharModal();
}

function baixarComprovanteModal() {
    showNotification('Baixando comprovante...', 'info');
    fecharModal();
}

function zoomComprovante() {
    showNotification('Funcionalidade de zoom em desenvolvimento', 'info');
}

function rotacionarComprovante() {
    showNotification('Funcionalidade de rotação em desenvolvimento', 'info');
}

// Inicializar Sistema de Busca
function initializeSearch() {
    const searchInput = document.getElementById('globalSearch');
    const searchResults = document.getElementById('searchResults');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length > 0) {
                buscarComprovantes(query);
            } else {
                mostrarPlaceholderBusca();
            }
        });
    }
}

// Abrir busca global
function abrirBusca() {
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('globalSearch');
    
    if (searchOverlay) {
        searchOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focar no input após animação
        setTimeout(() => {
            if (searchInput) {
                searchInput.focus();
            }
        }, 300);
    }
}

// Fechar busca
function fecharBusca() {
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('globalSearch');
    
    if (searchOverlay) {
        searchOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Limpar busca
        if (searchInput) {
            searchInput.value = '';
        }
        mostrarPlaceholderBusca();
    }
}

// Limpar busca
function limparBusca() {
    const searchInput = document.getElementById('globalSearch');
    if (searchInput) {
        searchInput.value = '';
        mostrarPlaceholderBusca();
        searchInput.focus();
    }
}

// Buscar comprovantes
function buscarComprovantes(query) {
    const searchResults = document.getElementById('searchResults');
    const resultados = comprovantesData.filter(comprovante => 
        comprovante.id.toLowerCase().includes(query) ||
        comprovante.data.toLowerCase().includes(query) ||
        comprovante.valor.toLowerCase().includes(query) ||
        comprovante.status.toLowerCase().includes(query) ||
        comprovante.categoria.toLowerCase().includes(query)
    );
    
    if (resultados.length > 0) {
        mostrarResultadosBusca(resultados);
    } else {
        mostrarNenhumResultado();
    }
}

// Mostrar resultados da busca
function mostrarResultadosBusca(resultados) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';
    
    resultados.forEach(comprovante => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
            <h4>${comprovante.id} - ${comprovante.categoria}</h4>
            <p>Data: ${comprovante.data} | Valor: ${comprovante.valor} | Status: ${comprovante.status}</p>
        `;
        resultItem.addEventListener('click', () => {
            abrirModal(comprovante.id);
            fecharBusca();
        });
        searchResults.appendChild(resultItem);
    });
}

// Mostrar placeholder da busca
function mostrarPlaceholderBusca() {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = `
        <div class="search-placeholder">
            <i class="fas fa-search"></i>
            <p>Digite algo para começar a buscar</p>
        </div>
    `;
}

// Mostrar nenhum resultado
function mostrarNenhumResultado() {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = `
        <div class="search-placeholder">
            <i class="fas fa-search-minus"></i>
            <p>Nenhum comprovante encontrado</p>
        </div>
    `;
}

// Inicializar atalhos de teclado
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl + F para abrir busca
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            abrirBusca();
        }
        
        // Esc para fechar modais
        if (e.key === 'Escape') {
            fecharModal();
            fecharBusca();
        }
    });
}

// Sistema de Favoritos
function toggleFavorito(comprovanteId) {
    const comprovante = comprovantesData.find(c => c.id === comprovanteId);
    if (!comprovante) return;
    
    comprovante.favorito = !comprovante.favorito;
    
    if (comprovante.favorito) {
        if (!favoritos.find(f => f.id === comprovanteId)) {
            favoritos.push(comprovante);
        }
        showNotification('Comprovante adicionado aos favoritos!', 'success');
    } else {
        favoritos = favoritos.filter(f => f.id !== comprovanteId);
        showNotification('Comprovante removido dos favoritos!', 'info');
    }
    
    // Atualizar página de favoritos se estiver aberta
    if (currentScreen === 'favoritos') {
        atualizarPaginaFavoritos();
    }
    
    // Salvar no localStorage
    salvarFavoritos();
}

function atualizarPaginaFavoritos() {
    const totalFavoritos = document.getElementById('totalFavoritos');
    const valorFavoritos = document.getElementById('valorFavoritos');
    const favoritosList = document.getElementById('favoritosList');
    
    if (totalFavoritos) {
        totalFavoritos.textContent = favoritos.length;
    }
    
    if (valorFavoritos) {
        const valorTotal = favoritos.reduce((total, fav) => {
            const valor = parseFloat(fav.valor.replace('R$ ', '').replace(',', '.'));
            return total + valor;
        }, 0);
        valorFavoritos.textContent = `R$ ${valorTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    }
    
    if (favoritosList) {
        if (favoritos.length === 0) {
            favoritosList.innerHTML = `
                <div class="empty-favorites">
                    <i class="fas fa-star"></i>
                    <h3>Nenhum favorito ainda</h3>
                    <p>Marque comprovantes como favoritos para vê-los aqui</p>
                </div>
            `;
        } else {
            favoritosList.innerHTML = '';
            favoritos.forEach(comprovante => {
                const favoriteItem = document.createElement('div');
                favoriteItem.className = 'favorite-item';
                favoriteItem.innerHTML = `
                    <div class="favorite-info">
                        <h4>${comprovante.id} - ${comprovante.categoria}</h4>
                        <p>Data: ${comprovante.data} | Valor: ${comprovante.valor} | Status: ${comprovante.status}</p>
                    </div>
                    <div class="favorite-actions">
                        <button onclick="abrirModal('${comprovante.id}')" title="Visualizar">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="baixarComprovante('${comprovante.id}')" title="Baixar">
                            <i class="fas fa-download"></i>
                        </button>
                        <button class="remove-favorite" onclick="toggleFavorito('${comprovante.id}')" title="Remover dos Favoritos">
                            <i class="fas fa-star"></i>
                        </button>
                    </div>
                `;
                favoritosList.appendChild(favoriteItem);
            });
        }
    }
}

function salvarFavoritos() {
    localStorage.setItem('laz_favoritos', JSON.stringify(favoritos));
}

function carregarFavoritos() {
    const saved = localStorage.getItem('laz_favoritos');
    if (saved) {
        favoritos = JSON.parse(saved);
        // Atualizar dados originais
        favoritos.forEach(fav => {
            const comprovante = comprovantesData.find(c => c.id === fav.id);
            if (comprovante) {
                comprovante.favorito = true;
            }
        });
    }
}

// Inicializar favoritos
function initializeFavoritos() {
    carregarFavoritos();
    
    // Atualizar página de favoritos quando navegar para ela
    const originalShowScreen = showScreen;
    showScreen = function(screenName) {
        originalShowScreen(screenName);
        if (screenName === 'favoritos') {
            atualizarPaginaFavoritos();
        }
    };
}
