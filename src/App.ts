import { createDomElement, convertDigitToMonth, getMonthLastDay, digitOneToTwo } from "./Helper.js";
import Header from "./modules/Header.js"
import Content from "./modules/Content.js"

import Container from "./modules/Container.js"

interface GanttData {
  target: HTMLElement;
  options: Options;
}

interface Options {
  labelName?: string;
  mode: GanttMode;
  currentTime: Date;
  rowScrollRatio: number;
  data: RequestedState;
}

interface RequestedState {
  navbar: { id: number; name: string; }[];
  content: { id: number, referenceId: number; name: string; date: { start: number; end: number; }; }[];
}

enum GanttMode {
  month = 'Month',
  day = 'Day'
}

interface GanttState {
  navbar: { id: number; name: string }[];
  content: { id: number, referenceId: number; name: string; date: { start: number; end: number; }; }[];
}

export class Gantt extends HTMLElement {
  state!: GanttState;
  rowCount: number = 0;
  options?: Options;

  constructor() {
    super();
  }

  set items(options: Options) {
    this.options = options
    // this.createDom()
    // console.log(new Header(options).getDom)
    // const rowCount = this.options.mode == GanttMode.day ? 24 : getMonthLastDay(this.options.currentTime.getMonth())
    // this.appendChild(new Header({ ...options, rowCount }).getDom)
    // // @ts-ignore
    // this.appendChild(new Content({ rowCount, state: this.options.data }).getDom)
    const gantt = new Container(options)
    this.appendChild(gantt.getDom)
    this.appendRowScrollRatio(gantt.rowScrollRatio)
  }

  appendRowScrollRatio = (rowScrollRatio: number): boolean => {
    const scrollerNode = this.querySelector('#ganttScroller')
    if (scrollerNode) {
      scrollerNode.scrollLeft = rowScrollRatio
      return true
    }
    return false
  }


  createDom = () => {
    this.state = this.createState(this.options.data)
    const containerNode = this.createNode(this.options)
    this.appendChild(containerNode)
    this.calcRowScrollRatio(containerNode, this.options.rowScrollRatio)
  }

  createState = (data: RequestedState): GanttState => {
    return data
  }

  createNode = (data: Options): HTMLDivElement => {
    // Create
    const containerNode = this.createContainerNode()
    const buttonsNode = this.createBtnsNode()
    const headerNode = this.createHeaderNode(data.mode, data.currentTime, data.labelName)
    const contentNode = this.createContentNode()
    const linesNode = this.createLinesNode()
    // Append
    containerNode.appendChild(buttonsNode)
    containerNode.childNodes[0].childNodes[0].appendChild(headerNode)
    containerNode.childNodes[0].childNodes[0].appendChild(contentNode)
    containerNode.childNodes[0].childNodes[0].appendChild(linesNode)
    // Return
    return containerNode
  }

  calcRowScrollRatio = (containerNode: HTMLDivElement, rowScrollRatio: number): boolean => {
    const calculatedLeftScroll = rowScrollRatio * 120
    const scrollerNode = containerNode.children[0]
    scrollerNode.scrollLeft = calculatedLeftScroll
    return true
  }

  createContainerNode = (): HTMLDivElement => {
    // Create
    const ganttContainer = createDomElement({ classList: 'gantt__container' }) as HTMLDivElement
    const ganttScroller = createDomElement({ classList: 'gantt__scroller' }) as HTMLDivElement
    const gantt = createDomElement({ classList: 'gantt' }) as HTMLDivElement
    // Append
    ganttContainer.appendChild(ganttScroller)
    ganttContainer.childNodes[0].appendChild(gantt)
    // Return
    return ganttContainer
  }

  // Next Feature : Text content for buttons & dynamic button count
  createBtnsNode = (): HTMLDivElement => {
    const btnsContainer = createDomElement({ classList: 'gantt__btns' }) as HTMLDivElement
    const textContent = ['<<', '>', '<']
    for (let currentButton = 0; currentButton < 3; currentButton++) {
      const createdButton = createDomElement({ classList: 'gantt__btn', textContent: textContent[currentButton] }) as HTMLDivElement
      btnsContainer.appendChild(createdButton)
    }
    return btnsContainer
  }

