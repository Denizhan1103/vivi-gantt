export default class GanttEvent {
    contentNode: HTMLDivElement

    constructor(contentNode: HTMLDivElement) {
        this.contentNode = contentNode
        this.appendEvents()
    }

    appendEvents = (): boolean => {
        // Get nodes
        const buttonContainerNode = this.contentNode.querySelector('#ganttButtons') as HTMLDivElement
        const allTasks = document.querySelectorAll('.gantt__task')
        // Add listeners
        this.appendEventToButton(buttonContainerNode)
        this.appendEventToTasks(allTasks)
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
        const buttonClickEvent = new CustomEvent('onButtonClick', { 'detail': { index: buttonIndex } })
        window.dispatchEvent(buttonClickEvent)
    }

    appendEventToTasks = (allTasks: any) => {
        if (allTasks.length > 0) {
            allTasks.forEach((perTask: any) => {
                const [id, ref] = [Number(perTask.id), Number(perTask.getAttributes('ref'))]
                perTask.addEventListener('click', () => this.taskCustomEvent({ id, ref }))
            })
        }
    }

    taskCustomEvent = ({ id, ref }: { id: number; ref: number }) => {
        const taskClickEvent = new CustomEvent('onTaskClick', { detail: { id, ref } })
        window.dispatchEvent(taskClickEvent)
    }

    // appendEventToLabel = (): boolean => {

    // }

    // appendEventToHeader = (): boolean => {

    // }

    // appendEventToTask = (): boolean => {

    // }
}