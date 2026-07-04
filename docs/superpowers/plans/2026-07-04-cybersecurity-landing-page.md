# Cybersecurity Job-Search Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single static-HTML landing page for a defensive-security (blue team) job search, with a dark "SOC dashboard" aesthetic, one orchestrated hero load-in animation, and featured GitHub project cards.

**Architecture:** Three flat files — `index.html` (all semantic content), `styles.css` (all visual styling, animations, responsive rules), `script.js` (the hero typewriter effect and the below-the-fold scroll-reveal). No build step, no framework, no dependencies. Deployed to GitHub Pages via a `CNAME` file.

**Tech Stack:** Plain HTML5, CSS3 (custom properties, `@keyframes`, `IntersectionObserver`-driven classes), vanilla JS. Fonts via Google Fonts `<link>` tags (Space Grotesk, IBM Plex Mono, IBM Plex Sans).

## Global Constraints

- Palette: background `#0b1120`, elevated surface `#111827`, accent cyan `#22d3ee`, accent amber `#f5a524`, text primary `#e2e8f0`, text secondary `#94a3b8`, border `rgba(148, 163, 184, 0.12)` — exact values, defined as CSS custom properties in `:root`.
- Fonts: **Space Grotesk** (headlines), **IBM Plex Mono** (labels/badges/nav/stats), **IBM Plex Sans** (body) — no Inter/Roboto/Arial/system-ui.
- No bracketed or Lorem Ipsum placeholder copy anywhere — all copy is final-quality placeholder text (to be swapped for the user's real details later), exactly as specified in each task.
- Mobile-first responsive: base styles target mobile, `min-width` media queries add multi-column layouts. All tap targets ≥44px (`.btn` enforces `min-height: 44px`).
- Respect `prefers-reduced-motion: reduce` — all animations must be disabled/short-circuited for users who request it.
- **No test framework or build tooling is introduced.** This is a static visual site with no business logic beyond animation timing, so each task's "test cycle" is: (a) a `grep`-based structural assertion on the file (automatable, exact expected output given), and (b) a manual browser check via a local static server (`python3 -m http.server 8000`), with an exact checklist of what to look for. This is the appropriate verification method for this kind of deliverable — do not add Jest/Playwright/etc.
- Single source of truth for the full target markup/styles/script is given inline in each task's code blocks — do not paraphrase or invent structure not shown here.

---

## File Structure

- `index.html` — all page content and structure (topbar, hero, about, skills, projects, contact, footer). Created fully in Task 1; later tasks only add CSS classes are already present from Task 1 and are not re-created.
- `styles.css` — created empty-ready in Task 2, then extended section-by-section in Tasks 2–8.
- `script.js` — created in Task 5 (typewriter) and extended in Task 9 (scroll reveal).
- `CNAME` — single line, the user's future custom domain (placeholder). Created in Task 10.
- `README.md` — short deployment instructions for GitHub Pages + custom domain. Created in Task 10.

---

### Task 1: HTML skeleton with full final-quality placeholder content

**Files:**
- Create: `index.html`

**Interfaces:**
- Produces: every element ID and class name every later CSS/JS task depends on: `#typewriter`, `.topbar`, `.status-badge`, `.status-badge__dot`, `.hero`, `.hero__bg`, `.hero__inner`, `.hero__eyebrow`, `.hero__name`, `.hero__role`, `.hero__tagline`, `.hero__ctas`, `.reveal-item`, `.section__inner`, `.reveal-group`, `.section__eyebrow`, `.section__title`, `.about__bio`, `.stat-strip`, `.stat-chip`, `.stat-chip__value`, `.stat-chip__label`, `.skills__grid`, `.skill-card`, `.skill-card__title`, `.skill-card__list`, `.projects__grid`, `.project-card`, `.project-card__name`, `.project-card__desc`, `.project-card__tags`, `.tag`, `.project-card__link`, `.contact__line`, `.contact__links`, `.site-footer`, `.site-footer__status`, `.btn`, `.btn--primary`, `.btn--ghost`.

- [ ] **Step 1: Write `index.html`**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alex Rivera — Defensive Security Engineer</title>
  <meta name="description" content="Alex Rivera is a defensive security engineer specializing in detection engineering, threat hunting, and incident response.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="topbar">
    <div class="topbar__inner">
      <a class="topbar__logo" href="#top">AR<span class="dot">.</span></a>
      <nav class="topbar__nav" aria-label="Primary">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
      <span class="status-badge">
        <span class="status-badge__dot" aria-hidden="true"></span>
        STATUS: OPEN TO WORK
      </span>
    </div>
  </header>

  <main id="top">
    <section class="hero" id="hero">
      <div class="hero__bg" aria-hidden="true"></div>
      <div class="hero__inner">
        <p class="hero__eyebrow reveal-item">DEFENSIVE SECURITY / BLUE TEAM</p>
        <h1 class="hero__name reveal-item">Alex Rivera</h1>
        <p class="hero__role reveal-item">Blue Team Engineer — Detection &amp; Incident Response</p>
        <p class="hero__tagline reveal-item">
          <span id="typewriter"></span><span class="cursor" aria-hidden="true">▌</span>
        </p>
        <div class="hero__ctas reveal-item">
          <a class="btn btn--primary" href="#projects">View Projects</a>
          <a class="btn btn--ghost" href="#contact">Contact Me</a>
        </div>
      </div>
    </section>

    <section class="about" id="about">
      <div class="section__inner reveal-group">
        <p class="section__eyebrow">ABOUT</p>
        <h2 class="section__title">About Me</h2>
        <p class="about__bio">
          I'm a defensive security engineer focused on detection engineering, threat hunting, and
          incident response. I spend my days writing Sigma rules, tuning SIEM alerts, and chasing
          down the alerts that turn out to matter. Off the clock, I run a home SOC lab to test
          attacker techniques against my own detections before they show up in the wild.
        </p>
        <div class="stat-strip">
          <div class="stat-chip"><span class="stat-chip__value">4+</span><span class="stat-chip__label">Years in Security</span></div>
          <div class="stat-chip"><span class="stat-chip__value">12</span><span class="stat-chip__label">Detections Shipped</span></div>
          <div class="stat-chip"><span class="stat-chip__value">3</span><span class="stat-chip__label">Certifications</span></div>
          <div class="stat-chip"><span class="stat-chip__value">1</span><span class="stat-chip__label">Home SOC Lab</span></div>
        </div>
      </div>
    </section>

    <section class="skills" id="skills">
      <div class="section__inner reveal-group">
        <p class="section__eyebrow">SKILLS</p>
        <h2 class="section__title">Tools &amp; Tradecraft</h2>
        <div class="skills__grid">
          <div class="skill-card">
            <h3 class="skill-card__title">SIEM &amp; Detection</h3>
            <ul class="skill-card__list">
              <li>Splunk</li>
              <li>Elastic Stack</li>
              <li>Sigma Rules</li>
              <li>Detection-as-Code</li>
              <li>Microsoft Sentinel</li>
            </ul>
          </div>
          <div class="skill-card">
            <h3 class="skill-card__title">Threat Hunting &amp; IR</h3>
            <ul class="skill-card__list">
              <li>MITRE ATT&amp;CK</li>
              <li>Memory Forensics</li>
              <li>EDR Triage</li>
              <li>Log Correlation</li>
              <li>Timeline Analysis</li>
            </ul>
          </div>
          <div class="skill-card">
            <h3 class="skill-card__title">Scripting &amp; Automation</h3>
            <ul class="skill-card__list">
              <li>Python</li>
              <li>PowerShell</li>
              <li>Bash</li>
              <li>KQL</li>
              <li>SOAR Playbooks</li>
            </ul>
          </div>
          <div class="skill-card">
            <h3 class="skill-card__title">Certifications</h3>
            <ul class="skill-card__list">
              <li>CompTIA Security+</li>
              <li>GCIH</li>
              <li>Blue Team Level 1 (BTL1)</li>
              <li>AWS Security Fundamentals</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="projects" id="projects">
      <div class="section__inner reveal-group">
        <p class="section__eyebrow">PROJECTS</p>
        <h2 class="section__title">Featured GitHub Projects</h2>
        <div class="projects__grid">
          <article class="project-card">
            <h3 class="project-card__name">sigma-detection-pack</h3>
            <p class="project-card__desc">
              A curated set of Sigma rules for detecting common lateral-movement and persistence
              techniques, mapped to MITRE ATT&amp;CK.
            </p>
            <div class="project-card__tags">
              <span class="tag">Sigma</span>
              <span class="tag">YAML</span>
              <span class="tag">MITRE ATT&amp;CK</span>
            </div>
            <a class="project-card__link" href="https://github.com/username/sigma-detection-pack">View on GitHub &rarr;</a>
          </article>
          <article class="project-card">
            <h3 class="project-card__name">logparse-toolkit</h3>
            <p class="project-card__desc">
              Python toolkit for normalizing and correlating logs from mismatched EDR and firewall
              exports during incident response.
            </p>
            <div class="project-card__tags">
              <span class="tag">Python</span>
              <span class="tag">Log Analysis</span>
              <span class="tag">IR</span>
            </div>
            <a class="project-card__link" href="https://github.com/username/logparse-toolkit">View on GitHub &rarr;</a>
          </article>
          <article class="project-card">
            <h3 class="project-card__name">home-soc-lab</h3>
            <p class="project-card__desc">
              Infrastructure-as-code for a home SOC lab: Elastic stack, Sysmon-instrumented Windows
              hosts, and a simulated attacker range.
            </p>
            <div class="project-card__tags">
              <span class="tag">Terraform</span>
              <span class="tag">Elastic</span>
              <span class="tag">Sysmon</span>
            </div>
            <a class="project-card__link" href="https://github.com/username/home-soc-lab">View on GitHub &rarr;</a>
          </article>
          <article class="project-card">
            <h3 class="project-card__name">ir-playbooks</h3>
            <p class="project-card__desc">
              Incident response playbooks and SOAR automation scripts for common alert types, built
              to cut triage time.
            </p>
            <div class="project-card__tags">
              <span class="tag">PowerShell</span>
              <span class="tag">SOAR</span>
              <span class="tag">Automation</span>
            </div>
            <a class="project-card__link" href="https://github.com/username/ir-playbooks">View on GitHub &rarr;</a>
          </article>
        </div>
      </div>
    </section>

    <section class="contact" id="contact">
      <div class="section__inner reveal-group">
        <p class="section__eyebrow">CONTACT</p>
        <h2 class="section__title">Let's Talk</h2>
        <p class="contact__line">Open to blue team, detection engineering, and incident response roles.</p>
        <div class="contact__links">
          <a class="btn btn--primary" href="mailto:alex.rivera@example.com">Email Me</a>
          <a class="btn btn--ghost" href="https://linkedin.com/in/username">LinkedIn</a>
          <a class="btn btn--ghost" href="https://github.com/username">GitHub</a>
          <a class="btn btn--ghost" href="resume.pdf">Resume</a>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>&copy; 2026 Alex Rivera. Built with static HTML, CSS, and JS.</p>
    <p class="site-footer__status">Status: Actively interviewing.</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify structure with grep assertions**

Run: `grep -c 'class="reveal-item"' index.html` is wrong (class contains other tokens) — instead run:

```bash
grep -o 'reveal-item' index.html | wc -l
```
Expected: `5` (eyebrow, name, role, tagline, ctas)

```bash
grep -o 'reveal-group' index.html | wc -l
```
Expected: `4` (about, skills, projects, contact)

```bash
grep -c '<h1' index.html
```
Expected: `1`

```bash
grep -c 'project-card__name' index.html
```
Expected: `4`

- [ ] **Step 3: Manual browser check**

Run: `python3 -m http.server 8000` from the project directory, then open `http://localhost:8000` in a browser.

Confirm:
- Page loads with no console errors (unstyled, since `styles.css`/`script.js` don't exist yet — a 404 in the network tab for those two files is expected and fine at this stage).
- All text content is present and in reading order: topbar → hero → about → skills → projects → contact → footer.
- No bracketed placeholders or "Lorem ipsum" visible anywhere.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Add landing page HTML skeleton with placeholder content"
```

---

### Task 2: Global CSS foundation — reset, variables, typography, buttons

**Files:**
- Create: `styles.css`

**Interfaces:**
- Consumes: class names produced in Task 1 (`.btn`, `.btn--primary`, `.btn--ghost`, `.section__inner`, `.section__eyebrow`, `.section__title`).
- Produces: CSS custom properties every later task relies on: `--color-bg`, `--color-bg-elevated`, `--color-grid-line`, `--color-text-primary`, `--color-text-secondary`, `--color-accent-cyan`, `--color-accent-cyan-dim`, `--color-accent-amber`, `--color-accent-amber-dim`, `--color-border`, `--font-display`, `--font-mono`, `--font-body`, `--radius`, `--max-width`.

- [ ] **Step 1: Write the foundation layer of `styles.css`**

```css
/* ---------- Reset & Variables ---------- */
*, *::before, *::after {
  box-sizing: border-box;
}

:root {
  --color-bg: #0b1120;
  --color-bg-elevated: #111827;
  --color-grid-line: rgba(148, 163, 184, 0.06);
  --color-text-primary: #e2e8f0;
  --color-text-secondary: #94a3b8;
  --color-accent-cyan: #22d3ee;
  --color-accent-cyan-dim: rgba(34, 211, 238, 0.15);
  --color-accent-amber: #f5a524;
  --color-accent-amber-dim: rgba(245, 165, 36, 0.15);
  --color-border: rgba(148, 163, 184, 0.12);
  --font-display: 'Space Grotesk', sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;
  --font-body: 'IBM Plex Sans', sans-serif;
  --radius: 10px;
  --max-width: 1100px;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

h1, h2, h3 {
  font-family: var(--font-display);
  margin: 0;
}

.section__inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 4rem 1.5rem;
}

.section__eyebrow {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.15em;
  color: var(--color-accent-cyan);
  margin: 0 0 0.75rem;
}

.section__title {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  margin-bottom: 2rem;
}

/* ---------- Buttons ---------- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  font-family: var(--font-mono);
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid transparent;
  transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease;
}

.btn:hover, .btn:focus-visible {
  transform: translateY(-2px);
}

.btn--primary {
  background: var(--color-accent-cyan);
  color: #0b1120;
}

.btn--primary:hover, .btn--primary:focus-visible {
  background: #67e8f9;
}

.btn--ghost {
  border-color: var(--color-border);
  color: var(--color-text-primary);
}

.btn--ghost:hover, .btn--ghost:focus-visible {
  border-color: var(--color-accent-cyan);
  color: var(--color-accent-cyan);
}
```

- [ ] **Step 2: Verify with grep**

```bash
grep -c -- '--color-accent-cyan:' styles.css
```
Expected: `1`

```bash
grep -c 'Space Grotesk' styles.css
```
Expected: `1`

- [ ] **Step 3: Manual browser check**

Reload `http://localhost:8000`. Confirm: dark navy background, light text, buttons in hero/contact show cyan-filled and outlined ghost styles, headings render in a distinct geometric display font (Space Grotesk), no console errors for `styles.css` (404 for `script.js` is still expected/fine).

- [ ] **Step 4: Commit**

```bash
git add styles.css
git commit -m "Add global CSS foundation: variables, typography, buttons"
```

---

### Task 3: Top bar styling + status badge blink animation

**Files:**
- Modify: `styles.css` (append)

**Interfaces:**
- Consumes: `.topbar`, `.topbar__inner`, `.topbar__logo`, `.dot`, `.topbar__nav`, `.status-badge`, `.status-badge__dot` from Task 1; `--color-*`, `--font-*`, `--max-width`, `--color-border` from Task 2.

- [ ] **Step 1: Append top-bar styles to `styles.css`**

```css
/* ---------- Top bar ---------- */
.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(11, 17, 32, 0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-border);
}

.topbar__inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.topbar__logo {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.25rem;
}

.topbar__logo .dot {
  color: var(--color-accent-cyan);
}

.topbar__nav {
  display: flex;
  gap: 1.5rem;
  font-family: var(--font-mono);
  font-size: 0.85rem;
}

.topbar__nav a {
  color: var(--color-text-secondary);
  transition: color 0.15s ease;
}

.topbar__nav a:hover, .topbar__nav a:focus-visible {
  color: var(--color-text-primary);
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: var(--color-accent-cyan);
  border: 1px solid var(--color-accent-cyan-dim);
  background: var(--color-accent-cyan-dim);
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
}

.status-badge__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-accent-cyan);
  animation: blink 2s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.5); }
  50% { opacity: 0.4; box-shadow: 0 0 0 4px rgba(34, 211, 238, 0); }
}

