# Hero Photo Addition — Design Spec

## Purpose

Add a circular profile photo to the landing page's hero section, positioned to the right of the name/tagline text on desktop, to make the page feel more personal for a job-search audience.

## Content status

No real photo file exists yet. A letter-avatar placeholder ("AR" initials, matching the site's current placeholder name "Alex Rivera") is used instead of a bracketed placeholder or broken `<img>` — it's swappable for a real photo later without breaking the layout.

## Layout

The hero's inner content splits into two blocks:
- `.hero__text` — wraps the existing eyebrow/name/role/tagline/CTA content, unchanged internally.
- `.hero__photo` — new circular avatar block.

**Desktop (`min-width: 768px`):** `.hero__inner` becomes a flex row (`.hero__text` then `.hero__photo` in DOM order, rendered left-to-right as-is — text on the left, photo on the right, satisfying "photo on the right" without needing flex reordering). Text alignment within `.hero__text` switches from centered to left-aligned at this breakpoint, since centered text reads oddly next to a photo.

**Mobile (base, < 768px):** `.hero__inner` is a flex column with `flex-direction: column-reverse`, so the photo (second in DOM order) renders visually above the text block — a natural "photo leads" pattern for narrow screens. Text stays centered, matching the current mobile hero behavior.

## Photo Treatment

- Circle: 220px diameter on desktop, 180px on mobile.
- Border: 3px solid `var(--color-accent-cyan)`.
- Glow: soft box-shadow using the cyan accent, consistent with the SOC-dashboard accent language already used elsewhere (e.g. the status badge).
- Background: `var(--color-bg-elevated)`.
- Placeholder content: bold initials "AR" in `var(--font-display)` (Space Grotesk), centered within the circle.
- Structure allows swapping in a real `<img>` later: the circle container's inner content (currently a text span with initials) is what gets replaced with an `<img>` tag sized to fill the circle (`object-fit: cover`), per a note added to `README.md`'s "before going live" checklist.

## Motion

The photo joins the existing hero `.reveal-item` stagger sequence as the first element to reveal (`animation-delay: 0s` or a small offset like `0.05s` to avoid a same-frame pop), anchoring the composition before the eyebrow/name/role/tagline/CTAs fade in on their existing schedule (0.1s/0.3s/0.5s/0.7s/1.5s, unchanged). Reduced-motion handling is unchanged — the existing `prefers-reduced-motion` rule already covers all `.reveal-item` elements, so the photo inherits that behavior automatically.

## Files Touched

- `index.html` — wrap existing hero text content in a `.hero__text` div; add a `.hero__photo` div (circle + initials span) after it in DOM order.
- `styles.css` — new `.hero__inner` flex layout (replacing the current centered-block layout), `.hero__text`/`.hero__photo` rules, circle styling, one new `.hero__photo.reveal-item` animation-delay rule, and a `min-width: 768px` media query for the row layout + left-aligned text.
- `README.md` — add a line to the existing "Before going live" checklist noting the photo placeholder should be replaced with a real `<img>`.

## Out of scope

- No real photo file is added in this change — the user will supply and swap it in later.
- No image upload/cropping tooling — this is a purely static placeholder.
- No changes to any other section of the page.
