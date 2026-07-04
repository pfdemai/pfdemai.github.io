# Cybersecurity Job-Search Landing Page — Design Spec

## Purpose

A single-page personal site for a defensive/blue-team security job search. Audience: hiring managers, recruiters, and technical interviewers. Goal: establish credibility fast, showcase real GitHub work, and provide a clear path to contact.

## Content status

Placeholder copy will be final-quality (realistic bio, skills, project descriptions, stats) — not bracketed placeholders. The user will swap in real details (name, GitHub links, bio, resume/contact) after the build.

## Visual System

- **Background**: deep navy-charcoal (`#0b1120`), not pure black.
- **Accent colors**: electric cyan (`#22d3ee`, used for "system online" / interactive states, links, primary CTA) and muted amber (`#f5a524`, used for highlights, secondary badges, warning-style accents). Used sparingly against the dark base, not evenly distributed.
- **Typography**:
  - **Space Grotesk** — headlines and display text. Geometric, distinctive, avoids Inter/Roboto/system defaults.
  - **IBM Plex Mono** — nav, status badges, stat chips, tech-stack tags, labels. Reinforces the "console" feel.
  - **IBM Plex Sans** — body copy, for readability.
  - Loaded via Google Fonts `<link>` tags.
- **Texture**: subtle background grid pattern (CSS gradient/repeating-linear-gradient) plus a soft radial glow behind the hero, to create depth without imagery.

## Motion

One orchestrated page-load sequence in the hero (CSS `animation-delay` staggering, no JS scroll-jank):
1. Live-status dot blinks on (in the top bar badge).
2. Eyebrow tag ("DEFENSIVE SECURITY") fades up.
3. Headline lines stagger in.
4. Tagline types out via a monospace typewriter effect (small JS snippet).
5. CTA buttons fade up last.

A faint animated grid/radial-glow drifts slowly behind the hero (CSS keyframe, low-cost).

Below the fold, each section's card group reveals once via `IntersectionObserver` as a single staggered group (fade + slight rise) — not a per-icon "confetti" effect. Each section animates as one unit the first time it enters the viewport.

## Page Structure & Content

1. **Top bar**: name (placeholder, e.g. "Alex Rivera") + a blinking "STATUS: OPEN TO WORK" badge (cyan dot) + anchor nav linking to About / Skills / Projects / Contact. Sticky on scroll.
2. **Hero**: eyebrow ("DEFENSIVE SECURITY ENGINEER"), name + role headline, one-line pitch (placeholder, realistic — e.g. focused on detection engineering and incident response), two CTAs: "View Projects" (scrolls to Projects) and "Contact Me" (scrolls to Contact or mailto).
3. **About**: 2–3 sentence bio blurb (placeholder, final-quality) + a small stat strip (e.g. years of experience, certifications held, incidents/detections shipped — placeholder numbers presented as monospace stat chips).
4. **Skills grid**: categorized badge cards, four categories:
   - SIEM & Detection (e.g. Splunk, Elastic, Sigma rules)
   - Threat Hunting & IR (e.g. MITRE ATT&CK, memory forensics, EDR triage)
   - Scripting & Automation (e.g. Python, PowerShell, detection-as-code)
   - Certifications (e.g. placeholder certs like Security+, GCIH, etc.)
5. **Featured GitHub projects**: 3–4 cards. Each has: project name, one-line description (placeholder, realistic — e.g. a Sigma rule pack, a log-parsing tool, a home-lab SOC setup), tech-stack chips (mono badges), and a "View on GitHub →" link (placeholder `href="#"` / `https://github.com/username/repo` pattern, to be swapped with real repo URLs).
6. **Contact/footer**: email (placeholder), LinkedIn, GitHub profile link, resume link/button, short closing line.

## Technical Structure

- **Files**: `index.html`, `styles.css`, `script.js` (typewriter effect + `IntersectionObserver` reveal logic), `CNAME` (placeholder domain, to be replaced with the user's actual domain).
- **No build step.** Plain static files.
- **Hosting**: GitHub repository → GitHub Pages, with the custom domain configured via the `CNAME` file and DNS records pointed at GitHub Pages (to be done by the user once the domain is purchased).
- Fully responsive (mobile-first), semantic HTML, accessible markup (heading hierarchy, alt text where relevant, sufficient contrast against the dark background, keyboard-navigable nav/CTAs, tap targets ≥44px).

## Out of scope

- No backend, forms, or contact-form submission handling (contact is via mailto/links only).
- No CMS or build tooling.
- No additional pages beyond the single landing page (no blog, no separate project detail pages).
- No real personal content — that's a follow-up step for the user after the build.
