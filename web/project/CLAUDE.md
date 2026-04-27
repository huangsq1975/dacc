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

- **Runtime/Build**: Node.js + Vite 6, React 19, TypeScript 5.6 (strict mode **off**)
- **Styling**: Tailwind CSS 3.4 + PostCSS — all styling is inline Tailwind classes, no CSS modules
- **Routing**: `react-router-dom` v7 (`useRoutes` + `BrowserRouter` with `basename={import.meta.env.BASE_URL}`)
- **i18n**: i18next (initialized but rarely used inline — see bilingual page strategy below)
- **WebGL**: `ogl` 1.0.8 for Prism/Wave background effects in home pages

### Entry Points

- `index.html` → `src/main.tsx` (loads i18n + CSS, renders `<App />`)
- `src/App.tsx` → `BrowserRouter` wrapping `<AppRoutes />` + `<BackToTop />`
- `src/router/config.tsx` → all `RouteObject[]` definitions
- `src/router/index.ts` → `AppRoutes()` using `useRoutes(routes)`; also exposes `navigate` as `window.REACT_APP_NAVIGATE`

### Bilingual Page Strategy

Pages are split by language at the **route level**, not via `useTranslation()`. Both ZH and EN page components exist under `src/pages/`, but the **active routes in `src/router/config.tsx` currently only register EN pages**. ZH page files exist but are not wired to routes yet.

| Path | Component | Language |
|---|---|---|
| `/` | `src/pages/home-en/page.tsx` | EN |
| `/<page>` | `src/pages/<page>-en/page.tsx` | EN (current config) |

Current page pairs (both `page.tsx` and `<page>-en/page.tsx` exist): `home`, `use-case`, `use-case-ttl`, `use-case-conflux`, `use-case-vatp`, `blog`, `contact`, `cold-wallet`, `hot-wallet`, `rwa-platform`, `chain-fusion`, `news-chainfusion`.

**When adding a page**: create both ZH (`src/pages/<page>/page.tsx`) and EN (`src/pages/<page>-en/page.tsx`) components, add routes to `src/router/config.tsx`, and update nav/footer links in both language variants.

### i18n Translation Files

Translations live in `src/i18n/local/{en,zh}/` as individual `.ts` files per page (e.g., `home.ts`, `blog.ts`). Key format: `page_section_item` (e.g., `home_hero_title`, `blog_post_0_category`). Files are imported via Vite's `import.meta.glob`. In practice, EN pages use `t('key')` for strings, but ZH page files contain inline Chinese text.

### Shared Components

- `src/components/feature/AdvisorsCarouselZH.tsx` / `AdvisorsCarouselEN.tsx` — director/advisor profiles
- `src/components/feature/BackToTop.tsx` — floating button, appears after 300px scroll
- `src/components/feature/WaveBackground.tsx` — Canvas-based animated wave with sparkles
- `src/components/feature/HeroShield.tsx` — WebGL Canvas with animated blockchain node visualization
- `src/components/feature/WireframeSphere.tsx` — SVG animated globe, used in language switcher buttons
- `src/hooks/useIntersectionObserver.ts` — returns `[ref, isVisible]`; once visible, disconnects observer (one-shot)
- `src/hooks/useLanguage.ts` — `{ switchToZh(), switchToEn(), currentLang }` wrapper around i18n

### WebGL / OGL Notes

The home pages embed a WebGL Prism shader directly in `page.tsx` (custom pyramid with height, baseWidth, glow, noise, bloom, hueShift, colorFrequency params). `WaveBackground.tsx` and `HeroShield.tsx` use Canvas/WebGL separately. All WebGL components include graceful fallback if WebGL is unsupported. Avoid adding large 3D libraries nearby — keep bundle size in check.

### Brand Tokens

CSS variables defined in `src/index.css`: `--primary-blue` (#1e6b8a), `--secondary-blue` (#1a5a76), `--tertiary-grey`, `--bg-deep`, `--bg-sky-light`. Font family: Montserrat (configured in `tailwind.config.ts` as `sans`, `space`, and `montserrat`).

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
- ZH page components exist for all page pairs but are not registered in `src/router/config.tsx`.
