# Horizon Consults — Homepage

Static homepage (`index.html`, `assets/css/styles.css`, `assets/js/main.js`). No build step.

```bash
python3 -m http.server 8080
```

## Awaiting client HTML / approval

The client's source HTML was not available when this version was built. Sections marked
`DRAFT COPY` in `index.html` need the client's approved wording:

- **Problem section (legacy systems):** heading, intro and the five symptom descriptions.
- **Services:** service names, descriptions and bullet points. **Prices and delivery timelines are omitted on purpose.** Add them only once the client confirms them.
- **Delivery model:** the paragraph explaining the UK team and international engineering team.
- **Fractional team:** the five role descriptions come from the client brief and are still draft copy.
- **Contact form:** set `data-endpoint` on the form to the client's form handler. Contact details (address, phone, email) still need to be supplied.
