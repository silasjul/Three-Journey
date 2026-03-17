import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { GroundedSkybox } from "three/examples/jsm/Addons.js";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Loaders
const gltfLoader = new GLTFLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
const rgbeLoader = new RGBELoader();
const textureLoader = new THREE.TextureLoader();

/**
 * Torus Knot
 */
const torusKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
  new THREE.MeshStandardMaterial({
    roughness: 0,
    metalness: 1,
    color: 0xaaaaaa,
  }),
);
torusKnot.position.set(-5, 4, 0);
scene.add(torusKnot);

// Holy donut
const holyDonut = new THREE.Mesh(
  new THREE.TorusGeometry(8, 0.5),
  new THREE.MeshStandardMaterial({
    color: new THREE.Color(10, 10, 10),
  }),
);
holyDonut.layers.enable(1);
holyDonut.position.y = 3.5;
scene.add(holyDonut);

const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
  type: THREE.HalfFloatType,
});
const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget);
cubeCamera.layers.set(1);

scene.environment = cubeRenderTarget.texture;

/**
 * Models
 */
gltfLoader.load("/models/FlightHelmet/glTF/FlightHelmet.gltf", (gltf) => {
  gltf.scene.scale.set(10, 10, 10);
  gltf.scene.layers.enable(1);
  scene.add(gltf.scene);
});

/**
 * Enviorenment maps
 */
scene.environmentIntensity = 1;
scene.backgroundBlurriness = 0;
scene.backgroundIntensity = 1;

gui
  .add(scene, "environmentIntensity")
  .min(0)
  .max(10)
  .step(0.001)
  .name("Environment Intensity");
gui
  .add(scene.environmentRotation, "y")
  .min(0)
  .max(Math.PI * 2)
  .step(0.0001)
  .name("Environment Rotation y");
gui
  .add(scene, "backgroundBlurriness")
  .min(0)
  .max(1)
  .step(0.001)
  .name("Background Blurriness");
gui
  .add(scene, "backgroundIntensity")
  .min(0)
  .max(10)
  .step(0.001)
  .name("Background Intensity");
gui
  .add(scene.backgroundRotation, "y")
  .min(0)
  .max(Math.PI * 2)
  .step(0.0001)
  .name("Background Rotation Y");

// const environmentMap = cubeTextureLoader.load([
//   "/environmentMaps/0/px.png",
//   "/environmentMaps/0/nx.png",
//   "/environmentMaps/0/py.png",
//   "/environmentMaps/0/ny.png",
//   "/environmentMaps/0/pz.png",
//   "/environmentMaps/0/nz.png",
// ]);

// scene.background = environmentMap;
// scene.environment = environmentMap;

// HDRI Environment Map
// rgbeLoader.load("/environmentMaps/test.hdr", (environmentMap) => {
//   environmentMap.mapping = THREE.EquirectangularReflectionMapping;

//   scene.background = environmentMap;
//   scene.environment = environmentMap;
// });

// Ground projected
// rgbeLoader.load("/environmentMaps/test.hdr", (environmentMap) => {
//   environmentMap.mapping = THREE.EquirectangularReflectionMapping;
//   scene.environment = environmentMap;

//   const skybox = new GroundedSkybox(environmentMap, 15, 70);
//   skybox.position.y = 15;

//   gui.add(skybox.material, "wireframe").name("Skybox Wireframe");

//   scene.add(skybox);
// });

/**
 * Real time environment map
 */
const environmentMap = textureLoader.load(
  "/environmentMaps/blockadesLabsSkybox/interior_views_cozy_wood_cabin_with_cauldron_and_p.jpg",
);
environmentMap.mapping = THREE.EquirectangularReflectionMapping;
environmentMap.colorSpace = THREE.SRGBColorSpace;

scene.background = environmentMap;

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
camera.position.set(4, 5, 4);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.y = 3.5;
controls.enableDamping = true;

/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(1, 1, 1);
// scene.add(directionalLight);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
const tick = () => {
  // Time
  const elapsedTime = clock.getElapsedTime();

  cubeCamera.update(renderer, scene);

  holyDonut.rotation.x = Math.sin(elapsedTime) * 2;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
