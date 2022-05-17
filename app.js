import {
    Gantt
} from "./dist/App.js"
import {
    seedGantt
} from "./seeder.js"

const container = document.querySelector(".container")

const options = {
    labelName: 'Label',
    ganntType: 'Month', // Day - Month
    currentTime: 3,
    data: seedGantt({
        navbarCount: 12,
        contentCount: 50
    })
}

new Gantt({
    target: container,
    options
})