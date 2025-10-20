### 20/10/2025

- Correção do somatório BRL em Favoritos (parser compatível com pt-BR para milhares e decimais).
- Implementação de filtros reais (data/valor) na tela de `comprovantes` com normalização de datas (inputs ISO vs exibição DD/MM/YYYY) e valores.
- Renderização dinâmica da tabela de `comprovantes` via função `renderComprovantesTable`.
- Melhoria no destaque do menu usando `data-screen` ao invés de seletor por `onclick`.
- Inclusão de novos dashboards:
  - Financeiro (`finance-dashboard`): KPIs (Receita do Mês, Crescimento, Ticket Médio, Categorias) e gráficos (Receita por Categoria e Receita Diária 30 dias).
  - Qualidade (`quality-dashboard`): KPIs (Taxa de Aprovação, TMA, Alertas, Revisões) e gráficos (Aprovação vs Rejeição e TMA por Semana).
- Controle de visibilidade dos novos dashboards por perfil no `configureUserMenu` (Supervisor: Qualidade; Admin: Financeiro e Qualidade).


