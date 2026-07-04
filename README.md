# Personal Landing Page

A single-page static site for a defensive-security (blue team) job search: hero, about, skills, featured GitHub projects, and contact sections.

## Local preview

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploying to GitHub Pages with a custom domain

1. Push this repository to GitHub.
2. In the repo's Settings → Pages, set the source to the `main` branch, root directory.
3. Replace the placeholder domain in `CNAME` with your purchased domain, commit, and push.
4. At your domain registrar, add the DNS records GitHub Pages requires (an `A` record set pointing at GitHub's Pages IPs, or a `CNAME` record pointing at `<your-github-username>.github.io`, per [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)).
5. Back in Settings → Pages, enter your custom domain and enable "Enforce HTTPS" once DNS has propagated.

## Editing translations

All English and French copy lives in the `TRANSLATIONS` object at the top of `script.js`. Each key (e.g. `heroTagline`, `aboutBio`) has an `en` and `fr` value; edit the strings there rather than in `index.html`. Tool/technology names (Splunk, Python, MITRE ATT&CK, etc.) and project repo names are intentionally left untranslated in the HTML directly and have no corresponding translation key.

## Before going live

- Update the three project GitHub links: they currently point to placeholder URLs (`https://github.com/pfdemai/blue-team-writeups`, `https://github.com/pfdemai/homelab-infrastructure`, `https://github.com/pfdemai/accountability-bot`) — replace the `href` on each `.project-card__link` in `index.html` once the real repos exist.
- Replace the LinkedIn placeholder link (`https://linkedin.com/in/username` in the Contact section of `index.html`) with your real profile URL.
- Add a real `resume.pdf` to the repo root (linked from the Contact section) or remove that link.
- Replace the placeholder domain in `CNAME` once you've purchased one (see "Deploying to GitHub Pages" above).
- Once ISC2 CC / CompTIA Security+ are obtained, drop the "(in progress)" suffix on those two entries in the Certifications & Training skill card (`index.html` and both `en`/`fr` entries for `skillItemCert1`/`skillItemCert2` in `script.js`).
