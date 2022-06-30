import {
    Gantt
} from "./dist/App.js"
import {
    seedGantt
} from "./seeder.js"

const container = document.querySelector(".container")

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
                    start: '1.10',
                    end: '3.40'
                }
            },
            {
                id: 2,
                referenceId: 1,
                name: 'Task2',
                bgClass: 'secondary',
                bgColor: 'lightblue',
                color: 'black',
                date: {
                    start: '2.37',
                    end: '5.57'
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
    },
    messages: {
        noItem: 'You have not any reservation!'
    }
}


window.addEventListener('buttonClickEvent', ({
    detail
}) => {
    console.log(detail.index)
})

new Gantt(container, options)