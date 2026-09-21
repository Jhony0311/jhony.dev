# Browse the garden

Garden lets a visitor filter entries by category, maturity, and tags, page through results, recover from an empty match, and see the filter state in the URL.

## Sub-features

- `garden-index` lists entries at `/garden` with a count such as `10 entries`.
- `garden-category` filters to Essay, Note, or Snippet and writes `/garden/essay`, `/garden/note`, or `/garden/snippet`.
- `garden-maturity` filters Seedling, Budding, or Evergreen and writes `?stage=`.
- `garden-tags` opens `Adjust tag filters`, toggles a tag, and writes `?tags=`.
- `garden-page` moves to page 2 when more than six matches exist (`?page=2`).
- `garden-empty` shows `No entries match these filters` for an impossible combination.
- `garden-reset` restores all entries via `Reset filters`.

## How to get to it (user POV)

- Choose `Garden` in the floating header or footer.
- Choose `All entries` on the home preview.
- Open `/garden` directly.
- Open a category URL such as `/garden/note`.
- Choose a garden card's `Read` target (leaves browse; covered in the post feature).

## Driving it with control-jhony

Preconditions:

- Instance is healthy at the doctor URL.
- `control-jhony doctor` reports `doctor ok`.
- Seeded catalog still has ten entries including Note `What changed in my async error handling this month`, Essay `Designing pull request templates that reviewers actually use`, and Snippet `React hook for scroll direction without layout thrash`.

- **Open index.** Choose `Garden` or open `/garden`. Run `.cursor/skills/verify-jhony-dev/bin/control-jhony http GET /garden` and navigate the browser to `/garden`. HTTP `200`. After the skeleton, the count reads `10 entries`.
- **Category filter.** Choose `Note`. Click the button named `Note` under the `Category` label. The list contains the async-error note, the URL is `/garden/note` (no type query), and the count is less than 10.
- **Maturity filter.** From `/garden`, choose `Evergreen`. Click the button named `Evergreen` under `Maturity`. The URL includes `stage=Evergreen`. Visible cards include `React hook for scroll direction without layout thrash`.
- **Tag filter.** Choose `Adjust tag filters`. Click the button named `Adjust tag filters`. In the `Filter tags` dialog, choose `react`. The URL includes `tags=react` and matching cards remain.
- **Pagination.** Reset if needed so the count is `10 entries`. Choose `Next` or `2`. Click the button named `Next`. The URL includes `page=2` and the first-page title `What changed in my async error handling this month` is gone.
- **Empty state.** Combine filters until none match (for example category `Snippet` plus maturity `Seedling`). The status `No entries match these filters` appears. `Reset filters` is visible.
- **Reset.** Choose `Reset filters`. Click the button named `Reset filters`. Count returns to `10 entries` and the path is `/garden` without `stage`, `tags`, or `page`.
- **Proof.** Capture a filtered list (category or maturity) with the wordmark visible. Save `artifacts/garden-browse/filtered.aria.txt` and `artifacts/garden-browse/filtered.png`. Record the URL in the same directory as `filtered.url.txt`.

## Gotchas

- Category uses the path (`/garden/note`), not `?type=`. Maturity and tags use search params.
- Filter chips are unlabeled buttons (`Note`, `Evergreen`). Do not click the first `All` — there is one under Category and one under Maturity.
- Tag `All` in the tags row is a status span, not a button. Open `Adjust tag filters` to change tags.
- Pagination exists only when matches exceed six and the list is not empty.
- `history.replaceState` updates the URL without a full navigation. Assert `window.location`, not a new document title, after in-page filter clicks.
- Direct `/garden/note` is a distinct entry point from clicking `Note` on `/garden`. Do not skip one and claim the other.
- Local `pnpm astro dev` injects an Astro toolbar (`Menu`, `Inspect`, `Audit`, `Settings`). Ignore those controls; they are not product UI.
