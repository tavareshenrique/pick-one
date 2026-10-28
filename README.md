# Pick One

Diga como você está, quanto tempo tem, e receba uma indicação de filme. PWA mobile-first em Next 15 + React 19.

Fluxo: **Humor** (grade de 15 humores com emojis animados, texto livre opcional, "manter / mudar o clima") → **Duração** (presets, "tanto faz" ou mínimo/máximo) → **Resultado** (motivo, onde assistir, "Outro filme", compartilhar, trailer, histórico local).

## Setup

```bash
pnpm install
cp .env.example .env.local   # preencha TMDB_TOKEN
pnpm dev
```

Só o `TMDB_TOKEN` é obrigatório. Cada chave abaixo liga uma camada de forma independente:

| Variável | Liga |
| --- | --- |
| `TMDB_TOKEN` | Filmes (obrigatório) |
| `TYPESAFE_API_KEY` | Jev: leitura do texto livre e ranking dos candidatos |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Gemini: "por que esse filme" e mensagem de apoio |
| `UPSTASH_REDIS_REST_URL` / `_TOKEN` | Cache, rate limit e budget diário (**a IA só roda com Redis**) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile invisível |
| `GEMINI_MODELS` | Modelos do Gemini tentados em ordem (padrão `gemini-3.5-flash-lite,gemini-flash-lite-latest,gemini-3.5-flash`); se todos falharem, o Jev escolhe motivos curados |
| `AI_DAILY_LIMIT` | Teto global diário de indicações por IA (padrão 800) |
| `ALLOWED_ORIGINS` | Origens extras aceitas pela API |

Sem nenhuma chave de IA, Upstash ou Turnstile o app funciona 100% no fallback por gêneros (cache em memória).

## Arquitetura

`POST /api/recommend` (`src/app/api/recommend/route.ts`) valida com zod e delega para `src/server/recommend.ts`:

1. **Guard** (`guard.ts`): Origin, Turnstile, rate limit por IP (5/dia, 3/min), budget global diário. Qualquer falha cai no fallback, nunca em erro.
2. **Leitura do texto**: heurística local gratuita (`ai/heuristics.ts`, abuso/jailbreak e `sadness`) sempre roda; o Jev refina quando disponível. Prevalece o maior `sadness`.
3. **Pool** (`candidates.ts`): até 60 filmes reais do TMDB (~40% recentes nos últimos 18 meses, ~60% catálogo), com `with_runtime`, em cache.
4. **Ranking**: Jev (timeout 3s, confiança mínima) ou fallback por gêneros (`fallback.ts`).
5. **Top 6** (`select.ts`): respeita a cota de recentes sem forçar lançamento ruim e varia as épocas.
6. **Textos**: Gemini escreve só `reason` e a mensagem de apoio, depois do ranking, com filtro de tamanho e palavras proibidas; senão entram as frases de `src/config/messages.ts`.
7. **Cinema** (humores tristes ou por `cinemaWeight`): filme leve em cartaz no Brasil, com "Ver sessões" e "Prefiro ficar em casa". CVV 188 só para `sadness = 2`.

A IA nunca inventa títulos. Provedores ficam atrás das interfaces de `src/server/ai/types.ts` (`TextReader`, `Ranker`, `CopyWriter`).

Ajustes sem mexer em lógica: `src/config/recommend.ts` (`RECENT_RATIO`, `RECENT_MONTHS`, limites, TTLs) e `src/config/moods.ts` (humores, gêneros, `sadness`, `cinemaWeight`).

### Jev

`src/server/ai/jev.ts` usa `POST https://api.typesafe.ai/v1/systemone` ([docs](https://docs.typesafe.ai/api)): leitura do texto com perguntas `choice` (humor), `score` (sadness) e `noul` (abuso); ranking com uma pergunta `noul` por candidato.

## Anti-abuso

1. Chaves só no servidor, nunca `NEXT_PUBLIC_` (exceto a site key do Turnstile).
2. Turnstile invisível: sem token válido a requisição não chega na IA.
3. Rate limit por IP: passou do limite, o usuário ainda recebe filme pelo fallback.
4. Budget global diário (contador Redis que expira à meia-noite de Brasília).
5. Cache do pool e do ranking sem texto livre (12h).
6. Texto classificado como abuso nunca chega no Gemini.
7. Validação estrita (zod, body ≤ 4 KB, texto ≤ 200, humor como enum, Origin).
8. "Outro filme" reaproveita o top já buscado, sem nova chamada.
9. **Operacional**: defina limite de gasto e alerta no console TypeSafe, a quota no Google AI Studio e, se migrar o Gemini para o tier pago, alerta e limite lá também.

## PWA

`src/app/manifest.ts`, ícones gerados em `/icons/*` e `apple-icon`, service worker com Serwist (`src/sw.ts`): assets, emojis e pôsteres em cache, `/api/*` sempre na rede, página `/offline`. O SW só é gerado no build (`pnpm build`), não em `pnpm dev`.

## Créditos

Emojis animados: [Noto Animated Emoji](https://googlefonts.github.io/noto-emoji-animation/) do Google, licença CC BY 4.0. Dados de filmes: TMDB (este produto usa a API do TMDB mas não é endossado por ela).
