# Hero Photo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a circular placeholder photo to the landing page's hero section, positioned right of the text on desktop and above it on mobile.

**Architecture:** Split the existing `.hero__inner` content into two flex children — `.hero__text` (unchanged existing content) and a new `.hero__photo` circle — and switch `.hero__inner` from a centered single column to a responsive flex row/column layout.

**Tech Stack:** Same as the existing site — plain HTML/CSS/JS, no build step, no new dependencies.

## Global Constraints

- Circle diameter: 180px mobile (base), 220px at `min-width: 768px`.
- Circle border: `3px solid var(--color-accent-cyan)`, with a soft cyan box-shadow glow.
- Placeholder content: bold initials "AR" in `var(--font-display)`, no bracketed text or broken image icon.
- Desktop layout (`min-width: 768px`): flex row, text on the left, photo on the right (achieved via DOM order text-then-photo, no reordering needed); text becomes left-aligned at this breakpoint.
- Mobile layout (base): flex column with the photo visually above the text (via `flex-direction: column-reverse`, since photo is second in DOM order); text stays centered.
- Photo joins the existing `.reveal-item` stagger as the first element to reveal: `animation-delay: 0.05s`. It automatically inherits the existing `prefers-reduced-motion` handling already applied to `.reveal-item` (styles.css:299-305) — no new reduced-motion rule needed.
- No test framework or build tooling introduced. Verification is grep-based structural assertions plus a manual browser check (or static inspection if no browser is available in the environment).
- Reuse existing CSS custom properties — no new hardcoded colors/fonts.

---

## File Structure

- `index.html` — hero section markup restructured (Task 1).
- `styles.css` — `.hero__inner` layout changed, new `.hero__text`/`.hero__photo`/`.hero__photo-initials` rules and a `min-width: 768px` media query added (Task 2).
- `README.md` — "Before going live" checklist gets one new line about the photo placeholder (Task 3).

---

### Task 1: Restructure hero HTML for the photo

**Files:**
- Modify: `index.html`

**Interfaces:**
- Produces: `.hero__text` (wraps existing hero text content, unchanged internally), `.hero__photo` (new circle container, carries `reveal-item` class), `.hero__photo-initials` (span holding "AR") — Task 2's CSS depends on these three class names exactly.

- [ ] **Step 1: Replace the hero section's inner markup**

Find this exact block in `index.html`:

```html
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
```

Replace it with:

```html
      <div class="hero__inner">
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
        <div class="hero__photo reveal-item" role="img" aria-label="Portrait of Alex Rivera">
          <span class="hero__photo-initials" aria-hidden="true">AR</span>
        </div>
      </div>
```

- [ ] **Step 2: Verify with grep**

```bash
grep -c 'class="hero__text"' index.html
```
Expected: `1`

```bash
grep -c 'class="hero__photo reveal-item"' index.html
```
Expected: `1`

```bash
grep -c 'hero__photo-initials' index.html
```
Expected: `1`

- [ ] **Step 3: Manual browser check**

Start `python3 -m http.server 8000` and open `http://localhost:8000` (or verify statically via code inspection if no browser is available in this environment — note which method you used in your report). Confirm the page still loads with no new console errors; the hero will look unstyled/unpositioned for the photo until Task 2 lands — that's expected at this point.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Restructure hero markup to add a photo container"
```

---

### Task 2: Style the hero photo and responsive layout

**Files:**
- Modify: `styles.css`

**Interfaces:**
- Consumes: `.hero__text`, `.hero__photo`, `.hero__photo-initials` from Task 1; existing `.hero__inner`, `.reveal-item`, `.hero__ctas` rules already in the file.

- [ ] **Step 1: Replace the existing `.hero__inner` rule**

Find this exact block in `styles.css`:

```css
.hero__inner {
  position: relative;
  max-width: 720px;
  text-align: center;
}
```

Replace it with:

```css
.hero__inner {
  position: relative;
  max-width: 960px;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 2.5rem;
}

