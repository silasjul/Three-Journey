import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#eee");

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("./textures/particles/2.png");

/**
 * Particles
 */
// Materials
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.1,
  //color: "black",
  sizeAttenuation: true,
  alphaMap: texture,
  transparent: true,
  // alphaTest: 0.001,
  //depthTest: false,
  depthWrite: false,
  vertexColors: true,
});

// Geometry
const particlesGeometry = new THREE.BufferGeometry();
const count = 5000;

const vertices = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  vertices[i] = (Math.random() - 0.5) * 15;
  colors[i] = Math.random();
}
particlesGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(vertices, 3),
);
particlesGeometry.setAttribute(
  "color",
  new THREE.Float32BufferAttribute(colors, 3),
);
// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

console.log(particles.geometry.attributes["position"].array);

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  particles.rotation.y = elapsedTime * 0.02;

  for (let i = 0; i < particles.geometry.attributes["position"].array.length / 3; i++) {
    const x = particles.geometry.attributes["position"].array[i * 3 + 0];
    particles.geometry.attributes["position"].array[i * 3 + 1] = (Math.sin(elapsedTime + x * 0.5));

    particles.geometry.attributes["color"].array[i * 3 + 0] = (Math.cos(elapsedTime + x));
    particles.geometry.attributes["color"].array[i * 3 + 1] = (Math.sin(elapsedTime + x));
    particles.geometry.attributes["color"].array[i * 3 + 2] = 0;
  }

  particles.geometry.attributes["position"].needsUpdate = true;
  particles.geometry.attributes["color"].needsUpdate = true;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
