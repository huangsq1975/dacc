# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # TypeScript compile + Vite production build → dist/
npm run preview      # Serve the production build locally
npm run lint         # Run ESLint
```

There is no test framework configured.

## Architecture

Single-page React application using React Router v7 for client-side navigation, Vite for bundling, and Tailwind CSS for styling.

**Entry points:** `index.html` → `src/main.tsx` → `src/App.tsx` (wraps `BrowserRouter`) → `src/router/config.tsx` (route definitions)

**Routes:**
- `/` — Home: hero, problem/solution, impact, council, CTA sections
- `/approach` — Ecosystem diagram, tokenomics (dSDR token), AI features, capital loop
- `/contact` — Multi-tab form (Contact Us / Join Council / Join Waitlist)
- `*` — 404 page

**Key patterns:**
- **AnimatedSection**: Uses IntersectionObserver to fade-in elements on scroll
- **useFormSubmit**: Custom hook handling Formspree form submissions with success/error state (4s auto-dismiss)
- **Scroll-snap layout**: Desktop-only (`scroll-snap-type: y mandatory`) via `index.css`
- **Navigation section dots**: Home page-only dot indicators for scroll position, rendered in `Navigation.tsx`

## Design System

Defined in `tailwind.config.ts`:
- **Fonts**: Playfair Display (headings), Inter (body)
- **Colors**: `tf-blue` (#1a4f8a default, `tf-blue-bright` #3264CC), `tf-gold` (#c9a55a), `navy-*` palette, `tf-cream` (#EDE8DA)
- **Custom animations**: `fade-in-up`, `fade-in-left`, `fade-in-right`, `fade-in`, `counter`
- **Delay utilities**: `delay-100` through `delay-600` defined in `index.css`

## Static Assets

All images (logos, icons) live in `public/`. Reference them as `/filename.png` in JSX.