.hero__text {
  max-width: 720px;
  text-align: center;
}

.hero__photo {
  flex-shrink: 0;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: var(--color-bg-elevated);
  border: 3px solid var(--color-accent-cyan);
  box-shadow: 0 0 32px rgba(34, 211, 238, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero__photo-initials {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 2.5rem;
  color: var(--color-text-primary);
}
```

- [ ] **Step 2: Add the photo's reveal-item delay next to the other hero delays**

Find this exact line in `styles.css`:

```css
.hero__ctas.reveal-item { animation-delay: 1.5s; }
```

Replace it with:

```css
.hero__ctas.reveal-item { animation-delay: 1.5s; }
.hero__photo.reveal-item { animation-delay: 0.05s; }
```

- [ ] **Step 3: Add the desktop breakpoint**

Find this exact block in `styles.css` (the skills-grid 1024px query):

```css
@media (min-width: 1024px) {
  .skills__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

Directly after it, insert:

```css

@media (min-width: 768px) {
  .hero__inner {
    flex-direction: row;
    justify-content: center;
  }

  .hero__text {
    text-align: left;
  }

  .hero__ctas {
    justify-content: flex-start;
  }

  .hero__photo {
    width: 220px;
    height: 220px;
  }

  .hero__photo-initials {
    font-size: 3rem;
  }
}
```

- [ ] **Step 4: Verify with grep**

```bash
grep -c '.hero__photo {' styles.css
```
Expected: `1`

```bash
grep -c 'animation-delay: 0.05s;' styles.css
```
Expected: `1`

```bash
grep -c '@media (min-width: 768px)' styles.css
```
Expected: `1`

- [ ] **Step 5: Manual browser check**

Reload `http://localhost:8000` (or verify statically if no browser is available — note which method you used). Confirm: on a wide viewport (≥768px), the photo circle (220px, cyan border/glow, "AR" initials) sits to the right of the left-aligned hero text; on a narrow viewport (<768px), the photo (180px) appears centered above the centered hero text. Confirm the photo fades in as part of the existing load-in sequence, appearing first (before the eyebrow text).

- [ ] **Step 6: Commit**

```bash
git add styles.css
git commit -m "Style hero photo circle and responsive text/photo layout"
```

---

### Task 3: Note the photo placeholder in the deployment README

**Files:**
- Modify: `README.md`

**Interfaces:**
- None — terminal task, no later tasks depend on this file.

- [ ] **Step 1: Update the "Before going live" checklist**

Find this exact line in `README.md`:

```markdown
- Add a real `resume.pdf` to the repo root (linked from the Contact section) or remove that link.
```

Replace it with:

```markdown
- Add a real `resume.pdf` to the repo root (linked from the Contact section) or remove that link.
- Replace the hero's placeholder photo circle (currently showing "AR" initials) with a real `<img>`: swap the `<span class="hero__photo-initials" aria-hidden="true">AR</span>` element for `<img src="photo.jpg" alt="" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">` inside `.hero__photo`, and update the `aria-label` on `.hero__photo` if needed.
```

- [ ] **Step 2: Verify with grep**

```bash
grep -c 'hero__photo-initials' README.md
```
Expected: `1`

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "Document how to swap the hero photo placeholder for a real image"
```

---

## Self-Review Notes

- **Spec coverage:** Layout (desktop row / mobile column-reverse), photo treatment (size, border, glow, placeholder initials), motion (reveal-item integration), and the README swap-instructions requirement from the design spec are all covered by Tasks 1–3.
- **Placeholder scan:** No TBD/TODO markers; "AR" initials are the deliberate final-quality placeholder specified in the design spec, not a bracketed placeholder.
- **Type/name consistency:** `.hero__text`, `.hero__photo`, `.hero__photo-initials` are introduced in Task 1 and consumed with identical names in Task 2; no renames across tasks.
