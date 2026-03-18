# Three.js Journey

My progress through [Three.js Journey](https://threejs-journey.com/) by Bruno Simon. A lot of the lessons are not included here, but I have documentet milestones, big learnings and fun here. Other bigger projects that I felt deserved its own repo can also seen here.

---

## Navigation

- [Chapter 1 — Basics](#chapter-1--basics)
  - [First Three.js Project](#first-threejs-project)
- [Chapter 2 — Classic Techniques](#chapter-2--classic-techniques)
  - [Lesson 15 — Shadows](#lesson-15--shadows)
  - [Lesson 17 — Particles](#lesson-17--particles)
  - [Projects — Scary Minecraft Scene, Galaxy Generator, Ball Physics](#chapter-2-projects)
- [Chapter 3 — Advanced Techniques](#chapter-3--advanced-techniques)
  - [Lesson 22 — Raycaster & Mouse Events](#lesson-22--raycaster--mouse-events)
  - [Lesson 24 — Environment Map](#lesson-24--environment-map)
  - [Lesson 25 — Realistic Render & Code Structuring](#lesson-25--realistic-render--code-structuring)
- [Chapter 4 — Shaders](#chapter-4--shaders)
  - [Lesson 27 — Shaders](#lesson-27--shaders)

---

## Chapter 1 — Basics

### First Three.js Project

> Live: https://first-threejs-project-sooty.vercel.app/
> Source: [`chapter 1 - basics`](./chapter%201%20-%20basics%20(first%20threejs%20project)/)

Wow this chapter was alot of fun experimenting with the basics and going from a boring cube, exploring different shapes, text and very basic animation with PI, cos, sin. The first scene — renderer, camera, geometries, materials, textures, 3D text, OrbitControls, GSAP animations, lil-gui debug panel, and an environment map all in one go.

**Key learnings:**
- How the core Three.js loop fits together — scene, camera, renderer, `requestAnimationFrame`
- `TextGeometry` + `FontLoader` for 3D text, `OrbitControls` for free camera movement
- Using GSAP for smooth animations alongside the render loop
- Environment maps for cheap, convincing reflections without any lights

---

## Chapter 2 — Classic Techniques

### Lesson 15 — Shadows

> Live: https://threejs-shadows-iota.vercel.app/
> Source: [`15-shadows`](./chapter%202%20-%20classic%20techniques/15-shadows/)

Shadows are wild and complex, thank god I don't have to learn those complex maths and its all handed to me in easy to use highlevel classes. Three.js renders shadows by drawing shadowmaps. These maps is then sampled in the main render. Learned the four shadow map types (`PCFSoftShadowMap` is the sweet spot), how to tune the shadow camera frustum to avoid blurry/clipped shadows, and when to just bake shadows instead. If you click the link you can see that the shadow underneath doesnt quite math the real one so see if you can tweak it to match ;). It is a texture and actually not a shadow. Shadows can be baked into the material/texture so that you dont waste rescrouces computing them, which is a great technique to optimize performance.

**Key learnings:**
- Shadows need to be opted into per object — `castShadow` and `receiveShadow` on every mesh that needs it
- The shadow camera has its own frustum; if it doesn't cover your scene the shadows get cut off or go blurry
- `PCFSoftShadowMap` gives the best quality-to-cost ratio
- Baked shadows are a totally valid choice when nothing is moving

---

### Lesson 17 — Particles

> Live: https://three-particles-snowy.vercel.app/
> Source: [`17-particles`](./chapter%202%20-%20classic%20techniques/17-particles/)

In this lesson i experimented with vertices and drawing textures at those vertices. Thousands of points driven by raw `BufferGeometry` + `Float32Array`. Per-particle colors via `vertexColors`, perspective scaling with `sizeAttenuation`, and animating them every frame by writing directly into the buffer and flagging `needsUpdate`.

**Key learnings:**
- Particles aren't meshes — you use `Points` + `PointsMaterial` instead
- Position and color data live in flat typed arrays; every 3 values is one particle
- `needsUpdate = true` is required after mutating a buffer attribute or changes won't render
- High particle counts get expensive fast — shaders are the next step for real scale

---

## Chapter 2 Projects

Bigger experiments that felt like they deserved their own repos — built using the techniques from this chapter.

### Scary Minecraft Scene

> Live: https://scary-minecraft-scene.vercel.app/
> Source: [github.com/silasjul/scary-minecraft-scene](https://github.com/silasjul/scary-minecraft-scene)

A spooky Minecraft-style scene with a mossy cobblestone house, a murky pond, a rocky hill, and 200 randomly scattered plants — all under a deep foggy night sky with a warm flickering light inside the house. Every block uses authentic Minecraft textures with nearest-neighbor filtering for that crisp pixel look.

**Key learnings:**
- `NearestFilter` on textures to preserve the pixel art look instead of blurring
- `FogExp2` for exponential fog that sells the eerie atmosphere way better than linear fog
- Seeded pseudo-random (LCG) for a stable, reproducible plant layout that doesn't reshuffle on reload
- The Three.js `Sky` add-on for a dynamic sky without needing an HDR

---

### Galaxy Generator

> Live: https://galaxy-generator-one-kappa.vercel.app/
> Source: [github.com/silasjul/galaxy-generator](https://github.com/silasjul/galaxy-generator)

An interactive procedural spiral galaxy with configurable arms, spin, radius, and per-star color blending. 10,000 background stars, animated rotation, and a full live debug GUI to tweak every parameter in real time.

**Key learnings:**
- Generating spiral arm positions mathematically and scattering stars around them with a power-curve distribution
- Additive blending (`AdditiveBlending`) on `PointsMaterial` for the glowing star effect — stars brighten where they overlap
- Smooth per-star color interpolation between an inner and outer color using `Color.lerp`
- Regenerating the entire geometry on GUI change by disposing the old one first to avoid memory leaks

---

### Ball Physics

> Live: https://indian-physics.vercel.app/
> Source: [github.com/silasjul/indian-physics](https://github.com/silasjul/indian-physics)

Spheres spawn inside a semi-transparent cage and bounce around with real physics. Click any sphere to blast it with an explosive impulse. Backed by Rapier3D (WASM) for the physics simulation.

**Key learnings:**
- Integrating Rapier3D (a WASM physics engine) with Three.js — each visual mesh mirrors a rigid body from the physics world
- Applying impulse forces to rigid bodies on click for the explosion effect
- Handling WASM async init with `vite-plugin-top-level-await`
- Syncing physics world position/rotation back to Three.js meshes every frame

---

## Chapter 3 — Advanced Techniques

### Lesson 22 — Raycaster & Mouse Events

> Live: https://three-raycast-mouse.vercel.app/
> Source: [`22-raycaster-and-mouse-events`](./chapter%203%20-%20advanced%20techniques/22-raycaster-and-mouse-events/)

Here is where things starts to get exciting. I drew my first model in blender, and man you have to bite your tongue at times to not jump off the balcony. If you click the link you will notiuce that the color is off and it looks like shit. This is because I havent yet learned techniques to make it look better yet. I made a burger, knife, and fork, exported them as `.glb`, and loaded them in Three.js. Wired up hover detection with `Raycaster` by casting a ray from the camera through mouse NDC coordinates and comparing intersection lists frame-to-frame. Blender has a real learning curve but it was a lot of fun.

**Key learnings:**
- `Raycaster` shoots a ray from the camera through a point in NDC space and returns all intersected objects sorted by distance
- Mouse NDC coords need to be remapped from pixel space to `[-1, 1]` before passing to the raycaster
- Hover events don't exist natively — you simulate them by diffing the intersection array between frames
- Blender model export workflow: apply transforms, triangulate faces, export as `.glb`

---

### Lesson 24 — Environment Map

> Live: https://three-environment-map.vercel.app/
> Source: [`24-environment-map`](./chapter%203%20-%20advanced%20techniques/24-environment-map/)

Environment maps are the shit! You can create awesome realistic backgrounds that really makes the scene come to life. You can also make the environment map produce lighting to make it even more realistic. In the example a large donut is spinning around 2 objects and it looks there is light coming from it, but actually there is no light coming from it at all. The light is simply being created from the environmap using a real time environment map.  The donut is just a white BasicMaterial that is used as a part of the environment map and therefor lights up the scene. This effect would be extremely hard to do with light otherwise.

**Key learnings:**
- `scene.environment` drives all PBR material lighting — you don't always need explicit lights
- A real-time `CubeCamera` captures the scene every frame and feeds it back as the environment, so objects actually reflect each other
- `PMREMGenerator` pre-filters the environment map into the mip levels that roughness/metalness needs
- Static HDRs are cheap; real-time cube cameras are expensive — only use them where it matters

---

### Lesson 25 — Realistic Render & Code Structuring

> Live: https://three-realistic-render-sigma.vercel.app/
> Source: [`25-realistic-render-and-code-structuring`](./chapter%203%20-%20advanced%20techniques/25-realistic-render-and-code-structuring/)

If you click the link you might notice that this model looks really good, which is because I've learned about lots oif tricks and variables I can tweak to make the scene look better. If you think it looks bad you can try and tweak the settings to make it look even better and send me a screenshot ;). Equally important: refactored the whole app into event-driven classes (`App`, `Sizes`, `Camera`, `Renderer`, `World`, etc.) using `eventemitter3` so everything communicates without tight coupling. The architecture side was just as valuable as the rendering.

**Key learnings:**
- `ACESFilmicToneMapping` + `LinearSRGBColorSpace` make a huge visible difference to render quality
- Splitting the app into classes with a shared event bus makes the code way easier to extend without breaking things
- The singleton pattern (`App.instance`) lets any class reach the root without prop-drilling
- `?debug` in the URL to conditionally load the GUI keeps production clean

---

## Chapter 4 — Shaders

### Lesson 27 — Shaders

#### Shader 1 — Rose Crystal

> Live: <!-- TODO: add Vercel URL -->
> Source: [`shader1-rose-crystal`](./chapter%204%20-%20shaders/27-shaders/) on branch `shader1-rose-crystal`

<!-- TODO: describe what you built and what was interesting about it -->

**Key learnings:**
<!-- TODO: fill in -->

---

#### Shader 2 — Danish Flag

> Live: <!-- TODO: add Vercel URL -->
> Source: [`flag-shader`](./chapter%204%20-%20shaders/27-shaders/) on branch `flag-shader`

<!-- TODO: describe what you built and what was interesting about it -->

**Key learnings:**
<!-- TODO: fill in -->

---

## Running a project locally

```bash
cd "chapter 2 - classic techniques/14-lights"
npm install
npm run dev
```
