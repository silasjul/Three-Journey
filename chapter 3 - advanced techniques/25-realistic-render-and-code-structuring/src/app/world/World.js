import Environment from "./Environment.js";
import Helmet from "./Helmet.js";

export default class World {
  constructor(app) {
    this.app = app;

    this.environment = new Environment(app);
    this.helmet = new Helmet(app);
  }

  dispose() {
    this.helmet.dispose();
  }
}