@media (prefers-reduced-motion: reduce) {
  .status-badge__dot {
    animation: none;
  }
}
```

- [ ] **Step 2: Verify with grep**

```bash
grep -c '@keyframes blink ' styles.css
```
Expected: `1` (note the trailing space distinguishes it from `blink-cursor`, added in Task 4 — if Task 4 hasn't run yet, plain `grep -c '@keyframes blink'` also returns `1` at this point)

- [ ] **Step 3: Manual browser check**

Reload the page. Confirm: top bar is sticky (stays visible when scrolling down), the "STATUS: OPEN TO WORK" dot pulses/blinks continuously, nav links change color on hover.

- [ ] **Step 4: Commit**

```bash
git add styles.css
git commit -m "Style top bar with sticky nav and blinking status badge"
```

---

### Task 4: Hero section styling + load-in animation

**Files:**
- Modify: `styles.css` (append)

**Interfaces:**
- Consumes: `.hero`, `.hero__bg`, `.hero__inner`, `.hero__eyebrow`, `.hero__name`, `.hero__role`, `.hero__tagline`, `.cursor`, `.hero__ctas`, `.reveal-item` from Task 1.
- Produces: `.reveal-item` base animation and per-element `animation-delay` timing that Task 5's typewriter JS timing must stay compatible with (typewriter must not start before the tagline has faded in, i.e. not before `0.7s` delay + `0.6s` duration ≈ `1.3s`).

- [ ] **Step 1: Append hero styles to `styles.css`**

```css
/* ---------- Hero ---------- */
.hero {
  position: relative;
  overflow: hidden;
  padding: 6rem 1.5rem 5rem;
  display: flex;
  justify-content: center;
}

