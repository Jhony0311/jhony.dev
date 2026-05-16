# Design System: Jonathan Ortega Website
**Project ID:** Jhony0311/jhony.dev

## 1. Visual Theme & Atmosphere
The interface expresses a soft editorial minimalism: warm neutral foundations, calm contrast, and restrained accents that guide focus without visual noise. The page feels structured but breathable, with broad horizontal rhythm, subtle separators, and a strong typographic hierarchy anchored by monospace display cues. Motion is intentionally light and tactile: interactions respond with gentle color shifts and slight press feedback rather than theatrical transitions.

## 2. Color Palette & Roles
- Parchment Canvas Light (`#f2f1ec`): Primary page background in light mode; establishes a warm, non-sterile foundation.
- Sanded Linen Surface (`#ebe7df`): Secondary section backdrop for tonal grouping (used in the garden section).
- Pressed Paper Fill (`#e4dfd5`): Inset surface color for tags, pills, and soft-contained controls.
- Charcoal Ink (`#1f1d1a`): Primary text color in light mode.
- Weathered Graphite (`#6f6a63`): Secondary text and supporting narrative copy.
- Dusty Caption Gray (`#9f9990`): Metadata and low-priority textual details.
- Soft Rule Stroke (`rgba(26, 25, 23, 0.1)`): Dividers and line boundaries for structure without heavy boxes.

- Ember Canvas Dark (`#171512`): Primary page background in dark mode, intentionally off-black.
- Smoked Walnut Surface (`#1f1b17`): Secondary dark section background for depth layering.
- Burnished Umber Fill (`#25211c`): Inset dark surface used on chips and pills.
- Chalk Ink (`#e9e5de`): Primary text color in dark mode.
- Warm Stone Text (`#a39b91`): Secondary text in dark mode.
- Aged Bronze Caption (`#6c655c`): Faint metadata in dark mode.
- Soft Rule Dark (`rgba(237, 234, 228, 0.09)`): Structural border and divider lines in dark mode.

- Verdant Signal (`#1a7a5e` light / `#3ecf8e` dark): Primary green accent for emphasis labels and positive highlight points.
- Verdant Wash (`rgba(26, 122, 94, 0.12)` light / `rgba(62, 207, 142, 0.14)` dark): Green-tinted hover and soft accent backgrounds.
- Cobalt Signal (`#1e5fa8` light / `#5fa3e0` dark): Primary blue accent for links, CTA text, and interactive emphasis.
- Cobalt Wash (`rgba(30, 95, 168, 0.1)` light / `rgba(95, 163, 224, 0.12)` dark): Blue-tinted fills and subdued CTA bases.

- Seed Stage (`#9a7a1e` light / `#d4a63a` dark): Early-content maturity indicator.
- Budding Stage (`#1a7a5e` light / `#3ecf8e` dark): Mid-content maturity indicator.
- Evergreen Stage (`#1e5fa8` light / `#5fa3e0` dark): Stable-content maturity indicator.

## 3. Typography Rules
Primary typography is a dual-family system defined in Tailwind theme config:
- Sans family: Inter stack for body copy and long-form readability.
- Mono family: JetBrains Mono stack for identity, headings, metadata, tags, and compact interface labels.

Hierarchy and weight behavior:
- Hero and section headlines use mono with strong weight (`font-bold`) and tight tracking for editorial character.
- Eyebrows and metadata use mono in uppercase at `text-xs` with wider tracking for navigational clarity.
- Body paragraphs use sans, primarily `text-sm` to `text-base`, with `leading-relaxed` for readable rhythm.
- Button and chip labels use mono at `text-sm` for consistency with the technical-editorial tone.

Spacing and rhythm characteristics:
- Headline line-height is compact (`leading-none` to near-snug) to preserve impact.
- Body line-height is relaxed and breathable.
- Tracking tightens for large display moments and expands for utility labels.

## 4. Component Stylings
* **Buttons:** Predominantly pill-shaped (`rounded-full`) controls with line-based boundaries and soft tint fills. Primary action buttons begin as low-intensity accent washes and intensify to solid accent states on hover. Active state uses slight upward press feedback (`active:-translate-y-px`) to create tactile confirmation.

* **Cards/Containers:** The system avoids heavy card stacking and relies on sectional backgrounds plus `border-t` separators. Containers are restrained, with subtle corner rounding on chips and pills rather than large elevated panels. Shadows are whisper-soft and used mainly in the floating navigation context.

* **Inputs/Forms:** The current homepage has no persistent form fields. Interaction language for future inputs should follow existing system logic: soft inset backgrounds, low-contrast structural lines, monospace label treatment for utility metadata, and accent-tinted hover/focus states that avoid harsh glows.

## 5. Layout Principles
The page is built as a wide but controlled narrative frame:
- Content is centered and constrained to a 1200px max width.
- Sectional separation uses tonal background shifts and line dividers instead of boxed card mosaics.
- Layout defaults to single-column continuity, then introduces measured two-column splits for supporting detail blocks.
- Spacing strategy prioritizes editorial rhythm (`py-20`, strong vertical intervals, and generous top framing in the hero).
- Visual hierarchy is driven by typography first, color second, and motion last.

The resulting system favors clarity, calm, and identity consistency: soft neutrals for structure, selective blue/green accents for intent, and a mono-led voice for brand recognition.
