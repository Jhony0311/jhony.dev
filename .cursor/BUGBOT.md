# Bugbot

This file is the review source. Apply only the fail conditions below. Cite the heading each condition names. Do not restate `docs/coding-guidelines.md` or `DESIGN.md`.

Review lines the diff adds or edits. Lines the diff does not touch are out of scope.

Skip a finding that `pnpm lint`, `pnpm fmt:check`, or `pnpm typecheck` would already report.

## Shared-UI file type

Fail when the diff violates the heading `Astro and React` in `docs/coding-guidelines.md`. Cite that heading.

## Single-use extraction

Fail when the diff violates the heading `Extraction` in `docs/coding-guidelines.md`. Cite that heading.

## Changed-line token drift

Fail when a line the diff adds or edits violates the heading `Implementation & Tailwind Consistency Rules` in `DESIGN.md`. Cite that heading.

## Design-system edit

Fail when the design system changes and the same change does not update `DESIGN.md`. Cite the heading in `DESIGN.md` that should record the change.

The design system changes when the diff introduces a new token, or a new value for a token `DESIGN.md` already defines, such as the type scale. The heading to cite is the one that should record that change: `1. Visual Theme & Atmosphere`, `2. Color Palette & Roles`, `3. Typography Rules`, `4. Component Stylings`, `5. Layout Principles`, or `6. Implementation & Tailwind Consistency Rules`.

These cases do not require an edit to `DESIGN.md`:

- The diff brings code into line with a token the doc already names.
- The diff uses a one-off arbitrary value the doc does not claim to specify.

## Catch-all

Fail on any other violation of `docs/coding-guidelines.md` or `DESIGN.md`. Cite the heading the line violates.
