# Lesson 15 — Shadows

> Live: https://threejs-shadows-iota.vercel.app/

**[← Back to monorepo](../../README.md)**

---

## What I Built

A scene focused entirely on making shadows look good and understanding the internals of how Three.js renders them.

---

## What I Learned

- How Three.js renders shadows: a depth render is made from the light's perspective (the shadow map), then that map is used in the main render to determine which fragments are in shadow
- Enabling shadows on the renderer (`renderer.shadowMap.enabled = true`) and individually on objects (`mesh.castShadow`, `mesh.receiveShadow`)
- The four shadow map algorithms and their trade-offs:
  - `BasicShadowMap` — fastest, hard edges
  - `PCFShadowMap` — default, slightly soft edges
  - `PCFSoftShadowMap` — softer edges, more expensive
  - `VSMShadowMap` — smooth but can cause light bleeding
- Tuning the shadow camera (`near`, `far`, `left`, `right`, `top`, `bottom`) to fit the scene tightly and avoid under-resolution artifacts
- Using `CameraHelper` on the shadow camera to debug its frustum visually
- Baked shadows as a cheap, static alternative when objects don't move

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