  createHeaderNode = (mode: GanttMode, currentTime: Date, labelName?: string): HTMLDivElement => {
    // Create
    const ganttHeader = createDomElement({ classList: ['gantt__row', 'gantt__header'] }) as HTMLDivElement
    const ganttLabel = createDomElement({ classList: ['gantt__row-first', 'gantt__row-item', 'gantt__label'], textContent: labelName || 'Label' })
    const ganttHeaderItems = this.createHeaderItemNodes(mode, currentTime)
    // Append
    ganttHeader.appendChild(ganttLabel)
    ganttHeader.appendChild(ganttLabel)
    ganttHeader.appendChild(ganttHeaderItems)
    // Return
    return ganttHeader
  }

  // Next Step: Convert this function with bridge pattern
  // Next Step: Add AM/PM time type support
  createHeaderItemNodes = (mode: GanttMode, currentTime: Date): HTMLUListElement => {
    // Create container node
    const headerItemContainer = createDomElement({ elementType: 'ul', classList: 'gantt__row-items' }) as HTMLUListElement
    // Create child nodes
    if (mode == GanttMode.month) {
      const dayInCurrentMonth = getMonthLastDay(currentTime.getMonth())
      for (let x = 1; x <= dayInCurrentMonth; x++) {
        const createdChildNode = createDomElement({ elementType: 'li', classList: ['gantt__row-item', 'gantt__header-item'], textContent: `${x} ${convertDigitToMonth(currentTime.getMonth())} ${currentTime.getFullYear()}` }) as HTMLLIElement
        headerItemContainer.appendChild(createdChildNode)
      }
      // TODO: fix it
      this.rowCount = dayInCurrentMonth
    }
    if (mode == GanttMode.day) {
      for (let x = 0; x < 24; x++) {
        const createdChildNode = createDomElement({ elementType: 'li', classList: ['gantt__row-item', 'gantt__header-item'], textContent: `${x}:00` }) as HTMLLIElement
        headerItemContainer.appendChild(createdChildNode)
      }
      // TODO: fix it
      this.rowCount = 24
    }

    // Append row length to container
    headerItemContainer.style.gridTemplateColumns = `repeat(${this.rowCount},120px)`
    // Return
    return headerItemContainer
  }

  // TODO: look for better state
  createContentNode = (): HTMLDivElement => {
    const ganttContent = createDomElement({ classList: 'gantt__content' }) as HTMLDivElement
    ganttContent.style.gridTemplateRows = `repeat(${this.state.navbar.length}, minmax(50px, max-content))`
    for (let row of this.state.navbar) {
      const rowContainer = createDomElement({ classList: 'gantt__row' }) as HTMLDivElement
      const firstItem = createDomElement({ classList: ['gantt__row-first', 'gantt__row-item'], textContent: row.name }) as HTMLDivElement
      const rowItems = createDomElement({ elementType: 'ul', classList: 'gantt__row-items' }) as HTMLUListElement
      rowItems.style.gridTemplateColumns = `repeat(${this.rowCount},120px)`
      for (let task of this.state.content) {
        if (task.referenceId == row.id) {
          const createdTask = createDomElement({ elementType: 'li', classList: 'gantt__task', textContent: task.name }) as HTMLLIElement
          createdTask.style.gridColumn = `${task.date.start} / span ${task.date.end - task.date.start}`
          rowItems.appendChild(createdTask)
        }
      }
      rowContainer.appendChild(firstItem)
      rowContainer.appendChild(rowItems)
      ganttContent.appendChild(rowContainer)
    }
    return ganttContent
  }

  createLinesNode = (): HTMLDivElement => {
    // Create
    const ganttLine = createDomElement({ classList: ['gantt__row', 'gantt__lines'] }) as HTMLDivElement
    const ganttLineNavbar = createDomElement({ classList: 'gantt__lines-navbar' }) as HTMLDivElement
    const ganttLineContent = createDomElement({ classList: 'gantt__lines-content' }) as HTMLDivElement
    ganttLineContent.style.gridTemplateColumns = `repeat(${this.rowCount}, 120px)`
    // Create line for per column
    for (let x = 1; x < this.rowCount; x++) {
      const ganttLineItem = createDomElement({ classList: 'gantt__lines-item' }) as HTMLDivElement
      ganttLineContent.appendChild(ganttLineItem)
    }
    // Append 
    ganttLine.appendChild(ganttLineNavbar)
    ganttLine.appendChild(ganttLineContent)
    // Return
    return ganttLine
  }
}

customElements.define('gantt-chart', Gantt)