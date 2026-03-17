import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export default class Environment {
  constructor(app) {
    this.app = app;

    app.scene.environmentIntensity = 1;

    this._loadHDR();
    this._setupDebug();
  }

  _loadHDR() {
    const loader = new RGBELoader();

    loader.load("/environmentMaps/0/2k.hdr", (environmentMap) => {
      environmentMap.mapping = THREE.EquirectangularReflectionMapping;
      this.app.scene.background = environmentMap;
      this.app.scene.environment = environmentMap;
    });
  }

  _setupDebug() {
    if (!this.app.debug.active) return;

    this.app.debug.gui
      .add(this.app.scene, "environmentIntensity")
      .min(0)
      .max(10)
      .step(0.001);
  }
}
