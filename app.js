const gant = document.querySelector(".chart")

import AgnosticChart from "./dist/App.js"

const navbarData = [{
        id: 1,
        name: 'Denizhan'
    },
    {
        id: 2,
        name: 'Furkan'
    },
    {
        id: 3,
        name: 'Aloo'
    }
]

for (let x = 0; x < 30; x++) {
    navbarData.push({
        id: Math.random() * 100,
        name: 'Aloo'
    })
}

const options = {
    target: gant,
    data: {
        navbar: navbarData
    }
}

const chart = new AgnosticChart(options)