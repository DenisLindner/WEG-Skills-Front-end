# WEG Skills — Frontend

Frontend da plataforma WEG Skills, construído com Next.js 16, React 19, TypeScript, Tailwind CSS 4, componentes no padrão Shadcn e ícones Lucide.

## Arquitetura

O Next.js funciona como Backend for Frontend (BFF). O navegador nunca chama o Spring diretamente e nunca recebe o JWT.

```text
Browser ── /api/* ──> Next Route Handler ──> service server-only ── Bearer ──> Spring
                            │
                            └── cookie JWT HttpOnly

Browser ── URL assinada temporária ──> MinIO (upload e reprodução)
```

- Server Components chamam `src/services` diretamente.
- Client Components chamam somente Route Handlers relativos em `src/app/api`.
- `BACKEND_API_URL` existe somente no servidor.
- O cookie usa `HttpOnly`, `SameSite=Lax`, `Path=/` e `Secure` em produção.
- Mutações validam `Origin` e `Content-Type` antes de alcançar o backend.
- Respostas do Spring são normalizadas para um erro público estável.

## Configuração local

Crie `.env.local` a partir de `.env.example`:

```dotenv
BACKEND_API_URL=http://localhost:8080/api
APP_URL=http://localhost:3000
```

Não use o prefixo `NEXT_PUBLIC_` para a URL do Spring.

```bash
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:3000`. O backend e seus serviços PostgreSQL, Redis e MinIO devem estar ativos separadamente.

## Experiências implementadas

- Login, cadastro, logout e sessão por cookie HttpOnly.
- Home pública, cursos em destaque e validação pública de certificados.
- Catálogo autenticado, busca, paginação, detalhes, matrícula e avaliações.
- Área do aluno com progresso, módulos, aulas, player, conclusão e certificado.
- Perfil, avatar com upload direto, troca de senha e exclusão de conta.
- Painel do instrutor e editor de cursos, módulos, aulas, imagens e vídeos.
- Reordenação de conteúdo e publicação com as regras do backend.
- Painel administrativo e criação segura de instrutores.
- Estados responsivos, loading, página não encontrada e tratamento de erro.

## Uploads

1. O navegador solicita um ticket ao BFF.
2. O BFF autoriza no Spring e devolve somente o ticket temporário.
3. O arquivo é enviado diretamente ao MinIO.
4. O navegador confirma o upload pelo BFF.

Imagens aceitam JPEG, PNG e WebP até 5 MB. Vídeos aceitam MP4 até 2 GiB.

## Verificação

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Os testes atuais validam o contrato do cliente HTTP público, respostas vazias, normalização de erros e comportamento de sessão expirada.

## Estrutura principal

```text
src/
├── app/             páginas, layouts e Route Handlers do BFF
├── components/      UI Shadcn e componentes por domínio
├── lib/             sessão, segurança do BFF, uploads e cliente browser
├── services/        acesso server-only aos recursos Spring
└── types/           contratos compartilhados alinhados aos DTOs
```
