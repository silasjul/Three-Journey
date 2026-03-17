# Three.js Journey

My progress through [Three.js Journey](https://threejs-journey.com/) by Bruno Simon.

---

## Navigation

- [Chapter 1 — Basics](#chapter-1--basics)
  - [First Three.js Project](#first-threejs-project)
- [Chapter 2 — Classic Techniques](#chapter-2--classic-techniques)
  - [Lesson 15 — Shadows](#lesson-15--shadows)
  - [Lesson 17 — Particles](#lesson-17--particles)
- [Chapter 3 — Advanced Techniques](#chapter-3--advanced-techniques)
  - [Lesson 22 — Raycaster & Mouse Events](#lesson-22--raycaster--mouse-events)
  - [Lesson 24 — Environment Map](#lesson-24--environment-map)
  - [Lesson 25 — Realistic Render & Code Structuring](#lesson-25--realistic-render--code-structuring)

---

## Chapter 1 — Basics

### First Three.js Project

> Live: https://first-threejs-project-sooty.vercel.app/
> Source: [`chapter 1 - basics`](./chapter%201%20-%20basics%20(first%20threejs%20project)/)

The first scene — renderer, camera, geometries, materials, textures, 3D text, OrbitControls, GSAP animations, lil-gui debug panel, and an environment map all in one go.

**Key learnings:**
- How the core Three.js loop fits together — scene, camera, renderer, `requestAnimationFrame`
- `TextGeometry` + `FontLoader` for 3D text, `OrbitControls` for free camera movement
- Using GSAP for smooth animations alongside the render loop
- Environment maps for cheap, convincing reflections without any lights

---

## Chapter 2 — Classic Techniques

### Lesson 15 — Shadows

> Live: https://google.com
> Source: [`15-shadows`](./chapter%202%20-%20classic%20techniques/15-shadows/)

Three.js renders shadows by doing a depth pass from the light's point of view — that map is then sampled in the main render. Learned the four shadow map types (`PCFSoftShadowMap` is the sweet spot), how to tune the shadow camera frustum to avoid blurry/clipped shadows, and when to just bake shadows instead.

**Key learnings:**
- Shadows need to be opted into per object — `castShadow` and `receiveShadow` on every mesh that needs it
- The shadow camera has its own frustum; if it doesn't cover your scene the shadows get cut off or go blurry
- `PCFSoftShadowMap` gives the best quality-to-cost ratio
- Baked shadows are a totally valid choice when nothing is moving

---

### Lesson 17 — Particles

> Live: https://google.com
> Source: [`17-particles`](./chapter%202%20-%20classic%20techniques/17-particles/)

Thousands of points driven by raw `BufferGeometry` + `Float32Array`. Per-particle colors via `vertexColors`, perspective scaling with `sizeAttenuation`, and animating them every frame by writing directly into the buffer and flagging `needsUpdate`.

**Key learnings:**
- Particles aren't meshes — you use `Points` + `PointsMaterial` instead
- Position and color data live in flat typed arrays; every 3 values is one particle
- `needsUpdate = true` is required after mutating a buffer attribute or changes won't render
- High particle counts get expensive fast — shaders are the next step for real scale

---

## Chapter 3 — Advanced Techniques

### Lesson 22 — Raycaster & Mouse Events

> Live: https://google.com
> Source: [`22-raycaster-and-mouse-events`](./chapter%203%20-%20advanced%20techniques/22-raycaster-and-mouse-events/)

First time using Blender — made a burger, knife, and fork, exported them as `.glb`, and loaded them in Three.js. Wired up hover detection with `Raycaster` by casting a ray from the camera through mouse NDC coordinates and comparing intersection lists frame-to-frame. Blender has a real learning curve but it was a lot of fun.

**Key learnings:**
- `Raycaster` shoots a ray from the camera through a point in NDC space and returns all intersected objects sorted by distance
- Mouse NDC coords need to be remapped from pixel space to `[-1, 1]` before passing to the raycaster
- Hover events don't exist natively — you simulate them by diffing the intersection array between frames
- Blender model export workflow: apply transforms, triangulate faces, export as `.glb`

---

### Lesson 24 — Environment Map

> Live: https://google.com
> Source: [`24-environment-map`](./chapter%203%20-%20advanced%20techniques/24-environment-map/)

Static HDR on `scene.background`, real-time `CubeCamera` on `scene.environment`. The wild part: a spinning torus projects colored light onto everything around it with zero actual light sources — it's all just the environment map updating every frame. That clicked something for me about how PBR lighting actually works.

**Key learnings:**
- `scene.environment` drives all PBR material lighting — you don't always need explicit lights
- A real-time `CubeCamera` captures the scene every frame and feeds it back as the environment, so objects actually reflect each other
- `PMREMGenerator` pre-filters the environment map into the mip levels that roughness/metalness needs
- Static HDRs are cheap; real-time cube cameras are expensive — only use them where it matters

---

### Lesson 25 — Realistic Render & Code Structuring

> Live: https://google.com
> Source: [`25-realistic-render-and-code-structuring`](./chapter%203%20-%20advanced%20techniques/25-realistic-render-and-code-structuring/)

Rendered the Flight Helmet glTF with `ACESFilmicToneMapping` and proper color space settings to get a photorealistic result. Equally important: refactored the whole app into event-driven classes (`App`, `Sizes`, `Camera`, `Renderer`, `World`, etc.) using `eventemitter3` so everything communicates without tight coupling. The architecture side was just as valuable as the rendering.

**Key learnings:**
- `ACESFilmicToneMapping` + `LinearSRGBColorSpace` make a huge visible difference to render quality
- Splitting the app into classes with a shared event bus makes the code way easier to extend without breaking things
- The singleton pattern (`App.instance`) lets any class reach the root without prop-drilling
- `?debug` in the URL to conditionally load the GUI keeps production clean

---

## Running a project locally

```bash
cd "chapter 2 - classic techniques/14-lights"
npm install
npm run dev
```
