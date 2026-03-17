import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
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
scene.background = new THREE.Color("rgb(20, 20, 20)");

/**
 * Objects
 */
const object1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ff0000" }),
);
object1.position.x = -2;

const object2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ff0000" }),
);

const object3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ff0000" }),
);
object3.position.x = 2;

// scene.add(object1, object2, object3);

const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");
dracoLoader.setDecoderConfig({ type: "js" });
gltfLoader.setDRACOLoader(dracoLoader);

let burgerGroup = new THREE.Group();
let fork = null;
let knife = null;

gltfLoader.load("/models/burger.glb", (burgerScene) => {
  scene.add(burgerScene.scene);

  // Burger
  [...burgerScene.scene.children]
    .splice(0, 4)
    .forEach((part) => burgerGroup.add(part));
  scene.add(burgerGroup);

  // Knife and fork objects
  fork = burgerScene.scene.children[burgerScene.scene.children.length - 2];
  knife = burgerScene.scene.children[burgerScene.scene.children.length - 1];

  fork.rotation.x = -Math.PI / 2;
  fork.position.set(10, 10, 0);

  knife.rotation.x = -Math.PI / 2;
  knife.position.set(-33, 1.5, 0);

  knife.material = knife.material.clone();

  fork.material.color.set("#fff");
  knife.material.color.set("#fff");
});

/**
 * Light
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(-10, 5, 0);
scene.add(directionalLight);

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
camera.position.set(0, 6, -13);
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

/**
 * Events
 */
const mouse = new THREE.Vector2(10, 10);

window.addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / sizes.width) * 2 - 1;
  mouse.y = -(e.clientY / sizes.height) * 2 + 1;
});

/**
 * Raycast
 */
const raycast = new THREE.Raycaster();
// const rayOrigin = new THREE.Vector3(-5, 0, 0)
// const rayDirection = new THREE.Vector3(10, 0, 0)
// rayDirection.normalize()
// raycast.set(rayOrigin, rayDirection)

/**
 * Animate
 */
const clock = new THREE.Clock();

let intersect = null;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  if (knife) knife.position.y = Math.sin(elapsedTime * 1.3) * 0.5;
  if (fork) fork.position.y = 9 + Math.sin(elapsedTime * 1.3 + Math.PI) * 0.5;

  burgerGroup.position.y = Math.sin(elapsedTime * 1.3 + Math.PI / 2) * 0.5;
  burgerGroup.rotation.y += 0.001;

  raycast.setFromCamera(mouse, camera);
  const intersects = raycast.intersectObjects(scene.children, true);

  const hitMesh = intersects[0]?.object ?? null;
  const hoveredObj = hitMesh?.parent === burgerGroup ? burgerGroup : hitMesh;

  if (hoveredObj !== intersect) {
    // leave
    if (intersect === burgerGroup) {
      burgerGroup.scale.set(1, 1, 1);
    } else if (intersect?.material) {
      intersect.material.color.copy(intersect.userData.savedColor);
    }

    // enter
    if (hoveredObj === burgerGroup) {
      burgerGroup.scale.set(1.1, 1.1, 1.1);
    } else if (hoveredObj?.material) {
      hoveredObj.userData.savedColor = hoveredObj.material.color.clone();
      hoveredObj.material.color.set("#ff0000");
    }

    intersect = hoveredObj;
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
