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

// Dados Financeiros simulados
const financeCategoryData = {
    labels: ['PIX', 'Boleto', 'Transferência', 'Cartão'],
    datasets: [{
        data: [42000, 25500, 18000, 9500],
        backgroundColor: [
            'rgba(46, 213, 115, 0.8)',
            'rgba(0, 191, 255, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(255, 99, 132, 0.8)'
        ],
        borderColor: [
            '#2ed573', '#00bfff', '#ffce56', '#ff6384'
        ],
        borderWidth: 2
    }]
};

const financeDailyData = {
    labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
    datasets: [{
        label: 'Receita (R$)',
        data: Array.from({ length: 30 }, () => Math.floor(200 + Math.random() * 900)),
        borderColor: '#00bfff',
        backgroundColor: 'rgba(0, 191, 255, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
    }]
};

// Dados de Qualidade simulados
const qualityApprovalData = {
    labels: ['Aprovados', 'Rejeitados'],
    datasets: [{
        data: [78, 22],
        backgroundColor: ['rgba(0, 255, 0, 0.8)', 'rgba(255, 0, 0, 0.8)'],
        borderColor: ['#00ff00', '#ff0000'],
        borderWidth: 2
    }]
};

const qualityTMAWeeklyData = {
    labels: ['Sem1', 'Sem2', 'Sem3', 'Sem4'],
    datasets: [{
        label: 'TMA (minutos)',
        data: [18, 22, 17, 15],
        borderColor: '#ffce56',
        backgroundColor: 'rgba(255, 206, 86, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
    }]
};

// Novos datasets para gráficos extras
const trendData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [{
        label: 'Crescimento (%)',
        data: [5, 8, 12, 15, 18, 22, 25, 28, 30, 32, 35, 38],
        borderColor: '#2ed573',
        backgroundColor: 'rgba(46, 213, 115, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
    }]
};

const hourlyData = {
    labels: ['00h', '02h', '04h', '06h', '08h', '10h', '12h', '14h', '16h', '18h', '20h', '22h'],
    datasets: [{
        label: 'Atividade',
        data: [2, 1, 0, 1, 8, 15, 25, 30, 28, 20, 12, 5],
        backgroundColor: 'rgba(0, 191, 255, 0.8)',
        borderColor: '#00bfff',
        borderWidth: 1
    }]
};

const supervisorEfficiencyData = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [{
        label: 'Eficiência (%)',
        data: [85, 92, 88, 95, 90, 75, 60],
        borderColor: '#ff6b6b',
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
    }]
};

const supervisorMonthlyComparisonData = {
    labels: ['Mês Anterior', 'Mês Atual'],
    datasets: [{
        label: 'Comprovantes',
        data: [120, 145],
        backgroundColor: ['rgba(0, 191, 255, 0.8)', 'rgba(46, 213, 115, 0.8)'],
        borderColor: ['#00bfff', '#2ed573'],
        borderWidth: 1
    }]
};

const adminGeographicData = {
    labels: ['SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'GO'],
    datasets: [{
        label: 'Comprovantes',
        data: [450, 320, 280, 180, 150, 120, 95, 80],
        backgroundColor: 'rgba(0, 191, 255, 0.8)',
        borderColor: '#00bfff',
        borderWidth: 1
    }]
};

const adminSeasonalityData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
        label: 'Comprovantes',
        data: [280, 320, 350, 380],
        borderColor: '#ffce56',
        backgroundColor: 'rgba(255, 206, 86, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
    }]
};

const financeQuarterlyData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
        label: 'Receita (R$ mil)',
        data: [85, 95, 110, 125],
        borderColor: '#2ed573',
        backgroundColor: 'rgba(46, 213, 115, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
    }]
};

const financeProjectionData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [{
        label: 'Real',
        data: [25, 28, 32, 35, null, null],
        borderColor: '#00bfff',
        backgroundColor: 'rgba(0, 191, 255, 0.1)',
        borderWidth: 2,
        fill: false
    }, {
        label: 'Projeção',
        data: [null, null, null, 35, 38, 42],
        borderColor: '#ff6b6b',
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        borderWidth: 2,
        borderDash: [5, 5],
        fill: false
    }]
};

const qualityErrorByCategoryData = {
    labels: ['PIX', 'Boleto', 'Transferência', 'Cartão'],
    datasets: [{
        label: 'Taxa de Erro (%)',
        data: [2, 5, 3, 8],
        backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(255, 206, 86, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 159, 64, 0.8)'],
        borderColor: ['#ff6384', '#ffce56', '#36a2eb', '#ff9f40'],
        borderWidth: 2
    }]
};

const qualityEvolutionData = {
    labels: ['Sem1', 'Sem2', 'Sem3', 'Sem4'],
    datasets: [{
        label: 'Taxa de Aprovação (%)',
        data: [75, 78, 82, 85],
        borderColor: '#2ed573',
        backgroundColor: 'rgba(46, 213, 115, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
    }]
};

// Dados de Performance
const performanceHourlyData = {
    labels: ['00h', '02h', '04h', '06h', '08h', '10h', '12h', '14h', '16h', '18h', '20h', '22h'],
    datasets: [{
        label: 'Performance (ops/min)',
        data: [5, 3, 2, 4, 12, 18, 25, 28, 30, 22, 15, 8],
        borderColor: '#ff6b6b',
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
    }]
};

const performanceMetricsData = {
    labels: ['Velocidade', 'Precisão', 'Eficiência', 'Disponibilidade'],
    datasets: [{
        label: 'Score (%)',
        data: [85, 92, 88, 95],
        backgroundColor: ['rgba(46, 213, 115, 0.8)', 'rgba(0, 191, 255, 0.8)', 'rgba(255, 206, 86, 0.8)', 'rgba(255, 99, 132, 0.8)'],
        borderColor: ['#2ed573', '#00bfff', '#ffce56', '#ff6384'],
        borderWidth: 2
    }]
};

