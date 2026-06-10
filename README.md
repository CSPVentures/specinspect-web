# SpecInspect Web

Construction Specification Intelligence — Next.js 14 App Router, TypeScript, Tailwind CSS.

## Setup

```bash
npm install
cp .env.example .env.local   # set SPECINSPECT_API_KEY
npm run dev
```

## Environment variables (server-only, never exposed to the browser)

| Variable | Purpose |
|---|---|
| `SPECINSPECT_API_BASE` | Upstream API base, defaults to `https://api.specinspect.com/api` |
| `SPECINSPECT_API_KEY` | Server API key, sent as `X-API-Key` on every upstream request |

## Architecture

- **API proxy** — `app/api/[...path]/route.ts` forwards every `/api/*` browser request to the upstream API, attaching the `Authorization: Bearer` token from the `si_token` httpOnly cookie and the `X-API-Key` from the server environment. Responses (including the streaming submittal PDF) pass straight through. The browser never talks to `api.specinspect.com` and never sees the key or token.
- **Auth** — `lib/auth-actions.ts` server actions call the upstream auth endpoints directly, set/clear the httpOnly cookie, and redirect. `middleware.ts` guards `/dashboard`, `/projects`, `/account`.
- **SSR** — product detail pages render server-side with 5-minute revalidation for SEO; search is client-side with 300 ms debounce.
- **Compare tray** — `components/CompareProvider.tsx` holds up to 4 products in localStorage; the tray appears site-wide.
- **Theme** — dark by default, toggle persisted in localStorage, no-flash inline script in `app/layout.tsx`.

## Deploy to Vercel

```bash
vercel
vercel env add SPECINSPECT_API_KEY
vercel --prod
```
