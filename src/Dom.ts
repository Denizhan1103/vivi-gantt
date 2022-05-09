interface NavbarItem {
  id: number;
  name: string;
}

export default class GanntDom {
  constructor() {}

  public createDomContent(navbarData: NavbarItem[]): string {
    return `
        <div class="chart">
            <div class="chart__navbar">
                ${this.createNavbarDom(navbarData)}
            </div>
            <div class="chart__content">
                <div class="chart__content-header"></div>
                <div class="chart__content-data"></div>
            </div>
        </div>
    `;
  }

  public createNavbarDom(navbarData: NavbarItem[]): string {
    let createdHeaderDom = ``;
    navbarData.forEach((navbarItem: NavbarItem) => {
      createdHeaderDom += `<div id="${navbarItem.id}" class="chart__navbar-item">${navbarItem.name}</div>`;
    });
    return createdHeaderDom;
  }
  }
}
