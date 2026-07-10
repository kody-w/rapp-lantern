# rapp-lantern

The universal player for **holographic organisms**. Drop in *any* `.egg` and orbit it in genuine 3D — regardless of source or species. Self-contained, no CDN, no backend; nothing leaves your device.

**Live:** https://kody-w.github.io/rapp-lantern/

## What's an `.egg`?

An `.egg` is a [`hologram-cartridge/1.0`](https://github.com/kody-w/rapp-static-apis) JSON — a self-describing, content-addressed organism with a layered genome (**form / surface / motion**). The player interprets it with **zero per-species code**, so the same lantern renders a weather sky, the moon, a crossbred hybrid, or an original box-creature identically well — as a 3D form you drag to orbit. Visible controls and the arrow/WASD, `+`/`-`, and Home keys provide complete orbit, zoom, and reset access.

`.egg` is just JSON; the extension is a hint. Any valid `hologram-cartridge/1.0` loads.

## Use it

- **The loader** (`index.html`): drop an `.egg` anywhere on the page, pick a file, paste JSON, or load a URL — then **unload** and load another. Five example eggs (different sources + species) are built in.
- **Embed the player** directly, no loader needed:
  - `player.html?id=moon` for a bundled, registry-verified specimen
  - `player.html?cart=<url-to-an-egg>`
  - `player.html#<base64url(JSON.stringify(egg))>`
  - `player.html?embed=1#<base64url(JSON.stringify(egg))>` for a canvas-only responsive embed
  - or `postMessage({type:'load-cartridge', version:1, loadId:'mine', cart:<egg>}, playerOrigin)` into an `<iframe src="player.html">`. The player accepts only its parent window and replies with a scoped `rendered` or `error` event.

Every load path validates the cartridge before replacing the current organism. Remote loads are limited to HTTP(S), 2 MiB, and 15 seconds; malformed or stale loads leave the current scene intact.

Copy-link and QR actions use registry URLs bound to the complete cartridge hash when a specimen matches `registry.json`; imported eggs use self-contained hash links within safe browser/QR limits. Oversized eggs remain downloadable instead of generating unreliable links.

## Make eggs

Any `hologram-cartridge/1.0` works. Capture, breed, and export them in the cabinet:
**https://kody-w.github.io/rapp-static-apis/hologram/**

## Files

- `player.html` — the universal 3D Lantern (hand-written software-3D, self-contained, no CDN).
- `index.html` — the load/unload-any-`.egg` UI.
- `registry.json` — content-hashed catalog for stable bundled-specimen permalinks.
- `qr.mjs` — local QR encoder used by the share UI.
- `eggs/*.egg` — deliberately-diverse examples plus the built-in Lumina fallback.

Part of the RAPP static-API stack — content-addressed, forkable, no backend. The hash is the trust; the browser is the runtime.
