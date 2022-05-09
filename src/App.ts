import GanntDom from "./Dom.js";

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
  }
}
("");
