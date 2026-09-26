# Design System: Jonathan Ortega Website
**Project ID:** Jhony0311/jhony.dev

## 1. Visual Theme & Atmosphere
The interface expresses warm editorial minimalism with geometric precision: a soft paper-toned canvas frames the content, while deep charcoal typography preserves clarity and contrast. Restrained green and blue accents guide attention without visual noise. The page feels structured yet spacious, with broad vertical rhythm, subtle line-based separators, and a strong typographic hierarchy anchored by monospace display text. Motion is intentionally restrained: interactions respond with gentle color shifts and subtle state transitions rather than theatrical animation. The default presentation follows the system preference, with a light warm-neutral shell as the primary state and a dark alternate mode for contrast.

## 2. Color Palette & Roles

### Light Mode (Primary/Default Presentation)
- **Parchment Canvas Light** (`#f2f1ec`): Primary page background; warm, non-sterile foundation that keeps the interface calm and readable.
- **Sanded Linen Surface** (`#ebe7df`): Secondary section backdrop for tonal grouping and visual hierarchy.
- **Pressed Paper Fill** (`#e4dfd5`): Inset surface for tags, pills, and contained controls; creates subtle depth without heavy chrome.
- **Charcoal Ink** (`#1f1d1a`): Primary text color; near-black warmth that maximizes legibility on the paper canvas.
- **Weathered Graphite** (`#6f6a63`): Secondary text and supporting narrative copy; reduces visual weight while keeping clarity.
- **Dusty Caption Gray** (`#9f9990`): Metadata, timestamps, and low-priority details.
- **Soft Rule Stroke** (`rgba(26, 25, 23, 0.1)`): Structural borders and divider lines; restrained but present.

- **Verdant Signal** (`#3ea984`): Bright green accent for emphasis labels, positive highlights, and stage indicators. High contrast for accessible emphasis in light contexts.
- **Verdant Wash** (`#edf7f2`): Green-tinted soft backgrounds for hover states and subdued accent fills.
- **Cobalt Signal** (`#3d81c6`): Blue accent for links, CTA text, and interactive emphasis; reserved for primary interactions.
- **Cobalt Wash** (`#eef4fb`): Blue-tinted fills and secondary CTA bases.

- **Seed Stage** (`#d4a63a`): Early-content maturity indicator; amber/gold signal.
- **Budding Stage** (`#3ea984`): Mid-content maturity indicator; green signal.
- **Evergreen Stage** (`#3d81c6`): Stable-content maturity indicator; blue signal.

### Dark Mode (Alternate Presentation)
- **Ember Canvas Dark** (`#171512`): Primary page background for the dark variant; off-black foundation for contrast-heavy reading.
- **Smoked Walnut Surface** (`#1f1b17`): Secondary section backdrop for tonal grouping and visual hierarchy in dark mode.
- **Burnished Umber Fill** (`#25211c`): Inset surface for tags, pills, and contained controls; provides subtle lift.
- **Chalk Ink** (`#e9e5de`): Primary text color; warm cream tone for maximum contrast and readability.
- **Warm Stone Text** (`#a39b91`): Secondary text and supporting narrative copy; reduces visual weight.
- **Aged Bronze Caption** (`#6c655c`): Metadata, timestamps, and low-priority details.
- **Soft Rule Dark** (`rgba(237, 234, 228, 0.09)`): Structural borders and divider lines; restraint without harshness.

- **Verdant Signal** (`#3ecf8e`): Bright, saturated green accent for emphasis labels, positive highlights, and stage indicators. High contrast for accessibility in dark contexts.
- **Verdant Wash** (`rgba(62, 207, 142, 0.14)`): Green-tinted soft backgrounds for hover states and subdued accent fills.
- **Cobalt Signal** (`#5fa3e0`): Bright blue accent for links, CTA text, and interactive emphasis; reserved for primary interactions.
- **Cobalt Wash** (`rgba(95, 163, 224, 0.12)`): Blue-tinted fills and secondary CTA bases.

