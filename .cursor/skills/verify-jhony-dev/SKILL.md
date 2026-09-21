---
name: verify-jhony-dev
description: Drive the jhony.dev public site (Astro web UI) the way a visitor does — launch an isolated local instance, exercise navigation, garden, posts, theme, and contact, and capture proof. Use when proving a UI change works, before calling a frontend task done, or when asked to verify jhony.dev behavior.
---

# Verify jhony.dev

Public marketing/garden site for Jonathan Ortega. Primary surface is the **Astro web UI**. Sanity Studio at `/admin` is a secondary authoring surface on a shared remote dataset — do not write to it in verification runs.

There is no Playwright/Cypress harness. Launch and HTTP checks go through `control-jhony`. Interactive driving uses the Cursor browser tools (navigate, snapshot, click, screenshot) against the isolated URL.

## Launch

Repo root is three levels above this skill directory. Requires Node ≥ 22.12, `pnpm`, `node_modules`, and a repo-root `.env` with `SANITY_PROJECT_ID` and `SANITY_DATASET` (Astro reads them at config load even though garden pages currently render from `src/components/home/home-data.ts`).

Default verification port is **4373** so a human `pnpm dev` on 4321 is left alone. `launch` double-forks Astro so the instance survives the helper command exiting.

```bash
.cursor/skills/verify-jhony-dev/bin/control-jhony launch
# optional: .cursor/skills/verify-jhony-dev/bin/control-jhony launch --port 4374
```

Ready when the helper prints `doctor ok` and `url=http://127.0.0.1:4373`. The Astro log line is `Local    http://127.0.0.1:4373/`. State is `.cursor/skills/verify-jhony-dev/.run/state.env`.

Teardown:

```bash
.cursor/skills/verify-jhony-dev/bin/control-jhony cleanup
```

If launch fails because 4373 is taken by a pid this run did not start, choose another `--port`. Never kill a listener you did not start.

## Doctor

Read-only. Run first whenever anything looks off:

```bash
.cursor/skills/verify-jhony-dev/bin/control-jhony doctor
```

Pass means: launch pid still alive, TCP owner of the recorded port is that pid or a descendant, `GET /` is HTTP 200, HTML contains the home title `Jonathan Ortega · Software Engineer` and the wordmark `jhony.dev`.

Refuse to drive if doctor fails or if the port belongs to another process. Driving a shared 4321 session can clobber the user's theme cookie and Vite overlay.

## Drive

Read `features/README.md`, then the matching feature file. Recipes start from a healthy isolated instance.

Browser (preferred for UI):

1. Navigate to the `url=` from doctor, not to `localhost:4321`.
2. Snapshot. Prefer roles and accessible names over CSS or coordinates.
3. Click / type / press using those names.
4. Snapshot and screenshot the resulting state.

HTTP (identity and routing only — not a substitute for hydrated UI):

```bash
.cursor/skills/verify-jhony-dev/bin/control-jhony http GET /garden
```

Stable handles from this repo:

- Wordmark link `jhony.dev` → `/`
- Nav links `Garden` → `/garden`, `Contact` → `/#contact`, `About` → `/about`
- Theme button: `Switch to dark theme` or `Switch to light theme` (`aria-label`)
- Home preview heading `Notes & essays`; link `All entries` → `/garden`
- Garden category buttons `All`, `Essay`, `Note`, `Snippet`; maturity `All`, `Seedling`, `Budding`, `Evergreen`
- Tag popover button `Adjust tag filters`; `Clear` inside `Filter tags`; `Reset filters` when any filter is active
- Garden cards are links whose heading is the entry title, e.g. `What changed in my async error handling this month` → `/async-error-handling`
- Post: heading is the entry title; link `Back to garden` → `/garden`
- Contact region is `footer#contact` heading `Let's talk`; links `Email Jonathan`, `Jonathan on LinkedIn`, `Jonathan on GitHub`, `Jonathan on X`, `Jonathan on Bluesky`
- Footer nav `aria-label="Footer links"`

Hydration waits: home garden preview shows skeletons for ~600ms; garden index ~450ms. Wait until card titles or `N entries` are visible, not a fixed sleep that ends during skeleton.

## Evidence

Write proof under `.cursor/skills/verify-jhony-dev/artifacts/<feature-id>/`. Cleanup must not delete this tree.

Proof standards:

- Exercise the real visitor path (nav click, card click, filter click). Do not assert via editing `home-data.ts` or hitting `/admin`.
- Capture the action and the resulting state: ARIA snapshot plus screenshot with the `jhony.dev` wordmark visible, plus `control-jhony http GET` when routing is part of the claim.
- Side effects: theme writes cookie `theme` on host `127.0.0.1` (shared across ports on that host). Record document `html.dark` class and the cookie value. Restore the previous cookie before leaving the browser.
- No mocks. External profile URLs (LinkedIn, GitHub, X, Bluesky) may be opened but need not load; proving `href` + accessible name is enough. Do not send mail.

Record the feature ID and entry point with every artifact.

## Cleanup

```bash
.cursor/skills/verify-jhony-dev/bin/control-jhony cleanup
```

Kills only the recorded launch pid and its listening descendant. Leaves `artifacts/` in place. Removes `.run/state.env`.

Two instances can run side by side on different ports. They share no data directory; they **do** share the `theme` cookie if both are opened as `127.0.0.1` in the same browser profile.

## Helpers

Executable: `.cursor/skills/verify-jhony-dev/bin/control-jhony`

```bash
.cursor/skills/verify-jhony-dev/bin/control-jhony launch
.cursor/skills/verify-jhony-dev/bin/control-jhony doctor
.cursor/skills/verify-jhony-dev/bin/control-jhony http GET /
.cursor/skills/verify-jhony-dev/bin/control-jhony cleanup
```
