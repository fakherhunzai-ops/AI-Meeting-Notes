# Horizon Consults homepage

A responsive, standalone recreation of the approved Horizon Consults homepage design.

The page is built with semantic HTML, modern CSS, inline SVG interface visuals, and a small amount of vanilla JavaScript for the responsive navigation, interactive service selector, and FAQ accordion. Geist is bundled locally, so no external font service is required.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite. A production build can be created with:

```bash
npm run build
```

## Structure

- `index.html` — complete homepage markup and inline visual composition
- `src/styles.css` — theme, typography, desktop/tablet/mobile layout
- `src/main.js` — navigation, service selection, FAQ, and section highlighting
- `src/fonts/` — locally bundled Geist variable font and license
- `vite.config.js` — development and preview server configuration for hosted previews

## Implemented interactions

- Sticky header and anchor navigation
- Responsive mobile menu with keyboard support
- Interactive core-service selector with a soft panel crossfade
- Keyboard-accessible FAQ accordion
- CTA and case-study hover states
- Visible focus states and reduced-motion support
