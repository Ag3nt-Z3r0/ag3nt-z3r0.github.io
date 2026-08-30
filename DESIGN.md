# Agent Zero Design System — "Observatory" Edition

## 1. Atmosphere & Identity

Agent Zero reads as a calibrated monochrome observation instrument: dot-matrix (dithered) graphics, hairline HUD geometry (brackets, crosshairs, tick rulers, concentric orbits), monospace telemetry labels, and hatched caution bands — grounded by wide grotesk display type set in uniform uppercase. The page itself is a framed instrument: a bordered shell, fixed corner brackets, and a live cursor-coordinate readout.

References: dithered-dome hero panels, CRT construction diagrams, thin-line thermal HUDs, orbital feature maps.

## 2. Color

### Palette

| Role | Token | Value | Usage |
|------|-------|-------|-------|
| Surface | --bg | #0A0A0B | Global background |
| Surface/raised | --bg-raise | #0D0D0F | Cards (compare, gauge) |
| Text | --fg | #EAEAE4 | Primary text, strokes |
| Text/dim | --fg-dim | rgba(234,234,228,.6) | Secondary text |
| Text/faint | --fg-faint | rgba(234,234,228,.35) | Tertiary labels, indexes |
| Border | --line | rgba(234,234,228,.14) | Hairlines, cell borders |
| Border/strong | --line-strong | rgba(234,234,228,.32) | Emphasized frames |
| Signal | --signal | #FF4D00 | Live markers ONLY |

### Rules

The site is monochrome with exactly one micro-accent. `--signal` may appear only as: live-status dots, the gauge needle tip, the dome base point. Never as text color, backgrounds, or borders. Emphasis otherwise comes from scale, stroke opacity, and dot density.

## 3. Typography

### Font Stack

* Display sans: "Archivo" (variable, `font-stretch` 110–125%) — English headings, uppercase
* Mono: "IBM Plex Mono" — all telemetry labels, table data, buttons, nav
* Body: "IBM Plex Sans KR" (300/400/500) — Korean copy

### Scale

| Level | Size | Weight | Notes |
|-------|------|--------|-------|
| Hero display | clamp(42px, 6.8vw, 100px) | 500, stretch 115% | Hand-typed uppercase |
| Section title | clamp(34px, 4.8vw, 66px) | 500, stretch 114% | Same uppercase rule |
| Stat value | clamp(38px, 4.2vw, 60px) mono | 500 | Wrapped in faint `[ ]` brackets |
| Body | 12.5–15.5px | 300 | line-height 1.8–1.9, `word-break: keep-all` |
| Telemetry label | 9–11px mono | 400–500 | letter-spacing 0.14–0.24em |

### Rules

Headings are hand-typed uppercase display sans throughout — no accent typeface, no italic, no `text-transform`. Emphasis comes from scale and weight alone. Mono labels are always tracked wide. Korean never renders in the display sans (falls back to Plex Sans KR).

## 4. Spacing & Layout

* Shell: max-width 1520px, hairline side borders — the page is a bounded panel.
* Gutter: `--gutter: clamp(18px, 4.5vw, 64px)`.
* Sections separated by hairline `border-top`; hatched `.band` strips (repeating 45° 1px stripes, 22px tall) mark major transitions (below nav, above footer).
* Grids share borders (cells/stats/protocol are bordered grids, not gapped cards).
* Breakpoints: 1020px (grid collapse), 900px (nav → burger), 760px (stack, orbit hidden, table → key-value records).

## 5. Signature Components

### Fixed HUD chrome
Corner L-brackets at viewport edges + mono tags: coordinates (bottom-left) and live cursor `X:0000 · Y:0000` readout (bottom-right, fine pointers only). Pointer-events: none.

### Page map
Home = dome hero + console + ticker + dirlist (site index). About = spec-sheet hero + compare + pipeline + audience cells. Team = orbit hero + roster + open-seat. Disclosure = CRT hero + gauge + filters + full table + protocol. Nav links are page links (about.html / disclosure.html / team.html); JOIN targets each page's own `#join` footer.

