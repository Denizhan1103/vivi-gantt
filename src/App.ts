import GanntDom from "./Dom.js";

interface Options {
  target: HTMLDivElement;
}

export default class GanntChart {
  constructor({ target }: Options) {
    const ganntDom = new GanntDom();
    target.innerHTML = ganntDom.createDomContent();
    // console.log(GanntDom.createDomContent());
  }
}
