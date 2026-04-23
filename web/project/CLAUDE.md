# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Commands

```bash
npm install
npm run dev      # Vite dev server on port 3000 (host 0.0.0.0)
npm run build    # tsc -b && vite build → outputs to out/
npm run preview  # preview the build locally
```

No lint or test scripts are configured.

---

## Architecture Overview

- **Runtime/Build**: Node.js + Vite, React 19, TypeScript
- **Styling**: Tailwind CSS + PostCSS
- **Routing**: `react-router-dom` v7 (`useRoutes` + `BrowserRouter` with `basename={import.meta.env.BASE_URL}`)
- **i18n**: i18next (initialized but rarely used inline — see bilingual page strategy below)
- **WebGL**: `ogl` used for Prism/Wave background effects in home pages

### Entry Points

- `index.html` → `src/main.tsx` (loads i18n + CSS, renders `<App />`)
- `src/App.tsx` → `BrowserRouter` wrapping `<AppRoutes />` + `<BackToTop />`
- `src/router/config.tsx` → all `RouteObject[]` definitions
- `src/router/index.ts` → `AppRoutes()` using `useRoutes(routes)`; also exposes `navigate` as `window.REACT_APP_NAVIGATE`

### Bilingual Page Strategy

Pages are split by language at the **route level**, not via `useTranslation()`:

| Path | Component | Language |
|---|---|---|
| `/` or `/en` | `src/pages/home-en/page.tsx` | EN |
| `/zh` | `src/pages/home/page.tsx` | ZH |
| `/<page>` | `src/pages/<page>/page.tsx` | ZH |
| `/<page>-en` | `src/pages/<page>-en/page.tsx` | EN |

Current page pairs: `home`, `use-case`, `use-case-ttl`, `use-case-conflux`, `use-case-vatp`, `blog`, `contact`, `cold-wallet`, `hot-wallet`, `rwa-platform`, `chain-fusion`, `news-chainfusion`.

**When adding a page**: create both ZH and EN `page.tsx`, add both routes to `src/router/config.tsx`, and update any nav/footer links in both language variants.

### Shared Components

- `src/components/feature/AdvisorsCarouselZH.tsx` / `AdvisorsCarouselEN.tsx`
- `src/components/feature/BackToTop.tsx`
- `src/components/feature/WaveBackground.tsx`
- `src/components/feature/HeroShield.tsx`
- `src/hooks/useIntersectionObserver.ts`

### WebGL / OGL Notes

The home pages embed WebGL Prism/Wave backgrounds directly in `page.tsx`. These create a WebGL context, inject shaders, use RAF + `ResizeObserver`, and include a graceful fallback if WebGL is unsupported. Avoid adding large 3D libraries nearby — keep bundle size in check.

---

## External Dependencies (readdy.ai)

**Contact form endpoints** (both use `application/x-www-form-urlencoded`):
- ZH: `POST https://readdy.ai/api/form/d6juo8vrgrhbthj8n4o0`
- EN: `POST https://readdy.ai/api/form/d6juo8vrgrhbthj8n4og`

**Images**: many pages use `https://readdy.ai/api/search-image?...` and `https://static.readdy.ai/image/...`. These depend on third-party availability.

---

## Deployment (SPA)

- Build output: `out/` directory
- `BrowserRouter` uses HTML5 history mode — the server **must** fall back all non-static paths to `index.html` to avoid 404 on direct navigation/refresh.
- If deploying to a subpath, set Vite's `base` to match `BASE_URL`.

---

## Known Issues

- `src/index.css` has duplicate Tailwind directives (`@tailwind base/components/utilities` appears twice).
- i18n is initialized (`src/i18n/`) but page content is primarily handled via split pages; mixing both approaches risks divergence.
