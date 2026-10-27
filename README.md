# Horizon Consults website

A responsive, standalone implementation of the approved Horizon Consults homepage and a complete set of linked website pages.

The site is built with semantic HTML, modern CSS, inline SVG interface visuals, and a small vanilla-JavaScript SPA router. Geist is bundled locally, and no external font, image, UI, or animation services are required.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite. A production build can be created with:

```bash
npm run build
```

## Routes

- `/` — approved homepage
- `/services` — services overview
- `/services/<service>` — 15 service detail pages
- `/how-we-work` — discovery, process, governance and delivery model
- `/case-studies` — case-study listing with filters
- `/case-studies/<slug>` — case-study detail pages
- `/insights` — insight listing with category filters
- `/insights/<slug>` — insight article pages
- `/about`, `/capabilities`, `/contact`, `/book-a-call`, `/legal`

Unknown paths render an intentional 404 page.

## Structure

- `index.html` — approved homepage markup, shared header, dropdown shells and footer
- `src/styles.css` — approved homepage visual system
- `src/site.css` — site-wide navigation, routed pages, forms and interactions
- `src/main.js` — SPA router, dropdowns, mobile navigation, service panel, FAQ, problem rows, filters and forms
- `src/site-data.js` — shared content model for services, case studies, insights, capabilities and routes
- `src/site-pages.js` — route templates and page rendering
- `src/fonts/` — locally bundled Geist variable font and license
- `vite.config.js` — preview-safe SPA development server
- `public/_redirects`, `vercel.json`, `netlify.toml` — production SPA fallback configuration

## Interactions

- Sticky header with anchor-safe SPA navigation
- Services mega-menu and Company dropdown with hover, click, keyboard, outside-click and Escape behavior
- Mobile navigation with all 15 services grouped by practice
- Interactive homepage problem rows, service selector and FAQ accordion
- Route-page FAQ accordions, case-study/insight filters and related-content links
- Contact and booking forms with validation, loading, error and success states
- Visible focus states and reduced-motion support

## Integration note

No verified phone number, email address, booking URL, company registration number or live form endpoint is included. Contact and booking forms prepare a local draft and expose copy/download actions; a production endpoint can be connected without displaying placeholder data as real contact information.
