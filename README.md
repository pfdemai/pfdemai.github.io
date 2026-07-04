# Personal Landing Page

A single-page static site for a defensive-security (blue team) job search: hero, about, skills, featured GitHub projects, and contact sections.

## About this repo

The code, copy, and translations in this repository were built with [Claude](https://claude.com/claude-code) (Anthropic) as an AI pair-programmer, working from my direction and content. Design decisions, content, and final review are mine.

## Local preview

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploying to GitHub Pages

This repo is named `pfdemai.github.io`, GitHub's special naming convention for a user site — once Pages is enabled, it serves directly at `https://pfdemai.github.io` with no custom domain needed.

1. Push this repository to GitHub as a public repo named exactly `pfdemai.github.io`.
2. In the repo's Settings → Pages, set the source to the `main` branch, root directory.
3. The site goes live at `https://pfdemai.github.io` within a few minutes.

### Adding a custom domain later (optional)

If you buy a domain down the line: add a `CNAME` file to the repo root containing just the domain (e.g. `alexrivera.dev`), add the DNS records GitHub Pages requires at your registrar (an `A` record set pointing at GitHub's Pages IPs, or a `CNAME` record pointing at `pfdemai.github.io`, per [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)), then enter the domain in Settings → Pages and enable "Enforce HTTPS" once DNS has propagated.

## Editing translations

All English and French copy lives in the `TRANSLATIONS` object at the top of `script.js`. Each key (e.g. `heroTagline`, `aboutBio`) has an `en` and `fr` value; edit the strings there rather than in `index.html`. Tool/technology names (Splunk, Python, MITRE ATT&CK, etc.) and project repo names are intentionally left untranslated in the HTML directly and have no corresponding translation key.

## Before going live

- Update the three project GitHub links: they currently point to placeholder URLs (`https://github.com/pfdemai/blue-team-writeups`, `https://github.com/pfdemai/homelab-infrastructure`, `https://github.com/pfdemai/accountability-bot`) — replace the `href` on each `.project-card__link` in `index.html` once the real repos exist.
- Replace the LinkedIn placeholder link (`https://linkedin.com/in/username` in the Contact section of `index.html`) with your real profile URL.
- Add a real `resume.pdf` to the repo root (linked from the Contact section) or remove that link.
- Once ISC2 CC / CompTIA Security+ are obtained, drop the "(in progress)" suffix on those two entries in the Certifications & Training skill card (`index.html` and both `en`/`fr` entries for `skillItemCert1`/`skillItemCert2` in `script.js`).
