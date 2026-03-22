import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import waterVertexShader from "./shader/water/vertex.glsl";
import waterFragmentShader from "./shader/water/fragment.glsl";

/**
 * Base
 */
// Debug
const gui = new GUI({ width: 340 });

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Water
 */
// Geometry
const waterGeometry = new THREE.PlaneGeometry(2, 2, 512, 512);

// Material
const waterDebug = { surfaceColor: "#4fdee8", depthColor: "#091220" };
const waterUniforms = {
    sinFrequency: { value: new THREE.Vector2(1.8, 1.2) },
    sinAmplitude: { value: 0.12 },
    surfaceColor: { value: new THREE.Color().set(waterDebug.surfaceColor) },
    depthColor: { value: new THREE.Color().set(waterDebug.depthColor) },
    time: { value: 0.0 },
    speed: { value: 1.8 },
    colorMultiplier: { value: 3.14 },
    colorOffset: { value: 0.15 },
    subWaveFrequency: { value: 2.5 },
    subWaveAmplitude: { value: 0.08 },
    subWaveCount: { value: 5.0 },
    subWaveSpeed: { value: 0.12 },
};

const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    uniforms: waterUniforms,
});

const presets = {
    "Regular Ocean": {
        sinFrequency: [3.14, 3.76],
        sinAmplitude: 0.31,
        surfaceColor: "#a3f6ff",
        depthColor: "#030510",
        speed: 0.85,
        colorMultiplier: 1.98,
        colorOffset: 0.2,
        subWaveFrequency: 4.2,
        subWaveAmplitude: 0.05,
        subWaveCount: 9.0,
        subWaveSpeed: 0.22,
    },
    "Calm Ocean": {
        sinFrequency: [1.8, 1.2],
        sinAmplitude: 0.12,
        surfaceColor: "#4fdee8",
        depthColor: "#091220",
        speed: 1.8,
        colorMultiplier: 3.14,
        colorOffset: 0.15,
        subWaveFrequency: 2.5,
        subWaveAmplitude: 0.08,
        subWaveCount: 5.0,
        subWaveSpeed: 0.12,
    },
    "What The Fuck": {
        sinFrequency: [8.5, 6.66],
        sinAmplitude: 0.9,
        surfaceColor: "#00ffcc",
        depthColor: "#ff00aa",
        speed: 2.5,
        colorMultiplier: 7.0,
        colorOffset: 0.25,
        subWaveFrequency: 8.0,
        subWaveAmplitude: 0.6,
        subWaveCount: 8.0,
        subWaveSpeed: 1.5,
    },
    "Moving Spikes": {
        sinFrequency: [5.31, 3.76],
        sinAmplitude: 0.71,
        surfaceColor: "#ff0000",
        depthColor: "#6e6e6e",
        speed: 0.6,
        colorMultiplier: 10,
        colorOffset: 0,
        subWaveFrequency: 7.47,
        subWaveAmplitude: 0.74,
        subWaveCount: 5,
        subWaveSpeed: 0.2,
    },
};

function applyPreset(name) {
    const p = presets[name];
    if (!p) return;

    waterUniforms.sinFrequency.value.set(p.sinFrequency[0], p.sinFrequency[1]);
    waterUniforms.sinAmplitude.value = p.sinAmplitude;
    waterUniforms.speed.value = p.speed;
    waterUniforms.colorMultiplier.value = p.colorMultiplier;
    waterUniforms.colorOffset.value = p.colorOffset;
    waterUniforms.subWaveFrequency.value = p.subWaveFrequency;
    waterUniforms.subWaveAmplitude.value = p.subWaveAmplitude;
    waterUniforms.subWaveCount.value = p.subWaveCount;
    waterUniforms.subWaveSpeed.value = p.subWaveSpeed;

    waterDebug.surfaceColor = p.surfaceColor;
    waterDebug.depthColor = p.depthColor;
    waterUniforms.surfaceColor.value.set(p.surfaceColor);
    waterUniforms.depthColor.value.set(p.depthColor);

    gui.controllersRecursive().forEach((c) => c.updateDisplay());
}

let selectedPreset = { preset: "Moving Spikes" };
applyPreset(selectedPreset.preset);

gui.add(selectedPreset, "preset", Object.keys(presets))
    .name("Preset")
    .onChange((value) => applyPreset(value));

const waveControls = gui.addFolder("Big Waves");
waveControls
    .add(waterUniforms.sinFrequency.value, "x")
    .min(0)
    .max(10)
    .step(0.01)
    .name("Frequency X");
waveControls
    .add(waterUniforms.sinFrequency.value, "y")
    .min(0)
    .max(10)
    .step(0.01)
    .name("Frequency Z");
waveControls
    .add(waterUniforms.sinAmplitude, "value")
    .min(0)
    .max(1)
    .step(0.01)
    .name("Amplitude");
waveControls
    .add(waterUniforms.speed, "value")
    .min(0)
    .max(3)
    .step(0.01)
    .name("Speed");

const subWaveControls = gui.addFolder("Sub Waves");
subWaveControls
    .add(waterUniforms.subWaveFrequency, "value")
    .min(0)
    .max(10)
    .step(0.01)
    .name("Sub Wave Frequency");
subWaveControls
    .add(waterUniforms.subWaveAmplitude, "value")
    .min(0)
    .max(1)
    .step(0.01)
    .name("Sub Wave Amplitude");
subWaveControls
    .add(waterUniforms.subWaveCount, "value")
    .min(0)
    .max(10)
    .step(1)
    .name("Sub Wave Count");
subWaveControls
    .add(waterUniforms.subWaveSpeed, "value")
    .min(0)
    .max(3)
    .step(0.01)
    .name("Sub Wave Speed");

const colorControls = gui.addFolder("Color");
colorControls
    .addColor(waterDebug, "surfaceColor")
    .name("Surface Color")
    .onChange(() => {
        waterUniforms.surfaceColor.value.set(waterDebug.surfaceColor);
    });
colorControls
    .addColor(waterDebug, "depthColor")
    .name("Depth Color")
    .onChange(() => {
        waterUniforms.depthColor.value.set(waterDebug.depthColor);
    });
colorControls
    .add(waterUniforms.colorMultiplier, "value")
    .min(0)
    .max(10)
    .step(0.01)
    .name("Color Multiplier");
colorControls
    .add(waterUniforms.colorOffset, "value")
    .min(0)
    .max(1)
    .step(0.01)
    .name("Color Offset");

// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial);
water.rotation.x = -Math.PI * 0.5;
scene.add(water);

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
camera.position.set(1, 1, 1);
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

    waterUniforms.time.value = elapsedTime;

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
