# Lesson 17 — Particles

> Live: https://three-particles-snowy.vercel.app/

**[← Back to monorepo](../../README.md)**

---

## What I Built

A particle system with thousands of points floating in 3D space, each with a randomised position and unique color.

---

## What I Learned

- Creating particles with `BufferGeometry` and a `Float32Array` packed with `(x, y, z)` positions, then wrapping it in a `BufferAttribute`
- Using `Points` (not `Mesh`) together with `PointsMaterial` to render each vertex as a screen-space sprite
- Adding per-particle colors by creating a second `Float32Array` (packed `r, g, b`) and setting `vertexColors: true` on the material
- `sizeAttenuation` — when `true`, particles shrink with distance just like real perspective; when `false`, they stay a fixed pixel size
- Animating particles each frame by writing new values into the `position` attribute and setting `.needsUpdate = true`
- The performance cost of large particle counts and when to consider using a shader-based approach instead

---

## Running Locally

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

---

## Tech

| Package | Version |
|---|---|
| three | ^0.174.0 |
| lil-gui | ^0.20.0 |
| vite | ^6.2.2 |
