import { createDomElement, convertDigitToMonth, getMonthLastDay } from "./Helper.js";

enum GanntType {
  month = "month",
}

interface Content {
  id: number;
  referenceId: number;
  name: string;
  dateStart: Date;
  dateEnd: Date;
}

interface Navbar {
  id: number;
  name: string;
}

interface Data {
  navbar: Navbar[];
  content?: Content[];
}

interface Options {
  labelName?: string;
  ganntType?: GanntType;
  itemWidth?: number;
  itemHeight?: number;
  headerHeight?: number;
  labelBgColor?: string;
  navbarBgColor?: string;
  headerBgColor?: string;
  data: Data;
}

export default class GanntChart {
  navbarData: Navbar[];
  navbarLoc: { id: number; lineOnGrid: number; }[] = [];
  taskList: { id: number; referenceId: number; lineOnGrid: number; colStart: number; colEnd: number; marginTop?: number; }[] = [];

  currentGlobalData = { // TODO: Do dynamic
    viewType: 'Month',
    currentMonth: 'May',
    currentDay: '22'
  }

  constructor(target: HTMLElement, options: Options) {
    this.navbarData = options.data.navbar
    // Init Dom Items
    const chartScroll = createDomElement({ classList: 'gannt__scroll' })
    const chart = createDomElement({ classList: 'gannt' })
    chart.style.gridTemplateRows = `repeat(${options.data.navbar.length + 1}, 50px)`
    chart.style.gridTemplateColumns = `repeat(${getMonthLastDay(new Date().getMonth())}, ${options.itemWidth || 220}px)`
    const label = createDomElement({ classList: ['label', 'item'], textContent: 'Label' })
    // Filling Empty Dom
    const navbar = this.initNavbar(options.data.navbar, options.itemWidth)
    const header = this.initHeader(options.ganntType, options.itemWidth)
    // Append Dom Items
    chart.appendChild(label)
    chart.appendChild(navbar)
    chart.append(header)
    this.initContent(options.data.navbar, chart, options.itemWidth)
    // if (options.data.content) this.initTaskList(options.data.content, chart)
    // if (options.data.content) this.initTaskList(options.data.content, chart)
    if (options.data.content) this.createTaskState(options.data.content)
    this.initTasks(chart)
    chartScroll.appendChild(chart)
    // Fixing
    chart.style.width = `${32 * 240}px` // Not 100%
    // Output
    target.appendChild(chartScroll);
    // console.log(this.navbarLoc)
  }

  initNavbar(navbarData: Navbar[], itemWidth?: number): HTMLDivElement {
    const navbar = createDomElement({ classList: ['navbar', 'navbar__item'] })
    for (let [index, navbarItem] of navbarData.entries()) {
      const navbarChild = createDomElement({ classList: ['navbar__item', 'item'], textContent: navbarItem.name })
      navbarChild.id = String(navbarItem.id)
      if (itemWidth) navbarChild.style.width = `${itemWidth}px`
      this.navbarLoc.push({ id: navbarItem.id, lineOnGrid: index + 2 })
      navbar.appendChild(navbarChild)
    }
    navbar.style.gridTemplateRows = `repeat(${navbarData.length}, 50px)`
    return navbar
  }

  initHeader(ganntType?: GanntType, itemWidth?: number): HTMLDivElement {
    // Parameter does not supportable yet
    const timeNow = new Date()
    const currentMonth = convertDigitToMonth(timeNow.getMonth())
    const currentYear = timeNow.getFullYear()
    const daysOnCurrentMonth = getMonthLastDay(timeNow.getMonth())

    // Parent
    const header = createDomElement({ classList: 'header' })
    header.style.gridColumn = `2 / span ${daysOnCurrentMonth}`
    header.style.gridTemplateColumns = `repeat(${daysOnCurrentMonth}, 1fr)`

    // Childs
    for (let x = 1; x <= Number(daysOnCurrentMonth); x++) {
      const headerChild = createDomElement({ classList: ['header__item', 'item'], textContent: `${x} ${currentMonth} ${currentYear}` })
      if (itemWidth) headerChild.style.width = `${itemWidth}px`
      header.appendChild(headerChild)
    }

    return header
  }

  initContent(navbarData: Navbar[], target: HTMLDivElement, itemWidth?: number): boolean {
    const startRow = 2
    const startCol = 2
    const daysOnCurrentMonth = getMonthLastDay(new Date().getMonth())
    const navbarLength = navbarData.length

    for (let eachNavbarItem = 0; eachNavbarItem < navbarLength; eachNavbarItem++) {
      for (let eachDay = 0; eachDay < daysOnCurrentMonth; eachDay++) {
        const createdDayDom = createDomElement({ classList: ['item', 'content__item'], textContent: 'Empty' })
        createdDayDom.style.gridRowStart = String(eachNavbarItem + startRow)
        createdDayDom.style.gridColumnStart = String(eachDay + startCol)
        if (itemWidth) createdDayDom.style.width = `${itemWidth}px`
        // createdDayDom.style.gridRow = `${eachNavbarItem + startRow} / span ${eachNavbarItem + startRow}`
        // createdDayDom.style.gridColumn = `${eachDay + startCol} / span ${eachDay + startCol}`
        target.appendChild(createdDayDom)
      }
    }
    return true
  }

  createTaskState(taskList: Content[]): boolean {
    for (let eachTask of taskList) {
      // Find task line on grid
      let currentTaskLoc: number = -1;
      let currentTaskColStart: number = -1;
      let currentTaskColEnd: number = -1;
      for (let navbarItem of this.navbarLoc) {
        if (navbarItem.id == eachTask.referenceId) {
          currentTaskLoc = navbarItem.lineOnGrid
        }
      }
      if (this.currentGlobalData.viewType == 'Month') {
        // Calc task colStart on grid
        currentTaskColStart = new Date(eachTask.dateStart).getDate()
        // Calc task colEnd on grid
        currentTaskColEnd = new Date(eachTask.dateEnd).getDate()
      }

      // Calc task margin on grid
      if (currentTaskLoc !== -1) {
        this.taskList.push({
          id: eachTask.id,
          referenceId: eachTask.referenceId,
          lineOnGrid: currentTaskLoc,
          colStart: currentTaskColStart,
          colEnd: currentTaskColEnd,
          // marginTop: 0
        })
      }
    }
    console.log(this.taskList)
    return true
  }

  initTasks(target: HTMLDivElement): boolean {
    if (this.taskList.length < 1) return false
    for (let eachTask of this.taskList) {
      const createdTask = createDomElement({ classList: 'task', textContent: 'Task test' })
      createdTask.style.gridRowStart = `${eachTask.lineOnGrid}`
      createdTask.style.gridColumn = `${eachTask.colStart + 1} / span ${(eachTask.colEnd + 1) - eachTask.colStart}`
      console.log(createdTask)
      target.appendChild(createdTask)
    }
    return true
  }

  initTaskList(taskList: Content[], target: HTMLDivElement): boolean {
    for (let eachTask of taskList) {
      const taskItem = createDomElement({ classList: 'task', textContent: eachTask.name })
      for (let x of taskList) {
        if (eachTask.id !== x.id && eachTask.dateStart.getDay() == x.dateStart.getDay()) {
          taskItem.style.marginTop = "10px"
        }
      }

      target.appendChild(taskItem)
    }
    return true
  }

}