# Execução dos Testes Visuais

## Versão avaliada

- Branch: `feature/evaluation-deliverables`
- Base do código: `a21778c`, com as alterações ainda não commitadas desta branch
- Data: 05/08/2026
- Ambiente: build de produção do Next.js 16.3.0 em `127.0.0.1:3100`
- Navegador: Firefox headless
- API: `127.0.0.1:9`, intencionalmente indisponível para validar o estado de erro
- Plano: [PLANO_DE_TESTES.md](./PLANO_DE_TESTES.md)

## Resultados

| ID | Resultado obtido | Situação | Evidência | Problema encontrado | Correção | Reteste |
|---|---|---|---|---|---|---|
| AV-01 | Navegação, hero, chamadas e três cards de benefícios renderizaram alinhados em 1440 × 1000. | Aprovado | [AV-01](./evidencias/AV-01-home-desktop.png) | A primeira captura registrou o skeleton de streaming. | O script passou a aquecer a rota no navegador antes de salvar a imagem. | Aprovado; estado final registrado. |
| AV-02 | A home passou para uma coluna em 390 × 844, com menu compacto, textos e ações sem corte horizontal. | Aprovado | [AV-02](./evidencias/AV-02-home-mobile.png) | A primeira captura registrou o skeleton de streaming. | Foi adicionada uma passagem visual de aquecimento. | Aprovado; estado final registrado. |
| AV-03 | A resposta do App Router contém `/login?next=/student`, e a tela de destino apresentou o formulário de login. | Aprovado | [AV-03](./evidencias/AV-03-rota-protegida-next.png) | A captura direta da rota protegida registrou o frame intermediário de redirecionamento. | O destino foi confirmado na resposta e a tela final foi capturada. | Aprovado; login e destino preservado confirmados. |
| AV-04 | O cadastro apresentou nome, e-mail, senha, confirmação, orientação de senha e ação principal. | Aprovado | [AV-04](./evidencias/AV-04-cadastro.png) | Nenhum. | Não se aplica. | Não foi necessário. |
| AV-05 | A indisponibilidade da API gerou mensagem genérica, campo inválido destacado e ação disponível para nova tentativa. | Aprovado | [AV-05](./evidencias/AV-05-api-indisponivel.png) | Nenhum defeito de interface; a falha foi provocada pelo teste. | Não se aplica. | Não foi necessário. |
| AV-06 | A rota inexistente apresentou erro 404, explicação e ação para voltar ao início. | Aprovado | [AV-06](./evidencias/AV-06-pagina-404.png) | Nenhum. | Não se aplica. | Não foi necessário. |
| AV-07 | A página completa exibiu cores, tipografia, espaçamento, botões, campos, cards, progresso e quatro tipos de feedback. | Aprovado | [AV-07](./evidencias/AV-07-style-guide.png) | A primeira captura registrou o skeleton de streaming. | O viewport foi ampliado e o navegador passou a aquecer a rota antes da captura. | Aprovado; página completa registrada. |

## Conclusão

Foram executados sete casos: **7 aprovados e 0 reprovados**. Não foi encontrado defeito funcional dentro do escopo visual definido.

As capturas intermediárias de loading foram tratadas como um problema do procedimento de evidência, não como falha da aplicação. Depois do ajuste no script, todos os casos afetados foram repetidos e aprovados.

Esta execução não substitui uma rodada funcional autenticada com API, banco de dados, Redis e MinIO disponíveis.
