# Lesson 14 — Lights

> **Live:** {link}

**[← Back to monorepo](../../README.md)**

---

## What I Built

A scene that experiments with every major light type Three.js offers, with a `lil-gui` panel to tweak each light's properties live.

---

## What I Learned

- The difference between `AmbientLight`, `DirectionalLight`, `PointLight`, `SpotLight`, `RectAreaLight`, and `HemisphereLight`
- How each light type affects shading and shadows on `MeshStandardMaterial`
- Performance cost of lights — each additional light adds shader complexity; use as few as possible
- Adding built-in light helpers (`DirectionalLightHelper`, `PointLightHelper`, `SpotLightHelper`, `HemisphereLightHelper`) to visualise where lights are and what direction they point
- Controlling intensity, color, distance, decay, angle, and penumbra via `lil-gui`

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
