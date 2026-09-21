# Theme toggle

The floating header lets a visitor switch between light and dark appearance. The choice is stored in the `theme` cookie and applied as the `dark` class on `html`.

## Sub-features

- `theme-to-dark` switches to dark when the control is `Switch to dark theme`.
- `theme-to-light` switches to light when the control is `Switch to light theme`.
- `theme-cookie` writes `theme=dark` or `theme=light` for host `127.0.0.1`.
- `theme-class` toggles `document.documentElement.classList` `dark` to match.

## How to get to it (user POV)

- Choose the circular sun/moon control at the right of the floating header on any public page.

## Driving it with control-jhony

Preconditions:

- Instance is healthy at the doctor URL.
- `control-jhony doctor` reports `doctor ok`.
- Record the current `theme` cookie and whether `html` has class `dark` before changing anything.

- **Read control.** Snapshot the header. The theme control is a button named `Switch to dark theme` or `Switch to light theme`.
- **Toggle once.** Click that button. The accessible name flips to the opposite phrase. If you clicked `Switch to dark theme`, `html` has class `dark` and `document.cookie` contains `theme=dark`. If you clicked `Switch to light theme`, `html` does not have class `dark` and the cookie contains `theme=light`.
- **Toggle back.** Click the button again so the appearance matches the recorded baseline, or set the cookie back to the recorded value (`dark`, `light`, or `system`).
- **Proof.** Save `artifacts/theme-toggle/before.aria.txt`, `artifacts/theme-toggle/after.aria.txt`, `artifacts/theme-toggle/after.png` (wordmark visible), and `artifacts/theme-toggle/cookie.txt` with the cookie value observed after the first toggle.

## Gotchas

- The `theme` cookie is host-scoped to `127.0.0.1` and is shared across ports in the same browser profile. Driving theme on 4373 can change a human session on 4321. Always restore.
- First visit may be `theme=system`. After a click it becomes `dark` or `light`, not `system`. Restoring `system` requires setting the cookie, not a third click.
- SSR label depends on the cookie at request time; snapshot after hydration.
- Do not screenshot only the icon. Include `jhony.dev` and enough of the page to show canvas contrast change.
