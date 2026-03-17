import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
  constructor(app) {
    this.app = app;

    this.instance = new THREE.PerspectiveCamera(
      75,
      app.sizes.width / app.sizes.height,
      0.1,
      100,
    );
    this.instance.position.set(4, 5, 4);
    app.scene.add(this.instance);

    this.controls = new OrbitControls(this.instance, app.canvas);
    this.controls.target.y = 3.5;
    this.controls.enableDamping = true;
  }

  resize() {
    this.instance.aspect = this.app.sizes.width / this.app.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }

  /**
   * Recreate OrbitControls when the canvas element changes (e.g. antialias toggle).
   */
  rebindControls(canvas) {
    this.controls.dispose();
    this.controls = new OrbitControls(this.instance, canvas);
    this.controls.target.y = 3.5;
    this.controls.enableDamping = true;
  }

  dispose() {
    this.controls.dispose();
  }
}
