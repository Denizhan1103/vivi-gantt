import { createDomElement, convertDigitToMonth, getMonthLastDay } from "../Helper.js";

interface ContentState {
    rowCount: number;
    perColPiece?: number;
    state: GanttState;
}

interface GanttState {
    navbar: { id: number; name: string }[];
    content: { id: number, referenceId: number; name: string; bgColor?: string; date: { start: number; end: number; }; }[];
}

export default class Content {
    rowCount: number;
    perColPiece: number;
    state: GanttState;
    getDom: HTMLDivElement;

    constructor({ rowCount, perColPiece, state }: ContentState) {
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
                // TODO: fix columnStart & columnEnd ninja code
                const columnStart = ((Number(perTask.date.start.toFixed()) * this.perColPiece) + 1) + (Math.round((Number(String(perTask.date.start).split('.')[1]) / 60) * this.perColPiece) || 0)
                const columnEnd = ((Number(perTask.date.end.toFixed()) * this.perColPiece) + 1) + (Math.round((Number(String(perTask.date.end).split('.')[1]) / 60) * this.perColPiece) || 0)
                contentItemTasks += `<li id="task${perTask.id}" class="gantt__task" style="grid-column:${columnStart} / span ${columnEnd - columnStart}; background-color:${perTask.bgColor || '#ff6252'};">${perTask.name}</li>`
            }
        }
        return contentItemTasks
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