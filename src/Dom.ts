import {
  convertDigitToMonth,
  digitOneToTwo,
  getMonthLastDay,
} from "./Helper.js";

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
                <div class="chart__navbar-resizer"></div>
                <div class="chart__navbar-header">Label</div>
                <div class="chart__navbar-content">
                    ${this.createNavbarDom(navbarData)}
                </div>
            </div>
            <div class="chart__content">
                <div class="chart__content-header">
                    ${this.createContentHeader()}
                </div>
                <div class="chart__content-data"></div>
            </div>
        </div>
    `;
  }

  public createContentHeader(): string {
    let createdHeaderDom = ``;
    const date = new Date();
    const lastDayOfMonth = getMonthLastDay(date.getMonth());

    for (let x = 1; x <= lastDayOfMonth; x++) {
      createdHeaderDom += `
            <div class="header__item">${digitOneToTwo(x)}/${convertDigitToMonth(
        date.getUTCMonth()
      )}/${date.getFullYear()}</div>
        `;
    }
    return createdHeaderDom;
  }

  public createNavbarDom(navbarData: NavbarItem[]): string {
    let createdHeaderDom = ``;
    navbarData.forEach((navbarItem: NavbarItem) => {
      createdHeaderDom += `<div id="${navbarItem.id}" class="chart__navbar-item">${navbarItem.name}</div>`;
    });
    return createdHeaderDom;
  }
}
