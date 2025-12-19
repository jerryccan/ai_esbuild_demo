# Rollup Lazy Loading Demo

This project demonstrates code-splitting and on-demand loading with Rollup by dynamically importing `lodash` from the app entry.

## Overview
- Entry: `index.ts` dynamically imports `lodash` and renders text to the page (`index.ts:4`).
- Build: Rollup outputs an ESM entry and separate hashed chunks for dynamic imports, configured via `chunkFileNames` in `rollup.config.mjs:25`.
- HTML: `index.html` loads the built entry from `./dist/index.js` (`index.html:11`).

## Requirements
- Node.js 18+ (Rollup v4 requires Node 18 or newer)

## Setup
```bash
npm install
npm run build
```

This generates build artifacts in `dist/` including:
- `index.js` (entry chunk)
- `lodash-<hash>.js` (lazy-loaded chunk)

## Run
Serve the project root with any static server, then open `index.html`:
- Python: `python3 -m http.server 8080`
- Node: `npx serve .` or `npx http-server .`

Directly opening the file from `file://` may work in some browsers, but using an HTTP server is recommended for ES module behavior.

## How It Works
- The app uses `await import("lodash")` for on-demand loading (`index.ts:4`).
- Rollup is configured for ESM output and hashed chunk names (`rollup.config.mjs:20-26`).
- Inline source maps are enabled for easier debugging (`rollup.config.mjs:23`).
- A simple cleaner plugin clears `dist` before builds (`rollup.config.mjs:10-16`).

## Scripts
- `npm run build` → `rollup -c` using `rollup.config.mjs` (`package.json:7`).

## Notes
- Bundle analysis summary is printed during build via `rollup-plugin-analyzer` (`rollup.config.mjs:32`).
