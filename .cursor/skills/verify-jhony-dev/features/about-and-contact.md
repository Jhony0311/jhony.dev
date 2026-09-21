# About and contact

About is a profile page. Contact is the site footer on every page, reached from the header `Contact` link or by scrolling to `Let's talk`.

## Sub-features

- `about-page` loads `/about` with title `About · Jonathan Ortega` and heading `Jonathan Ortega`.
- `about-linkedin` exposes `Full LinkedIn profile` to `https://www.linkedin.com/in/jmoj/`.
- `contact-footer` shows `Let's talk` in `footer#contact`.
- `contact-email` exposes `Email Jonathan` to `mailto:hi@jhony.dev`.
- `contact-social` exposes GitHub, LinkedIn, X, and Bluesky with the named aria-labels.

## How to get to it (user POV)

- Choose `About` in the floating header or footer.
- Open `/about`.
- Choose `Contact` in the floating header or footer (home hash `/#contact`).
- Scroll to the footer on any page.

## Driving it with control-jhony

Preconditions:

- Instance is healthy at the doctor URL.
- `control-jhony doctor` reports `doctor ok`.

- **Open about.** Choose `About` or run `.cursor/skills/verify-jhony-dev/bin/control-jhony http GET /about`. HTTP `200`, document title `About · Jonathan Ortega`, heading `Jonathan Ortega`.
- **LinkedIn pill.** Find the link named `Full LinkedIn profile`. Its `href` is `https://www.linkedin.com/in/jmoj/`. Do not require the external page to load.
- **Open contact.** From `/`, choose `Contact`. The footer heading `Let's talk` is visible.
- **Mail.** Find the link named `Email Jonathan`. Its `href` is `mailto:hi@jhony.dev`. Do not activate it.
- **Social.** Confirm links named `Jonathan on LinkedIn`, `Jonathan on GitHub`, `Jonathan on X`, and `Jonathan on Bluesky`. Record hrefs; do not require those sites to load.
- **Proof.** Save `artifacts/about-and-contact/about.aria.txt` and `artifacts/about-and-contact/about.png` on `/about`, plus `artifacts/about-and-contact/contact.aria.txt` and `artifacts/about-and-contact/contact.png` with `Let's talk` and the `jhony.dev` wordmark visible.

## Gotchas

- About LinkedIn (`/in/jmoj/`) is not the same URL as the footer LinkedIn (`/in/jonathanortega`). Assert the handle you are actually looking at.
- Contact is not its own route. Header `Contact` only hashes on `/`.
- Do not send email or authenticate to social sites as part of proof.
