//récupérer les containers dans le HTML
const workContainer = document.getElementById("gallerie")
const buttonContainer = document.getElementById("filtres")
const modalImages = document.getElementById("modal__image-container")
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
       let modalImageContainer = document.createElement("div")
       let modalImage = document.createElement("img")
       let deleteButton = document.createElement("a")
       let deleteButtonSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="9" height="11" viewBox="0 0 9 11" fill="none">
       <path d="M2.71607 0.35558C2.82455 0.136607 3.04754 0 3.29063 0H5.70938C5.95246 0 6.17545 0.136607 6.28393 0.35558L6.42857 0.642857H8.35714C8.71272 0.642857 9 0.930134 9 1.28571C9 1.64129 8.71272 1.92857 8.35714 1.92857H0.642857C0.287277 1.92857 0 1.64129 0 1.28571C0 0.930134 0.287277 0.642857 0.642857 0.642857H2.57143L2.71607 0.35558ZM0.642857 2.57143H8.35714V9C8.35714 9.70915 7.78058 10.2857 7.07143 10.2857H1.92857C1.21942 10.2857 0.642857 9.70915 0.642857 9V2.57143ZM2.57143 3.85714C2.39464 3.85714 2.25 4.00179 2.25 4.17857V8.67857C2.25 8.85536 2.39464 9 2.57143 9C2.74821 9 2.89286 8.85536 2.89286 8.67857V4.17857C2.89286 4.00179 2.74821 3.85714 2.57143 3.85714ZM4.5 3.85714C4.32321 3.85714 4.17857 4.00179 4.17857 4.17857V8.67857C4.17857 8.85536 4.32321 9 4.5 9C4.67679 9 4.82143 8.85536 4.82143 8.67857V4.17857C4.82143 4.00179 4.67679 3.85714 4.5 3.85714ZM6.42857 3.85714C6.25179 3.85714 6.10714 4.00179 6.10714 4.17857V8.67857C6.10714 8.85536 6.25179 9 6.42857 9C6.60536 9 6.75 8.85536 6.75 8.67857V4.17857C6.75 4.00179 6.60536 3.85714 6.42857 3.85714Z" fill="white"/>
       </svg>`
       //ici les éléments de la page d'accueil
       workFigure.classList.add(`categorie-${element.categoryId}`)
       workImage.src = element.imageUrl
       workTag.innerText = element.title
       //ici les éléments de la modale
       modalImage.src = element.imageUrl
       modalImageContainer.classList.add("modal__image-wrapper")
       deleteButton.innerHTML = deleteButtonSVG
       deleteButton.classList.add("modal__delete-button")
       deleteButton.id = element.id
       deleteButton.addEventListener("click", (event) => {
        fetch(`http://localhost:5678/api/works/${deleteButton.id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${userToken}`
            },
        })
        .then(res => res.json())
        .then(data => console.log(data))
        deleteElements()
        setTimeout(() => {
            getElements()
        }, 100)
        event.preventDefault()
       })

       //ici on place les éléments dans leurs containers
       workContainer.appendChild(workFigure)
       modalImageContainer.appendChild(modalImage)
       modalImageContainer.appendChild(deleteButton)
       modalImages.appendChild(modalImageContainer)
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
    filterAll.classList.add("button-highlight")
    filterAll.addEventListener("click", () => {
        workFilter.forEach(element => {
            let removeHighlight = document.querySelectorAll("#filtres button")
            removeHighlight.forEach(element => {
                if(element.classList.contains("button-highlight")) {
                    element.classList.remove("button-highlight")
                }
            })
            filterAll.classList.add("button-highlight")
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
            let removeHighlight = document.querySelectorAll("#filtres button")
            removeHighlight.forEach(element => {
                if(element.classList.contains("button-highlight")) {
                    element.classList.remove("button-highlight")
                }
            })
            button.classList.add("button-highlight")
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

//Vérification de si l'utilisateur est connecté ou non
let isUserConnected = localStorage.getItem("connected")
let userToken = localStorage.getItem("token")
console.log(userToken)
console.log(`connected = ${isUserConnected}`)
if (isUserConnected == "true") {
    let loginButton = document.getElementById("login-button")
    document.getElementById("filtres").style.display = "none"
    loginButton.innerText = "Logout"
    loginButton.href = "#"
    loginButton.addEventListener("click", () => {
        localStorage.removeItem("connected")
        localStorage.removeItem("token")
        location.reload()
    })
    //on fait apparaît le bouton déclencheur de la modale
    let modalButtonContainer = document.querySelector(".modal-button")
    let modalButton = document.querySelector(".modal-button__link")
    let modal = document.querySelector(".modal-container")
    modalButtonContainer.style.display ="inline-block"
    modalButton.addEventListener("click", (event) => {
        modal.style.visibility = "visible"
        event.preventDefault()
        let modalTriggers = document.querySelectorAll(".modal-trigger")
        console.log(modalTriggers)
        modalTriggers.forEach((element) => {
            element.addEventListener("click", (event) => {
                modal.style.visibility = "hidden"
                event.preventDefault()
            })
        })
    })
}
//On fait en sorte que les boutons de la modale soient fonctionnels
let addPicButton = document.querySelector(".modal__addpic-button")
let modalPicsSection = document.getElementById("modal__pics-section")
let modalBackArrow = document.querySelector(".modal__arrow-back")
addPicButton.addEventListener("click", () => {
    modalPicsSection.classList.add("modal-move-left")
})
modalBackArrow.addEventListener("click", (event) => {
    modalPicsSection.classList.remove("modal-move-left")
    event.preventDefault()
})
//On fait apparait une prévisualisation de l'image sélectionnée
let uploadButton = document.getElementById("choose-pic")
let uploadLabel = document.querySelector(".input-file-label")
let textPic = document.querySelector(".text-pic")
let chosenPic = document.getElementById("chosen-pic")
let svgPic = document.querySelector(".form-pic-section svg")

uploadButton.onchange = () => {
    let reader = new FileReader()
    reader.readAsDataURL(uploadButton.files[0])
    console.log(uploadButton.files[0])
    reader.onload = () => {
        svgPic.style.display = "none"
        uploadLabel.classList.add("input-label-hidden")
        textPic.style.display = "none"
        chosenPic.setAttribute("src", reader.result)
    }
}

//Récupérer les infos du formulaire et fetch POST
const workForm = document.querySelector(".form-add-work")
let workTitle = document.getElementById("work-title")
let workCategory = document.getElementById("choix-categorie")
let workSubmitButton = document.getElementById("addwork-submit-button")

workForm.oninput = () => {
    if (workTitle.value && workCategory.value != 0 && uploadButton.files[0]) {
        workSubmitButton.disabled = false
    } else {
        workSubmitButton.disabled = true
    }
}
//envoie d'un nouveau travail à l'API
function postWork() {
    const formData = new FormData()
    formData.append("image", uploadButton.files[0])
    formData.append("title", workTitle.value)
    formData.append("category", workCategory.value)
    console.log(formData)
    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${userToken}`,
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => console.log(data))
    .catch(error => console.log("ERROR"))
}
//supprimer tous les éléments avant de les recharger
async function deleteElements() {
    workContainer.innerHTML = ""
    modalImages.innerHTML = ""
}

workForm.addEventListener("submit", (event) => {
    event.preventDefault()
    postWork()
    deleteElements()
    setTimeout(() => {
        getElements()
    }, 100)
})