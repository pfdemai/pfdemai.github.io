# EN/FR Bilingual Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a French translation of the landing page and a client-side EN/FR toggle in the top bar, with no page reload.

**Architecture:** Tag every translatable text node in `index.html` with `data-i18n="key"`. A `TRANSLATIONS` dictionary in `script.js` holds the EN and FR strings for each key; `applyLanguage(lang)` walks `[data-i18n]` elements and swaps their `textContent`. Language is resolved from `localStorage` (explicit user choice) falling back to `navigator.language` (auto-detect), and persisted on toggle click.

**Tech Stack:** Same as the existing site — plain HTML/CSS/JS, no build step, no new dependencies.

## Global Constraints

- Proper nouns and tool/technology names (Splunk, Elastic Stack, Sigma Rules, Python, PowerShell, Bash, KQL, MITRE ATT&CK, certification names, GitHub project repo names, "LinkedIn", "GitHub") are NOT translated — no `data-i18n` attribute on those nodes.
- Language resolution order: `localStorage.getItem('preferredLanguage')` if set to `'en'` or `'fr'`; otherwise `navigator.language` starting with `fr` → French, else English.
- Toggle persists the explicit choice via `localStorage.setItem('preferredLanguage', lang)` on click.
- The hero tagline's typewriter animation (`typewrite()`/`initTypewriter()`, already in `script.js`) must still type out once on initial page load in the resolved language — `applyLanguage()` must NOT set the `#typewriter` element's text during the initial load path, or it will flash the full tagline before the delayed typing animation starts and defeat the effect. On a later toggle click (after initial load), the tagline DOES update immediately via direct `textContent` assignment, bypassing `typewrite()` — this is a separate code path from the initial load, described exactly in Task 2.
- `document.documentElement.lang` must be updated to `'en'`/`'fr'` on every language change (initial load and every toggle click).
- Toggle buttons must reflect current language via `aria-pressed="true"/"false"`, updated on every language change.
- Reuse existing CSS custom properties for the toggle's styling — no new hardcoded colors/fonts.
- Toggle buttons must meet the existing site's 44px tap-target minimum, matching the pattern already used for `.topbar__nav a` (`display: inline-flex; align-items: center; min-height: 44px;`).
- No test framework or build tooling introduced. Verification is grep-based structural assertions plus a manual browser check (or static inspection if no browser is available in the environment).
- This plan assumes the hero photo implementation plan (`docs/superpowers/plans/2026-07-04-hero-photo-implementation.md`) has already landed — the hero section's text content is wrapped in a `.hero__text` div, per that plan's Task 1. All `index.html` patches below target that already-restructured hero markup.

---

## File Structure

- `index.html` — `data-i18n` attributes added to every translatable element; new language-toggle button markup added to the top bar (Task 1).
- `script.js` — new `TRANSLATIONS` dictionary, language resolution/persistence, `applyLanguage()`, toggle click wiring, and `initTypewriter()` updated to accept the resolved language (Task 2).
- `styles.css` — new `.lang-toggle`/`.lang-toggle__btn` rules (Task 3).
- `README.md` — new section pointing to where to edit translations (Task 4).

---

### Task 1: Add data-i18n attributes and toggle markup to index.html

**Files:**
- Modify: `index.html`

**Interfaces:**
- Produces: every `data-i18n="key"` attribute Task 2's `TRANSLATIONS` dictionary must have a matching key for, plus `#lang-en` and `#lang-fr` button IDs that Task 2's JS binds click handlers to.

- [ ] **Step 1: Add the toggle markup and tag the top bar**

Find this exact block:

```html
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
```

Replace it with:

```html
      <nav class="topbar__nav" aria-label="Primary">
        <a href="#about" data-i18n="navAbout">About</a>
        <a href="#skills" data-i18n="navSkills">Skills</a>
        <a href="#projects" data-i18n="navProjects">Projects</a>
        <a href="#contact" data-i18n="navContact">Contact</a>
      </nav>
      <div class="lang-toggle" role="group" aria-label="Language">
        <button type="button" class="lang-toggle__btn" id="lang-en" aria-label="English" aria-pressed="true">EN</button>
        <button type="button" class="lang-toggle__btn" id="lang-fr" aria-label="Français" aria-pressed="false">FR</button>
      </div>
      <span class="status-badge">
        <span class="status-badge__dot" aria-hidden="true"></span>
        <span data-i18n="statusBadge">STATUS: OPEN TO WORK</span>
      </span>
```

