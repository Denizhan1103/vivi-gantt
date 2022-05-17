import { createDomElement, convertDigitToMonth, getMonthLastDay } from "./Helper.js";

interface GanttData {
  target: HTMLElement;
  options: Options;
}

interface Options {
  labelName?: string;
  ganttType: GanttType;
  currentTime: number;
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
  navbar: { id: number; name: string; rowInDom: number }[];
  content: { id: number, referenceId: number; name: string; date: { start: number; end: number; }; }[];
}

export class Gantt {
  state: GanttState;

  constructor({ target, options }: GanttData) {
    this.state = this.createState(options.data)
    console.log(this.state)
  }

  createState = (data: RequestedState): GanttState => {
    const parsedData: GanttState = { navbar: [], content: data.content }
    let currentDomRow = 1
    for (let navbarItem of data.navbar) {
      parsedData.navbar.push({
        ...navbarItem,
        rowInDom: currentDomRow
      })
      currentDomRow++
    }
    return parsedData
  }
}