### 20/10/2025

- Correção do somatório BRL em Favoritos (parser compatível com pt-BR para milhares e decimais).
- Implementação de filtros reais (data/valor) na tela de `comprovantes` com normalização de datas (inputs ISO vs exibição DD/MM/YYYY) e valores.
- Renderização dinâmica da tabela de `comprovantes` via função `renderComprovantesTable`.
- Melhoria no destaque do menu usando `data-screen` ao invés de seletor por `onclick`.
- **Correção do Login**: Resolvido problema de reload da página após login causado por variáveis JavaScript duplicadas.
- **Melhoria na UX do Login**: 
  - Campo de senha é limpo automaticamente em caso de erro
  - Foco retorna ao campo de senha após erro
  - Comportamento padrão do formulário preservado para garantir carregamento
- **Credenciais Atualizadas**: 
  - Conciliador: `conc123`
  - Supervisor: `sup456`
  - Admin: `admin123`
- **Notificações Visuais**: Adicionado CSS para notificações com efeito visual (sucesso, erro, info, warning).
- Inclusão de novos dashboards:
  - Financeiro (`finance-dashboard`): KPIs (Receita do Mês, Crescimento, Ticket Médio, Categorias) e gráficos (Receita por Categoria e Receita Diária 30 dias).
  - Qualidade (`quality-dashboard`): KPIs (Taxa de Aprovação, TMA, Alertas, Revisões) e gráficos (Aprovação vs Rejeição e TMA por Semana).
- Controle de visibilidade dos novos dashboards por perfil no `configureUserMenu` (Supervisor: Qualidade; Admin: Financeiro e Qualidade).

### 20/10/2025 - Expansão de Gráficos

- **Dashboard Principal**: Adicionados gráficos extras:
  - Tendência de Crescimento (line chart com dados de crescimento mensal)
  - Distribuição por Horário (bar chart mostrando atividade por hora do dia)
- **Dashboard Financeiro**: Gráficos adicionais:
  - Comparação Trimestral (bar chart comparando 2023 vs 2024)
  - Projeção de Receita (line chart com dados reais vs projetados)
- **Dashboard Qualidade**: Novo gráfico:
  - Evolução da Qualidade (line chart mostrando melhoria da taxa de aprovação)
- **Dashboard Performance**: Novo dashboard completo com:
  - KPIs: Velocidade Média, Produtividade, Tempo de Resposta, Usuários Ativos
  - Gráficos: Performance por Hora, Comparação de Métricas (radar), Heatmap de Atividade, Tendência de Performance
- **Controle de Perfis**: Dashboard Performance visível para Supervisor e Admin
- **Inicializadores**: Funções específicas para cada conjunto de gráficos extras (`initializeExtraCharts`, `initializeFinanceExtraCharts`, `initializeQualityExtraCharts`, `initializePerformanceCharts`)