- **Seed Stage** (`#d4a63a`): Early-content maturity indicator; amber/gold signal.
- **Budding Stage** (`#3ecf8e`): Mid-content maturity indicator; green signal.
- **Evergreen Stage** (`#5fa3e0`): Stable-content maturity indicator; blue signal.

## 3. Typography Rules
The design system employs a dual-family typography strategy optimized for technical content and editorial clarity:

**Font Families:**
- **Sans Family:** Inter stack for body copy and reading-intensive narratives; provides high legibility at all sizes.
- **Mono Family:** JetBrains Mono stack for display, headlines, metadata, tags, and compact interface labels; establishes technical identity and visual consistency.

**Fluid Display Typography:**
Centralized in Tailwind theme CSS custom properties for responsive scaling:
- `--text-display-fluid`: `clamp(2rem, 5vw, 3.5rem)` with line-height `1.05`; for mid-sized headings.
- `--text-hero-fluid`: `clamp(2.75rem, 8vw, 6.5rem)` with line-height `1`; for primary hero text (name, major sections).
- `--text-post-hero-fluid`: `clamp(2.9rem, 7vw, 5.75rem)` with line-height `0.95`; for supporting hero-level content.

**Hierarchy & Weight:**
- **Hero and Section Headlines:** Monospace, bold weight (`font-bold`), tight tracking; establishes editorial voice and visual anchor.
- **Eyebrows and Metadata:** Monospace, uppercase, wider letter-spacing at `text-xs`; creates navigational clarity (e.g., "WORKING WITH", "Seedling").
- **Body Paragraphs:** Sans family, primarily `text-sm` to `text-base`, `leading-relaxed` for readable breath.
- **Button and Chip Labels:** Monospace, `text-sm`; maintains technical tone and consistency with brand voice.
- **Tags and Badges:** Monospace, `text-xs` to `text-sm`; ensures semantic labels remain compact and scannable.

**Spacing & Rhythm:**
- Headline line-height is compact (`leading-none` to near-tight) to maximize impact.
- Body line-height is generous and breathable (`leading-relaxed`) for extended reading.
- Tracking tightens for large display moments and expands for utility labels and metadata.

## 4. Component Stylings

* **Buttons & Tags:** Predominantly pill-shaped (`rounded-full`) with minimal borders and soft inset backgrounds. Tech stack tags use low-contrast borders and `bg-canvas-inset` fills. Primary action buttons transition from low-intensity accent washes to solid accent states on hover. Labels use monospace at `text-xs`-`text-sm` for semantic clarity.

* **Cards/Containers:** The system avoids heavy card stacking, instead relying on sectional background layers and subtle `border-t` separators for visual division. Containers are restrained with minimal corner rounding on chips and pills (`rounded-lg` to `rounded-full`). Elevation is semantic and understated:
	- `shadow-nav` for floating navigation bars.
	- `shadow-card` for low-elevation content blocks.
	- `shadow-elevated` for emphasized editorial sections.
	- `shadow-popover` for transient overlays and dropdowns.
	The light theme uses soft warm shadows; the dark mode variant deepens them subtly to preserve contrast without harshness.

* **Navigation & Entry Points:** The hero section uses a borderless navigation bar with transparent background and `shadow-nav` for a subtle floating effect. Navigation links and buttons respond with gentle color transitions. The overall aesthetic favors minimalist borders over heavy shadows or fills.

* **Inputs/Forms:** The current homepage has no persistent form fields. Future input components should follow existing patterns: soft `bg-canvas-inset` backgrounds, low-contrast structural borders (Soft Rule Dark), monospace label treatment for utility metadata, and accent-tinted hover/focus states without harsh glows.

* **Interaction Architecture:** Interactive components follow a utility-first policy with no runtime style mutation for hover/focus states. All visual state changes are expressed through stable Tailwind classes and semantic CSS custom properties instead of inline `style` objects or arbitrary utilities. Transitions use `.25s ease` for color and background changes, creating a cohesive temporal rhythm.

