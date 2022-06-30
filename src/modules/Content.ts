import { createDomElement, convertDigitToMonth, getMonthLastDay } from "../Helper.js";
import { ContentNodeState, GanttState, GanttNavbar, GanttContent } from "../utils/Interface.js"

export default class Content {
    rowCount: number;
    perColPiece: number;
    state: GanttState;
    getDom: HTMLDivElement;

    constructor({ rowCount, perColPiece, state }: ContentNodeState) {
        this.rowCount = rowCount
        this.perColPiece = perColPiece || 1
        this.state = state
        this.getDom = this.createContentNode()
    }

    createContentNode = (): HTMLDivElement => {
        // Create content node
        const contentNode = createDomElement({ classList: 'gantt__content' }) as HTMLDivElement
        contentNode.id = 'ganttContent'
        contentNode.style.gridTemplateRows = `repeat(${this.state.navbar.length}, minmax(50px, max-content))`
        // Append
        contentNode.innerHTML = this.createContentItemNodes()
        // Return
        return contentNode
    }

    createContentItemNodes = (): string => {
        let contentItemNodes: string = ""
        for (let perRow of this.state.navbar) {
            contentItemNodes += `
                <div id="ganttRow${perRow.id}" class="gantt__row">
                    <div class="gantt__row-first gantt__row-item">${perRow.name}</div>
                    <ul class="gantt__row-items" style="grid-template-columns:repeat(${this.rowCount * this.perColPiece},${120 / this.perColPiece}px)">
                        ${this.createRowTasks(perRow.id)}
                    </ul>
                </div>
            `
        }
        return contentItemNodes
    }

    createRowTasks = (rowId: number): string => {
        let contentItemTasks: string = ""
        for (let perTask of this.state.content) {
            if (perTask.referenceId == rowId) {

                const { columnStart, columnEnd } = this.rowCount == 24 ? this.calcDayRow(perTask) : this.calcMonthRow(perTask)

                let currentTask = createDomElement({ elementType: 'li', classList: 'gantt__task', textContent: perTask.name }) as HTMLLIElement
                currentTask.style.gridColumn = `${columnStart} / span ${columnEnd - columnStart}`
                // Appending style
                currentTask = this.appendTaskColor(currentTask, perTask)
                contentItemTasks += currentTask.outerHTML
            }
        }
        return contentItemTasks
    }

    calcMonthRow = (perTask: GanttContent) => {
        const startMain = Number(perTask.date.start.split('.')[0])
        const endMain = Number(perTask.date.end.split('.')[0])
        console.log(startMain, endMain)

        const columnStart = (((startMain * this.perColPiece) + 1) - this.perColPiece)
        const columnEnd = ((endMain * this.perColPiece) + 1)
        console.log(columnStart, columnEnd)

        return { columnStart, columnEnd }
    }

    calcDayRow = (perTask: GanttContent) => {
        const minutePerHour = 60

        const [startMain, startSub] = perTask.date.start.split('.').map((v: string) => Number(v))
        const [endMain, endSub] = perTask.date.end.split('.').map((v: string) => Number(v))

        const columnStart = ((startMain * this.perColPiece) + 1) + (Math.round((startSub / minutePerHour) * this.perColPiece) || 0)
        const columnEnd = ((endMain * this.perColPiece) + 1) + (Math.round((endSub / minutePerHour) * this.perColPiece) || 0)

        return { columnStart, columnEnd }
    }

    appendTaskColor = (taskNode: HTMLLIElement, taskData: GanttContent): HTMLLIElement => {
        // Append Bg Color
        if (taskData.bgClass) taskNode.classList.add(`task__bg-${taskData.bgClass}`)
        else taskNode.style.backgroundColor = taskData.bgColor ? taskData.bgColor : '#ff6252'
        // Append Color
        if (taskData.colorClass) taskNode.classList.add(`task__cl-${taskData.colorClass}`)
        else taskNode.style.color = taskData.color ? taskData.color : '#ffffff'
        // Return
        return taskNode
    }

    appendContentStyle = (): HTMLStyleElement => {
        const contentNodeStyles = createDomElement({ elementType: 'style' }) as HTMLStyleElement
        contentNodeStyles.textContent = `
        .gantt__row {
            display: grid;
            grid-template-columns: 160px 1fr;
        }
          
        .gantt__row-first {
            font-weight: bold;
            position: sticky;
            left: 0;
            z-index: 199;
            border-top: 1px solid rgba(221, 221, 221, 0.8);
            border-right: 1px solid rgba(0, 0, 0, 0.1);
            cursor: pointer;
        }
          
        .gantt__row-items {
            display: grid;
            grid-template-columns: repeat(31,120px);
            list-style: none;
            padding: 10px 0;
            grid-gap: 10px 0;
            border-top: 1px solid rgba(221, 221, 221, 0.8);
        }

        .gantt__row-item {
            display: grid;
            place-items: center;
        }
          
        .gantt__content {
            display: grid;
            grid-template-rows: repeat(4, minmax(50px, max-content));
        }
          
        .gantt__content .gantt__row-first {
            background-color: #ffffff;
        }
          
        .gantt__content .gantt__row:nth-child(odd),
        .gantt__content .gantt__row:nth-child(odd) .gantt__row-first{
            background-color: #f5f5f5;
        }
          
        .gantt__task {
            background-color: #ff6252;
            border-radius: 20px;
            display: grid;
            place-items: center;
            font-weight: 600;
            color: #ffffff;
            cursor: pointer;
            height: 28px;
            z-index: 99;
        }
        `
        return contentNodeStyles
    }
}