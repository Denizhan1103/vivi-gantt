export default class GanntDom {
  constructor() {}

  public createDomContent(): string {
    return `
        <div class="chart">
            <div class="chart__navbar"></div>
            <div class="chart__content">
                <div class="chart__content-header"></div>
                <div class="chart__content-data"></div>
            </div>
        </div>
    `;
  }

  public createDomContent2() {
    const createdDom = document.createElement("div");
    //   const domChildrens = `<div></div>`
    //   createdDom.appendChild(domChildrens)
    return;
  }
}
