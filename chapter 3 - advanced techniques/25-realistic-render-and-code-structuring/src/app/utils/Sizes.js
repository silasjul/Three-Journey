import EventEmitter from "eventemitter3";

export default class Sizes extends EventEmitter {
  constructor() {
    super();

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    this._onResize = () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);
      this.emit("resize");
    };

    window.addEventListener("resize", this._onResize);
  }

  dispose() {
    window.removeEventListener("resize", this._onResize);
    this.removeAllListeners();
  }
}