const performanceHeatmapData = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
    datasets: [{
        label: 'Atividade',
        data: [85, 92, 88, 95, 90],
        backgroundColor: ['rgba(46, 213, 115, 0.8)', 'rgba(0, 191, 255, 0.8)', 'rgba(255, 206, 86, 0.8)', 'rgba(255, 99, 132, 0.8)', 'rgba(46, 213, 115, 0.8)'],
        borderColor: ['#2ed573', '#00bfff', '#ffce56', '#ff6384', '#2ed573'],
        borderWidth: 2
    }]
};

const performanceTrendData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [{
        label: 'Performance Index',
        data: [75, 78, 82, 85, 88, 92],
        borderColor: '#2ed573',
        backgroundColor: 'rgba(46, 213, 115, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
    }]
};

// Novos datasets para gráficos sugeridos
const valueDistributionData = {
    labels: ['R$ 0-100', 'R$ 100-500', 'R$ 500-1000', 'R$ 1000-2000', 'R$ 2000+'],
    datasets: [{
        label: 'Quantidade de Comprovantes',
        data: [45, 78, 52, 28, 15],
        backgroundColor: [
            'rgba(0, 191, 255, 0.8)',
            'rgba(46, 213, 115, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(153, 102, 255, 0.8)'
        ],
        borderColor: [
            '#00bfff',
            '#2ed573',
            '#ffce56',
            '#ff6384',
            '#9966ff'
        ],
        borderWidth: 2
    }]
};

const paymentMethodComparisonData = {
    labels: ['PIX', 'Boleto', 'Transferência', 'Cartão', 'Dinheiro'],
    datasets: [{
        label: 'Volume (R$)',
        data: [45000, 32000, 18000, 12000, 5000],
        backgroundColor: [
            'rgba(46, 213, 115, 0.8)',
            'rgba(0, 191, 255, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(153, 102, 255, 0.8)'
        ],
        borderColor: [
            '#2ed573',
            '#00bfff',
            '#ffce56',
            '#ff6384',
            '#9966ff'
        ],
        borderWidth: 2
    }]
};

const userActivityHeatmapData = {
    labels: ['00h', '02h', '04h', '06h', '08h', '10h', '12h', '14h', '16h', '18h', '20h', '22h'],
    datasets: [{
        label: 'Segunda',
        data: [2, 1, 0, 1, 8, 15, 25, 30, 28, 20, 12, 5],
        backgroundColor: 'rgba(0, 191, 255, 0.6)',
        borderColor: '#00bfff',
        borderWidth: 1
    }, {
        label: 'Terça',
        data: [1, 0, 0, 2, 10, 18, 28, 32, 30, 22, 15, 7],
        backgroundColor: 'rgba(46, 213, 115, 0.6)',
        borderColor: '#2ed573',
        borderWidth: 1
    }, {
        label: 'Quarta',
        data: [3, 2, 1, 1, 9, 16, 26, 29, 27, 19, 13, 6],
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: '#ffce56',
        borderWidth: 1
    }, {
        label: 'Quinta',
        data: [2, 1, 0, 2, 11, 19, 29, 33, 31, 23, 16, 8],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: '#ff6384',
        borderWidth: 1
    }, {
        label: 'Sexta',
        data: [1, 0, 0, 1, 7, 14, 24, 28, 26, 18, 11, 4],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: '#9966ff',
        borderWidth: 1
    }]
};

const processingSpeedData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [{
        label: 'Tempo Médio (min)',
        data: [18, 16, 14, 12, 10, 8],
        borderColor: '#ff6b6b',
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
    }, {
        label: 'Meta (min)',
        data: [15, 15, 15, 15, 15, 15],
        borderColor: '#2ed573',
        backgroundColor: 'rgba(46, 213, 115, 0.1)',
        borderWidth: 2,
        borderDash: [5, 5],
        fill: false
    }]
};

const errorRateByUserData = {
    labels: ['João Silva', 'Maria Santos', 'Pedro Costa', 'Ana Lima', 'Carlos Souza', 'Lucia Oliveira'],
    datasets: [{
        label: 'Taxa de Erro (%)',
        data: [2, 1, 3, 1, 4, 2],
        backgroundColor: [
            'rgba(46, 213, 115, 0.8)',
            'rgba(46, 213, 115, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(46, 213, 115, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(46, 213, 115, 0.8)'
        ],
        borderColor: [
            '#2ed573',
            '#2ed573',
            '#ffce56',
            '#2ed573',
            '#ff6384',
            '#2ed573'
        ],
        borderWidth: 2
    }]
};

