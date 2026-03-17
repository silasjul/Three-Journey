# First Three.js Project

> Live: https://first-threejs-project-sooty.vercel.app/

**[← Back to monorepo](../README.md)**

---

## What I Built

My very first Three.js scene — a playground that brings together most of the foundational concepts covered in the basics chapter all at once.

---

## What I Learned

- Setting up a Vite project with Three.js from scratch
- Creating a `WebGLRenderer`, a `Scene`, and a `PerspectiveCamera`
- Working with built-in geometries (`BoxGeometry`, `SphereGeometry`, `TorusGeometry`)
- Applying `MeshStandardMaterial` and `MeshBasicMaterial`
- Loading textures and using `TextureLoader`
- Using `TextGeometry` with a `FontLoader` to render 3D text in the scene
- Adding `OrbitControls` for interactive camera movement
- Animating objects with `requestAnimationFrame` and `gsap` tweens
- Building a debug panel with `lil-gui` to tweak values in real time
- Adding an environment map for reflections and scene ambiance

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
| three | ^0.183.2 |
| gsap | ^3.14.2 |
| lil-gui | ^0.21.0 |
| vite | ^7.3.1 |
