import GUI from "lil-gui";

export default class Debug {
  constructor() {
    this.active = true;
    this.gui = new GUI();

    this._onKeyDown = (e) => {
      if (e.key.toLowerCase() === "h") {
        this.gui.show(this.gui._hidden);
      }
    };

    window.addEventListener("keydown", this._onKeyDown);
  }

  dispose() {
    window.removeEventListener("keydown", this._onKeyDown);
    this.gui.destroy();
  }
}
