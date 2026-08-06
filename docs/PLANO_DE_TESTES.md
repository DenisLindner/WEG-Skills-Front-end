# Plano de Testes Visuais

## Identificação

- Projeto: WEG Skills — Front-end
- Tipo: smoke test manual e visual
- Ambiente: aplicação Next.js local
- Navegador: Firefox em modo headless
- Responsável: equipe WEG Skills
- Critério de aprovação: comportamento e composição visual iguais ao resultado esperado, sem página quebrada ou erro inesperado

## Casos de teste

| ID | Funcionalidade | Objetivo | Pré-condições | Dados | Passos | Resultado esperado | Prioridade | Responsável |
|---|---|---|---|---|---|---|---|---|
| AV-01 | Página inicial | Conferir carregamento e hierarquia em desktop | Front-end em execução | `/`, 1440 × 1000 | Abrir a rota e capturar a página | Navegação, hero, chamadas, benefícios e início dos cursos em destaque são legíveis e alinhados | Alta | Equipe |
| AV-02 | Responsividade | Conferir adaptação da página inicial em mobile | Front-end em execução | `/`, 390 × 844 | Abrir a rota no viewport mobile e capturar a página | Conteúdo ocupa uma coluna, sem corte horizontal, com ações legíveis | Alta | Equipe |
| AV-03 | Controle de acesso | Conferir o redirecionamento de uma rota protegida | Usuário sem sessão | `/student` | Abrir a rota, conferir o destino emitido pelo App Router e capturar `/login?next=/student` | A aplicação redireciona para o login e preserva `/student` no parâmetro `next` | Alta | Equipe |
| AV-04 | Cadastro | Conferir formulário e controles de entrada | Front-end em execução | `/register`, 1440 × 1000 | Abrir a rota e capturar a página | Nome, e-mail, senha, confirmação e ação de cadastro aparecem organizados | Média | Equipe |
| AV-05 | Falha de API | Conferir erro seguro quando um serviço não responde | Front-end apontando para uma API indisponível | `/certificate?code=CODIGO-INVALIDO` | Abrir a rota e capturar o resultado | A aplicação mostra mensagem segura e mantém a ação disponível para nova tentativa | Alta | Equipe |
| AV-06 | Página inexistente | Conferir feedback de navegação inválida | Front-end em execução | `/pagina-inexistente` | Abrir a rota e capturar a página | Página 404 explica o problema e oferece retorno ao início | Média | Equipe |
| AV-07 | Style Guide | Conferir os elementos do sistema visual | Front-end em execução | `/style-guide`, 1440 × 3000 | Abrir a rota e capturar a página completa | Cores, tipografia, espaçamento, botões, campos, cards e feedbacks são exibidos | Alta | Equipe |

## Fora do escopo desta rodada

Esta rodada é propositalmente simples e visual. Não cobre carga, concorrência, upload real, reprodução de vídeo ou o ciclo autenticado completo de criação, edição e exclusão. Esses fluxos dependem do ambiente integrado e devem compor uma rodada funcional complementar antes de uma publicação de produção.

## Registro

Os resultados, problemas e retestes ficam em `docs/EXECUCAO_DE_TESTES.md`. As imagens ficam em `docs/evidencias` e usam o ID do caso no nome do arquivo.
