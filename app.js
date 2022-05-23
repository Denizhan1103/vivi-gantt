import {
    Gantt
} from "./dist/App.js"
import {
    seedGantt
} from "./seeder.js"

const container = document.querySelector(".container")
const chart = document.querySelector("gantt-chart")

const date = new Date(new Date().setMonth(new Date().getMonth() - 3))
const options = {
    labelName: 'Labelss',
    dateOnLabel: true,
    mode: 'Day', // Day - Month,
    currentTime: date,
    rowScrollRatio: 1,
    perColPiece: 4,
    data: {
        navbar: [{
            id: 1,
            name: 'Denizhan'
        }],
        content: [{
                id: 1,
                referenceId: 1,
                name: 'Task1',
                date: {
                    start: 1.12,
                    end: 3.28
                }
            },
            {
                id: 2,
                referenceId: 1,
                name: 'Task2',
                bgColor: 'lightblue',
                date: {
                    start: 1.37,
                    end: 3.50
                }
            }
        ]
    },
    buttonNames: ['1', '2', '3'],
    style: {
        button: {
            color: 'black',
            bgColor: 'red',
            stripes: 'brown',
            nth: {
                active: true,
                nthBgColor: 'yellow',
                nthColor: 'black'
            }
        }
    }
}

const style = {
    headerColor: `red`,
    headerStripes: {
        active: true,
        color: 'orange'
    },
    headerNth: {
        active: true,
        color: 'green',
        stripes: true,
        stripesColor: 'lightgreen'
    },
    labelColor: 'blue',
    labelStripes: {
        active: true,
        color: 'lightblue'
    },
    buttons: {
        first: {
            color: '',
            bgColor: ''
        },
        second: {
            color: '',
            bgColor: ''
        },
        thirt: {
            color: '',
            bgColor: ''
        }
    }
}

chart.items = options

// new Gantt({
//     target: container,
//     options
// })


window.addEventListener('buttonClickEvent', ({
    detail
}) => {
    console.log(detail.index)
})