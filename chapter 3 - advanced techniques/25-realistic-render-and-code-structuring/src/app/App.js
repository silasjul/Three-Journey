import * as THREE from "three";
import Sizes from "./utils/Sizes.js";
import Debug from "./utils/Debug.js";
import Camera from "./utils/Camera.js";
import Renderer from "./utils/Renderer.js";
import Lights from "./lights/Lights.js";
import World from "./world/World.js";

export default class App {
  constructor(canvas) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();

    // Utilities (order matters — debug & sizes before anything that uses them)
    this.sizes = new Sizes();
    this.debug = new Debug();

    // Core systems
    this.camera = new Camera(this);
    this.renderer = new Renderer(this);

    // Scene content
    this.lights = new Lights(this);
    this.world = new World(this);

    // Events
    this.sizes.on("resize", () => this._resize());
    window.addEventListener("beforeunload", () => this.destroy());

    // Start render loop
    this._tick();
  }

  _resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  _tick() {
    this.camera.update();
    this.renderer.update();
    window.requestAnimationFrame(() => this._tick());
  }

  destroy() {
    this.sizes.dispose();
    this.debug.dispose();
    this.camera.dispose();
    this.renderer.dispose();
    this.lights.dispose();
    this.world.dispose();
  }
}
