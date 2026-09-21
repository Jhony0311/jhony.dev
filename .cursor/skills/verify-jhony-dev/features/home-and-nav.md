# Home and navigation

Home identifies the site as Jonathan Ortega's, shows a garden preview of the latest entries, and lets a visitor reach Garden, About, and Contact from the floating nav, the preview, or the footer.

## Sub-features

- `home-identity` shows the wordmark `jhony.dev`, the title `Jonathan Ortega`, and the home document title.
- `home-preview` lists the first four garden entries after the skeleton clears, including `What changed in my async error handling this month`.
- `nav-garden` opens `/garden` from the floating nav `Garden` link.
- `nav-about` opens `/about` from the floating nav `About` link.
- `nav-contact` scrolls to the contact footer from `Contact` (`/#contact`).
- `home-all-entries` opens `/garden` from the `All entries` link.
- `wordmark-home` returns to `/` from the `jhony.dev` wordmark.

## How to get to it (user POV)

- Open `/`.
- Choose `Garden`, `Contact`, or `About` in the floating header.
- Choose `All entries` in the Digital Garden preview.
- Choose `jhony.dev` in the floating header.

## Driving it with control-jhony

Preconditions:

- Instance is healthy at the doctor URL (default `http://127.0.0.1:4373`).
- `control-jhony doctor` reports `doctor ok`.

- **Load home.** Open `/`. Run `.cursor/skills/verify-jhony-dev/bin/control-jhony http GET /` and navigate the browser to the doctor URL. HTTP `200`, document title `Jonathan Ortega · Software Engineer`, wordmark link `jhony.dev`.
- **Wait for preview.** Stay on `/` until the Digital Garden section heading `Notes & essays` is paired with entry titles, not skeleton bars. The first card heading is `What changed in my async error handling this month`.
- **Nav to garden.** Choose `Garden`. Click the link named `Garden` in the header nav. The location is `/garden` and the page heading contains `A living map of`.
- **Return home.** Choose `jhony.dev`. Click the link named `jhony.dev`. The location is `/`.
- **All entries.** Choose `All entries`. Click the link named `All entries`. The location is `/garden`.
- **Nav to about.** Choose `About`. Click the header link named `About`. The location is `/about` and the document title is `About · Jonathan Ortega`.
- **Contact.** From `/`, choose `Contact`. Click the header link named `Contact`. The footer heading `Let's talk` is in view and the URL hash is `#contact`.
- **Proof.** Capture home after the preview has loaded. Save an ARIA snapshot to `artifacts/home-and-nav/home.aria.txt` and a screenshot to `artifacts/home-and-nav/home.png`. Both show `jhony.dev`, `Jonathan Ortega`, and at least one garden card title.

## Gotchas

- SSR HTML for the home garden section is the skeleton. HTTP GET cannot prove cards; wait for hydration.
- Header `Contact` goes to `/#contact` on the home page, not a separate route.
- Footer also has `Garden`, `Contact`, and `About`. Record which entry point you used.
- Do not use port 4321. Doctor URL only.
