## Deployment and `base` / `homepage` configuration

- **Current setup**
  - Vite `base` is set in `vite.config.js` to `"/AWS-Resume-test-2/"`.
  - `homepage` in `package.json` is set to `https://Ronald-tino.github.io/AWS-Resume-test-2/`.

- **When to change these values**
  - If you move this React app into a different repository.
  - If you deploy it under a different GitHub Pages project name or a different path.

- **How to update**
  1. In `vite.config.js`, update:
     - `base: "/AWS-Resume-test-2/",`
     - to the new subpath you will use on GitHub Pages (or `/` if the app is served from the root).
  2. In `package.json`, update:
     - `"homepage": "https://Ronald-tino.github.io/AWS-Resume-test-2/",`
     - to the new full GitHub Pages URL for this app.

- **Notes**
  - `base` controls how Vite builds asset URLs.
  - `homepage` is used by `gh-pages` so the built static files resolve correctly when published.

