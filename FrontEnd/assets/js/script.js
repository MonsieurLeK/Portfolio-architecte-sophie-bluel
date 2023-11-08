//Récupération de la gallerie
const gallerie = document.getElementById("gallerie")
//Récupération de la div #filtres
const filtres = document.getElementById("filtres")

//Appel de l'API
async function getWorks() {
    let works = await (await fetch("http://localhost:5678/api/works")).json()
    console.log(works)
//pour chaque élément de works, on créé l'élément HTML correspondant.
    for (let i = 0; i < works.length; i++) {
       let figure = document.createElement("figure")
       let image = document.createElement("img")
       let figcaption = document.createElement("figcaption")
       figure.appendChild(image)
       figure.appendChild(figcaption)
        gallerie.appendChild(figure)
        image.src = works[i].imageUrl
        figcaption.innerText = works[i].title
    }
}
getWorks()
async function getCategories() {
    let categories = await (await fetch("http://localhost:5678/api/categories")).json()
    console.log(categories)
    for (let i = 0; i < categories.length; i++) {
        let button = document.createElement("button")
        button.innerText = categories[i].name
        filtres.appendChild(button)
     }
}
getCategories()