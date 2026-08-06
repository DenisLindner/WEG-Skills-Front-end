# WEG Skills — Front-end

Interface web da plataforma de cursos assíncronos do Centro de Treinamento de Clientes (CTC) da WEG. O projeto permite administrar conteúdos, acompanhar o aprendizado e emitir certificados verificáveis.

## Problema e objetivo

O treinamento técnico precisa ser acessível em diferentes horários e dispositivos, sem perder organização, segurança ou rastreabilidade. O WEG Skills centraliza cursos em vídeo e oferece experiências específicas para visitantes, alunos, instrutores e administradores.

O objetivo deste front-end é apresentar essas jornadas de forma responsiva e consumir com segurança a API REST do WEG Skills.

## Integrantes

| Nome | GitHub |
|---|---|
| Denis Lindner | [@DenisLindner](https://github.com/DenisLindner) |
| Bruno Gustavo Kannenberg | [@okannenberg](https://github.com/okannenberg) |
| Emanuel Filipi Bueno de Souza | [@add095](https://github.com/add095) |
| Gustavo Schmitt Hatschbach | [@gustaaxz](https://github.com/gustaaxz) |
| Matheus Eichendorf | [@MatheusEich15](https://github.com/MatheusEich15) |

## Tecnologias

- Next.js 16 com App Router;
- React 19 e TypeScript;
- Tailwind CSS 4 e componentes shadcn;
- Server Components e Server Actions;
- Lucide e React Icons.

## Funcionalidades

### Visitante

- página inicial e apresentação do projeto;
- cadastro e login;
- ranking público de cursos;
- validação pública de certificados.

### Aluno

- catálogo com pesquisa e paginação;
- matrícula em cursos publicados;
- reprodução de aulas e acompanhamento de progresso;
- avaliação de cursos;
- emissão e compartilhamento de certificado;
- atualização de perfil e senha.

### Instrutor

- criação, edição e exclusão de cursos;
- gerenciamento e ordenação de módulos e aulas;
- upload de capas, imagens e vídeos;
- publicação de cursos completos.

### Administrador

- criação e exclusão de instrutores;
- visualização de todos os cursos;
- administração do conteúdo de qualquer curso.

## Pré-requisitos

- Node.js 20.9 ou superior;
- npm;
- API do WEG Skills em execução.

O repositório da API está em [WEG-Skills-Back-end](https://github.com/DenisLindner/WEG-Skills-Back-end).

## Instalação

```bash
git clone https://github.com/DenisLindner/WEG-Skills-Front-end.git
cd WEG-Skills-Front-end
npm ci
```

## Variáveis de ambiente

Crie o arquivo local a partir do exemplo:

```bash
cp .env.example .env.local
```

| Variável | Obrigatória | Descrição | Exemplo local |
|---|---|---|---|
| `API_URL` | Sim | URL base da API, lida somente no servidor Next.js | `http://localhost:8080/api` |

Não use o prefixo `NEXT_PUBLIC_`: o endereço é consumido apenas pelos serviços executados no servidor.

## Execução

Ambiente de desenvolvimento:

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

Build e execução de produção:

```bash
npm run build
npm start
```

Verificação estática:

```bash
npm run lint
```

## API e documentação

Com a configuração local padrão:

- API: [http://localhost:8080/api](http://localhost:8080/api)
- Swagger UI: [http://localhost:8080/api/docs](http://localhost:8080/api/docs)
- OpenAPI: [http://localhost:8080/api/v3/api-docs](http://localhost:8080/api/v3/api-docs)

## Rotas principais

| Rota | Acesso | Finalidade |
|---|---|---|
| `/` | Público | Página inicial |
| `/about` | Público | Contexto do projeto |
| `/login` | Público | Autenticação |
| `/register` | Público | Cadastro de aluno |
| `/certificate` | Público | Validação de certificado |
| `/style-guide` | Público | Guia visual da aplicação |
| `/courses` | Autenticado | Catálogo de cursos |
| `/courses/[courseId]` | Autenticado | Detalhes e matrícula |
| `/student` | Aluno | Cursos e progresso |
| `/student/course/[courseId]` | Aluno | Conteúdo do curso |
| `/student/course/[courseId]/lesson/[lessonId]` | Aluno | Reprodução da aula |
| `/instructor` | Instrutor ou administrador | Cursos administrados |
| `/instructor/courses/new` | Instrutor ou administrador | Criação de curso |
| `/instructor/courses/[courseId]` | Instrutor ou administrador | Editor de curso |
| `/admin` | Administrador | Instrutores e catálogo completo |
| `/profile` | Autenticado | Perfil e segurança da conta |

Rotas protegidas enviam o visitante para `/login?next=...`. Após autenticação, somente destinos internos e válidos são aceitos para o retorno.

## Estrutura de pastas

```text
src
├── actions       # Server Actions de autenticação e mutações
├── app           # Páginas, layouts e estados globais do App Router
├── components
│   ├── admin     # Interface administrativa
│   ├── auth      # Formulários de autenticação
│   ├── courses   # Matrícula e avaliação
│   ├── instructor # Editor de cursos
│   ├── profile   # Perfil do usuário
│   ├── shared    # Cabeçalho, rodapé, cards e paginação
│   ├── student   # Aula, progresso e certificado
│   └── ui        # Componentes visuais reutilizáveis
├── lib           # Sessão, queries, upload e utilitários
├── services      # Cliente e serviços da API
└── types         # Contratos TypeScript por domínio
```

## Fluxo de dados

As páginas e Server Actions chamam os serviços da pasta `src/services`. O cliente central adiciona o JWT às chamadas autenticadas e converte respostas de erro da API em mensagens seguras. Mutações bem-sucedidas revalidam as páginas afetadas.

Uploads de imagens e vídeos usam tickets temporários: o navegador envia o arquivo diretamente ao MinIO e depois confirma a conclusão pela API.

## Segurança

- o JWT permanece em cookie `httpOnly`, com `SameSite=Lax` e `Secure` em produção;
- tokens e segredos não são persistidos em `localStorage` ou `sessionStorage`;
- `API_URL` e credenciais locais não são versionadas;
- formulários normalizam e validam dados antes do envio;
- erros internos da API não são apresentados diretamente ao usuário;
- a API revalida perfil e propriedade dos recursos; ocultar controles no front-end não é tratado como autorização;
- o redirecionamento pós-login aceita somente caminhos internos;
- o projeto não injeta HTML fornecido pelo usuário.

Consulte também o [Style Guide](./docs/STYLE_GUIDE.md) e a página `/style-guide`.

## Testes

Os artefatos da avaliação prática estão em:

- [Plano de testes](./docs/PLANO_DE_TESTES.md);
- [Registro de execução](./docs/EXECUCAO_DE_TESTES.md);
- [Evidências visuais](./docs/evidencias/README.md).

Para repetir a verificação técnica:

```bash
npm run lint
npm run build
```

Os testes documentados são smoke tests manuais e visuais. Eles devem ser refeitos sempre que a versão candidata à entrega mudar.

## Limitações conhecidas

- não há recuperação de senha nesta versão;
- os testes do front-end são manuais e visuais; ainda não existe suíte automatizada de componentes ou E2E;
- a experiência completa depende da API, PostgreSQL, Redis e MinIO;
- painéis de aluno e instrutor têm limites de paginação adequados ao MVP;
- a interface não permite editar ou excluir uma avaliação já enviada.

## Versionamento

O desenvolvimento utiliza branches específicas de `feature`, `fix` e `release`. A versão candidata deve passar por lint, build e execução do plano de testes antes de ser integrada à `main`.
