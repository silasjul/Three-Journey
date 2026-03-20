import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import pattern1VertexShader from "./shaders/pattern1/vertex.glsl";
import pattern1FragmentShader from "./shaders/pattern1/fragment.glsl";
import pattern2VertexShader from "./shaders/pattern2/vertex.glsl";
import pattern2FragmentShader from "./shaders/pattern2/fragment.glsl";

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
 * Test mesh
 */
// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

// Materials pattern 40 and 50 from lesson
const pattern1Uniforms = {
    lineWidth: { value: 0.04 },
    radius: { value: 1.0 },
    frequency: { value: 30.0 },
    amplitude: { value: 0.125 },
    colorTweak: { value: 1.0 },
    enableColor: { value: 0.0 },
};

const colorGui = { enableColor: false };

const pattern1Material = new THREE.ShaderMaterial({
    vertexShader: pattern1VertexShader,
    fragmentShader: pattern1FragmentShader,
    side: THREE.DoubleSide,
    uniforms: pattern1Uniforms,
});

const clock = new THREE.Clock();

const radiusAnim = {
    min: -0.02,
    max: 1.0,
    cycleDuration: 3,
    enabled: true,
};

const pattern2ColorGui = { enableColor: false };
const pattern2Anim = { enabled: true };

const pattern2Uniforms = {
    perlinScale: { value: 5.0 },
    frequency: { value: 20.0 },
    uTime: { value: 0 },
    animSpeed: { value: 0.55 },
    scalePulse: { value: 0.0 },
    freqPulse: { value: 0.75 },
    colorTweak: { value: 1.0 },
    enableColor: { value: 0.0 },
    sharpness: { value: 1.0 },
};

const pattern2Material = new THREE.ShaderMaterial({
    vertexShader: pattern2VertexShader,
    fragmentShader: pattern2FragmentShader,
    side: THREE.DoubleSide,
    uniforms: pattern2Uniforms,
});

// Mesh
const pattern1Mesh = new THREE.Mesh(geometry, pattern1Material);
scene.add(pattern1Mesh);

const pattern2Mesh = new THREE.Mesh(geometry, pattern2Material);
scene.add(pattern2Mesh);

const patternSelect = { active: "Pattern 1" };

const applyActivePattern = () => {
    const is1 = patternSelect.active === "Pattern 1";
    pattern1Mesh.visible = is1;
    pattern2Mesh.visible = !is1;
    if (is1) {
        pattern1Gui.show();
        pattern2Gui.hide();
    } else {
        pattern1Gui.hide();
        pattern2Gui.show();
    }
};

gui.add(patternSelect, "active", ["Pattern 1", "Pattern 2"])
    .name("pattern")
    .onChange(applyActivePattern);

const pattern1Gui = gui.addFolder("Pattern 1 tweaks");
pattern1Gui
    .add(pattern1Uniforms.lineWidth, "value")
    .min(0)
    .max(0.1)
    .step(0.001)
    .name("lineWidth");
pattern1Gui.add(radiusAnim, "max").min(-0.02).max(1).step(0.001).name("radius");
pattern1Gui
    .add(radiusAnim, "cycleDuration")
    .min(0.05)
    .max(5)
    .step(0.05)
    .name("animation cycle (s)");
pattern1Gui.add(radiusAnim, "enabled").name("enable animation");
pattern1Gui
    .add(pattern1Uniforms.frequency, "value")
    .min(0)
    .max(1000)
    .step(1)
    .name("frequency");
pattern1Gui
    .add(pattern1Uniforms.amplitude, "value")
    .min(0)
    .max(1)
    .step(0.001)
    .name("amplitude");
pattern1Gui
    .add(colorGui, "enableColor")
    .name("enable color")
    .onChange((v) => {
        pattern1Uniforms.enableColor.value = v ? 1.0 : 0.0;
    });
pattern1Gui
    .add(pattern1Uniforms.colorTweak, "value")
    .min(0)
    .max(1)
    .step(0.001)
    .name("color tweak");

const pattern2Gui = gui.addFolder("Pattern 2 tweaks");
pattern2Gui
    .add(pattern2Uniforms.perlinScale, "value")
    .min(1)
    .max(50)
    .step(1)
    .name("perlin scale");
pattern2Gui
    .add(pattern2Uniforms.frequency, "value")
    .min(0.2)
    .max(50)
    .step(0.1)
    .name("frequency");
pattern2Gui.add(pattern2Anim, "enabled").name("enable animation");
pattern2Gui
    .add(pattern2Uniforms.animSpeed, "value")
    .min(0)
    .max(3)
    .step(0.05)
    .name("anim speed");
pattern2Gui
    .add(pattern2Uniforms.scalePulse, "value")
    .min(0)
    .max(0.5)
    .step(0.01)
    .name("scale pulse");
pattern2Gui
    .add(pattern2Uniforms.freqPulse, "value")
    .min(0)
    .max(0.75)
    .step(0.01)
    .name("frequency pulse");
pattern2Gui
    .add(pattern2Uniforms.sharpness, "value")
    .min(0)
    .max(1)
    .step(0.01)
    .name("sharpness");
pattern2Gui
    .add(pattern2ColorGui, "enableColor")
    .name("enable color")
    .onChange((v) => {
        pattern2Uniforms.enableColor.value = v ? 1.0 : 0.0;
    });
pattern2Gui
    .add(pattern2Uniforms.colorTweak, "value")
    .min(0)
    .max(1)
    .step(0.001)
    .name("color tweak");

applyActivePattern();

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
camera.position.set(0.0, 0.0, 1.1);
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
const tick = () => {
    const elapsed = clock.getElapsedTime();
    if (radiusAnim.enabled) {
        const d = radiusAnim.cycleDuration;
        const phase = (elapsed % d) / d;
        pattern1Uniforms.radius.value =
            radiusAnim.min + phase * (radiusAnim.max - radiusAnim.min);
    } else {
        pattern1Uniforms.radius.value = radiusAnim.max;
    }

    if (pattern2Anim.enabled) {
        pattern2Uniforms.uTime.value = elapsed;
    }

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
