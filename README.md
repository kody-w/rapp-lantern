# rapp-lantern

The universal player for **holographic organisms**. Drop in *any* `.egg` and orbit it in genuine 3D — regardless of source or species. Self-contained, no CDN, no backend; nothing leaves your device.

**Live:** https://kody-w.github.io/rapp-lantern/

## What's an `.egg`?

An `.egg` is a [`hologram-cartridge/1.0`](https://github.com/kody-w/rapp-static-apis) JSON — a self-describing, content-addressed organism with a layered genome (**form / surface / motion**). The player interprets it with **zero per-species code**, so the same lantern renders a weather sky, the moon, a crossbred hybrid, or an original box-creature identically well — as a 3D form you **drag to orbit** (scroll/pinch to zoom).

`.egg` is just JSON; the extension is a hint. Any valid `hologram-cartridge/1.0` loads.

## Use it

- **The loader** (`index.html`): drop an `.egg` anywhere on the page, pick a file, paste JSON, or load a URL — then **unload** and load another. Five example eggs (different sources + species) are built in.
- **Embed the player** directly, no loader needed:
  - `player.html?cart=<url-to-an-egg>`
  - `player.html#<base64url(JSON.stringify(egg))>`
  - or `postMessage({type:'load-cartridge', cart:<egg>})` into an `<iframe src="player.html">`.

## Make eggs

Any `hologram-cartridge/1.0` works. Capture, breed, and export them in the cabinet:
**https://kody-w.github.io/rapp-static-apis/hologram/**

## Files

- `player.html` — the universal 3D Lantern (hand-written software-3D, self-contained, no CDN).
- `index.html` — the load/unload-any-`.egg` UI.
- `eggs/*.egg` — deliberately-diverse examples (weather blob, fog-ring, moon, hybrid, original).

Part of the RAPP static-API stack — content-addressed, forkable, no backend. The hash is the trust; the browser is the runtime.
