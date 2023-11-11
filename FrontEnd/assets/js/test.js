//récupérer les containers dans le HTML
const workContainer = document.getElementById("gallerie")
const buttonContainer = document.getElementById("filtres")

async function getElements() {
    //récupération des travaux de l'architecte
    let works
    let buttons
    const workData = await fetch('http://localhost:5678/api/works')
    const buttonData = await fetch('http://localhost:5678/api/categories')
    //mets les données dans la variable/objet "works"
    works = await workData.json()
    console.log(works)
    //création des différents éléments liés aux travaux
    works.forEach(element => {
       let workFigure = document.createElement("figure")
       let workImage = document.createElement("img")
       let workTag = document.createElement("figcaption")
       workFigure.classList.add(`categorie-${element.categoryId}`)
       workImage.src = element.imageUrl
       workTag.innerText = element.title
       workContainer.appendChild(workFigure)
       workFigure.appendChild(workImage)
       workFigure.appendChild(workTag)
    });
    //mets les données dans la variable/objet "buttons"
    buttons = await buttonData.json()
    console.log(buttons)
    //récupération de la gallerie
    let workFilter = document.querySelectorAll("#gallerie figure")
    //création du filtre "tous"
    let filterAll = document.createElement("button")
    filterAll.innerText = "Tous"
    filterAll.addEventListener("click", () => {
        workFilter.forEach(element => {
            element.classList.remove("display-none")
        })
    })
    buttonContainer.appendChild(filterAll)
    //création des autres boutons et eventlisteners
    buttons.forEach(element => {
        let button = document.createElement("button")
        button.innerText = element.name
        button.classList.add(`categorie-${element.id}`)
        button.addEventListener("click", () => {
            let buttonFilter = button.className
            console.log(workFilter)
            console.log(buttonFilter)
            workFilter.forEach(element => {
                element.classList.remove("display-none")
            })
            workFilter.forEach(element => {
                if (element.className == buttonFilter) {
                    console.log(element)
                } else {
                    element.classList.add("display-none")
                }
            })
        })
        buttonContainer.appendChild(button)
    });
}
getElements()