## 5. Layout Principles
The page is structured as a controlled narrative frame centered on the viewport:

**Container Sizing Strategy:**
Standardized semantic container widths through Tailwind theme CSS custom properties ensure consistent proportions across all viewports:
- `--container-site` (`75rem` / `max-w-site`): Primary full-width page shell and outer boundaries.
- `--container-reading` (`68ch`): Optimal line-length for extended prose passages.
- `--container-copy` (`62ch`): Standard body copy width with balanced margins.
- `--container-measure` (`58ch`): Tighter prose blocks for supplementary content.
- `--container-narrative` (`52ch`): Compact narrative width for intro/support sections.
- `--container-compact` (`44ch`): Supporting detail and auxiliary text.
- `--container-headline` (`14ch`): Constrained headline widths to prevent awkward line breaks.

**Visual Hierarchy & Rhythm:**
- Content is centered and constrained through semantic container tokens; no jarring full-bleeds.
- Sectional separation uses tonal background shifts (canvas → canvas-subtle) and line dividers (border-t with Soft Rule Dark) instead of boxed card mosaics.
- Layout defaults to single-column continuity, introducing measured two-column splits only for supporting detail blocks (e.g., hero section with descriptor on left, tech stack tags on right).
- Spacing strategy prioritizes editorial rhythm with generous vertical intervals (`py-20`, `space-y-12`); sections breathe with intent.
- Visual hierarchy is driven by typography first (size, weight, family), color second (accent signals), and motion last (gentle transitions).

**Responsive Behavior:**
- Fluid typography scales smoothly from mobile to desktop via CSS `clamp()` functions.
- Container widths adapt to viewport while maintaining centered constraints; no dramatic layout shifts at breakpoints.
- The two-column hero pattern collapses to single-column on smaller viewports, preserving readability and hierarchy.

**Theme Adaptability:**
The site follows the browser/system preference by default and stores the selected mode in a cookie when the user toggles it manually. Light mode is the primary default canvas for the brand, while dark mode remains a fully supported alternate presentation with matching semantic tokens.

## 6. Implementation & Tailwind Consistency Rules

**Design Token Usage:**
- Prefer semantic token utilities (`max-w-site`, `text-hero-fluid`, `shadow-nav`) defined in `@theme` over arbitrary values in individual classes.
- Use Tailwind base typography utilities (`text-xs`, `text-sm`, `text-base`, `text-lg`) for non-fluid text whenever close matches exist.
- Reference CSS custom properties for color tokens to ensure consistency across theme variants (e.g., `bg-[var(--color-canvas)]`).

**CSS Custom Property Management:**
- Keep all fluid typography definitions centralized in `@theme` CSS custom properties (`--text-display-fluid`, `--text-hero-fluid`, etc.), never inline.
- Define color variables in both light (root context) and dark (`.dark` context) to enable seamless theme toggling.
- Maintain shadow definitions (`--shadow-nav`, `--shadow-card`, etc.) as CSS custom properties for consistent depth perception across themes.

**Class Composition Patterns:**
- Avoid inline style objects for component presentation unless a value cannot be represented by existing theme tokens.
- Use Tailwind's `@apply` directive sparingly; prefer composing stable classes in markup over extracting abstractions.
- Document semantic token aliases in code comments when they deviate from standard Tailwind naming (e.g., `max-w-site` → `75rem`).

**Dark Mode Implementation:**
- Use CSS `@custom-variant dark` to enable class-based dark mode (Tailwind v4 pattern).
- Apply dark-mode color tokens through CSS custom property overrides, not duplicated class selectors.
- Test all components in both light and dark contexts; light remains the default brand canvas while dark is a supported alternate mode.

**Accessibility & Contrast:**
- Verify color token contrast ratios meet WCAG AA standards (4.5:1 for text, 3:1 for UI components).
- Use the high-contrast accent colors (`#3ecf8e` green, `#5fa3e0` blue) purposefully for semantic signals, not decoration.
- Ensure transition durations (`.25s ease`) do not conflict with `prefers-reduced-motion` user preferences.
