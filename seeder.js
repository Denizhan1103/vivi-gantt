const exampleResponse = {
    navbar: [{
        id: 1,
        name: 'Denizhan',
    }, ],
    content: [{
        id: 1,
        referenceId: 1,
        name: 'Aloo',
        date: {
            start: 4,
            end: 18
        }
    }]
}


export const seedGantt = ({
    navbarCount,
    contentCount
}) => {
    if (navbarCount >= userNames.length) return `Navbar count won't be greater than ${userNames.length}`
    const response = {
        navbar: [],
        content: []
    }
    for (let x = 0; x < navbarCount; x++) {
        response.navbar.push({
            id: x,
            name: userNames[x]
        })
    }
    for (let x = 0; x < contentCount; x++) {
        response.content.push({
            id: x,
            referenceId: Math.floor(Math.random() * navbarCount),
            name: Math.random().toString(36).substring(6),
            date: {
                start: Math.floor(Math.random() * 9) + 1,
                end: Math.floor(Math.random() * 10) + 5,
            }
        })
    }
    return response
}


const userNames = [
    "MARY",
    "PATRICIA",
    "LINDA",
    "BARBARA",
    "ELIZABETH",
    "JENNIFER",
    "MARIA",
    "SUSAN",
    "MARGARET",
    "DOROTHY",
    "LISA",
    "NANCY",
    "KAREN",
    "BETTY",
    "HELEN",
    "SANDRA",
    "DONNA",
    "CAROL",
    "RUTH",
    "SHARON",
    "MICHELLE",
    "LAURA",
    "SARAH",
    "KIMBERLY",
    "DEBORAH",
    "JESSICA",
    "SHIRLEY",
    "CYNTHIA",
    "ANGELA",
    "MELISSA",
    "BRENDA",
    "AMY",
    "ANNA",
    "REBECCA",
    "VIRGINIA",
    "KATHLEEN",
    "PAMELA",
    "MARTHA",
    "DEBRA",
    "AMANDA",
    "STEPHANIE",
    "CAROLYN",
    "CHRISTINE",
    "MARIE",
    `JANET`,
    `CATHERINE`,
    `FRANCES`,
    `ANN`,
    `JOYCE`,
    `DIANE`,
    "ALICE",
    `JULIE`,
    "HEATHER",
    "TERESA",
    "DORIS",
    "GLORIA",
    "EVELYN",
    "JEAN",
    "CHERYL",
    "MILDRED",
    "KATHERINE",
    "JOAN",
    "ASHLEY",
]