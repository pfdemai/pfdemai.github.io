# Bilingual (EN/FR) Toggle — Design Spec

## Purpose

Add a French translation of the landing page's content, with a client-side toggle to switch between English and French, for a France-based job search audience.

## Content status

Full French translations of every user-facing string are written as final-quality copy (not machine-placeholder text) as part of implementation. Proper nouns and tool/technology names — Splunk, Elastic Stack, Sigma Rules, Python, PowerShell, MITRE ATT&CK, certification names, GitHub project repo names, "LinkedIn", "GitHub" — are left in English in both languages, matching standard practice on a French CV/resume. Everything else (nav labels, hero eyebrow/role/tagline, section headings, bio, stat labels, skill category titles, project descriptions, button labels, contact line, footer text, page `<title>` and meta description) is translated.

## Mechanism

No page reload, no separate `/fr/` page. Every translatable text node in `index.html` receives a `data-i18n="key"` attribute. `script.js` holds a translations dictionary:

```js
const TRANSLATIONS = {
  en: { heroEyebrow: "...", heroTagline: "...", /* ...all keys... */ },
  fr: { heroEyebrow: "...", heroTagline: "...", /* ...all keys... */ },
};
```

An `applyLanguage(lang)` function iterates all `[data-i18n]` elements and sets `element.textContent = TRANSLATIONS[lang][element.dataset.i18n]`, then updates `document.documentElement.lang = lang`. The page `<title>` and meta description are updated the same way via direct DOM references (they aren't matched by the generic `[data-i18n]` walk, since `<title>` and `<meta>` aren't part of the visible-node query in the same way — `applyLanguage` sets them explicitly by id/selector).

## Language Resolution & Persistence

- On page load, before first paint of hero content: check `localStorage.getItem('preferredLanguage')`.
  - If present (`'en'` or `'fr'`), use it.
  - If absent, auto-detect from `navigator.language`: any value starting with `fr` (e.g. `fr-FR`, `fr-CA`) resolves to French; everything else resolves to English.
- When the visitor clicks either side of the toggle, the explicit choice is written to `localStorage.setItem('preferredLanguage', lang)` and immediately overrides auto-detection on all future visits.

## Switcher UI

Placed in the top bar, to the left of the existing "STATUS: OPEN TO WORK" status badge (both are monospace pill-shaped elements, visually grouped). Structure: a small container with two `<button type="button">` elements, labeled "EN" and "FR". The active language's button carries `aria-pressed="true"` (the inactive one `aria-pressed="false"`), and is visually distinguished with the cyan accent color; the inactive button is muted text. Clicking either button (including re-clicking the already-active one, a no-op) calls `applyLanguage(lang)` and persists the choice.

## Animation Integration

The hero tagline's typewriter effect (existing `typewrite()`/`initTypewriter()` from the original build) runs once on page load using whichever language was resolved (localStorage or auto-detect) at that time — it types out `TRANSLATIONS[resolvedLang].heroTagline`. If the visitor switches language afterward via the toggle, `applyLanguage()` sets the tagline's `textContent` directly (bypassing `typewrite()`) — the typing animation is a load-time effect, not something that replays on every language switch. Existing `prefers-reduced-motion` handling for the typewriter is unchanged; language switching itself has no motion associated with it (instant text swap regardless of motion preference).

## Files Touched

- `index.html` — add `data-i18n="key"` attributes to every translatable element; add the EN/FR toggle button markup in the top bar, before the status badge.
- `script.js` — add the `TRANSLATIONS` dictionary, language-resolution logic (localStorage + `navigator.language` fallback), `applyLanguage(lang)` function, toggle button click handlers, and integration with the existing `initTypewriter()` so it types the resolved language's tagline on load.
- `styles.css` — style the new toggle pill (reusing the existing status-badge visual language: monospace, pill shape, cyan accent for the active state), and adjust top-bar spacing/wrap if needed to fit the new element alongside the existing logo/nav/status-badge.
- `README.md` — add a short note under a new "Editing translations" (or similar) section pointing to the `TRANSLATIONS` object in `script.js` as the single place to edit copy in either language.

## Out of scope

- No more than two languages (English, French only).
- No URL-based language routing (`/fr/` paths) — this is a pure client-side, same-URL toggle.
- No translation of tool/technology proper nouns (see Content status above).
- No automatic re-typing of the tagline on language switch — only on initial page load.
- No server-side or build-time i18n tooling.