### Dithered dome (home hero)
Inline SVG: half-circle masked dot patterns (6px + 13px grids) with radial falloff, ridge silhouettes as masked dot fields, hairline orbit arcs, apex crosshair, satellite rings, one signal dot at base. The dome doubles as the brand "0".

### Floating console
Terminal card overlapping the dome (Vocel-style): live dot + `az://disclosure-feed` address bar, typed log loop, pill chips, circular go-button. On mobile it stacks above the dome.

### Ticker
Marquee of disclosure IDs (`AZ-… · CLASS · SEVERITY ✳`), duplicated track, 46s linear loop, pauses on hover.

### Spec sheet (about hero)
Bordered mono definition list (`dl` of label/value rows) beside the page title — EST / BASE / FOCUS / METHOD / OUTPUT.

### Pipeline (about)
Bordered 4-step grid (S.01 [scan] → S.04 [coord]) with mono `→` connectors punched out of the shared borders; vertical with `↓` under 1020px. Step labels echo the console feed tags.

### Dirlist (home site index)
Full-width hairline rows — mono index, big uppercase sans title, Korean description, arrow. Hover inverts the entire row to light-on-dark's opposite.

### Open seat (team)
Dashed-border invitation card (`AZ-005 — UNASSIGNED`) that turns solid on hover; the only dashed panel in the system, marking absence.

### Compare cards (doctrine)
Two bordered cards — noisy polyline waveform vs clean sine waveform (SVG, `vector-effect: non-scaling-stroke`, soft glow) — joined by a dashed-ring node; mono readout strips beneath.

### Orbit diagram (team)
Concentric SVG circles (one dashed ring slowly rotating, bright arc segments), diagonal axes, node dots; HTML pill chips positioned by `--x/--y` percentages over a square container. Decorative (`aria-hidden`) — names repeat in the roster. Hidden under 760px.

### Roster
Hairline-row list: halftone avatar thumb (dot-grid overlay), mono ID, name, bio, status. Member avatars (`.roster__thumb--photo`) render in muted color — desaturated and dimmed (`saturate(.62) brightness(.76)`) so they sit in the dark panel — the one sanctioned break from strict monochrome. Any Doré-engraving thumb keeps the `grayscale + invert` treatment instead.

### Ledger table
Mono table between strong hairlines; severity chips use CSS squares (filled = HIGH, half = MEDIUM, hollow = BELOW FLOOR); pending-GHSA rows carry a live dot; row hover swaps a `·` marker for `›`. Mobile: stacked key-value records via `data-label`.

### Bracket counters + tick rulers
Stat values typed inside faint `[ ]`, underlined by a two-layer CSS tick ruler (minor 8px / major 40px).

### CRT hero (disclosure page)
Uptime counter `T:HH:MM:SS`, telemetry blocks, overlapping-circle (vesica) construction SVG with big side brackets, dot-grid background, scanlines + sweeping highlight.

### Gauge
Semi-circular SVG: dash-comb tick arc, value arc (disclosed/tracked ratio), needle with signal tip. Keep `stroke-dasharray` and needle coordinates in sync with the numbers.

### Filters
Pill buttons with `aria-pressed`, filtering `tr[data-sev]`; count readout is `aria-live`.

## 6. Motion & Interaction

| Type | Duration | Usage |
|------|----------|-------|
| Reveal | 0.9s, IO threshold 0.01 | Scroll entrance (staggered .d1–.d5) |
| Micro | 0.25–0.4s | Hover inversions, chips, links |
| Ambient | 22–90s linear | Ticker, orbit ring, node ring |
| Typing | timeout loop | Console feed |
| Clocks | 1s interval | KST clock, UTC stamps, uptime |

Only `transform`, `opacity`, `filter`, color/background transitions. Everything ambient stops under `prefers-reduced-motion`.

## 7. Depth & Surface

Flat and printed: hairlines, tonal opacity steps, dot density. Shadows only under floating instruments (console, orbit chips). Rounded corners are reserved for "control" elements (pills, chips, circular buttons) — panels and cards stay square. Global film grain overlay stays subtle (0.5 opacity of 6% noise).
