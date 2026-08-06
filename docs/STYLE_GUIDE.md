# Style Guide — WEG Skills

Este documento registra as decisões visuais aplicadas na interface. A demonstração renderizada está disponível na rota `/style-guide`.

## Identidade

A interface usa azul como cor institucional, fundos claros e superfícies brancas para preservar a associação com a WEG e manter legibilidade.

| Papel | Token ou valor | Uso |
|---|---|---|
| Azul institucional | `#003057` | Hero, rodapé e áreas de destaque |
| Primária | `--primary` | Ações principais, links e ícones |
| Secundária | `--secondary` | Ações alternativas e superfícies suaves |
| Destrutiva | `--destructive` | Exclusão e mensagens de erro |
| Fundo | `--background` | Fundo geral da aplicação |
| Card | `--card` | Conteúdo agrupado |
| Texto auxiliar | `--muted-foreground` | Descrições e metadados |

Os tokens completos estão em `src/app/globals.css` e são consumidos pelo Tailwind CSS.

## Tipografia

- Família: `Inter`, com fallback para `Segoe UI`, `Roboto`, `Helvetica`, `Arial` e `sans-serif`.
- Títulos principais: peso `700`, entre `2.25rem` e `4.5rem` conforme a página e o viewport.
- Títulos de seção: peso `600` ou `700`.
- Corpo: tamanho base do navegador, com textos auxiliares em `0.875rem`.
- Eyebrows: caixa alta, peso `700` e espaçamento entre letras de `0.18em` a `0.2em`.

## Espaçamento e layout

- Unidade principal: múltiplos de `0.25rem` fornecidos pelo Tailwind.
- Conteúdo: largura máxima `80rem`, centralizado, com `1rem`, `1.5rem` e `2rem` de padding horizontal conforme o viewport.
- Cards: raio padrão de `1rem`; controles usam raio entre `0.375rem` e `0.75rem`.
- Desktop e mobile usam as mesmas hierarquias; grids passam para uma coluna nos viewports estreitos.

## Componentes

### Botões

- `default`: ação principal;
- `secondary`: ação complementar;
- `outline`: alternativa neutra;
- `ghost`: ação de baixa ênfase;
- `destructive`: ação irreversível;
- `link`: navegação apresentada como texto.

Todos possuem foco visível, estado desabilitado e área mínima coerente.

### Campos

Inputs e textareas usam fundo branco, borda neutra e anel azul no foco. Campos inválidos recebem a cor destrutiva e devem estar associados a uma mensagem textual.

### Cards, badges e progresso

Cards agrupam conteúdo relacionado. Badges comunicam estados curtos. A barra de progresso informa também `aria-valuenow`, `aria-valuemin` e `aria-valuemax`.

### Feedback

- sucesso: verde, para operações concluídas;
- atenção: âmbar, para decisões ou estados incompletos;
- erro: vermelho, sempre com mensagem textual;
- informação: azul, para orientações neutras;
- carregamento: texto objetivo e indicador animado quando aplicável.

## Acessibilidade e uso

- contraste de texto deve permanecer legível sobre fundos claros e institucionais;
- ícones decorativos não substituem rótulos;
- botões compostos somente por ícone precisam de nome acessível;
- foco por teclado não deve ser removido;
- mensagens de erro devem usar texto, não somente cor;
- imagens de conteúdo precisam de texto alternativo descritivo.

## Fonte de verdade

A rota `/style-guide` usa os próprios componentes da aplicação. Mudanças em tokens, variantes ou estados devem atualizar tanto essa página quanto este documento.