- [ ] **Step 2: Tag the hero text (inside `.hero__text`, per the already-landed hero photo plan)**

Find this exact block:

```html
        <div class="hero__text">
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
```

Replace it with:

```html
        <div class="hero__text">
          <p class="hero__eyebrow reveal-item" data-i18n="heroEyebrow">DEFENSIVE SECURITY / BLUE TEAM</p>
          <h1 class="hero__name reveal-item">Alex Rivera</h1>
          <p class="hero__role reveal-item" data-i18n="heroRole">Blue Team Engineer — Detection &amp; Incident Response</p>
          <p class="hero__tagline reveal-item">
            <span id="typewriter"></span><span class="cursor" aria-hidden="true">▌</span>
          </p>
          <div class="hero__ctas reveal-item">
            <a class="btn btn--primary" href="#projects" data-i18n="ctaProjects">View Projects</a>
            <a class="btn btn--ghost" href="#contact" data-i18n="ctaContact">Contact Me</a>
          </div>
        </div>
```

Note: `.hero__name` ("Alex Rivera") intentionally has no `data-i18n` — it's a proper noun, not translated. `#typewriter`'s `<span>` also intentionally has no `data-i18n` — its content is managed entirely by `script.js` (Task 2), never by the generic `data-i18n` walk.

- [ ] **Step 3: Tag the About section**

Find this exact block:

```html
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
```

Replace it with:

```html
        <p class="section__eyebrow" data-i18n="aboutEyebrow">ABOUT</p>
        <h2 class="section__title" data-i18n="aboutTitle">About Me</h2>
        <p class="about__bio" data-i18n="aboutBio">
          I'm a defensive security engineer focused on detection engineering, threat hunting, and
          incident response. I spend my days writing Sigma rules, tuning SIEM alerts, and chasing
          down the alerts that turn out to matter. Off the clock, I run a home SOC lab to test
          attacker techniques against my own detections before they show up in the wild.
        </p>
        <div class="stat-strip">
          <div class="stat-chip"><span class="stat-chip__value">4+</span><span class="stat-chip__label" data-i18n="statYearsLabel">Years in Security</span></div>
          <div class="stat-chip"><span class="stat-chip__value">12</span><span class="stat-chip__label" data-i18n="statDetectionsLabel">Detections Shipped</span></div>
          <div class="stat-chip"><span class="stat-chip__value">3</span><span class="stat-chip__label" data-i18n="statCertsLabel">Certifications</span></div>
          <div class="stat-chip"><span class="stat-chip__value">1</span><span class="stat-chip__label" data-i18n="statLabLabel">Home SOC Lab</span></div>
        </div>
```

Note: the stat *values* ("4+", "12", "3", "1") are numbers, not translated — only the `.stat-chip__label` spans get `data-i18n`.

- [ ] **Step 4: Tag the Skills section**

Find this exact block:

```html
        <p class="section__eyebrow">SKILLS</p>
        <h2 class="section__title">Tools &amp; Tradecraft</h2>
        <div class="skills__grid">
          <div class="skill-card">
            <h3 class="skill-card__title">SIEM &amp; Detection</h3>
```

Replace it with:

```html
        <p class="section__eyebrow" data-i18n="skillsEyebrow">SKILLS</p>
        <h2 class="section__title" data-i18n="skillsTitle">Tools &amp; Tradecraft</h2>
        <div class="skills__grid">
          <div class="skill-card">
            <h3 class="skill-card__title" data-i18n="skillCategorySiem">SIEM &amp; Detection</h3>
```

Then find this exact line:

```html
            <h3 class="skill-card__title">Threat Hunting &amp; IR</h3>
```

Replace it with:

```html
            <h3 class="skill-card__title" data-i18n="skillCategoryThreatHunting">Threat Hunting &amp; IR</h3>
```

Then find this exact line:

```html
            <h3 class="skill-card__title">Scripting &amp; Automation</h3>
```

Replace it with:

```html
            <h3 class="skill-card__title" data-i18n="skillCategoryScripting">Scripting &amp; Automation</h3>
```

