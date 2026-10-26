# UK accountability delivery section

A responsive, standalone recreation of the **“UK accountability. Senior international engineering.”** section, including the requested **Product & Project Management** capability in the Senior Delivery Team card.

The section is built with semantic HTML, modern CSS, and an inline SVG delivery-system diagram. Geist is bundled locally, so no external font service is required.

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

- `index.html` — section markup and delivery-system SVG
- `src/styles.css` — theme, typography, desktop/tablet/mobile layout
- `src/fonts/` — locally bundled Geist variable font and license
