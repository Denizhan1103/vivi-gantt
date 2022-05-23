export default class GanttEvent {
    contentNode: HTMLDivElement

    constructor(contentNode: HTMLDivElement) {
        this.contentNode = contentNode
        this.appendEvents()
    }

    appendEvents = (): boolean => {
        // Get nodes
        const buttonContainerNode = this.contentNode.querySelector('#ganttButtons') as HTMLDivElement
        // Add listeners
        this.appendEventToButton(buttonContainerNode)
        // Return
        return true
    }

    appendEventToButton = (buttonContainerNode: HTMLDivElement): boolean => {
        for (let buttonIndex = 0; buttonIndex < buttonContainerNode.childNodes.length; buttonIndex++) {
            buttonContainerNode.childNodes[buttonIndex].addEventListener('click', () => this.buttonCustomEvent(buttonIndex))
        }
        return true
    }

    buttonCustomEvent = (buttonIndex: number) => {
        // Todo: fix
        const buttonClickEvent = new CustomEvent('buttonClickEvent', { 'detail': { index: buttonIndex } })
        window.dispatchEvent(buttonClickEvent)
    }

    // appendEventToContent = (): boolean => {

    // }

    // appendEventToLabel = (): boolean => {

    // }

    // appendEventToHeader = (): boolean => {

    // }

    // appendEventToTask = (): boolean => {

    // }
}