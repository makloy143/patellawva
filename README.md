# Patel Law VA

The personal website of **Bhavik D. Patel, Esq.** — a Fairfax, Virginia
attorney serving clients across Northern Virginia and Maryland in personal
injury, criminal defense, divorce & family law, and civil litigation.

> Free, confidential consultation · Available 24/7 · No fee unless we win
> your injury case.
>
> **(703) 844-4519** · 10500 Sager Ave, Suite F, Fairfax, VA 22030

## Tech stack

- **[React 19](https://react.dev/)** with TypeScript
- **[Vite 6](https://vitejs.dev/)** — dev server and bundler
- **[Tailwind CSS v4](https://tailwindcss.com/)** — design tokens via `@theme`
- **[React Router v7](https://reactrouter.com/)** — client-side routing
- A small custom design layer in `src/index.css` (navy/gold typography
  system, custom utility classes, reveal animations)

## Project structure

```
.
├── index.html               # SPA shell (mounts React)
├── public/
│   ├── favicon.svg
│   ├── logo.svg
│   ├── logo-mark.svg
│   └── images/              # Drop local image files here (see lib/images.ts)
├── src/
│   ├── main.tsx             # React + Router bootstrap
│   ├── App.tsx              # Routes
│   ├── index.css            # Tailwind v4 + theme + component styles
│   ├── components/
│   │   ├── Layout.tsx       # Site shell (Header + <Outlet/> + Footer)
│   │   ├── Header.tsx       # Top bar, brand, nav, mobile drawer
│   │   ├── Footer.tsx       # Footer with nav, practice, contact
│   │   ├── BrandMark.tsx    # Reusable logo glyph
│   │   └── Reveal.tsx       # Scroll-reveal wrapper (IntersectionObserver)
│   ├── lib/
│   │   ├── site.ts          # Brand + nav constants
│   │   ├── images.ts        # Centralized image store
│   │   └── usePageMeta.ts   # Per-page <title> / <meta description>
│   └── pages/
│       ├── Home.tsx
│       ├── Practice.tsx
│       ├── About.tsx
│       ├── Results.tsx
│       ├── Areas.tsx
│       ├── Contact.tsx
│       └── NotFound.tsx
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## Getting started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

The site is served at <http://localhost:5173/>.

### Production build

```bash
npm run build      # outputs to dist/
npm run preview    # serve the built site locally
```

> `npm run build` runs `tsc -b && vite build` — the TypeScript compiler
> validates types before Vite bundles, so type errors fail the build.

## Image store

Every image used on the site is registered in
[`src/lib/images.ts`](src/lib/images.ts) and imported directly into pages:

```tsx
import { images } from '@/lib/images';

<img src={images.attorney.portrait} alt="Bhavik D. Patel, Esq." />;
```

To swap an image, drop the file into `public/images/` and update one line
in `src/lib/images.ts` — every component that references the key picks it
up automatically. See [`public/images/README.md`](public/images/README.md)
for the full workflow.

## Practice areas

Bhavik's practice is focused on four core disciplines:

1. **Personal Injury** — auto, motorcycle, pedestrian, slip-and-fall,
   premises liability, catastrophic injury, wrongful death.
2. **Criminal Defense** — DUI, reckless driving, assault, theft, drug
   offenses; pretrial through jury trial.
3. **Divorce & Family Law** — contested and uncontested divorce, custody,
   support, equitable distribution, post-decree modifications.
4. **Civil Litigation** — contract, commercial loan, real estate and
   business disputes.

## Areas served

- **Virginia** — Fairfax, Arlington, Loudoun, Prince William and Fauquier
  counties.
- **Maryland** — Howard, Montgomery and Prince George's counties.

## License

All rights reserved. This site is for informational purposes only and does
not constitute legal advice. Prior results do not guarantee a similar
outcome.
