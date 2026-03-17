# Lesson 24 — Environment Map

> Live: https://three-environment-map.vercel.app/

**[← Back to monorepo](../../README.md)**

---

## What I Built

A scene that uses both a static HDR background environment map and a real-time rendered environment map for dynamic, physically accurate lighting.

---

## What I Learned

- Loading an `.hdr` file with `RGBELoader` and assigning it to `scene.background` (the visible sky box) and `scene.environment` (the lighting source for all PBR materials)
- The difference between a **static** environment map (one baked HDR image — cheap, great for backgrounds and still objects) and a **real-time** environment map (rendered every frame using `CubeCamera` — expensive but captures moving objects)
- Using `PMREMGenerator` to pre-filter an environment map into the mip levels that `MeshStandardMaterial` needs for roughness/metalness
- Setting up a `CubeRenderTarget` + `CubeCamera` to capture the live scene from a single point and feed the result back as `scene.environment`
- The mind-blowing result: a spinning torus/donut that projects colored "light" onto surrounding objects **without any actual light source** — purely through the real-time environment map reflection

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
