---
name: EcoPilot System
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffffff'
  on-tertiary: '#68000a'
  tertiary-container: '#ffdad7'
  on-tertiary-container: '#c22229'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ad'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#930013'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
  app-bg: '#050505'
  surface-base: '#121212'
  surface-raised: '#171717'
  border-subtle: '#262626'
  border-strong: '#404040'
  text-primary: '#F5F5F5'
  text-muted: '#737373'
  status-alert: '#EF4444'
  status-success: '#10B981'
typography:
  display:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
  data-mono-lg:
    fontFamily: JetBrains Mono
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.02em
  data-mono-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  data-mono-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 0.75rem
  gutter-desktop: 1rem
  margin: 1rem
  margin-desktop: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system embodies quiet luxury and utilitarian brutalist enterprise for mission-critical environmental operations. The interface is engineered for environmental engineers, sustainability officers, and operations controllers who demand absolute data density, precision, and low cognitive fatigue during extended operational sessions.

The aesthetic strips away all superficial ornamentation: no glassmorphism, no atmospheric blurs, and no neon glows. Instead, visual authority is achieved through razor-sharp architectural layout lines, structural 1px borders, subtle tone-on-tone contrast, and crisp typographic hierarchy. Every pixel serves a functional purpose, balancing the disciplined austerity of a terminal console with the refined precision of an executive operational center.

## Colors

The palette operates in strict dark mode, anchored by deep charcoal foundations rather than pure digital voids. Hierarchy is communicated through precise micro-shifts in background lightness rather than shadows:

- **Canvases & Surfaces:** Canvas base rests at `#050505`. Operational panels and cards rely on `#121212`, elevating active or hovered containers to `#171717`.
- **Structural Lines:** Structural division relies entirely on `#262626` for standard delineation and `#404040` for focused or selected boundaries.
- **Typography & Content:** High-signal readings and critical metrics use `#F5F5F5`. Secondary descriptors, baseline thresholds, and metadata employ `#737373`.
- **Operational Signals:** Status colors are completely flat. `#10B981` denotes nominal state, compliance, and active processing; `#EF4444` signals critical breaches, hardware anomalies, and threshold violations. Neither status color uses glow, gradients, or ambient cast.

## Typography

Typography balances Swiss modernist clarity via Inter with the technical rigor of JetBrains Mono. 

- **Section & Header Treatments:** Structural panel labels, section markers, and field indicators use uppercase strings with expanded tracking (`0.05em` to `0.08em`) to ground analytical sections.
- **Operational Data & Telemetry:** All telemetry values, sensor readings, coordinate metrics, and log outputs are typeset in JetBrains Mono to enforce tabular alignment across data columns.
- **Narrative Content & Actions:** Form controls, body instructions, and table descriptions stay in Inter at normal weights (400 and 600), avoiding decorative weights or stylized italicization.

## Layout & Spacing

The layout is built upon a rigid, compact fluid grid optimized for high-density operations:

- **Desktop (1200px+):** 12-column layout with 16px (`1rem`) gutters and 24px (`1.5rem`) outer frame margins. Dashboard views fit strictly within standard viewports with minimal vertical scrolling.
- **Tablet (768px - 1199px):** 8-column layout with 12px (`0.75rem`) gutters. Dense multi-metric panels wrap into paired 4-column blocks.
- **Mobile (< 768px):** 4-column collapse with 12px margins and 8px gutters. Dense data matrices reflow into vertically stacked single-column telemetry streams.
- **Rhythm & Density:** Standard component paddings prioritize density: 8px (`space-sm`) and 12px (`space-md`) dominate inner container margins, packing maximum analytical telemetry into single-screen viewports without visual overlap.

## Elevation & Depth

This system discards conventional shadow-based depth entirely. Elevation is communicated through flat tonal stacking and sharp 1px hairline dividers:

- **Zero Drop-Shadows:** No box-shadow, drop-shadow, or ambient glow filters exist in the system.
- **Layered Tonal Surfaces:**
  - Base viewport: `#050505`
  - Modular panels: `#121212` with 1px solid `#262626` perimeter borders.
  - Hover / Focused containers: `#171717` with 1px solid `#404040` outlines.
- **Separation Lines:** When grouping content inside cards or split panels, border separators strictly match `1px solid #262626`.
- **Modals & Flyouts:** Flyout drawers and configuration overlays render with solid `#171717` fill, 1px solid `#404040` borders, and an unblurred, flat 80% opacity `#000000` underlay to mask background activity.

## Shapes

The geometric vocabulary is disciplined and architectural. The default corner radius is strictly `2px` for low-level controls and `4px` for structural panels:

- **Containers & Panels:** Fixed at `4px` (`rounded-lg` token) to eliminate curved softness while preventing unrefined 0px aliasing on modern high-DPI displays.
- **Form Controls, Badges, & Buttons:** Scaled at `2px` (`0.125rem` / soft scale baseline).
- **Tooltips & Popovers:** Strict `2px` radius. Circular forms and pill-shaped caps are strictly forbidden across all functional controls.

## Components

### Buttons
- **Primary:** Background `#F5F5F5`, text `#050505`, font Inter SemiBold (13px), 2px radius, padding 6px 14px. Hover shifts to `#E5E5E5`.
- **Secondary / Action:** Background `#171717`, border 1px solid `#262626`, text `#F5F5F5`. Hover: background `#262626`, border `#404040`.
- **Destructive:** Background `#121212`, border 1px solid `#EF4444`, text `#EF4444`. Hover: background `#EF4444`, text `#050505`.

### Chips & Telemetry Status Badges
- **Structure:** 2px radius, monospaced 11px uppercase typography, 2px vertical by 6px horizontal padding.
- **Status (Nominal):** Background `#121212`, border 1px solid `#10B981`, text `#10B981`. No ambient color tinting or outer glow.
- **Status (Alert):** Background `#121212`, border 1px solid `#EF4444`, text `#EF4444`.
- **Informational / Filter:** Background `#171717`, border 1px solid `#262626`, text `#737373`. Active selection: text `#F5F5F5`, border `#404040`.

### Data Cards & Modules
- **Geometry:** 4px radius, 1px solid `#262626` border, `#121212` background.
- **Header:** Card titles feature uppercase tracking (`label-caps`), bordered bottom by a 1px solid `#262626` divider with 8px internal padding.
- **Body:** Flush numeric readouts positioned with strict tabular-num lining.

### Input Fields & Selectors
- **Default State:** Background `#0A0A0A`, 1px solid `#262626` border, text `#F5F5F5`, 2px radius, height 32px, 8px padding.
- **Focus State:** Border transitions directly to 1px solid `#F5F5F5`. No halo, outline ring, or glowing drop shadow.
- **Placeholder:** Text `#737373`.

### Selection Controls (Checkboxes & Radios)
- **Checkboxes:** 14x14px square, 2px radius, 1px solid `#262626` frame, `#0A0A0A` background. Checked state: `#F5F5F5` background with an inverted `#050505` sharp check mark.
- **Radio Buttons:** 14x14px, 1px solid `#262626` frame, `#0A0A0A` background. Selected state: 4px centered `#F5F5F5` square inner core (retaining architectural square motif over circles).

### Data Tables & Sensor Logs
- **Row Architecture:** Flat rows, height 36px, border-bottom 1px solid `#262626`.
- **Header Cells:** Background `#0A0A0A`, uppercase JetBrains Mono, text `#737373`, border-bottom 1px solid `#404040`.
- **Row Interaction:** Hover invokes flat `#171717` fill with zero transition latency.