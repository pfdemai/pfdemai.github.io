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

- Replace all placeholder content in `index.html`: name, bio, stats, GitHub project links/descriptions, email, LinkedIn/GitHub URLs.
- Add a real `resume.pdf` to the repo root (linked from the Contact section) or remove that link.
- Replace the hero's placeholder photo circle (currently showing "AR" initials) with a real `<img>`: swap the `<span class="hero__photo-initials" aria-hidden="true">AR</span>` element for `<img src="photo.jpg" alt="" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">` inside `.hero__photo`, and update the `aria-label` on `.hero__photo` if needed.
