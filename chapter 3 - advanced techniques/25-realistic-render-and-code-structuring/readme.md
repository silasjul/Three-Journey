# Lesson 25 — Realistic Render & Code Structuring

> **Live:** {link}

**[← Back to monorepo](../../README.md)**

---

## What I Built

A photorealistic render of the Flight Helmet glTF model, plus a full refactor of the project structure from a flat script into a clean, event-driven OOP architecture.

---

## What I Learned

### Realistic Rendering

- Enabling `ACESFilmicToneMapping` on the renderer for a cinematic, film-like exposure curve
- Setting `renderer.outputColorSpace = THREE.LinearSRGBColorSpace` so colors are displayed correctly
- Enabling `antialias` and capping `pixelRatio` to `Math.min(window.devicePixelRatio, 2)` — more than 2 gives diminishing returns for huge GPU cost
- Loading the high-quality glTF **Flight Helmet** model, traversing its scene graph, and ensuring all child meshes have correct material encoding
- Using a real-time environment map for dynamic, high-quality scene lighting with no explicit light sources

### Code Architecture

- Breaking the monolithic `script.js` into dedicated ES module classes: `App`, `Sizes`, `Camera`, `Renderer`, `World`, `Lights`, `Helmet`, `Environment`, `Debug`
- Using **`eventemitter3`** as a lightweight event bus so classes can communicate without importing each other directly (e.g. `sizes.on('resize', () => camera.resize())`)
- Storing a single `App` instance on the window so any class can access it via `App.instance` — a simple singleton pattern
- Making `Debug` (lil-gui) lazily initialised only when `?debug` is in the URL, keeping the production experience clean

**Notes:** The architecture lessons in this chapter were just as valuable as the rendering side. Having a proper, event-driven structure makes it trivial to add new features without touching existing code.

---

## Project Structure

```
src/
├── index.html
├── script.js          # Entry point — instantiates App
└── app/
    ├── App.js          # Singleton root — owns all subsystems
    ├── lights/
    │   └── Lights.js
    ├── utils/
    │   ├── Sizes.js    # Window size + resize events
    │   ├── Camera.js
    │   ├── Renderer.js
    │   └── Debug.js    # lil-gui, only active with ?debug in URL
    └── world/
        ├── World.js
        ├── Helmet.js   # Flight Helmet glTF loader
        └── Environment.js
```

---

## Running Locally

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).  
Add `?debug` to the URL to open the debug panel: [http://localhost:5173?debug](http://localhost:5173?debug)

---

## Tech

| Package | Version |
|---|---|
| three | ^0.174.0 |
| eventemitter3 | ^5.0.4 |
| lil-gui | ^0.20.0 |
| vite | ^6.2.2 |