const cashFlowData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [{
        label: 'Entradas (R$ mil)',
        data: [85, 95, 110, 125, 140, 155],
        borderColor: '#2ed573',
        backgroundColor: 'rgba(46, 213, 115, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
    }, {
        label: 'Saídas (R$ mil)',
        data: [70, 75, 80, 85, 90, 95],
        borderColor: '#ff6b6b',
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
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
    // Render inicial do ranking de conciliadores
    atualizarRankingConciliadores();
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
    const btnFinance = document.getElementById('btn-finance');
    
    // Esconder todos os botões específicos primeiro
    if (btnSupervisor) btnSupervisor.style.display = 'none';
    if (btnAdmin) btnAdmin.style.display = 'none';
    if (btnFinance) btnFinance.style.display = 'none';
    
    // Mostrar botões baseado no tipo de usuário
    switch(userType) {
        case 'supervisor':
            if (btnSupervisor) btnSupervisor.style.display = 'flex';
            break;
        case 'admin':
            if (btnAdmin) btnAdmin.style.display = 'flex';
            if (btnFinance) btnFinance.style.display = 'flex';
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
        
        // Atualizar menu ativo (preferir data-screen)
        const menuBtns = document.querySelectorAll('.menu-btn');
        menuBtns.forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`.menu-btn[data-screen="${screenName}"]`) || document.querySelector(`[onclick="showScreen('${screenName}')"]`);
        if (activeBtn) activeBtn.classList.add('active');
        
        currentScreen = screenName;
        
        // Reinicializar gráficos se necessário
        setTimeout(() => {
            if (screenName === 'dashboard' || screenName === 'supervisor-dashboard' || screenName === 'admin-dashboard') {
                initializeCharts();
            }
            if (screenName === 'dashboard') {
                atualizarRankingConciliadores();
            }
            if (screenName === 'supervisor-dashboard') {
                atualizarRankingConciliadores();
            }
            if (screenName === 'comprovantes') {
                renderComprovantesTable(comprovantesData);
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
        
        // Gráfico de tendência (Dashboard principal)
        const trendCtx = document.getElementById('trendChart');
        if (trendCtx && trendCtx.offsetParent !== null) {
            chartInstances.trendChart = new Chart(trendCtx, {
                type: 'line',
                data: trendData,
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
        
        // Gráfico por horário (Dashboard principal)
        const hourlyCtx = document.getElementById('hourlyChart');
        if (hourlyCtx && hourlyCtx.offsetParent !== null) {
            chartInstances.hourlyChart = new Chart(hourlyCtx, {
                type: 'bar',
                data: hourlyData,
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

        // Gráficos Financeiros
        initializeFinanceCharts();
        
        // Gráficos de Performance
        initializePerformanceCharts();
        
        // Novos gráficos sugeridos (apenas os mantidos)
        initializeNewCharts();
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
    
    // Comparação Mensal
    const supervisorChart4Ctx = document.getElementById('supervisorChart4');
    if (supervisorChart4Ctx && supervisorChart4Ctx.offsetParent !== null) {
        chartInstances.supervisorChart4 = new Chart(supervisorChart4Ctx, {
            type: 'bar',
            data: supervisorMonthlyComparisonData,
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

// Inicializar gráficos Financeiro
function initializeFinanceCharts() {
    const financeChart1Ctx = document.getElementById('financeChart1');
    if (financeChart1Ctx && financeChart1Ctx.offsetParent !== null) {
        chartInstances.financeChart1 = new Chart(financeChart1Ctx, {
            type: 'doughnut',
            data: financeCategoryData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#ffffff' } } }
            }
        });
    }
    const financeChart2Ctx = document.getElementById('financeChart2');
    if (financeChart2Ctx && financeChart2Ctx.offsetParent !== null) {
        chartInstances.financeChart2 = new Chart(financeChart2Ctx, {
            type: 'line',
            data: financeDailyData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#ffffff' } } },
                scales: {
                    x: { ticks: { color: '#ffffff' }, grid: { color: 'rgba(0,191,255,0.2)' } },
                    y: { ticks: { color: '#ffffff' }, grid: { color: 'rgba(0,191,255,0.2)' } }
                }
            }
        });
    }
    
    // Gráfico de Comparação Trimestral
    const financeChart3Ctx = document.getElementById('financeChart3');
    if (financeChart3Ctx && financeChart3Ctx.offsetParent !== null) {
        chartInstances.financeChart3 = new Chart(financeChart3Ctx, {
            type: 'bar',
            data: financeQuarterlyData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#ffffff' } } },
                scales: {
                    x: { ticks: { color: '#ffffff' }, grid: { color: 'rgba(0,191,255,0.2)' } },
                    y: { ticks: { color: '#ffffff' }, grid: { color: 'rgba(0,191,255,0.2)' } }
                }
            }
        });
    }
    
    // Gráfico de Projeção
    const financeChart4Ctx = document.getElementById('financeChart4');
    if (financeChart4Ctx && financeChart4Ctx.offsetParent !== null) {
        chartInstances.financeChart4 = new Chart(financeChart4Ctx, {
            type: 'line',
            data: financeProjectionData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#ffffff' } } },
                scales: {
                    x: { ticks: { color: '#ffffff' }, grid: { color: 'rgba(0,191,255,0.2)' } },
                    y: { ticks: { color: '#ffffff' }, grid: { color: 'rgba(0,191,255,0.2)' } }
                }
            }
        });
    }
    
    // KPIs simulados (exemplo)
    const receitaMes = financeDailyData.datasets[0].data.reduce((a, b) => a + b, 0);
    const ticketMedio = receitaMes / Math.max(1, financeDailyData.datasets[0].data.length);
    const crescimento = 12; // placeholder
    const kpiReceita = document.getElementById('kpiReceitaMes');
    const kpiTicket = document.getElementById('kpiTicketMedio');
    const kpiCresc = document.getElementById('kpiCrescimento');
    const kpiCats = document.getElementById('kpiCategorias');
    if (kpiReceita) kpiReceita.textContent = `R$ ${receitaMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (kpiTicket) kpiTicket.textContent = `R$ ${ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (kpiCresc) kpiCresc.textContent = `${crescimento}%`;
    if (kpiCats) kpiCats.textContent = financeCategoryData.labels.length;
}

// Inicializar gráficos de Performance
function initializePerformanceCharts() {
    const performanceChart1Ctx = document.getElementById('performanceChart1');
    if (performanceChart1Ctx && performanceChart1Ctx.offsetParent !== null) {
        chartInstances.performanceChart1 = new Chart(performanceChart1Ctx, {
            type: 'line',
            data: performanceHourlyData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#ffffff' } } },
                scales: {
                    x: { ticks: { color: '#ffffff' }, grid: { color: 'rgba(0,191,255,0.2)' } },
                    y: { ticks: { color: '#ffffff' }, grid: { color: 'rgba(0,191,255,0.2)' } }
                }
            }
        });
    }
    
    const performanceChart2Ctx = document.getElementById('performanceChart2');
    if (performanceChart2Ctx && performanceChart2Ctx.offsetParent !== null) {
        chartInstances.performanceChart2 = new Chart(performanceChart2Ctx, {
            type: 'radar',
            data: performanceMetricsData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#ffffff' } } },
                scales: {
                    r: { ticks: { color: '#ffffff' }, grid: { color: 'rgba(0,191,255,0.2)' } }
                }
            }
        });
    }
    
    const performanceChart3Ctx = document.getElementById('performanceChart3');
    if (performanceChart3Ctx && performanceChart3Ctx.offsetParent !== null) {
        chartInstances.performanceChart3 = new Chart(performanceChart3Ctx, {
            type: 'bar',
            data: performanceHeatmapData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#ffffff' } } },
                scales: {
                    x: { ticks: { color: '#ffffff' }, grid: { color: 'rgba(0,191,255,0.2)' } },
                    y: { ticks: { color: '#ffffff' }, grid: { color: 'rgba(0,191,255,0.2)' } }
                }
            }
        });
    }
    
    const performanceChart4Ctx = document.getElementById('performanceChart4');
    if (performanceChart4Ctx && performanceChart4Ctx.offsetParent !== null) {
        chartInstances.performanceChart4 = new Chart(performanceChart4Ctx, {
            type: 'line',
            data: performanceTrendData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#ffffff' } } },
                scales: {
                    x: { ticks: { color: '#ffffff' }, grid: { color: 'rgba(0,191,255,0.2)' } },
                    y: { ticks: { color: '#ffffff' }, grid: { color: 'rgba(0,191,255,0.2)' } }
                }
            }
        });
    }
    
    // Atualizar KPIs de Performance
    const kpiVelocidade = document.getElementById('kpiVelocidade');
    const kpiProdutividade = document.getElementById('kpiProdutividade');
    const kpiResposta = document.getElementById('kpiResposta');
    const kpiUsuariosAtivos = document.getElementById('kpiUsuariosAtivos');
    
    if (kpiVelocidade) kpiVelocidade.textContent = '125/min';
    if (kpiProdutividade) kpiProdutividade.textContent = '92%';
    if (kpiResposta) kpiResposta.textContent = '1.2s';
    if (kpiUsuariosAtivos) kpiUsuariosAtivos.textContent = '47';
}


// Inicializar novos gráficos sugeridos (apenas os mantidos)
function initializeNewCharts() {
    // Gráfico de Distribuição de Valores
    const valueDistributionCtx = document.getElementById('valueDistributionChart');
    if (valueDistributionCtx && valueDistributionCtx.offsetParent !== null) {
        chartInstances.valueDistributionChart = new Chart(valueDistributionCtx, {
            type: 'bar',
            data: valueDistributionData,
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
}

// Aplicar filtros
function aplicarFiltros() {
    const dataInicial = document.getElementById('dataInicial').value;
    const dataFinal = document.getElementById('dataFinal').value;
    const valorMinimo = document.getElementById('valorMinimo').value;
    const valorMaximo = document.getElementById('valorMaximo').value;
    
    // Normalizações
    const parseISODate = (iso) => iso ? new Date(iso + 'T00:00:00') : null; // yyyy-mm-dd
    const parseDisplayDate = (ddmmyyyy) => {
        if (!ddmmyyyy) return null;
        const [d, m, y] = ddmmyyyy.split('/').map(Number);
        return new Date(y, m - 1, d);
    };
    const parseBRLNumberInput = (value) => {
        if (!value) return null;
        // aceita 1000,50 | 1000.50 | 1000
        const normalized = value
            .toString()
            .replace(/\./g, '')
            .replace(/,/g, '.');
        const n = parseFloat(normalized);
        return Number.isFinite(n) ? n : null;
    };
    const parseBRLText = (text) => {
        if (!text) return 0;
        return parseFloat(
            text.replace(/R\$\s?/g, '').replace(/\./g, '').replace(',', '.')
        ) || 0;
    };
    
    const dtIni = parseISODate(dataInicial);
    const dtFim = parseISODate(dataFinal);
    const vMin = parseBRLNumberInput(valorMinimo);
    const vMax = parseBRLNumberInput(valorMaximo);
    
    const filtrados = comprovantesData.filter((c) => {
        // Data
        const d = parseDisplayDate(c.data);
        if (dtIni && d < dtIni) return false;
        if (dtFim && d > dtFim) return false;
        // Valor
        const v = parseBRLText(c.valor);
        if (vMin != null && v < vMin) return false;
        if (vMax != null && v > vMax) return false;
        return true;
    });
    
    renderComprovantesTable(filtrados);
    showNotification('Filtros aplicados com sucesso!', 'success');
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

// Renderização da tabela de comprovantes
function renderComprovantesTable(lista) {
    const tbody = document.querySelector('#comprovantes .comprovantes-table tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    (lista && lista.length ? lista : comprovantesData).forEach((c) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${c.id}</td>
            <td>${c.data}</td>
            <td>${c.valor}</td>
            <td><span class="status ${c.status.toLowerCase().replace(' ', '')}">${c.status}</span></td>
            <td>
                <button class="action-btn view" title="Visualizar">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn download" title="Baixar">
                    <i class="fas fa-download"></i>
                </button>
                <button class="action-btn favorite" onclick="toggleFavorito('${c.id}')" title="Adicionar aos Favoritos">
                    <i class="fas fa-star"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
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

// Funções para controles administrativos (implementadas mais abaixo)

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
    },
    {
        id: '#004',
        data: '08/12/2024',
        valor: 'R$ 3.200,00',
        status: 'Aprovado',
        categoria: 'Boleto Bancário',
        observacoes: 'Pagamento de honorários advocatícios',
        favorito: false
    },
    {
        id: '#005',
        data: '05/12/2024',
        valor: 'R$ 450,00',
        status: 'Aprovado',
        categoria: 'PIX',
        observacoes: 'Recibo de serviços prestados',
        favorito: false
    },
    {
        id: '#006',
        data: '03/12/2024',
        valor: 'R$ 1.800,00',
        status: 'Aprovado',
        categoria: 'Transferência',
        observacoes: 'Pagamento para fornecedores',
        favorito: false
    },
    {
        id: '#007',
        data: '01/12/2024',
        valor: 'R$ 950,00',
        status: 'Pendente',
        categoria: 'PIX',
        observacoes: 'Comprovante de depósito bancário',
        favorito: false
    },
    {
        id: '#008',
        data: '28/11/2024',
        valor: 'R$ 2.100,00',
        status: 'Aprovado',
        categoria: 'Boleto Bancário',
        observacoes: 'Recibo de aluguel',
        favorito: false
    },
    {
        id: '#009',
        data: '25/11/2024',
        valor: 'R$ 1.350,00',
        status: 'Aprovado',
        categoria: 'Transferência',
        observacoes: 'Pagamento de salário funcionários',
        favorito: false
    },
    {
        id: '#010',
        data: '22/11/2024',
        valor: 'R$ 680,00',
        status: 'Rejeitado',
        categoria: 'PIX',
        observacoes: 'Comprovante rejeitado por inconsistência',
        favorito: false
    },
    {
        id: '#011',
        data: '20/11/2024',
        valor: 'R$ 1.950,00',
        status: 'Aprovado',
        categoria: 'Boleto Bancário',
        observacoes: 'Pagamento de impostos',
        favorito: false
    },
    {
        id: '#012',
        data: '18/11/2024',
        valor: 'R$ 550,00',
        status: 'Aprovado',
        categoria: 'PIX',
        observacoes: 'Recibo de despesas operacionais',
        favorito: false
    },
    {
        id: '#013',
        data: '15/11/2024',
        valor: 'R$ 3.500,00',
        status: 'Aprovado',
        categoria: 'Transferência',
        observacoes: 'Pagamento para terceiros',
        favorito: false
    },
    {
        id: '#014',
        data: '12/11/2024',
        valor: 'R$ 750,00',
        status: 'Pendente',
        categoria: 'PIX',
        observacoes: 'Comprovante de reembolso',
        favorito: false
    },
    {
        id: '#015',
        data: '10/11/2024',
        valor: 'R$ 2.800,00',
        status: 'Aprovado',
        categoria: 'Boleto Bancário',
        observacoes: 'Recibo de consultoria',
        favorito: false
    }
];

// Array para armazenar favoritos
let favoritos = [];

// Dados de conciliadores para ranking
const conciliadoresData = [
    { id: 1, nome: 'João Silva', email: 'joao.silva@email.com', usuario: 'joao.silva', telefone: '(11) 98765-4321', status: 'ativo', comprovantes: 89, valorTotal: 45230.50, mediaValor: 508.55 },
    { id: 2, nome: 'Maria Santos', email: 'maria.santos@email.com', usuario: 'maria.santos', telefone: '(11) 98765-4322', status: 'ativo', comprovantes: 76, valorTotal: 38120.00, mediaValor: 501.58 },
    { id: 3, nome: 'Pedro Costa', email: 'pedro.costa@email.com', usuario: 'pedro.costa', telefone: '(11) 98765-4323', status: 'ativo', comprovantes: 68, valorTotal: 32450.75, mediaValor: 477.22 },
    { id: 4, nome: 'Ana Lima', email: 'ana.lima@email.com', usuario: 'ana.lima', telefone: '(11) 98765-4324', status: 'ativo', comprovantes: 62, valorTotal: 28560.00, mediaValor: 460.65 },
    { id: 5, nome: 'Carlos Souza', email: 'carlos.souza@email.com', usuario: 'carlos.souza', telefone: '(11) 98765-4325', status: 'ativo', comprovantes: 55, valorTotal: 26580.50, mediaValor: 483.28 },
    { id: 6, nome: 'Lucia Oliveira', email: 'lucia.oliveira@email.com', usuario: 'lucia.oliveira', telefone: '(11) 98765-4326', status: 'ativo', comprovantes: 51, valorTotal: 23450.75, mediaValor: 459.82 },
    { id: 7, nome: 'Roberto Alves', email: 'roberto.alves@email.com', usuario: 'roberto.alves', telefone: '(11) 98765-4327', status: 'ativo', comprovantes: 48, valorTotal: 22180.00, mediaValor: 462.08 },
    { id: 8, nome: 'Fernanda Costa', email: 'fernanda.costa@email.com', usuario: 'fernanda.costa', telefone: '(11) 98765-4328', status: 'ativo', comprovantes: 45, valorTotal: 20890.50, mediaValor: 464.23 },
    { id: 9, nome: 'Paulo Santos', email: 'paulo.santos@email.com', usuario: 'paulo.santos', telefone: '(11) 98765-4329', status: 'ativo', comprovantes: 42, valorTotal: 19560.25, mediaValor: 465.72 },
    { id: 10, nome: 'Juliana Ferreira', email: 'juliana.ferreira@email.com', usuario: 'juliana.ferreira', telefone: '(11) 98765-4330', status: 'ativo', comprovantes: 38, valorTotal: 18230.50, mediaValor: 479.75 }
];

// Dados de supervisores para gerenciamento
const supervisoresData = [
    { id: 1, nome: 'Maria Santos', email: 'maria.santos@portes.com', usuario: 'maria.santos', telefone: '(11) 98765-4322', status: 'ativo', conciliadoresGerenciados: 15, equipes: 3 },
    { id: 2, nome: 'Carlos Oliveira', email: 'carlos.oliveira@portes.com', usuario: 'carlos.oliveira', telefone: '(11) 98765-4350', status: 'ativo', conciliadoresGerenciados: 12, equipes: 2 },
    { id: 3, nome: 'Ana Paula', email: 'ana.paula@portes.com', usuario: 'ana.paula', telefone: '(11) 98765-4351', status: 'ativo', conciliadoresGerenciados: 10, equipes: 2 }
];

// Função para gerar ranking de conciliadores
function gerarRankingConciliadores() {
    const rankingTable = document.getElementById('conciliadoresRankingTable');
    if (!rankingTable) return;
    
    const tbody = rankingTable.querySelector('tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    conciliadoresData.forEach((conc, index) => {
        const pos = index + 1;
        const medalha = pos === 1 ? '🥇' : pos === 2 ? '🥈' : pos === 3 ? '🥉' : `${pos}º`;
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><span class="ranking-position">${medalha}</span></td>
            <td><strong>${conc.nome}</strong></td>
            <td>${conc.comprovantes}</td>
            <td>R$ ${conc.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td>R$ ${conc.mediaValor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td>
                <span class="performance-badge ${conc.mediaValor > 500 ? 'excellent' : conc.mediaValor > 450 ? 'good' : 'normal'}">
                    ${conc.mediaValor > 500 ? 'Excelente' : conc.mediaValor > 450 ? 'Bom' : 'Normal'}
                </span>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Função para atualizar ranking ao carregar dashboard
function atualizarRankingConciliadores() {
    gerarRankingConciliadores();
    renderGerenciamentoConciliadores();
    
    // Se for Admin, também renderizar grid separado
    if (isAdmin()) {
        renderGerenciamentoConciliadoresAdmin();
        renderGerenciamentoSupervisores();
    }
}

// Renderizar conciliadores no grid do Admin (separado)
function renderGerenciamentoConciliadoresAdmin() {
    const grid = document.getElementById('adminConciliadoresGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    conciliadoresData.forEach(conc => {
        const card = document.createElement('div');
        card.className = 'conciliador-card';
        card.innerHTML = `
            <div class="conciliador-header">
                <div class="conciliador-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="conciliador-info">
                    <h4>${conc.nome}</h4>
                    <p>${conc.email}</p>
                </div>
                <span class="status-badge ${conc.status}">${conc.status.toUpperCase()}</span>
            </div>
            <div class="conciliador-stats">
                <div class="stat-item">
                    <i class="fas fa-file-invoice"></i>
                    <span>${conc.comprovantes}</span>
                </div>
                <div class="stat-item">
                    <i class="fas fa-dollar-sign"></i>
                    <span>R$ ${conc.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
            </div>
            <div class="conciliador-actions">
                <button class="action-btn edit" onclick="editarConciliador(${conc.id})" title="Editar">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="action-btn delete" onclick="confirmarExclusaoConciliador(${conc.id})" title="Excluir">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Gerenciamento de Conciliadores
function renderGerenciamentoConciliadores() {
    const grid = document.getElementById('conciliadoresGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    conciliadoresData.forEach(conc => {
        const card = document.createElement('div');
        card.className = 'conciliador-card';
        card.innerHTML = `
            <div class="conciliador-header">
                <div class="conciliador-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="conciliador-info">
                    <h4>${conc.nome}</h4>
                    <p>${conc.email}</p>
                </div>
                <span class="status-badge ${conc.status}">${conc.status.toUpperCase()}</span>
            </div>
            <div class="conciliador-stats">
                <div class="stat-item">
                    <i class="fas fa-file-invoice"></i>
                    <span>${conc.comprovantes}</span>
                </div>
                <div class="stat-item">
                    <i class="fas fa-dollar-sign"></i>
                    <span>R$ ${conc.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
            </div>
            <div class="conciliador-actions">
                <button class="action-btn edit" onclick="editarConciliador(${conc.id})" title="${!isAdmin() && conc.status !== 'ativo' ? 'Reativar' : 'Editar'}" ${!isAdmin() ? 'style="width: 100%;"' : ''}>
                    <i class="fas fa-edit"></i> ${!isAdmin() && conc.status !== 'ativo' ? 'Reativar' : 'Editar'}
                </button>
                ${isAdmin() ? `
                <button class="action-btn delete" onclick="confirmarExclusaoConciliador(${conc.id})" title="Excluir">
                    <i class="fas fa-trash"></i>
                </button>
                ` : ''}
            </div>
        `;
        grid.appendChild(card);
    });
}

function abrirModalGerenciarConciliador(id) {
    const modal = document.getElementById('gerenciarConciliadorModal');
    const titulo = document.getElementById('modalConciliadorTitulo');
    const form = document.getElementById('formConciliador');
    const btnExcluir = document.getElementById('btnExcluirConciliador');
    
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        if (id) {
            const conc = conciliadoresData.find(c => c.id === id);
            if (conc) {
                titulo.textContent = 'Editar Conciliador';
                document.getElementById('conciliadorId').value = conc.id;
                document.getElementById('conciliadorNome').value = conc.nome;
                document.getElementById('conciliadorEmail').value = conc.email;
                document.getElementById('conciliadorUsuario').value = conc.usuario;
                document.getElementById('conciliadorTelefone').value = conc.telefone;
                document.getElementById('conciliadorStatus').value = conc.status;
                if (isAdmin() && btnExcluir) btnExcluir.style.display = 'block';
            }
        } else {
            titulo.textContent = 'Adicionar Conciliador';
            form.reset();
            document.getElementById('conciliadorId').value = '';
            if (btnExcluir) btnExcluir.style.display = 'none';
        }
    }
}

function fecharModalGerenciarConciliador() {
    const modal = document.getElementById('gerenciarConciliadorModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function salvarConciliador(event) {
    event.preventDefault();
    
    const id = document.getElementById('conciliadorId').value;
    const nome = document.getElementById('conciliadorNome').value;
    const email = document.getElementById('conciliadorEmail').value;
    const usuario = document.getElementById('conciliadorUsuario').value;
    const telefone = document.getElementById('conciliadorTelefone').value;
    const status = document.getElementById('conciliadorStatus').value;
    
    if (id) {
        // Editar
        const index = conciliadoresData.findIndex(c => c.id == id);
        if (index !== -1) {
            conciliadoresData[index] = {
                ...conciliadoresData[index],
                nome,
                email,
                usuario,
                telefone,
                status
            };
            showNotification('Conciliador atualizado com sucesso!', 'success');
        }
    } else {
        // Adicionar
        const novoId = Math.max(...conciliadoresData.map(c => c.id)) + 1;
        conciliadoresData.push({
            id: novoId,
            nome,
            email,
            usuario,
            telefone,
            status: status || 'ativo',
            comprovantes: 0,
            valorTotal: 0,
            mediaValor: 0
        });
        showNotification('Conciliador adicionado com sucesso!', 'success');
    }
    
    renderGerenciamentoConciliadores();
    if (isAdmin()) {
        renderGerenciamentoConciliadoresAdmin();
    }
    gerarRankingConciliadores();
    fecharModalGerenciarConciliador();
}

function editarConciliador(id) {
    abrirModalGerenciarConciliador(id);
}

// Verificar se é Admin para mostrar botão de excluir
function isAdmin() {
    return currentUser && currentUser.userType === 'admin';
}

// Gerenciamento de Supervisores
function renderGerenciamentoSupervisores() {
    const grid = document.getElementById('supervisoresGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    supervisoresData.forEach(sup => {
        const card = document.createElement('div');
        card.className = 'conciliador-card';
        card.innerHTML = `
            <div class="conciliador-header">
                <div class="conciliador-avatar" style="background: rgba(255, 191, 0, 0.2); border-color: rgba(255, 191, 0, 0.4);">
                    <i class="fas fa-user-tie"></i>
                </div>
                <div class="conciliador-info">
                    <h4>${sup.nome}</h4>
                    <p>${sup.email}</p>
                </div>
                <span class="status-badge ${sup.status}">${sup.status.toUpperCase()}</span>
            </div>
            <div class="conciliador-stats">
                <div class="stat-item">
                    <i class="fas fa-users"></i>
                    <span>${sup.conciliadoresGerenciados} Conciliadores</span>
                </div>
                <div class="stat-item">
                    <i class="fas fa-layer-group"></i>
                    <span>${sup.equipes} Equipes</span>
                </div>
            </div>
            <div class="conciliador-actions">
                <button class="action-btn edit" onclick="editarSupervisor(${sup.id})" title="Editar">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="action-btn delete" onclick="confirmarExclusaoSupervisor(${sup.id})" title="Excluir">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function abrirModalGerenciarSupervisor(id) {
    const modal = document.getElementById('gerenciarSupervisorModal');
    const titulo = document.getElementById('modalSupervisorTitulo');
    const form = document.getElementById('formSupervisor');
    const btnExcluir = document.getElementById('btnExcluirSupervisor');
    
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        if (id) {
            const sup = supervisoresData.find(s => s.id === id);
            if (sup) {
                titulo.textContent = 'Editar Supervisor';
                document.getElementById('supervisorId').value = sup.id;
                document.getElementById('supervisorNome').value = sup.nome;
                document.getElementById('supervisorEmail').value = sup.email;
                document.getElementById('supervisorUsuario').value = sup.usuario;
                document.getElementById('supervisorTelefone').value = sup.telefone;
                document.getElementById('supervisorStatus').value = sup.status;
                if (isAdmin()) btnExcluir.style.display = 'block';
            }
        } else {
            titulo.textContent = 'Adicionar Supervisor';
            form.reset();
            document.getElementById('supervisorId').value = '';
            btnExcluir.style.display = 'none';
        }
    }
}

function fecharModalGerenciarSupervisor() {
    const modal = document.getElementById('gerenciarSupervisorModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function salvarSupervisor(event) {
    event.preventDefault();
    
    const id = document.getElementById('supervisorId').value;
    const nome = document.getElementById('supervisorNome').value;
    const email = document.getElementById('supervisorEmail').value;
    const usuario = document.getElementById('supervisorUsuario').value;
    const telefone = document.getElementById('supervisorTelefone').value;
    const status = document.getElementById('supervisorStatus').value;
    
    if (id) {
        const index = supervisoresData.findIndex(s => s.id == id);
        if (index !== -1) {
            supervisoresData[index] = {
                ...supervisoresData[index],
                nome,
                email,
                usuario,
                telefone,
                status
            };
            showNotification('Supervisor atualizado com sucesso!', 'success');
        }
    } else {
        const novoId = Math.max(...supervisoresData.map(s => s.id), 0) + 1;
        supervisoresData.push({
            id: novoId,
            nome,
            email,
            usuario,
            telefone,
            status: status || 'ativo',
            conciliadoresGerenciados: 0,
            equipes: 1
        });
        showNotification('Supervisor adicionado com sucesso!', 'success');
    }
    
    renderGerenciamentoSupervisores();
    fecharModalGerenciarSupervisor();
}

function editarSupervisor(id) {
    abrirModalGerenciarSupervisor(id);
}

function confirmarExclusaoSupervisor(id) {
    if (!id) {
        id = document.getElementById('supervisorId').value;
    }
    
    if (confirm('Tem certeza que deseja excluir PERMANENTEMENTE este supervisor? Esta ação não pode ser desfeita.')) {
        excluirSupervisor(id);
    }
}

function excluirSupervisor(id) {
    const index = supervisoresData.findIndex(s => s.id == id);
    if (index !== -1) {
        supervisoresData.splice(index, 1);
        showNotification('Supervisor excluído permanentemente!', 'success');
        renderGerenciamentoSupervisores();
        fecharModalGerenciarSupervisor();
    }
}

function confirmarExclusaoConciliador(id) {
    if (!id) {
        id = document.getElementById('conciliadorId').value;
    }
    
    if (confirm('Tem certeza que deseja excluir PERMANENTEMENTE este conciliador? Esta ação não pode ser desfeita.')) {
        excluirConciliador(id);
    }
}

function excluirConciliador(id) {
    const index = conciliadoresData.findIndex(c => c.id == id);
    if (index !== -1) {
        conciliadoresData.splice(index, 1);
        showNotification('Conciliador excluído permanentemente!', 'success');
        renderGerenciamentoConciliadores();
        if (isAdmin()) {
            renderGerenciamentoConciliadoresAdmin();
        }
        gerarRankingConciliadores();
        fecharModalGerenciarConciliador();
    }
}

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
            const valor = parseFloat(
                fav.valor.replace(/R\$\s?/g, '').replace(/\./g, '').replace(',', '.')
            ) || 0;
            return total + valor;
        }, 0);
        valorFavoritos.textContent = `R$ ${valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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

// Funções de Exportação
function exportarParaCSV() {
    const csv = [
        'ID,Data,Valor,Status,Categoria,Observações',
        ...comprovantesData.map(c => 
            `${c.id},${c.data},${c.valor},${c.status},${c.categoria},"${c.observacoes}"`
        )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `comprovantes_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Relatório CSV exportado com sucesso!', 'success');
}

function exportarParaJSON() {
    const json = JSON.stringify(comprovantesData, null, 2);
    const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `comprovantes_${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Relatório JSON exportado com sucesso!', 'success');
}

function exportarRelatorioPDF() {
    // Simulando exportação PDF
    showNotification('Gerando relatório PDF...', 'info');
    
    setTimeout(() => {
        // Em produção, usaria uma biblioteca como jsPDF
        const windowPrint = window.open('', '_blank');
        const conteudo = `
            <html>
                <head>
                    <title>Relatório de Comprovantes - LAZ</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h1 { color: #00bfff; }
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #00bfff; color: white; }
                    </style>
                </head>
                <body>
                    <h1>Relatório de Comprovantes - LAZ</h1>
                    <p>Gerado em: ${new Date().toLocaleString('pt-BR')}</p>
                    <p>Total de Comprovantes: ${comprovantesData.length}</p>
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Data</th>
                            <th>Valor</th>
                            <th>Status</th>
                            <th>Categoria</th>
                        </tr>
                        ${comprovantesData.map(c => `
                            <tr>
                                <td>${c.id}</td>
                                <td>${c.data}</td>
                                <td>${c.valor}</td>
                                <td>${c.status}</td>
                                <td>${c.categoria}</td>
                            </tr>
                        `).join('')}
                    </table>
                </body>
            </html>
        `;
        windowPrint.document.write(conteudo);
        windowPrint.document.close();
        windowPrint.print();
        showNotification('Relatório PDF gerado com sucesso!', 'success');
    }, 1000);
}

// Funcionalidades Administrativas Expandidas
function gerenciarUsuarios() {
    showNotification('Abrindo gerenciamento de usuários...', 'info');
    
    // Criar modal de gerenciamento de usuários
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Gerenciamento de Usuários</h2>
                <button class="modal-close" onclick="this.parentElement.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="admin-users-grid">
                    <div class="user-card">
                        <i class="fas fa-user-circle"></i>
                        <h3>João Silva</h3>
                        <p>Tipo: Conciliador</p>
                        <p>Status: Ativo</p>
                        <button class="action-btn">Editar</button>
                    </div>
                    <div class="user-card">
                        <i class="fas fa-user-tie"></i>
                        <h3>Maria Santos</h3>
                        <p>Tipo: Supervisor</p>
                        <p>Status: Ativo</p>
                        <button class="action-btn">Editar</button>
                    </div>
                    <div class="user-card">
                        <i class="fas fa-crown"></i>
                        <h3>Admin</h3>
                        <p>Tipo: Administrador</p>
                        <p>Status: Ativo</p>
                        <button class="action-btn">Editar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function relatorios() {
    showNotification('Gerando relatórios...', 'info');
    
    // Criar modal de relatórios
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Gerar Relatórios</h2>
                <button class="modal-close" onclick="this.parentElement.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="reports-grid">
                    <button class="control-btn" onclick="exportarParaCSV()">
                        <i class="fas fa-file-csv"></i>
                        Exportar CSV
                    </button>
                    <button class="control-btn" onclick="exportarParaJSON()">
                        <i class="fas fa-file-code"></i>
                        Exportar JSON
                    </button>
                    <button class="control-btn" onclick="exportarRelatorioPDF()">
                        <i class="fas fa-file-pdf"></i>
                        Exportar PDF
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function configuracoes() {
    showNotification('Abrindo configurações do sistema...', 'info');
    
    // Criar modal de configurações
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Configurações do Sistema</h2>
                <button class="modal-close" onclick="this.parentElement.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="settings-group">
                    <h3>Tema</h3>
                    <select class="form-input">
                        <option>Tema TRON (Atual)</option>
                        <option>Tema Claro</option>
                        <option>Tema Escuro Alternativo</option>
                    </select>
                </div>
                <div class="settings-group">
                    <h3>Notificações</h3>
                    <label><input type="checkbox" checked> Ativar notificações</label>
                    <label><input type="checkbox" checked> Notificações sonoras</label>
                </div>
                <div class="settings-group">
                    <h3>Dados</h3>
                    <button class="btn-secondary" onclick="alert('Funcionalidade de backup local')">Backup Local</button>
                    <button class="btn-secondary" onclick="alert('Funcionalidade de limpeza')">Limpar Cache</button>
                </div>
                <button class="btn-primary" style="width: 100%; margin-top: 20px;">
                    <i class="fas fa-save"></i> Salvar Configurações
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function backup() {
    showNotification('Iniciando backup do sistema...', 'info');
    
    setTimeout(() => {
        showNotification('Backup realizado com sucesso!', 'success');
    }, 2000);
}

// Funções de Upload
function abrirUploadModal() {
    const modal = document.getElementById('uploadModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Preencher data atual
        const dataInput = document.getElementById('uploadData');
        if (dataInput) {
            dataInput.value = new Date().toISOString().split('T')[0];
        }
    }
}

function fecharUploadModal() {
    const modal = document.getElementById('uploadModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Limpar formulário
        const form = document.getElementById('uploadForm');
        if (form) {
            form.reset();
        }
    }
}

function processarUpload(event) {
    event.preventDefault();
    
    const data = document.getElementById('uploadData').value;
    const valor = document.getElementById('uploadValor').value;
    const categoria = document.getElementById('uploadCategoria').value;
    const observacoes = document.getElementById('uploadObservacoes').value;
    const arquivo = document.getElementById('uploadArquivo').files[0];
    
    if (!data || !valor || !categoria) {
        showNotification('Por favor, preencha todos os campos obrigatórios!', 'error');
        return;
    }
    
    // Criar novo comprovante
    const novoId = `#${String(comprovantesData.length + 1).padStart(3, '0')}`;
    const dataFormatada = new Date(data).toLocaleDateString('pt-BR');
    const valorFormatado = valor.startsWith('R$') ? valor : `R$ ${valor}`;
    
    const novoComprovante = {
        id: novoId,
        data: dataFormatada,
        valor: valorFormatado,
        status: 'Pendente',
        categoria: categoria,
        observacoes: observacoes || 'Sem observações',
        favorito: false
    };
    
    // Adicionar à lista
    comprovantesData.unshift(novoComprovante); // Adicionar no início
    
    // Atualizar tabela
    renderComprovantesTable(comprovantesData);
    
    showNotification(`Comprovante ${novoId} adicionado com sucesso!`, 'success');
    fecharUploadModal();
    
    // Se estiver na tela de comprovantes, mostrar o novo item
    if (currentScreen === 'comprovantes') {
        // Scroll para o topo para ver o novo item
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
