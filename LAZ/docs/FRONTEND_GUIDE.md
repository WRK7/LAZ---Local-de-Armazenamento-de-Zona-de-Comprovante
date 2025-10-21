## Guia do Front-end (LAZ)

### Credenciais de Login
- **Conciliador**: `conc123`
- **Supervisor**: `sup456` 
- **Admin**: `admin123`

### Estrutura
- `index.html`: marcação das telas; menu superior com botões e `data-screen` para navegação.
- `styles.css`: tema TRON (dark + azul neon), animações e componentes.
- `script.js`: lógica de navegação, gráficos, filtros, busca, favoritos e modais.

### Navegação entre telas
- Use `showScreen('nome-da-tela')`. As sub-telas são elementos com `content-screen` e `id` correspondente.
- O botão ativo do menu é marcado via `data-screen` e classe `active`.

### Gráficos
- Biblioteca: `Chart.js` via CDN.
- Todas as instâncias ficam em `chartInstances` e são destruídas antes de novas criações (`destroyCharts`).
- Inicializadores por área:
  - `initializeCharts` (dashboard padrão)
  - `initializeSupervisorCharts`
  - `initializeAdminCharts`
  - `initializeFinanceCharts`
  - `initializeQualityCharts`

### Comprovantes
- Dados de exemplo: `comprovantesData`.
- Filtros: `aplicarFiltros()` normaliza datas (inputs ISO vs exibição DD/MM/YYYY) e valores BRL.
- Renderização de tabela: `renderComprovantesTable(lista)`.

### Favoritos
- Estado em memória e persistência em `localStorage` (`laz_favoritos`).
- Soma BRL corrigida para pt-BR removendo milhares e normalizando decimais.

### Acessibilidade (próximos passos sugeridos)
- Adicionar `aria-label` nos botões icônicos.
- Gerenciar foco ao abrir/fechar `modal` e `searchOverlay`.
- Foco visível consistente nos elementos interativos.

### Boas práticas de contribuição
- Manter `data-screen` nos botões do menu para robustez do destaque ativo.
- Adicionar novos gráficos via inicializadores específicos e registrar/destroi-los em `chartInstances`.
- Evitar acoplamento com seletores baseados em `onclick`; preferir `data-*` e event listeners.


