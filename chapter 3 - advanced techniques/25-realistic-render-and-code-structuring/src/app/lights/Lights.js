import * as THREE from "three";

export default class Lights {
  constructor(app) {
    this.app = app;

    this.params = {
      color: 0xfff5e1,
      resolution: 2048,
    };

    this._createDirectionalLight();
    this._setupDebug();
  }

  _createDirectionalLight() {
    this.directional = new THREE.DirectionalLight(this.params.color, 3);
    this.directional.position.set(-25, 20, 10);
    this.directional.castShadow = true;

    this.directional.shadow.mapSize.width = this.params.resolution;
    this.directional.shadow.mapSize.height = this.params.resolution;
    this.directional.shadow.camera.near = 0.5;
    this.directional.shadow.camera.far = 50;
    this.directional.shadow.camera.left = -15;
    this.directional.shadow.camera.right = 15;
    this.directional.shadow.camera.top = 15;
    this.directional.shadow.camera.bottom = -15;

    this.app.scene.add(this.directional);

    this.helper = new THREE.DirectionalLightHelper(
      this.directional,
      3,
      0x00ff00,
    );
    this.helper.visible = false;
    this.app.scene.add(this.helper);
  }

  _setupDebug() {
    if (!this.app.debug.active) return;

    const folder = this.app.debug.gui.addFolder("light");
    const light = this.directional;
    const helper = this.helper;

    folder
      .addColor(this.params, "color")
      .name("Color")
      .onChange(() => light.color.setHex(this.params.color));

    folder.add(light, "castShadow").name("Cast Shadow");
    folder.add(light, "intensity", 0, 10, 0.1).name("Intensity");

    folder
      .add(light.position, "x", -50, 50, 1)
      .name("Position X")
      .onChange(() => helper.update());
    folder
      .add(light.position, "y", -50, 50, 1)
      .name("Position Y")
      .onChange(() => helper.update());
    folder
      .add(light.position, "z", -50, 50, 1)
      .name("Position Z")
      .onChange(() => helper.update());

    folder
      .add(this.params, "resolution", [128, 256, 512, 1024, 2048, 4096, 8192])
      .name("Resolution")
      .onChange(() => {
        light.shadow.mapSize.width = this.params.resolution;
        light.shadow.mapSize.height = this.params.resolution;
        if (light.shadow.map) {
          light.shadow.map.dispose();
          light.shadow.map = null;
        }
      });

    folder.add(helper, "visible").name("Show Helper");
  }

  dispose() {
    this.app.scene.remove(this.directional);
    this.app.scene.remove(this.helper);
    this.helper.dispose();
  }
}
