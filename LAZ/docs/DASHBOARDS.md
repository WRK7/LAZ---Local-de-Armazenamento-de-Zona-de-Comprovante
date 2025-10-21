## Dashboards

### Principal (Dashboard)
- Gráficos: Evolução Mensal (line), Desempenho Semanal (bar).
- **Novos gráficos**: Tendência de Crescimento (line), Distribuição por Horário (bar).
- Ranking Top 10 (tabela exemplo).

### Meus Comprovantes
- Filtros reais (data/valor) e tabela dinâmica via `renderComprovantesTable`.

### Supervisor
- KPIs: Conciliadores, Pendentes, Valor Total Pendente, Eficiência.
- Gráficos: Performance por Conciliador (bar), Status dos Comprovantes (doughnut).

### Admin
- KPIs: Supervisores, Usuários, Comprovantes Totais, Valor Total Sistema.
- Gráficos: Evolução Geral (line com 2 eixos), Distribuição por Região (pie).

### Financeiro
- KPIs: Receita do Mês, Crescimento vs Mês Anterior, Ticket Médio, Categorias.
- Gráficos:
  - `financeChart1` (doughnut): Receita por Categoria.
  - `financeChart2` (line): Receita Diária (últimos 30 dias).
  - **`financeChart3` (bar)**: Comparação Trimestral (2023 vs 2024).
  - **`financeChart4` (line)**: Projeção de Receita (real vs projetado).
  - Inicialização: `initializeFinanceCharts` + `initializeFinanceExtraCharts`.

### Qualidade
- KPIs: Taxa de Aprovação, TMA (Tempo Médio de Análise), Alertas, Revisões.
- Gráficos:
  - `qualityChart1` (pie): Aprovados vs Rejeitados.
  - `qualityChart2` (line): TMA por Semana.
  - **`qualityChart4` (line)**: Evolução da Qualidade (melhoria da taxa de aprovação).
  - Inicialização: `initializeQualityCharts` + `initializeQualityExtraCharts`.

### Performance (NOVO)
- KPIs: Velocidade Média, Produtividade, Tempo de Resposta, Usuários Ativos.
- Gráficos:
  - `performanceChart1` (line): Performance por Hora do dia.
  - `performanceChart2` (radar): Comparação de Métricas (Atual vs Meta).
  - `performanceChart3` (bar): Heatmap de Atividade (Manhã/Tarde/Noite por dia da semana).
  - `performanceChart4` (line): Tendência de Performance (evolução mensal).
  - Inicialização: `initializePerformanceCharts`.

### Perfis e visibilidade
- Conciliador: Dashboard e Comprovantes.
- Supervisor: + Qualidade + Performance.
- Admin: + Financeiro + Qualidade + Performance.
- Controle em `configureUserMenu` (exibição de botões do menu por perfil).

### Tipos de gráficos implementados
- **Line**: Tendências temporais, evolução, projeções.
- **Bar**: Comparações, distribuições, rankings.
- **Doughnut/Pie**: Proporções, categorias, status.
- **Radar**: Comparação multidimensional de métricas.
- **Multi-dataset**: Comparações ano a ano, real vs meta.

### Tornando "útil de verdade" (opções de dados)
- A partir de `comprovantesData`: consolidar receita diária, taxa de aprovação, ticket médio.
- Carregar JSON/CSV local com `fetch` e alimentar datasets.
- Futuro backend: trocar data sources por API (REST), mantendo o mesmo formato de datasets.


