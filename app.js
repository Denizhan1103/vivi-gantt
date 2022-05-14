import Gannt from "./dist/App.js"

const container = document.querySelector(".container")

const options = {
    labelName: 'Label',
    ganntType: 'Month',
    itemWidth: 240,
    itemHeight: 90,
    headerHeight: 50,
    labelBgColor: 'green',
    navbarBgColor: 'aquamarine',
    headerBgColor: 'lightblue',
    data: {
        navbar: [{
                id: 1,
                name: 'Deniz'
            },
            {
                id: 2,
                name: 'Ufaklık'
            },
            {
                id: 3,
                name: 'Furkan'
            },
        ],
        content: [{
            id: 1,
            referenceId: 1,
            name: 'Task1',
            dateStart: new Date(),
            dateEnd: new Date(new Date().setHours(new Date().getHours() + 24))
        }]
    }
}

const seedNavbar = () => {
    for (let x = 0; x < 5; x++) {
        options.data.navbar.push({
            id: Math.random() * 100,
            name: 'Alooo'
        })
    }
}

seedNavbar()

new Gannt(container, options)