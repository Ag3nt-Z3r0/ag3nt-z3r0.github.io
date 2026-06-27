# Agent Zero Design System

## 1. Atmosphere & Identity

Agent Zero feels like a monochrome research folio: severe, archival, and technical, but still human. The signature is black-and-white engraving imagery paired with quiet monospace metadata and large editorial serif titles.

## 2. Color

### Palette

| Role | Token | Light | Dark | Usage |
|------|-------|-------|------|-------|
| Surface/primary | --bg | #0A0A0A | #0A0A0A | Main dark background |
| Surface/paper | --paper | #F2F2F2 | #F2F2F2 | White research panel |
| Text/light | --fg | #F2F2F2 | #F2F2F2 | Text on dark surfaces |
| Text/light-muted | --fg-dim | rgba(242, 242, 242, 0.62) | rgba(242, 242, 242, 0.62) | Secondary text on dark surfaces |
| Text/dark | --ink | #0A0A0A | #0A0A0A | Text on paper surfaces |
| Text/dark-muted | --ink-dim | rgba(10, 10, 10, 0.66) | rgba(10, 10, 10, 0.66) | Secondary text on paper surfaces |
| Border/light | --line-light | rgba(242, 242, 242, 0.25) | rgba(242, 242, 242, 0.25) | Dividers on dark surfaces |
| Border/dark | --line-dark | rgba(10, 10, 10, 0.25) | rgba(10, 10, 10, 0.25) | Dividers on paper surfaces |

### Rules

The site is intentionally monochrome. No accent colors are used; emphasis comes from scale, contrast, image treatment, and spacing.

## 3. Typography

### Scale

| Level | Size | Weight | Line Height | Tracking | Usage |
|-------|------|--------|-------------|----------|-------|
| Display | clamp(52px, 8.4vw, 124px) | 300 | 0.98 | 0.005em | Hero title |
| Section title | clamp(48px, 7vw, 92px) | 300 | 0.9 | 0 | Large section titles |
| Team title | clamp(46px, 6.5vw, 88px) | 300 | 0.95 | 0 | Team heading |
| Card title | clamp(30px, 4vw, 58px) | 300 | 0.9 | 0 | Card and feature headings |
| Body | clamp(13px, 1.25vw, 16px) | 400 | 1.7 | 0 | Body copy |
| Body/sm | 12.5px | 400 | 1.65 | 0 | Member biographies |
| Metadata | 11px | 400-700 | 1.3 | 0.12em-0.24em | Eyebrows, IDs, captions |

### Font Stack

* Serif: "Cormorant Garamond", "Noto Serif KR", serif
* Korean serif: "Noto Serif KR", "Cormorant Garamond", serif
* Mono: "Courier Prime", "Nanum Gothic Coding", monospace

### Rules

Large headings use the serif stack. Interface labels and metadata use the mono stack. Korean body text keeps `word-break: keep-all`.

## 4. Spacing & Layout

### Base Unit

All spacing is based on 4px multiples, with responsive `clamp()` values for section rhythm.

| Token | Value | Usage |
|-------|-------|-------|
| --space-3 | 12px | Tight metadata spacing |
| --space-4 | 16px | Default inline and button spacing |
| --space-5 | 20px | Mobile gutter minimum |
| --space-6 | 24px | Card inner rhythm |
| --space-8 | 32px | Grid gaps and compact section breaks |
| --space-12 | 48px | Standard vertical rhythm |
| --space-20 | 80px | Large panel padding |
| --gutter | clamp(20px, 7vw, 110px) | Page horizontal gutter |
| --frame | 12px | Fixed viewport frame inset |

### Grid

* Max content width is controlled by section-specific clamps rather than a single container.
* Disclosure stats use 4 columns on desktop, 2 on tablet, and 1 on mobile.
* Team grids use 4 columns on desktop, 2 on tablet, and 1 on mobile.
* Breakpoints are approximately 980px and 640px.

### Rules

Preserve the asymmetric editorial spacing. Do not introduce card-in-card layouts or rounded SaaS panels.

## 5. Components

### Navigation

* Structure: text links around a centered stacked wordmark.
* States: underline reveal on hover, mobile full-screen menu.
* Motion: transform-only burger transition.

### Button

* Variants: light filled and ghost outline.
* States: hover uses color inversion or small `translateY`.
* Accessibility: buttons and links keep visible text labels.

### Member Card

* Structure: engraving image, metadata ID, serif name, mono role, short bio.
* Spacing: metadata and bio stay compact under a fixed-aspect image.
* Motion: image scales on hover using transform only.

### Disclosure Ledger

* Structure: editorial section header, four compact stat cells, responsive table, disclosure note.
* Spacing: table uses tight mono rows with generous vertical section margins.
* Typography: stat values use the mono stack so digits remain unambiguous.
* Mobile: rows become stacked key-value records using `data-label`.
* Page split: home shows only recent rows; `disclosure.html` owns the complete ledger and disclosure discipline.
* Page framing: `disclosure.html` opens with a full-viewport dark hero and closes with a black grounded base under the oversized wordmark.
* Safety: public page summarizes findings without PoC payloads or unpublished exploit detail.

## 6. Motion & Interaction

| Type | Duration | Easing | Usage |
|------|----------|--------|-------|
| Micro | 300-350ms | var(--ease) | Hover, burger, menu |
| Reveal | 1s | var(--ease) | Scroll reveal |
| Typing | variable | timeout loop | Terminal simulation |
| Parallax | requestAnimationFrame | scroll-bound | Research artwork |

Only animate `transform`, `opacity`, `filter`, and color/background transitions. Respect `prefers-reduced-motion`.

## 7. Depth & Surface

### Strategy

Mixed, but restrained: borders, tonal inversion, image contrast, and sparse shadows for terminal and light buttons. Depth should feel printed and archival, not glossy.
