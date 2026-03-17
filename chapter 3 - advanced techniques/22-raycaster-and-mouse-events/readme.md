# Lesson 22 — Raycaster & Mouse Events

> Live: https://three-raycast-mouse.vercel.app/

**[← Back to monorepo](../../README.md)**

---

## What I Built

Loaded custom 3D models I made in Blender (a burger, knife, and fork) into a Three.js scene and wired up interactive hover effects using `Raycaster`.

---

## What I Learned

- **Blender basics** — this was my first time using Blender. I modelled a small burger, knife, and fork from scratch. Blender is incredibly powerful but the learning curve is steep; it is not the most intuitive tool. Definitely want to keep practicing.
- Exporting models from Blender as `.glb` and loading them in Three.js with `GLTFLoader`
- How `Raycaster` works: Three.js shoots an invisible ray from the camera through the current mouse position and returns an array of intersected objects, sorted by distance
- Converting raw mouse pixel coordinates to **normalized device coordinates (NDC)** in the `[-1, 1]` range that `Raycaster` expects
- Simulating `mouseenter` / `mouseleave` events by comparing the intersection list between frames — if an object appears that wasn't there last frame it's a "enter", if it disappears it's a "leave"
- Applying visual feedback on hover (color change, scale animation)

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
