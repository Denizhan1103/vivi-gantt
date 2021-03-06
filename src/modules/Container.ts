import { createDomElement, getMonthLastDay } from "../Helper.js";
import { Options, HeaderNodeState, ContentNodeState, GanttMode } from "../utils/Interface.js"

import Content from "./Content.js"
import Header from "./Header.js"
import Line from "./Line.js"
import Button from "./Button.js"

export default class Container {
    options: Options;
    rowCount: number;
    rowScrollRatio: number;
    getDom: HTMLDivElement;

    constructor(options: Options) {
        this.options = options
        this.rowCount = this.calculateRowCount()
        this.rowScrollRatio = this.calculateRowScrollRatio()
        this.getDom = this.createContainerNode()
    }

    calculateRowCount = (): number => {
        const rowCount = this.options.mode == GanttMode.day ? 24 : getMonthLastDay(this.options.currentTime.getMonth())
        return rowCount
    }

    calculateRowScrollRatio = (): number => {
        const calculatedLeftScroll = this.options.rowScrollRatio * 120
        return calculatedLeftScroll
    }

    createContainerNode = (): HTMLDivElement => {
        // State creation
        const headerNodeState: HeaderNodeState = { mode: this.options.mode, currentTime: this.options.currentTime, labelName: this.options.labelName, rowCount: this.rowCount }
        const contentNodeState: ContentNodeState = { rowCount: this.rowCount, perColPiece: this.options.perColPiece, state: this.options.data }
        const lineNodeState: number = this.rowCount
        const buttonNodeState: string[] = ['<<', '<', '>']
        // Create
        const ganttContainer = createDomElement({ classList: 'gantt__container' }) as HTMLDivElement
        const ganttInner = `
            ${this.options.buttonsVisible == false ? '' : new Button(buttonNodeState).getDom.outerHTML}
            <div id="ganttScroller" class="gantt__scroller">
                <div id="gantt" class="gantt">
                    ${new Header(headerNodeState).getDom.outerHTML}
                    ${this.options.data.content.length > 0 ? new Content(contentNodeState).getDom.outerHTML : ''}
                    ${new Line(lineNodeState).getDom.outerHTML}
                </div>
                ${this.options.data.content.length == 0 ? `<div class="gantt__noitem">${this.options.messages?.noItem || 'No Item'}</div>` : ''}
            </div>
        `
        ganttContainer.innerHTML = ganttInner
        return ganttContainer
    }
}