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
    private mode: GanttMode;
    private currentTime: Date;
    private labelName?: string;
    private createdDom: HTMLDivElement;

    // TODO: Provide - Inject
    constructor({ mode, currentTime, labelName }: HeaderData) {
        this.mode = mode
        this.currentTime = currentTime
        if (labelName) this.labelName = labelName
        this.createdDom = this.createHeaderNode()
    }

    public get getDom(): HTMLDivElement {
        return this.createdDom
    }

    private set getDom(newDom: HTMLDivElement) {
        this.createdDom = newDom
    }

    private createHeaderNode = (): HTMLDivElement => {
        // Time Calculate
        const labelTime = this.mode == GanttMode.month ? 'Year ' + this.currentTime.getFullYear() : this.currentTime.getDay() + ' ' + convertDigitToMonth(this.currentTime.getMonth()) + ' ' + this.currentTime.getFullYear()
        // Create
        const headerNode = this.createParentNode()
        const headerNodeContent = `
            <div id="headerRowFirst" class="gantt__row-first gantt__row-item gantt__label">
                <span>${this.labelName || 'Label'}</span>
                <span class="gantt__label-time">${labelTime}</span>
            </div>
            <ul id="headerRowItems" class="gantt__row-items">
            ${this.createHeaderItemNodes()}
            </ul>
        `
        // Append
        headerNode.innerHTML = headerNodeContent
        headerNode.appendChild(this.appendHeaderNodeStyles())
        // Return
        return headerNode
    }

    private createParentNode = (): HTMLDivElement => {
        const ganttHeader = createDomElement({ elementType: 'div', classList: ['gantt__row', 'gantt__header'] }) as HTMLDivElement
        return ganttHeader
    }

    // Use bridge pattern
    private createHeaderItemNodes = (): string => {
        let headerItemNodes: string = ""
        if (this.mode == GanttMode.month) headerItemNodes = this.createMonthNode()
        if (this.mode == GanttMode.day) headerItemNodes = this.createDayNode()
        return headerItemNodes
    }

    private createMonthNode = (): string => {
        let createdNodes: string = ``
        const lastDayInCurrentMonth = getMonthLastDay(this.currentTime.getMonth())
        for (let currentDay = 1; currentDay <= lastDayInCurrentMonth; currentDay++) {
            createdNodes += `<li id="headerRowItem${currentDay}" class="gantt__row-item gantt__header-item">${currentDay} ${convertDigitToMonth(this.currentTime.getMonth())} ${this.currentTime.getFullYear()}</li>`
        }
        return createdNodes
    }

    // Add time types
    private createDayNode = (): string => {
        let createdNodes: string = ``
        const hoursInDay = 24
        for (let currentHour = 0; currentHour < hoursInDay; currentHour++) {
            createdNodes += `<li id="headerRowItem${currentHour} class="gantt__row-item gantt__header-item">${currentHour}:00</li>`
        }
        return createdNodes
    }

    // Next Week
    private appendDifference = ({ mode, currentTime, labelName }: HeaderData) => {
        if (mode !== this.mode || currentTime !== this.currentTime || labelName !== this.labelName) {
            this.mode = mode
            this.currentTime = currentTime
            this.labelName = labelName
            this.getDom = this.createHeaderNode()
        }
    }

    private appendHeaderNodeStyles = (): HTMLStyleElement => {
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

            .gantt__label-time {
                font-size: 12px;
            }
        `
        return headerNodeStyles
    }
}