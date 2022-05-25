import Container from "./modules/Container.js"
import GanttEvent from "./utils/Event.js"

interface Options {
  labelName?: string;
  mode: GanttMode;
  currentTime: Date;
  rowScrollRatio: number;
  perColPiece?: number;
  data: GanttState;
}

enum GanttMode {
  month = 'Month',
  day = 'Day'
}

interface GanttState {
  navbar: { id: number; name: string }[];
  content: { id: number, referenceId: number; name: string; bgColor?: string; date: { start: number; end: number; }; }[];
}

export class Gantt {
  state!: GanttState;
  rowCount: number = 0;
  options?: Options;
  target: HTMLElement

  constructor(target: HTMLElement, options: Options) {
    this.options = options
    this.target = target
    const container = new Container(options)
    this.target.appendChild(container.getDom)
    this.appendRowScrollRatio(container.getDom, container.rowScrollRatio)
    new GanttEvent(container.getDom)
  }

  appendRowScrollRatio = (target: HTMLElement, rowScrollRatio: number): boolean => {
    const scrollerNode = target.querySelector('#ganttScroller')
    if (scrollerNode) {
      scrollerNode.scrollLeft = rowScrollRatio
      return true
    }
    return false
  }

}