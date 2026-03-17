import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";
import gsap from "gsap";
import { HDRLoader } from "three/examples/jsm/loaders/HDRLoader.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

/**
 * Config
 */
const gui = new GUI();

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Scene
 */
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);

// Door textures
const doorAlphaTexture = textureLoader.load("./textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg",
);
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("./textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load(
  "./textures/door/metalness.jpg",
);
const doorRoughnessTexture = textureLoader.load(
  "./textures/door/roughness.jpg",
);
const doorColorTexture = textureLoader.load("./textures/door/color.jpg");

doorColorTexture.colorSpace = THREE.SRGBColorSpace;

// Other textures
const matcapTexture = textureLoader.load("./textures/matcaps/7.png");
const gradientTexture = textureLoader.load("./textures/gradients/5.jpg");

matcapTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Fonts
 */
const loader = new FontLoader();
const font = await loader.loadAsync("fonts/helvetiker_regular.typeface.json");
const geometry = new TextGeometry("Hello three.js!", {
  font: font,
  size: 0.5,
  height: 0.2,
  depth: 0.1,
  curveSegments: 5,
  bevelEnabled: true,
  bevelThickness: 0.03,
  bevelSize: 0.02,
  bevelOffset: 0,
  bevelSegments: 4,
});

const textMaterial = new THREE.MeshMatcapMaterial();
textMaterial.matcap = matcapTexture;
const text = new THREE.Mesh(geometry, textMaterial);
geometry.center()
text.position.y += 2;
console.log(geometry.boundingBox);
scene.add(text);

/**
 * Objects
 */
// MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.color = new THREE.Color('#ff0000')
// material.wireframe = false
// material.transparent = true
// material.opacity = 0.5
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide

// MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// MeshMatcapMaterial
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial()

// MeshLambertMaterial
const material = new THREE.MeshLambertMaterial();

// MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

// MeshToonMaterial
// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false
// material.gradientMap = gradientTexture

// // MeshStandardMaterial
// const material = new THREE.MeshStandardMaterial()
// material.metalness = 1
// material.roughness = 1
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

/**
 * MeshPhysicalMaterial
 */
// Base material
// const material = new THREE.MeshPhysicalMaterial()
// material.metalness = 0
// material.roughness = 0.15
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

// // Clearcoat
// material.clearcoat = 1
// material.clearcoatRoughness = 0

// // Sheen
// material.sheen = 1
// material.sheenRoughness = 0.25
// material.sheenColor.set(1, 1, 1)

// // Iridescence
// material.iridescence = 1
// material.iridescenceIOR = 1
// material.iridescenceThicknessRange = [ 100, 800 ]

// // Transmission
// material.transmission = 1
// material.ior = 1.5
// material.thickness = 0.5

// GUI
// const matFolder = gui.addFolder('Material')

// const baseFolder = matFolder.addFolder('Base')
// baseFolder.add(material, 'metalness').min(0).max(1).step(0.001)
// baseFolder.add(material, 'roughness').min(0).max(1).step(0.001)
// baseFolder.add(material, 'aoMapIntensity').min(0).max(10).step(0.001)
// baseFolder.add(material, 'displacementScale').min(0).max(1).step(0.001)
// baseFolder.add(material.normalScale, 'x').min(0).max(2).step(0.001).name('normalScale X')
// baseFolder.add(material.normalScale, 'y').min(0).max(2).step(0.001).name('normalScale Y')

// const clearcoatFolder = matFolder.addFolder('Clearcoat')
// clearcoatFolder.add(material, 'clearcoat').min(0).max(1).step(0.001)
// clearcoatFolder.add(material, 'clearcoatRoughness').min(0).max(1).step(0.001)

// const sheenFolder = matFolder.addFolder('Sheen')
// sheenFolder.add(material, 'sheen').min(0).max(1).step(0.001)
// sheenFolder.add(material, 'sheenRoughness').min(0).max(1).step(0.001)
// sheenFolder.addColor(material, 'sheenColor')

// const iridescenceFolder = matFolder.addFolder('Iridescence')
// iridescenceFolder.add(material, 'iridescence').min(0).max(1).step(0.001)
// iridescenceFolder.add(material, 'iridescenceIOR').min(1).max(2.333).step(0.001)
// iridescenceFolder.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(1).name('thickness min')
// iridescenceFolder.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(1).name('thickness max')

// const transmissionFolder = matFolder.addFolder('Transmission')
// transmissionFolder.add(material, 'transmission').min(0).max(1).step(0.001)
// transmissionFolder.add(material, 'ior').min(1).max(10).step(0.001)
// transmissionFolder.add(material, 'thickness').min(0).max(10).step(0.001)

const sphereMesh = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  material,
);
const planeMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2, 100, 100),
  material,
);
const torusMesh = new THREE.Mesh(
  new THREE.TorusGeometry(0.7, 0.2, 16, 64),
  material,
);

sphereMesh.position.set(-3, 0, 0);
torusMesh.position.set(3, 0, 0);

const group = new THREE.Group();

group.add(sphereMesh);
group.add(planeMesh);
group.add(torusMesh);

scene.add(group);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  1000,
);
camera.position.set(2, 2, 4);
scene.add(camera);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 30);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Environment map
 */
const hdrLoader = new HDRLoader();
hdrLoader.load("./textures/environmentMap/2k.hdr", (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;

  scene.background = environmentMap;
  scene.environment = environmentMap;
});

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Events
 */
window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("keydown", (event) => {
  if (event.key === "h") {
    gui.show(gui._hidden);
  }
});

/**
 * Animation
 */
const timer = new THREE.Timer();

function animate() {
  timer.update();
  controls.update();

  const elapsedTime = timer.getElapsed();

  sphereMesh.rotation.x = elapsedTime * -0.1;
  torusMesh.rotation.x = elapsedTime * -0.1;
  planeMesh.rotation.x = elapsedTime * -0.1;

  sphereMesh.rotation.y = elapsedTime * -0.1;
  torusMesh.rotation.y = elapsedTime * -0.1;
  planeMesh.rotation.y = elapsedTime * -0.1;

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}

animate();
