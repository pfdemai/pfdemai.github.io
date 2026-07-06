# Personal Landing Page

A single-page static site for a defensive-security (blue team) job search: hero, about, skills, featured GitHub projects, and contact sections.

Live at [pfdemai.github.io](https://pfdemai.github.io), served via GitHub Pages directly from this repo's `main` branch.

## About this repo

The code, copy, and translations in this repository were built with [Claude](https://claude.com/claude-code) (Anthropic) as an AI pair-programmer, working from the author's direction and content. Design decisions, content, and final review are the author's.

## Structure

- `index.html` — page markup and structure
- `styles.css` — all styling
- `script.js` — page behavior, plus the `TRANSLATIONS` object that holds all English/French copy (each key has an `en` and `fr` value; UI language toggles between them at runtime)
- `photo_cv.png` — profile photo used in the hero/about sections
- `docs/` — supporting documentation

Tool/technology names (Splunk, Python, MITRE ATT&CK, etc.) and project repo names are intentionally left untranslated and hardcoded in `index.html` rather than routed through `TRANSLATIONS`.

## Deployment

This repo is named `pfdemai.github.io` — GitHub's special naming convention for a user site. With GitHub Pages enabled (Settings → Pages, source: `main` branch, root directory), it serves directly at `https://pfdemai.github.io`, no custom domain required. Pushes to `main` deploy automatically within a few minutes.
