# Technology logo artwork

These PNGs identify technologies used in the portfolio, without implying endorsement.
Names and marks belong to their respective owners.

`sources.json` records the exact, pinned upstream URL for every PNG. Most images
come from [Dashboard Icons](https://github.com/homarr-labs/dashboard-icons).
JavaScript comes from [Programming Languages Logos](https://github.com/abranhe/programming-languages-logos).
Elysia comes from its [documentation repository](https://github.com/elysiajs/documentation).
The remaining marks come from [Devicon](https://github.com/devicons/devicon).
Copies of the upstream licenses are included in this directory.

Processing: upstream PNGs and SVGs were proportionally fitted inside transparent
128 × 128 PNG canvases. Colors and artwork were not redrawn or recolored.
The UI adds a separate neutral background; it is not part of the logo artwork.

To reproduce the PNGs and source records from the repository root:

```sh
node scripts/fetch-skill-logos.mjs
```

Legacy SVG files are retained for now; the technology components use local PNGs.
