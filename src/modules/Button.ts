import { createDomElement } from "../Helper.js";

export default class Button {
    textContent: string[]
    getDom: HTMLDivElement;

    constructor(textContent: string[]) {
        this.textContent = textContent
        this.getDom = this.createButtonNode()
    }

    createButtonNode = (): HTMLDivElement => {
        // Create
        const buttonNode = createDomElement({ classList: 'gantt__btns' }) as HTMLDivElement
        buttonNode.id = "ganttButtons"
        const buttonItems = this.createButtonItem()
        // Append
        buttonNode.innerHTML = buttonItems
        // Return
        return buttonNode
    }

    createButtonItem = (): string => {
        let createdButtonItems = ""
        for (let perButton of this.textContent) {
            createdButtonItems += `<div class="gantt__btn">${perButton}</div>`
        }
        return createdButtonItems
    }
}