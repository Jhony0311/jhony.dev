# Read a garden post

A garden post shows the entry title, stage, last edited date, tags, and body, and lets the visitor return to the garden index.

## Sub-features

- `post-from-garden` opens a post by choosing its card on `/garden`.
- `post-from-home` opens a post by choosing a preview card on `/`.
- `post-direct` opens a known slug such as `/async-error-handling`.
- `post-meta` shows type, stage, last edited, and tags beside the title.
- `post-back` returns to `/garden` via `Back to garden`.

## How to get to it (user POV)

- Choose a garden card on `/` or `/garden` (the card is a link; the visible `Read` control is part of that link).
- Open a post URL directly, e.g. `/async-error-handling`.
- Choose `Back to garden` on the post.

## Driving it with control-jhony

Preconditions:

- Instance is healthy at the doctor URL.
- `control-jhony doctor` reports `doctor ok`.
- Entry `What changed in my async error handling this month` exists at `/async-error-handling` (Note, Seedling).

- **HTTP identity.** Run `.cursor/skills/verify-jhony-dev/bin/control-jhony http GET /async-error-handling`. HTTP `200` and the HTML includes that title.
- **Open from garden.** From `/garden` after cards load, choose the card named `What changed in my async error handling this month`. Click that link. The location is `/async-error-handling` and the heading is the same title.
- **Confirm meta.** The aside shows `Stage` `Seedling`, a `Last edited` date, and tags including `#javascript`.
- **Back.** Choose `Back to garden`. Click the link named `Back to garden`. The location is `/garden`.
- **Home entry.** From `/` after preview load, choose the same card title. The post heading matches. This is a separate entry point from the garden list.
- **Proof.** Capture the open post with wordmark visible. Save `artifacts/garden-post/post.aria.txt` and `artifacts/garden-post/post.png`. The heading and `Back to garden` are in both.

## Gotchas

- Post URLs are root slugs (`/async-error-handling`), not `/garden/...`.
- Garden cards have no separate `Read` button; the whole card is the link.
- Unknown slugs 404. Do not invent titles that are not in the seeded list.
- Body blocks vary by entry (paragraph, quote, code, image, YouTube). Title + `Back to garden` is the shared proof; extra blocks are optional.
