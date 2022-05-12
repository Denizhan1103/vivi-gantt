import GanntDom from "./Dom.js";
import Resizable from "./Resizable.js";

interface NavbarData {
  id: number;
  name: string;
}

interface Options {
  target: HTMLDivElement;
  data: {
    navbar: NavbarData[];
    content?: {};
  };
}

export default class GanntChart {
  constructor({ target, data }: Options) {
    const ganntDom = new GanntDom();
    target.innerHTML = ganntDom.createDomContent(data.navbar);
    Resizable.addListener(".chart__navbar-resizer");
  }
}
