import {
    Gantt
} from "./dist/App.js"
import {
    seedGantt
} from "./seeder.js"

const container = document.querySelector(".container")
const chart = document.querySelector("gantt-chart")

const options = {
    labelName: 'Labelss',
    ganttType: 'Month', // Day - Month
    currentTime: new Date(new Date().setMonth(new Date().getMonth() - 3)),
    data: seedGantt({
        navbarCount: 50,
        contentCount: 50
    })
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