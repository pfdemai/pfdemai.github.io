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

## Before going live

- Replace all placeholder content in `index.html`: name, bio, stats, GitHub project links/descriptions, email, LinkedIn/GitHub URLs.
- Add a real `resume.pdf` to the repo root (linked from the Contact section) or remove that link.