.hero__bg {
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(0deg, var(--color-grid-line) 0, var(--color-grid-line) 1px, transparent 1px, transparent 48px),
    repeating-linear-gradient(90deg, var(--color-grid-line) 0, var(--color-grid-line) 1px, transparent 1px, transparent 48px),
    radial-gradient(circle at 50% 20%, rgba(34, 211, 238, 0.12), transparent 60%);
  animation: drift 18s ease-in-out infinite alternate;
}

@keyframes drift {
  from { transform: translate(0, 0); }
  to { transform: translate(-20px, 20px); }
}

.hero__inner {
  position: relative;
  max-width: 720px;
  text-align: center;
}

.hero__eyebrow {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  color: var(--color-accent-amber);
  margin: 0 0 1.25rem;
}

.hero__name {
  font-size: clamp(2.5rem, 7vw, 4rem);
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.hero__role {
  font-size: clamp(1.1rem, 3vw, 1.4rem);
  color: var(--color-text-secondary);
  margin: 0 0 1.5rem;
  font-weight: 500;
}

.hero__tagline {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--color-accent-cyan);
  min-height: 1.5em;
  margin: 0 0 2.5rem;
}

.cursor {
  animation: blink-cursor 1s step-end infinite;
}

@keyframes blink-cursor {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.hero__ctas {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Hero load-in stagger */
.reveal-item {
  opacity: 0;
  transform: translateY(16px);
  animation: reveal-up 0.6s ease forwards;
}

.hero__eyebrow.reveal-item { animation-delay: 0.1s; }
.hero__name.reveal-item { animation-delay: 0.3s; }
.hero__role.reveal-item { animation-delay: 0.5s; }
.hero__tagline.reveal-item { animation-delay: 0.7s; }
.hero__ctas.reveal-item { animation-delay: 1.5s; }

@keyframes reveal-up {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal-item, .cursor, .hero__bg {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
```

- [ ] **Step 2: Verify with grep**

```bash
grep -c 'animation-delay: 1.5s' styles.css
```
Expected: `1`

```bash
grep -c '@keyframes reveal-up' styles.css
```
Expected: `1`

- [ ] **Step 3: Manual browser check**

Hard-reload `http://localhost:8000` (disable cache or use a private window so the load-in plays from the start). Confirm, in order: eyebrow text fades up first, then the name, then the role line, then the tagline row (still empty — typewriter JS isn't wired until Task 5), then the two CTA buttons fade up last around 1.5s. Confirm the faint grid/glow background is visible and drifts slowly. Confirm the blinking text cursor next to the empty tagline space.

- [ ] **Step 4: Commit**

```bash
git add styles.css
git commit -m "Style hero section with staggered load-in animation"
```

---

### Task 5: Hero typewriter effect (JS)

**Files:**
- Create: `script.js`

**Interfaces:**
- Consumes: `#typewriter` element ID from Task 1; must not run its `setTimeout` chain before the tagline `.reveal-item` finishes fading in (~1.3s), so `TYPE_START_DELAY_MS` is set to `1500`.
- Produces: `TYPEWRITER_TEXT`, `TYPE_SPEED_MS`, `TYPE_START_DELAY_MS` constants and a `typewrite(el, text, speed)` function — not consumed by later tasks, but must not be renamed since Task 9 appends to this same file and must not collide with these names.

- [ ] **Step 1: Write `script.js`**

```js
const TYPEWRITER_TEXT = "I build detections that catch what signatures miss.";
const TYPE_SPEED_MS = 45;
const TYPE_START_DELAY_MS = 1500;

function typewrite(el, text, speed) {
  let i = 0;
  function step() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i += 1;
      setTimeout(step, speed);
    }
  }
  step();
}

function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = TYPEWRITER_TEXT;
    return;
  }
  setTimeout(() => typewrite(el, TYPEWRITER_TEXT, TYPE_SPEED_MS), TYPE_START_DELAY_MS);
}

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
});
```

- [ ] **Step 2: Verify with grep**

```bash
grep -c 'function typewrite' script.js
```
Expected: `1`

- [ ] **Step 3: Manual browser check**

Hard-reload `http://localhost:8000`. Confirm: after the hero load-in finishes, the tagline "I build detections that catch what signatures miss." types out character by character next to the blinking cursor. Open browser dev tools, set "Emulate CSS media feature prefers-reduced-motion: reduce", reload, and confirm the tagline appears instantly (no typing animation).

- [ ] **Step 4: Commit**

```bash
git add script.js
git commit -m "Add hero tagline typewriter effect"
```

---

### Task 6: About + Skills section styling

**Files:**
- Modify: `styles.css` (append)

**Interfaces:**
- Consumes: `.about__bio`, `.stat-strip`, `.stat-chip`, `.stat-chip__value`, `.stat-chip__label`, `.skills__grid`, `.skill-card`, `.skill-card__title`, `.skill-card__list` from Task 1.

- [ ] **Step 1: Append About + Skills styles to `styles.css`**

```css
/* ---------- About ---------- */
.about__bio {
  max-width: 640px;
  color: var(--color-text-secondary);
  font-size: 1.05rem;
  margin-bottom: 2.5rem;
}

.stat-strip {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stat-chip {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1.25rem;
  text-align: center;
}

.stat-chip__value {
  display: block;
  font-family: var(--font-mono);
  font-size: 1.5rem;
  color: var(--color-accent-cyan);
  font-weight: 600;
}

.stat-chip__label {
  display: block;
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  margin-top: 0.25rem;
}

/* ---------- Skills ---------- */
.skills__grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr;
}

.skill-card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1.5rem;
}

.skill-card__title {
  font-size: 1.05rem;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
}

.skill-card__list li {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  padding: 0.35rem 0;
  border-top: 1px solid var(--color-border);
}

.skill-card__list li:first-child {
  border-top: none;
}

@media (min-width: 640px) {
  .stat-strip {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 720px) {
  .skills__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .skills__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

- [ ] **Step 2: Verify with grep**

```bash
grep -c '.stat-chip__value' styles.css
```
Expected: `1`

```bash
grep -c 'grid-template-columns: repeat(4, 1fr);' styles.css
```
Expected: `2` (stat-strip at 640px, skills grid at 1024px)

- [ ] **Step 3: Manual browser check**

Reload and scroll to About/Skills. Confirm: bio paragraph is readable width, four stat chips show in a row on desktop width and stack 2-per-row on a narrow (<640px) viewport, skills show as four cards in a row on desktop (≥1024px), 2 per row on tablet (720–1023px), and 1 per row on mobile (<720px). Resize the browser window to confirm each breakpoint.

- [ ] **Step 4: Commit**

```bash
git add styles.css
git commit -m "Style about and skills sections with responsive grids"
```

---

### Task 7: Projects section styling

**Files:**
- Modify: `styles.css` (append)

**Interfaces:**
- Consumes: `.projects__grid`, `.project-card`, `.project-card__name`, `.project-card__desc`, `.project-card__tags`, `.tag`, `.project-card__link` from Task 1.

- [ ] **Step 1: Append Projects styles to `styles.css`**

```css
/* ---------- Projects ---------- */
.projects__grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr;
}

.project-card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.project-card__name {
  font-family: var(--font-mono);
  font-size: 1.05rem;
  color: var(--color-text-primary);
}

.project-card__desc {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  margin: 0;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-accent-amber);
  background: var(--color-accent-amber-dim);
  border-radius: 999px;
  padding: 0.25rem 0.65rem;
}

.project-card__link {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--color-accent-cyan);
  margin-top: auto;
  transition: opacity 0.15s ease;
}

.project-card__link:hover, .project-card__link:focus-visible {
  opacity: 0.75;
}

@media (min-width: 720px) {
  .projects__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

- [ ] **Step 2: Verify with grep**

```bash
grep -c '.project-card__link' styles.css
```
Expected: `1`

- [ ] **Step 3: Manual browser check**

Scroll to Projects. Confirm: four project cards each show a monospace repo name, description, amber tag chips, and a cyan "View on GitHub →" link that dims on hover. Confirm 2-column layout ≥720px and single column below that.

- [ ] **Step 4: Commit**

```bash
git add styles.css
git commit -m "Style featured GitHub projects section"
```

---

### Task 8: Contact + footer styling

**Files:**
- Modify: `styles.css` (append)

**Interfaces:**
- Consumes: `.contact__line`, `.contact__links`, `.site-footer`, `.site-footer__status` from Task 1.

- [ ] **Step 1: Append Contact + footer styles to `styles.css`**

```css
/* ---------- Contact ---------- */
.contact__line {
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
}

.contact__links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* ---------- Footer ---------- */
.site-footer {
  text-align: center;
  padding: 2.5rem 1.5rem;
  color: var(--color-text-secondary);
  font-size: 0.85rem;
  border-top: 1px solid var(--color-border);
}

.site-footer__status {
  font-family: var(--font-mono);
  color: var(--color-accent-cyan);
  margin-top: 0.5rem;
}
```

- [ ] **Step 2: Verify with grep**

```bash
grep -c '.site-footer__status' styles.css
```
Expected: `1`

- [ ] **Step 3: Manual browser check**

Scroll to Contact and the footer. Confirm: "Email Me" (filled cyan), "LinkedIn", "GitHub", "Resume" (ghost outline) buttons wrap cleanly on mobile widths, footer shows copyright and "Status: Actively interviewing." in cyan monospace.

- [ ] **Step 4: Commit**

```bash
git add styles.css
git commit -m "Style contact section and footer"
```

---

### Task 9: Scroll-reveal on below-the-fold sections + reduced-motion + accessibility pass

**Files:**
- Modify: `styles.css` (append)
- Modify: `script.js` (append)

**Interfaces:**
- Consumes: `.reveal-group` class (present on About/Skills/Projects/Contact `.section__inner` elements from Task 1); `document.addEventListener('DOMContentLoaded', ...)` block already present in `script.js` from Task 5 — add a second call inside that same listener, do not add a second `DOMContentLoaded` listener.

- [ ] **Step 1: Append scroll-reveal CSS to `styles.css`**

```css
/* ---------- Scroll reveal (JS-driven) ---------- */
.reveal-group {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal-group.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal-group {
    transition: none;
  }
}
```

- [ ] **Step 2: Modify `script.js` to add scroll-reveal logic**

Replace the file's final block:

```js
document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
});
```

with:

```js
function initScrollReveal() {
  const groups = document.querySelectorAll('.reveal-group');
  if (!groups.length) return;

  if (!('IntersectionObserver' in window)) {
    groups.forEach((group) => group.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  groups.forEach((group) => observer.observe(group));
}

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initScrollReveal();
});
```

- [ ] **Step 3: Verify with grep**

```bash
grep -c 'function initScrollReveal' script.js
```
Expected: `1`

```bash
grep -c "addEventListener('DOMContentLoaded'" script.js
```
Expected: `1` (confirms no duplicate listener was added)

- [ ] **Step 4: Manual browser check — scroll reveal**

Reload the page, scroll down slowly. Confirm: each of About, Skills, Projects, Contact fades up as a single group the first time it enters the viewport (not each card individually), and stays visible when scrolling back up (no re-hide/re-play).

- [ ] **Step 5: Manual browser check — accessibility pass**

Using browser dev tools:
- Tab through the page with keyboard only: confirm every nav link, button, and project link receives a visible focus outline and follows a logical order (topbar nav → hero CTAs → section links in document order).
- Run the browser's built-in contrast checker (e.g. Chrome DevTools "Accessibility" pane) on `--color-text-secondary` (`#94a3b8`) against `--color-bg` (`#0b1120`) and on `--color-text-primary` against the same background; confirm both pass WCAG AA for normal text (contrast ratio ≥ 4.5:1).
- Confirm the accessibility tree shows one `h1` ("Alex Rivera") followed by `h2`s for each section ("About Me", "Tools & Tradecraft", "Featured GitHub Projects", "Let's Talk") and `h3`s within skill/project cards — no skipped levels.
- Resize the viewport to 375px width (mobile): confirm no horizontal scrollbar appears anywhere on the page.

- [ ] **Step 6: Commit**

```bash
git add styles.css script.js
git commit -m "Add scroll-reveal for below-fold sections and verify accessibility"
```

---

### Task 10: GitHub Pages deployment files

**Files:**
- Create: `CNAME`
- Create: `README.md`

**Interfaces:**
- None — terminal task, no later tasks depend on these files.

- [ ] **Step 1: Create `CNAME`**

```
yourdomain.com
```

(No trailing content beyond the single domain line — GitHub Pages reads this file literally. The user must replace `yourdomain.com` with their purchased domain before/after enabling Pages.)

- [ ] **Step 2: Create `README.md`**

```markdown
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
```

- [ ] **Step 3: Verify with grep**

```bash
test -f CNAME && test -f README.md && echo "both files present"
```
Expected: `both files present`

- [ ] **Step 4: Manual full-page final check**

With the local server still running, reload `http://localhost:8000` one final time and confirm the entire page — topbar, hero animation + typewriter, about, skills, projects, contact, footer — works end to end with no console errors, at three viewport widths: 375px, 768px, 1440px.

- [ ] **Step 5: Commit**

```bash
git add CNAME README.md
git commit -m "Add GitHub Pages deployment files and README"
```

---

## Self-Review Notes

- **Spec coverage:** Visual system (Task 2–4), motion (Task 4, 5, 9), page structure/all six content areas (Task 1, styled in Tasks 3–8), technical structure/no build step (all tasks are plain files), hosting/CNAME (Task 10), responsiveness/accessibility (Task 9 Step 5, breakpoints in Tasks 6–7) — all spec sections are covered.
- **Placeholder scan:** No TBD/TODO markers; all copy is complete, final-quality placeholder text as required by the spec's "Content status" section.
- **Type/name consistency:** `script.js` function names (`typewrite`, `initTypewriter`, `initScrollReveal`) and class names (`.reveal-item`, `.reveal-group`, `.is-visible`) are identical everywhere they're defined and consumed across Tasks 1, 4, 5, and 9.
