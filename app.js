const gant = document.querySelector(".chart")

import AgnosticChart from "./dist/App.js"

const options = {
    target: gant
}

const chart = new AgnosticChart(options)