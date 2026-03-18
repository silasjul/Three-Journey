import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const danishFlagTexture = textureLoader.load("./textures/flag-danish.jpg");
danishFlagTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.PlaneGeometry(1.2, 1, 50, 50);

// Material
const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.DoubleSide,
    uniforms: {
        uSinFrequency: { value: new THREE.Vector2(8.0, 4.0) },
        uTime: { value: 0.0 },
        uColor: { value: new THREE.Color("blue") },
        uTexture: { value: danishFlagTexture },
        uElevation: { value: new THREE.Vector2(2.1, 0.75) },
    },
});

gui.add(material.uniforms.uSinFrequency.value, "x").min(0).max(20).step(0.1).name("Sin Frequency X")
gui.add(material.uniforms.uSinFrequency.value, "y").min(0).max(20).step(0.1).name("Sin Frequency Y")
gui.add(material.uniforms.uElevation.value, "x").min(0).max(10).step(0.01).name("Elevation Color Scale")
gui.add(material.uniforms.uElevation.value, "y").min(0).max(1).step(0.01).name("Elevation Color Offset")

// Mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

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
camera.position.set(0.25, -0.25, 1);
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
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    material.uniforms.uTime.value = elapsedTime;

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
