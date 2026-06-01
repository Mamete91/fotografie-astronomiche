# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static Italian-language astronomy photo gallery website. No build system, no package manager, no framework — just `index.html`, `styles.css`, `scripts.js`, and images in `images/`.

## Development

Serve locally with any static file server, for example:

```bash
python3 -m http.server 8080
# or
npx serve .
```

There are no tests, no linter, and no build step.

## Architecture

The site has three interconnected behaviors driven by `scripts.js`:

1. **Modal viewer** — clicking any `.photo-img` opens a full-screen modal (`#modal`) with the image and its `alt` text as caption.

2. **Deep-link via URL parameter** — on page load, `checkForImageParam()` reads `?image=<filename>` from the URL. If a matching `<img src="images/<filename>">` exists, the modal opens automatically and Open Graph meta tags are updated. This enables sharing a direct link to a specific photo.

3. **Share button** — each `.share-button` carries a `data-photo` attribute. On click it constructs `?image=<data-photo>`, updates OG meta tags, and invokes the Web Share API if available; otherwise it copies the URL to the clipboard.

## Adding a New Photo

1. Place the image file in `images/`.
2. Add a `<div class="photo">` block in `index.html` following the existing pattern.
3. Keep the `data-photo` attribute on the share button and the `src` attribute on the `<img>` **exactly consistent** — both must use the same filename string (including extension) because `scripts.js` uses `data-photo` to build the `?image=` URL and then looks up `img[src='images/${imageName}']`.

## Known Issue

Line 42 of `index.html` contains a malformed HTML comment fragment (`Condividi</a>Aggiungi altre foto in modo simile -->`) left inside `<main>`. It is rendered as visible text in some browsers. Fix by removing it or wrapping it in a proper `<!-- -->` comment.
