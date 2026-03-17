import * as THREE from "three";

export default class Renderer {
  constructor(app) {
    this.app = app;

    this.debugObject = {
      antialias: true,
    };

    this._createInstance();
    this._setupDebug();
  }

  _createInstance() {
    const { canvas, sizes } = this.app;

    if (this.instance) {
      this.instance.dispose();

      // WebGL context is tied to the canvas, so we need a new canvas to change antialias
      const newCanvas = canvas.cloneNode();
      canvas.parentNode.replaceChild(newCanvas, canvas);
      this.app.canvas = newCanvas;
      this.app.camera.rebindControls(newCanvas);
    }

    this.instance = new THREE.WebGLRenderer({
      canvas: this.app.canvas,
      antialias:
        window.devicePixelRatio > 1 ? false : this.debugObject.antialias,
    });

    this.instance.toneMapping = THREE.ReinhardToneMapping;
    this.instance.toneMappingExposure = 3;
    this.instance.setSize(sizes.width, sizes.height);
    this.instance.setPixelRatio(sizes.pixelRatio);
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  _setupDebug() {
    if (!this.app.debug.active) return;

    const folder = this.app.debug.gui.addFolder("toneMapping");

    folder.add(this.instance, "toneMapping", {
      "No Toning": THREE.NoToneMapping,
      Linear: THREE.LinearToneMapping,
      Reinhard: THREE.ReinhardToneMapping,
      Cineon: THREE.CineonToneMapping,
      "ACES Filmic": THREE.ACESFilmicToneMapping,
    });

    folder
      .add(this.instance, "toneMappingExposure")
      .min(0)
      .max(10)
      .step(0.001);

    folder
      .add(this.debugObject, "antialias")
      .name("Antialias")
      .onChange(() => this._createInstance());
  }

  resize() {
    const { sizes } = this.app;
    this.instance.setSize(sizes.width, sizes.height);
    this.instance.setPixelRatio(sizes.pixelRatio);
  }

  update() {
    this.instance.render(this.app.scene, this.app.camera.instance);
  }

  dispose() {
    this.instance.dispose();
  }
}
