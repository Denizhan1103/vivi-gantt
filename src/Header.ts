import { createDomElement, convertDigitToMonth, getMonthLastDay } from "./Helper.js";

enum GanttMode {
    month = 'Month',
    day = 'Day'
}


interface HeaderData {
    mode: GanttMode;
    currentTime: Date;
    labelName?: string;
}

export default class Header {
    mode: GanttMode;
    currentTime: Date;
    labelName?: string;
    createdDom: HTMLDivElement;

    // TODO: Provide - Inject
    constructor({ mode, currentTime, labelName }: HeaderData) {
        this.mode = mode
        this.currentTime = currentTime
        if (labelName) this.labelName = labelName
        this.createdDom = this.createHeaderNode()
    }

    get getDom() {
        return this.createdDom
    }

    createHeaderNode = (): HTMLDivElement => {
        // Create
        const headerNode = this.createParentNode()
        const headerNodeContent = `
            <div id="headerRowFirst" class="gantt__row-first gantt__row-item gantt__label">${this.labelName || 'Label'}</div>
            <ul id="headerRowItems" class="gantt__row-items">
            ${this.createHeaderItemNodes()}
            </ul>
        `
        // Append
        headerNode.append(headerNodeContent)
        headerNode.appendChild(this.appendHeaderNodeStyles())
        // Return
        return headerNode
    }

    createParentNode = (): HTMLDivElement => {
        const ganttHeader = createDomElement({ elementType: 'div', classList: ['gantt__row', 'gantt__header'] }) as HTMLDivElement
        return ganttHeader
    }

    // Use bridge pattern
    createHeaderItemNodes = (): string => {
        let headerItemNodes: string = ""
        if (this.mode == GanttMode.month) headerItemNodes = this.createMonthNode()
        if (this.mode == GanttMode.day) headerItemNodes = this.createDayNode()
        return headerItemNodes
    }

    createMonthNode = (): string => {
        let createdNodes: string = ``
        const lastDayInCurrentMonth = getMonthLastDay(this.currentTime.getMonth())
        for (let currentDay = 1; currentDay <= lastDayInCurrentMonth; currentDay++) {
            createdNodes += `<li id="headerRowItem${currentDay}" class="gantt__row-item gantt__header-item">${currentDay} ${convertDigitToMonth(this.currentTime.getMonth())} ${this.currentTime.getFullYear()}</li>`
        }
        return createdNodes
    }

    // Add time types
    createDayNode = (): string => {
        let createdNodes: string = ``
        const hoursInDay = 24
        for (let currentHour = 0; currentHour < hoursInDay; currentHour++) {
            createdNodes += `<li id="headerRowItem${currentHour} class="gantt__row-item gantt__header-item">${currentHour}:00</li>`
        }
        return createdNodes
    }

    // Next Week
    appendDifference = ({ mode, currentTime, labelName }: HeaderData) => {
        this.mode = mode
        this.currentTime = currentTime
        this.labelName = labelName
    }

    appendHeaderNodeStyles = (): HTMLStyleElement => {
        const headerNodeStyles = document.createElement('style')
        headerNodeStyles.textContent = `
            .gantt__header {
                color: #fff;
                background-color: #0a3444;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                position: sticky;
                top: 0;
                z-index: 299;
            }
            
            .gantt__header-item {
                transition: 0.2s ease background-color;
                cursor: pointer;
            }
            
            .gantt__header-item:hover {
                transition: 0s ease background-color;
                background-color: #072430;
            }
            
            .gantt__header-item:active {
                transition: 0s ease background-color;
                background-color: #051b25;
            }
            
            .gantt__label {
                background-color: #0a3444;
                border-right: 1px solid rgba(0, 0, 0, 0.1) !important;
            }
        `
        return headerNodeStyles
    }
}