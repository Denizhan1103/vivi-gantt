import { createDomElement, convertDigitToMonth, getMonthLastDay, digitOneToTwo } from "./Helper.js";

interface GanttData {
  target: HTMLElement;
  options: Options;
}

interface Options {
  labelName?: string;
  ganttType: GanttType;
  currentTime: Date;
  data: RequestedState;
}

interface RequestedState {
  navbar: { id: number; name: string; }[];
  content: { id: number, referenceId: number; name: string; date: { start: number; end: number; }; }[];
}

enum GanttType {
  month = 'Month',
  day = 'Day'
}

interface GanttState {
  navbar: { id: number; name: string }[];
  content: { id: number, referenceId: number; name: string; date: { start: number; end: number; }; }[];
}

export class Gantt extends HTMLElement {
  state!: GanttState;
  rowLength: number = 0;
  options: any;

  constructor() {
    super();
  }

  set items(options: RequestedState) {
    this.options = options
    this.createDom()
  }

  createDom = () => {
    this.state = this.createState(this.options.data)
    this.innerHTML = this.createNode(this.options)
  }

  createState = (data: RequestedState): GanttState => {

    return data
  }

  createNode = (data: Options): string => {
    return `
      <div class="gantt__container">
        ${this.createBtnsNode()}
        <div class="gantt__scroller">
          <div class="gantt">
            ${this.createHeaderNode(data.ganttType, data.currentTime, data.labelName)}
            ${this.createContentNode()}
            ${this.createLinesNode()}
          </div>
        </div>
      </div>  
    `
  }

  createBtnsNode = (): string => {
    return `
      <div class="gantt__btns">
        <div class="gantt__btn gantt__btn-up">&#94;</div>
        <div class="gantt__btn">&lt;</div>
        <div class="gantt__btn">&gt;</div>
      </div>
    `
  }

  createHeaderNode = (ganttType: GanttType, currentTime: Date, labelName?: string): string => {
    const headerItems = this.createHeaderItemNodes(ganttType, currentTime)
    return `
      <div class="gantt__row gantt__header">
        <div class="gantt__row-first gantt__row-item gantt__label">${labelName || 'Label'}</div>
        <ul class="gantt__row-items gantt__row-header" style="grid-template-columns: repeat(${this.rowLength},120px);">
           ${headerItems}
        </ul>
     </div>
    `
  }

  createHeaderItemNodes = (ganttType: GanttType, currentTime: Date,) => {
    let createdItems: string = ''
    if (ganttType == GanttType.month) {
      const dayInCurrentMonth = getMonthLastDay(currentTime.getMonth())
      for (let x = 1; x <= dayInCurrentMonth; x++) {
        createdItems += `<li class="gantt__row-item gantt__header-item">${x} ${convertDigitToMonth(currentTime.getMonth())} ${currentTime.getFullYear()}</li>`
      }
      this.rowLength = dayInCurrentMonth
      return createdItems
    }
    if (ganttType == GanttType.day) {
      for (let x = 0; x < 24; x++) {
        createdItems += `<li class="gantt__row-item gantt__header-item">${x}:00</li>`
      }
      this.rowLength = 24
      return createdItems
    }
  }

  createContentNode = () => {
    return `
      <div class="gantt__content" style="grid-template-rows: repeat(${this.state.navbar.length}, minmax(50px, max-content));">
        ${this.createRowNodes()}
      </div>
    `
  }

  createRowNodes = () => {
    let createdRows = ''
    for (let row of this.state.navbar) {
      let createdTasks = ''
      for (let task of this.state.content) {
        if (task.referenceId == row.id) {
          createdTasks += `<li class="gantt__task" style="grid-column: ${task.date.start} / span ${task.date.end - task.date.start};">${task.name}</li>`
        }
      }
      createdRows += `
      <div class="gantt__row">
        <div class="gantt__row-first gantt__row-item">${row.name}</div>
        <ul class="gantt__row-items" style="grid-template-columns: repeat(${this.rowLength},120px);">
            ${createdTasks}
        </ul>
      </div>
    `
    }
    return createdRows
  }

  createLinesNode = () => {
    let createdLines = ""
    for (let x = 1; x < this.rowLength; x++) createdLines += '<div class="gantt__lines-item"></div>'
    return `
      <div class="gantt__row gantt__lines">
        <div class="gantt__lines-navbar"></div>
        <div class="gantt__lines-content" style="grid-template-columns: repeat(${this.rowLength}, 120px);">
            ${createdLines}
        </div>
      </div>
    `
  }
}

customElements.define('gantt-chart', Gantt)