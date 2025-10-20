## Dashboards

### Principal (Dashboard)
- Gráficos: Evolução Mensal (line), Desempenho Semanal (bar).
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
  - Inicialização: `initializeFinanceCharts`.

### Qualidade
- KPIs: Taxa de Aprovação, TMA (Tempo Médio de Análise), Alertas, Revisões.
- Gráficos:
  - `qualityChart1` (pie): Aprovados vs Rejeitados.
  - `qualityChart2` (line): TMA por Semana.
  - Inicialização: `initializeQualityCharts`.

### Perfis e visibilidade
- Conciliador: Dashboard e Comprovantes.
- Supervisor: + Qualidade.
- Admin: + Financeiro e Qualidade.
- Controle em `configureUserMenu` (exibição de botões do menu por perfil).

### Tornando “útil de verdade” (opções de dados)
- A partir de `comprovantesData`: consolidar receita diária, taxa de aprovação, ticket médio.
- Carregar JSON/CSV local com `fetch` e alimentar datasets.
- Futuro backend: trocar data sources por API (REST), mantendo o mesmo formato de datasets.


