import { createDomElement } from "../Helper.js"

export default class Line {
    rowCount: number;
    getDom: HTMLDivElement;

    constructor(rowCount: number) {
        this.rowCount = rowCount
        this.getDom = this.createLineDom()
    }

    createLineDom = (): HTMLDivElement => {
        // Create
        const lineNode = createDomElement({ classList: ['gantt__row', 'gantt__lines'] }) as HTMLDivElement
        const lineContent = `
            <div class="gantt__lines-navbar"></div>
            <div class="gantt__lines-content" style="grid-template-columns:repeat(${this.rowCount}, 120px)">
                ${this.createLineItem()}
            </div>
        `
        // Append
        lineNode.innerHTML = lineContent
        // Return
        return lineNode
    }

    createLineItem = (): string => {
        let lineItems = ""
        for (let perLine = 1; perLine <= this.rowCount; perLine++) {
            lineItems += `<div class="gantt__lines-item"></div>`
        }
        return lineItems
    }
}