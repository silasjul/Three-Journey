import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default class Helmet {
  constructor(app) {
    this.app = app;
    this.model = null;

    this._load();
  }

  _load() {
    const loader = new GLTFLoader();

    loader.load("/models/FlightHelmet/glTF/FlightHelmet.gltf", (gltf) => {
      this.model = gltf.scene;
      this.model.scale.set(10, 10, 10);

      this.model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      this.app.scene.add(this.model);
    });
  }

  dispose() {
    if (this.model) {
      this.app.scene.remove(this.model);
      this.model.traverse((child) => {
        if (child.isMesh) {
          child.geometry.dispose();
          if (child.material.map) child.material.map.dispose();
          child.material.dispose();
        }
      });
    }
  }
}
