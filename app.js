const gant = document.querySelector(".chart")

import AgnosticChart from "./dist/App.js"

const navbarData = [{
        id: 1,
        name: 'Denizhanssssssssssssssssssssssssssssssssssss'
    },
    {
        id: 2,
        name: 'Vildan'
    },
    {
        id: 3,
        name: 'Furkan'
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