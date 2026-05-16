# Patel Law VA

The personal website of **Bhavik D. Patel, Esq.** — a Fairfax, Virginia
attorney serving clients across Northern Virginia and Maryland in personal
injury, criminal defense, divorce & family law, and civil litigation.

> Free, confidential consultation · Available 24/7 · No fee unless we win
> your injury case.
>
> **(703) 844-4519** · 10500 Sager Ave, Suite F, Fairfax, VA 22030

## Tech stack

- **[Vite](https://vitejs.dev/)** — multi-page bundler and dev server.
- **Vanilla HTML / CSS / JS** — no framework, no runtime dependencies.
- A custom design system in `src/style.css` (CSS custom properties, fluid
  type, responsive grid).
- A small JS layer in `src/` that mounts the shared header/footer, handles
  scroll reveals, the contact form, and a centralized image store.

## Project structure

```
.
├── index.html          # Home
├── practice.html       # Practice areas (4 sections)
├── about.html          # Attorney profile
├── results.html        # Representative case results
├── areas.html          # Geographic areas served
├── contact.html        # Contact form + office info
├── public/
│   ├── favicon.svg
│   ├── logo.svg
│   ├── logo-mark.svg
│   └── images/         # Drop local image files here (see images.js)
├── src/
│   ├── main.js         # Page bootstrap (binders, header/footer mount)
│   ├── components.js   # Header/footer markup + nav constants
│   ├── images.js       # Centralized image store (data-image="key.path")
│   └── style.css       # Design system + page styles
└── vite.config.js
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

## Image store

Every image used on the site is registered in [`src/images.js`](src/images.js)
and referenced from HTML via `data-image="key.path"`:

```html
<img data-image="attorney.portrait" alt="Bhavik D. Patel, Esq." />
```

To swap an image, drop the file into `public/images/` and update one line
in `src/images.js` — every page that references the key picks it up
automatically. See [`public/images/README.md`](public/images/README.md) for
the full workflow.

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
