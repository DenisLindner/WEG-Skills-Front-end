# Quick Tunnel na rede SENAI

Esta configuração publica somente o front-end Next.js por uma URL HTTPS temporária em `*.trycloudflare.com`. A API Spring continua local e é acessada pelo servidor Next por meio de `API_URL`, sem expor o endereço da API ao navegador.

```text
Navegador -> HTTPS trycloudflare.com -> cloudflared -> Next.js :3000 -> API Spring :8080
```

## Pré-requisitos

- dependências instaladas com `npm ci`;
- API e serviços de apoio em execução;
- uma das opções abaixo:
  - `cloudflared` instalado e disponível no `PATH`; ou
  - Docker em execução no Linux.

Versões do `cloudflared` a partir de `2026.5.2` fazem verificações de conectividade automaticamente ao iniciar. O script prefere o binário local e usa a imagem `cloudflare/cloudflared:latest` como fallback quando apenas o Docker está disponível.

## Executar

Configure a API normalmente em `.env.local`:

```dotenv
API_URL=http://localhost:8080/api
```

Inicie o Next.js e o túnel com um único comando:

```bash
npm run dev:tunnel
```

O endereço público será impresso pelo `cloudflared`. Ele muda a cada execução. `Ctrl+C` encerra tanto o túnel quanto o Next.js.

O comando habilita `*.trycloudflare.com` como origem de desenvolvimento e de Server Actions somente no processo iniciado para o Quick Tunnel. A execução comum com `npm run dev` não amplia as origens permitidas.

## Ajustes disponíveis

O padrão usa HTTP/2 porque redes institucionais frequentemente bloqueiam UDP/QUIC. Para deixar o `cloudflared` detectar o protocolo automaticamente:

```bash
QUICK_TUNNEL_PROTOCOL=auto npm run dev:tunnel
```

Para escolher explicitamente o runtime:

```bash
QUICK_TUNNEL_RUNTIME=cloudflared npm run dev:tunnel
QUICK_TUNNEL_RUNTIME=docker npm run dev:tunnel
```

Também estão disponíveis:

| Variável | Padrão | Uso |
|---|---|---|
| `QUICK_TUNNEL_PORT` | `3000` | porta local do Next.js |
| `QUICK_TUNNEL_PROTOCOL` | `http2` | `auto`, `http2` ou `quic` |
| `QUICK_TUNNEL_RUNTIME` | `auto` | `auto`, `cloudflared` ou `docker` |
| `CLOUDFLARED_BIN` | `cloudflared` | caminho de um binário local |
| `CLOUDFLARED_IMAGE` | `cloudflare/cloudflared:latest` | imagem usada pelo fallback Docker |

## Requisitos da rede SENAI

O túnel não exige porta de entrada aberta. A rede precisa permitir DNS e conexões de saída TCP na porta `7844` para os endpoints da Cloudflare. Com HTTP/2, os destinos principais são:

- `region1.v2.argotunnel.com`;
- `region2.v2.argotunnel.com`;
- `h2.cftunnel.com` e `cftunnel.com` em redes com inspeção SNI.

Se TCP `7844` estiver bloqueado, não há ajuste no projeto que contorne a política: a liberação deve ser solicitada à equipe responsável pela rede. O modo `auto` também pode usar UDP `7844` via QUIC quando permitido.

## Diagnóstico

- **`cloudflared` não encontrado:** instale o binário ou inicie o Docker.
- **Docker sem permissão:** adicione o usuário ao grupo autorizado pela instalação local ou use o binário `cloudflared`.
- **falha de conexão na porta 7844:** solicite a liberação dos destinos acima em TCP.
- **há `~/.cloudflared/config.yml` ou `config.yaml`:** Quick Tunnels não aceitam essa configuração. Renomeie-a temporariamente ou use o fallback Docker, que possui um diretório isolado.
- **API indisponível:** confirme que `API_URL` pode ser acessada pela máquina que executa o Next.js.
- **upload ou vídeo inacessível em outro dispositivo:** URLs assinadas são fornecidas pelo serviço de armazenamento. O host presente nessas URLs também precisa ser alcançável pelo dispositivo externo; o Quick Tunnel do front-end não publica o MinIO automaticamente.

## Segurança e limitações

Quick Tunnel é apropriado para demonstração e desenvolvimento, não para produção. A URL é pública, temporária, limitada a 200 requisições simultâneas e não suporta Server-Sent Events. Não use dados reais ou credenciais de produção e encerre o processo ao fim da demonstração.

Referências:

- [Quick Tunnels — Cloudflare](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/trycloudflare/)
- [Cloudflare Tunnel com firewall](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-with-firewall/)
- [Origens de desenvolvimento — Next.js](https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins)
- [Origens de Server Actions — Next.js](https://nextjs.org/docs/app/api-reference/config/next-config-js/serverActions)