Then find this exact line (inside the Skills section — it appears only once there; the Contact section's "Certifications" text does not exist, so this match is unambiguous):

```html
            <h3 class="skill-card__title">Certifications</h3>
```

Replace it with:

```html
            <h3 class="skill-card__title" data-i18n="skillCategoryCerts">Certifications</h3>
```

Note: the `<li>` tool/skill names inside each `.skill-card__list` (Splunk, Python, MITRE ATT&CK, certification names, etc.) intentionally get no `data-i18n` — proper nouns stay in English per the Global Constraints.

- [ ] **Step 5: Tag the Projects section**

Find this exact block:

```html
        <p class="section__eyebrow">PROJECTS</p>
        <h2 class="section__title">Featured GitHub Projects</h2>
```

Replace it with:

```html
        <p class="section__eyebrow" data-i18n="projectsEyebrow">PROJECTS</p>
        <h2 class="section__title" data-i18n="projectsTitle">Featured GitHub Projects</h2>
```

Then find this exact block:

```html
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
```

Replace it with:

```html
            <p class="project-card__desc" data-i18n="project1Desc">
              A curated set of Sigma rules for detecting common lateral-movement and persistence
              techniques, mapped to MITRE ATT&amp;CK.
            </p>
            <div class="project-card__tags">
              <span class="tag">Sigma</span>
              <span class="tag">YAML</span>
              <span class="tag">MITRE ATT&amp;CK</span>
            </div>
            <a class="project-card__link" href="https://github.com/username/sigma-detection-pack" data-i18n="projectLinkText">View on GitHub &rarr;</a>
```

Then find this exact block:

```html
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
```

Replace it with:

```html
            <p class="project-card__desc" data-i18n="project2Desc">
              Python toolkit for normalizing and correlating logs from mismatched EDR and firewall
              exports during incident response.
            </p>
            <div class="project-card__tags">
              <span class="tag">Python</span>
              <span class="tag">Log Analysis</span>
              <span class="tag">IR</span>
            </div>
            <a class="project-card__link" href="https://github.com/username/logparse-toolkit" data-i18n="projectLinkText">View on GitHub &rarr;</a>
```

Then find this exact block:

```html
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
```

Replace it with:

```html
            <p class="project-card__desc" data-i18n="project3Desc">
              Infrastructure-as-code for a home SOC lab: Elastic stack, Sysmon-instrumented Windows
              hosts, and a simulated attacker range.
            </p>
            <div class="project-card__tags">
              <span class="tag">Terraform</span>
              <span class="tag">Elastic</span>
              <span class="tag">Sysmon</span>
            </div>
            <a class="project-card__link" href="https://github.com/username/home-soc-lab" data-i18n="projectLinkText">View on GitHub &rarr;</a>
```

Then find this exact block:

```html
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
```

Replace it with:

```html
            <p class="project-card__desc" data-i18n="project4Desc">
              Incident response playbooks and SOAR automation scripts for common alert types, built
              to cut triage time.
            </p>
            <div class="project-card__tags">
              <span class="tag">PowerShell</span>
              <span class="tag">SOAR</span>
              <span class="tag">Automation</span>
            </div>
            <a class="project-card__link" href="https://github.com/username/ir-playbooks" data-i18n="projectLinkText">View on GitHub &rarr;</a>
```

Note: all four project names (`sigma-detection-pack`, `logparse-toolkit`, `home-soc-lab`, `ir-playbooks`) and all tag chips (Sigma, YAML, Python, Terraform, etc.) intentionally get no `data-i18n` — proper nouns/tech names stay in English. All four "View on GitHub →" links share the same `data-i18n="projectLinkText"` key since they're identical text.

- [ ] **Step 6: Tag the Contact section**

Find this exact block:

```html
        <p class="section__eyebrow">CONTACT</p>
        <h2 class="section__title">Let's Talk</h2>
        <p class="contact__line">Open to blue team, detection engineering, and incident response roles.</p>
        <div class="contact__links">
          <a class="btn btn--primary" href="mailto:alex.rivera@example.com">Email Me</a>
          <a class="btn btn--ghost" href="https://linkedin.com/in/username">LinkedIn</a>
          <a class="btn btn--ghost" href="https://github.com/username">GitHub</a>
          <a class="btn btn--ghost" href="resume.pdf">Resume</a>
        </div>
```

Replace it with:

```html
        <p class="section__eyebrow" data-i18n="contactEyebrow">CONTACT</p>
        <h2 class="section__title" data-i18n="contactTitle">Let's Talk</h2>
        <p class="contact__line" data-i18n="contactLine">Open to blue team, detection engineering, and incident response roles.</p>
        <div class="contact__links">
          <a class="btn btn--primary" href="mailto:alex.rivera@example.com" data-i18n="ctaEmail">Email Me</a>
          <a class="btn btn--ghost" href="https://linkedin.com/in/username">LinkedIn</a>
          <a class="btn btn--ghost" href="https://github.com/username">GitHub</a>
          <a class="btn btn--ghost" href="resume.pdf" data-i18n="ctaResume">Resume</a>
        </div>
```

Note: "LinkedIn" and "GitHub" link text intentionally get no `data-i18n` — proper nouns.

- [ ] **Step 7: Tag the footer**

Find this exact block:

```html
  <footer class="site-footer">
    <p>&copy; 2026 Alex Rivera. Built with static HTML, CSS, and JS.</p>
    <p class="site-footer__status">Status: Actively interviewing.</p>
  </footer>
```

Replace it with:

```html
  <footer class="site-footer">
    <p data-i18n="footerCopyright">&copy; 2026 Alex Rivera. Built with static HTML, CSS, and JS.</p>
    <p class="site-footer__status" data-i18n="footerStatus">Status: Actively interviewing.</p>
  </footer>
```

- [ ] **Step 8: Verify with grep**

```bash
grep -o 'data-i18n="[a-zA-Z0-9]*"' index.html | sort -u | wc -l
```
Expected: `36` (one entry per unique key: navAbout, navSkills, navProjects, navContact, statusBadge, heroEyebrow, heroRole, ctaProjects, ctaContact, aboutEyebrow, aboutTitle, aboutBio, statYearsLabel, statDetectionsLabel, statCertsLabel, statLabLabel, skillsEyebrow, skillsTitle, skillCategorySiem, skillCategoryThreatHunting, skillCategoryScripting, skillCategoryCerts, projectsEyebrow, projectsTitle, project1Desc, project2Desc, project3Desc, project4Desc, projectLinkText, contactEyebrow, contactTitle, contactLine, ctaEmail, ctaResume, footerCopyright, footerStatus — if your count differs, recount the keys listed in Steps 1–7 rather than forcing this number; report the actual count and the full sorted key list in your report either way.)

```bash
grep -c 'id="lang-en"' index.html
```
Expected: `1`

```bash
grep -c 'id="lang-fr"' index.html
```
Expected: `1`

- [ ] **Step 9: Manual browser check**

Start `python3 -m http.server 8000` (or verify statically if no browser is available — note which method you used). Confirm the page still renders all English text exactly as before (nothing should look different yet — Task 2 wires the actual translation behavior), and the two new "EN"/"FR" buttons appear in the top bar (unstyled until Task 3, but present and clickable with no console errors).

- [ ] **Step 10: Commit**

```bash
git add index.html
git commit -m "Add data-i18n attributes and language toggle markup"
```

---

### Task 2: Build the translations dictionary and language logic

**Files:**
- Modify: `script.js`

**Interfaces:**
- Consumes: `data-i18n` attributes and `#lang-en`/`#lang-fr` button IDs from Task 1; existing `TYPEWRITER_TEXT`, `TYPE_SPEED_MS`, `TYPE_START_DELAY_MS`, `typewrite()`, `initScrollReveal()` already in `script.js`.
- Produces: `TRANSLATIONS` object, `applyLanguage(lang)`, `resolveInitialLanguage()`, `initLanguageToggle()` — not consumed by later tasks in this plan, but these are the final names for this file.

- [ ] **Step 1: Replace the whole file with the final version**

`script.js` currently ends with:

```js
document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initScrollReveal();
});
```

And `initTypewriter` currently reads:

```js
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = TYPEWRITER_TEXT;
    return;
  }
  setTimeout(() => typewrite(el, TYPEWRITER_TEXT, TYPE_SPEED_MS), TYPE_START_DELAY_MS);
}
```

Replace the **entire contents** of `script.js` with:

```js
document.documentElement.classList.add('js');

const TYPE_SPEED_MS = 45;
const TYPE_START_DELAY_MS = 1500;

const TRANSLATIONS = {
  en: {
    navAbout: "About",
    navSkills: "Skills",
    navProjects: "Projects",
    navContact: "Contact",
    statusBadge: "STATUS: OPEN TO WORK",
    heroEyebrow: "DEFENSIVE SECURITY / BLUE TEAM",
    heroRole: "Blue Team Engineer — Detection & Incident Response",
    heroTagline: "I build detections that catch what signatures miss.",
    ctaProjects: "View Projects",
    ctaContact: "Contact Me",
    aboutEyebrow: "ABOUT",
    aboutTitle: "About Me",
    aboutBio: "I'm a defensive security engineer focused on detection engineering, threat hunting, and incident response. I spend my days writing Sigma rules, tuning SIEM alerts, and chasing down the alerts that turn out to matter. Off the clock, I run a home SOC lab to test attacker techniques against my own detections before they show up in the wild.",
    statYearsLabel: "Years in Security",
    statDetectionsLabel: "Detections Shipped",
    statCertsLabel: "Certifications",
    statLabLabel: "Home SOC Lab",
    skillsEyebrow: "SKILLS",
    skillsTitle: "Tools & Tradecraft",
    skillCategorySiem: "SIEM & Detection",
    skillCategoryThreatHunting: "Threat Hunting & IR",
    skillCategoryScripting: "Scripting & Automation",
    skillCategoryCerts: "Certifications",
    projectsEyebrow: "PROJECTS",
    projectsTitle: "Featured GitHub Projects",
    project1Desc: "A curated set of Sigma rules for detecting common lateral-movement and persistence techniques, mapped to MITRE ATT&CK.",
    project2Desc: "Python toolkit for normalizing and correlating logs from mismatched EDR and firewall exports during incident response.",
    project3Desc: "Infrastructure-as-code for a home SOC lab: Elastic stack, Sysmon-instrumented Windows hosts, and a simulated attacker range.",
    project4Desc: "Incident response playbooks and SOAR automation scripts for common alert types, built to cut triage time.",
    projectLinkText: "View on GitHub →",
    contactEyebrow: "CONTACT",
    contactTitle: "Let's Talk",
    contactLine: "Open to blue team, detection engineering, and incident response roles.",
    ctaEmail: "Email Me",
    ctaResume: "Resume",
    footerCopyright: "© 2026 Alex Rivera. Built with static HTML, CSS, and JS.",
    footerStatus: "Status: Actively interviewing.",
    pageTitle: "Alex Rivera — Defensive Security Engineer",
    metaDescription: "Alex Rivera is a defensive security engineer specializing in detection engineering, threat hunting, and incident response.",
  },
  fr: {
    navAbout: "À propos",
    navSkills: "Compétences",
    navProjects: "Projets",
    navContact: "Contact",
    statusBadge: "STATUT : DISPONIBLE",
    heroEyebrow: "SÉCURITÉ DÉFENSIVE / BLUE TEAM",
    heroRole: "Ingénieur Blue Team — Détection et réponse aux incidents",
    heroTagline: "Je conçois des détections qui repèrent ce que les signatures manquent.",
    ctaProjects: "Voir les projets",
    ctaContact: "Me contacter",
    aboutEyebrow: "À PROPOS",
    aboutTitle: "À propos de moi",
    aboutBio: "Je suis ingénieur en sécurité défensive, spécialisé dans l'ingénierie de détection, le threat hunting et la réponse aux incidents. Je passe mes journées à écrire des règles Sigma, à ajuster les alertes SIEM, et à traquer celles qui comptent vraiment. En dehors du travail, je fais tourner un SOC lab chez moi pour tester des techniques d'attaque contre mes propres détections avant qu'elles n'apparaissent dans la nature.",
    statYearsLabel: "Ans en sécurité",
    statDetectionsLabel: "Détections déployées",
    statCertsLabel: "Certifications",
    statLabLabel: "SOC Lab perso",
    skillsEyebrow: "COMPÉTENCES",
    skillsTitle: "Outils et savoir-faire",
    skillCategorySiem: "SIEM et détection",
    skillCategoryThreatHunting: "Threat Hunting et réponse aux incidents",
    skillCategoryScripting: "Scripts et automatisation",
    skillCategoryCerts: "Certifications",
    projectsEyebrow: "PROJETS",
    projectsTitle: "Projets GitHub à la une",
    project1Desc: "Un ensemble de règles Sigma soigneusement sélectionnées pour détecter les techniques courantes de mouvement latéral et de persistance, associées à MITRE ATT&CK.",
    project2Desc: "Boîte à outils Python pour normaliser et corréler des journaux issus d'exports EDR et pare-feu hétérogènes lors d'une réponse à incident.",
    project3Desc: "Infrastructure-as-code pour un SOC lab personnel : stack Elastic, hôtes Windows instrumentés avec Sysmon, et un environnement d'attaque simulé.",
    project4Desc: "Playbooks de réponse à incident et scripts d'automatisation SOAR pour les types d'alertes courants, conçus pour réduire le temps de tri.",
    projectLinkText: "Voir sur GitHub →",
    contactEyebrow: "CONTACT",
    contactTitle: "Discutons",
    contactLine: "Ouvert aux postes en Blue Team, ingénierie de détection et réponse aux incidents.",
    ctaEmail: "M'envoyer un e-mail",
    ctaResume: "CV",
    footerCopyright: "© 2026 Alex Rivera. Site statique en HTML, CSS et JS.",
    footerStatus: "Statut : en recherche active.",
    pageTitle: "Alex Rivera — Ingénieur en sécurité défensive",
    metaDescription: "Alex Rivera est ingénieur en sécurité défensive, spécialisé en ingénierie de détection, threat hunting et réponse aux incidents.",
  },
};

const LANGUAGE_STORAGE_KEY = 'preferredLanguage';

function resolveInitialLanguage() {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored === 'en' || stored === 'fr') return stored;
  return navigator.language && navigator.language.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

function applyLanguage(lang) {
  const dict = TRANSLATIONS[lang];
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  document.title = dict.pageTitle;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', dict.metaDescription);
  }

  const enBtn = document.getElementById('lang-en');
  const frBtn = document.getElementById('lang-fr');
  if (enBtn) enBtn.setAttribute('aria-pressed', String(lang === 'en'));
  if (frBtn) frBtn.setAttribute('aria-pressed', String(lang === 'fr'));
}

function initLanguageToggle() {
  const enBtn = document.getElementById('lang-en');
  const frBtn = document.getElementById('lang-fr');
  if (!enBtn || !frBtn) return;

  function switchLanguage(lang) {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    applyLanguage(lang);
    const typewriterEl = document.getElementById('typewriter');
    if (typewriterEl) {
      typewriterEl.textContent = TRANSLATIONS[lang].heroTagline;
    }
  }

  enBtn.addEventListener('click', () => switchLanguage('en'));
  frBtn.addEventListener('click', () => switchLanguage('fr'));
}

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

function initTypewriter(lang) {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const tagline = TRANSLATIONS[lang].heroTagline;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = tagline;
    return;
  }
  setTimeout(() => typewrite(el, tagline, TYPE_SPEED_MS), TYPE_START_DELAY_MS);
}

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
  const initialLanguage = resolveInitialLanguage();
  applyLanguage(initialLanguage);
  initTypewriter(initialLanguage);
  initScrollReveal();
  initLanguageToggle();
});
```

Note: `TYPEWRITER_TEXT` (the old standalone constant) is removed — the tagline text now lives only in `TRANSLATIONS.en.heroTagline` / `TRANSLATIONS.fr.heroTagline`, so there is exactly one source of truth per language instead of two. `applyLanguage()` deliberately never touches `#typewriter` on its own — only `initTypewriter()` (initial load) and `switchLanguage()`'s direct assignment (toggle clicks) do, per the Global Constraints note on avoiding a flash-before-typing regression.

- [ ] **Step 2: Verify with grep**

```bash
grep -c 'const TRANSLATIONS' script.js
```
Expected: `1`

```bash
grep -c 'function applyLanguage' script.js
```
Expected: `1`

```bash
grep -c 'function resolveInitialLanguage' script.js
```
Expected: `1`

```bash
grep -c "addEventListener('DOMContentLoaded'" script.js
```
Expected: `1` (confirms no duplicate listener)

```bash
grep -c 'TYPEWRITER_TEXT' script.js
```
Expected: `0` (confirms the old standalone constant was fully removed, not left dangling)

- [ ] **Step 3: Manual browser check**

Reload `http://localhost:8000` (or verify statically if no browser is available — note which method you used). Confirm: the page loads correctly translated in whichever language your browser/OS reports (check `navigator.language` in devtools if unsure which to expect); the hero tagline still types out once on load in that language; clicking the other toggle button instantly swaps all text (including the tagline, without replaying the typing animation) and updates `<html lang="...">`; reloading after a manual click keeps the clicked language (confirms `localStorage` persistence).

- [ ] **Step 4: Commit**

```bash
git add script.js
git commit -m "Add EN/FR translations dictionary and language switching logic"
```

---

### Task 3: Style the language toggle

**Files:**
- Modify: `styles.css`

**Interfaces:**
- Consumes: `.lang-toggle`, `.lang-toggle__btn` class names from Task 1's HTML.

- [ ] **Step 1: Insert the toggle styles**

Find this exact block:

```css
@media (prefers-reduced-motion: reduce) {
  .status-badge__dot {
    animation: none;
  }
}

/* ---------- Hero ---------- */
```

Replace it with:

```css
@media (prefers-reduced-motion: reduce) {
  .status-badge__dot {
    animation: none;
  }
}

.lang-toggle {
  display: inline-flex;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  overflow: hidden;
}

.lang-toggle__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 0.75rem;
  background: transparent;
  border: none;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: color 0.15s ease, background-color 0.15s ease;
}

.lang-toggle__btn:hover, .lang-toggle__btn:focus-visible {
  color: var(--color-text-primary);
}

.lang-toggle__btn[aria-pressed="true"] {
  background: var(--color-accent-cyan);
  color: var(--color-bg);
}

.lang-toggle__btn[aria-pressed="true"]:hover, .lang-toggle__btn[aria-pressed="true"]:focus-visible {
  color: var(--color-bg);
}

/* ---------- Hero ---------- */
```

- [ ] **Step 2: Verify with grep**

```bash
grep -c '.lang-toggle {' styles.css
```
Expected: `1`

```bash
grep -c '.lang-toggle__btn {' styles.css
```
Expected: `1`

- [ ] **Step 3: Manual browser check**

Reload `http://localhost:8000` (or verify statically if no browser is available — note which method you used). Confirm the toggle appears as a pill with two buttons in the top bar, the active language's button has a filled cyan background, the inactive one is muted text, and the whole pill doesn't cause the top bar to wrap awkwardly on a narrow (375px) viewport.

- [ ] **Step 4: Commit**

```bash
git add styles.css
git commit -m "Style the EN/FR language toggle"
```

---

### Task 4: Document translation editing in the README

**Files:**
- Modify: `README.md`

**Interfaces:**
- None — terminal task, no later tasks depend on this file.

- [ ] **Step 1: Add an "Editing translations" section**

Find this exact block:

```markdown
## Before going live
```

Replace it with:

```markdown
## Editing translations

All English and French copy lives in the `TRANSLATIONS` object at the top of `script.js`. Each key (e.g. `heroTagline`, `aboutBio`) has an `en` and `fr` value; edit the strings there rather than in `index.html`. Tool/technology names (Splunk, Python, MITRE ATT&CK, etc.) and project repo names are intentionally left untranslated in the HTML directly and have no corresponding translation key.

## Before going live
```

- [ ] **Step 2: Verify with grep**

```bash
grep -c 'Editing translations' README.md
```
Expected: `1`

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "Document how to edit EN/FR translations"
```

---

## Self-Review Notes

- **Spec coverage:** Translation mechanism (`data-i18n` + dictionary), language resolution/persistence, switcher UI/placement/accessibility (`aria-pressed`, 44px targets), and the tagline/typewriter integration are all covered by Tasks 1–3; the README documentation requirement is covered by Task 4.
- **Placeholder scan:** No TBD/TODO markers; all French copy is final-quality, not machine-placeholder text.
- **Type/name consistency:** `TRANSLATIONS`, `applyLanguage`, `resolveInitialLanguage`, `initLanguageToggle`, `initTypewriter(lang)` are defined once in Task 2 with no renames; the 36 `data-i18n` keys in Task 1's HTML each match a key in `TRANSLATIONS.en`/`TRANSLATIONS.fr`. Three additional dictionary keys — `heroTagline`, `pageTitle`, `metaDescription` — intentionally have no `data-i18n` attribute anywhere, since they're applied via explicit code paths in Task 2 (`initTypewriter`/`switchLanguage` for the tagline, direct `document.title`/meta-selector assignment for the other two) rather than the generic `[data-i18n]` walk. Each `TRANSLATIONS.en`/`TRANSLATIONS.fr` object therefore has 39 keys total — recount both sides if this plan is revised.
- **Known risk flagged for the task reviewer:** the initial-load vs. toggle-click handling of `#typewriter` (Task 2, Global Constraints) is the one place where getting the code wrong silently breaks the load-time typewriter effect without any error — reviewers should specifically check that `applyLanguage()` itself never assigns to `#typewriter`.
