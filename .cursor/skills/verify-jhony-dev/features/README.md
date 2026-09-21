# jhony.dev verification map

This directory is the maintained source for verifying visitor-facing behavior of the jhony.dev public site. Read the index before driving the app, then use the matching feature file as the recipe.

## Baseline preconditions

- Launch with `.cursor/skills/verify-jhony-dev/bin/control-jhony launch` (default `http://127.0.0.1:4373`).
- Run `control-jhony doctor` and require `doctor ok` plus the recorded URL.
- Never drive `localhost:4321` or any instance this run did not start.
- Garden copy currently comes from `src/components/home/home-data.ts` (ten seeded entries). Do not treat `/admin` Studio as the source of truth for these recipes.
- Home garden cards appear after a ~600ms skeleton; garden index after ~450ms. Wait for titles, not skeletons.

## Driving conventions

- Start every recipe from the baseline state unless its preconditions say otherwise.
- Prefer ARIA roles and accessible names over CSS selectors or DOM position.
- Treat every command as literal.
- Run process/HTTP actions through `control-jhony`.
- Run UI actions through the Cursor browser against the doctor URL.
- Restore the `theme` cookie if a recipe mutates it. Do not delete proof artifacts during cleanup.

## Proof and skip reporting

- Capture the user action and the resulting state, not only the final screen.
- UI proof includes an ARIA snapshot and a screenshot with the `jhony.dev` wordmark visible.
- HTTP proof includes the command, status code, and identifying body text.
- Record the feature ID and entry point used with every artifact.
- Report an unreachable path with the attempted command and the unmet precondition.
- Do not report a skipped entry point as verified through a different path.

## Feature entry contract

Each feature file starts with an H1 title and one paragraph describing the user-visible behavior. It then uses exactly four H2 sections in this order.

1. `Sub-features` lists short IDs with one line for each behavior.
2. `How to get to it (user POV)` lists every user entry point.
3. `Driving it with control-jhony` starts with `Preconditions:` and uses labeled bullets that pair each user action with an exact command and observable result.
4. `Gotchas` lists traps that can waste or invalidate a verification run.

Keep implementation details out of the map. Name only user paths, stable handles, required state, commands, and observable proof.

## Features

- [Home and navigation](./home-and-nav.md) covers identity, floating nav, garden preview, and routing to garden, about, and contact.
- [Browse the garden](./garden-browse.md) covers category, maturity, tags, pagination, empty state, and URL sync.
- [Read a garden post](./garden-post.md) covers opening an entry from home or garden and returning via Back to garden.
- [Theme toggle](./theme-toggle.md) covers light/dark switching, `html.dark`, and the `theme` cookie.
- [About and contact](./about-and-contact.md) covers the about profile and the contact footer links.
