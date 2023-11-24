function connectUser(event) {
    //récupération des valeurs des inputs au submit du form
    let userEmail = document.getElementById("email").value
    let userPassword = document.getElementById("password").value
    let userToken = ""
    if (userEmail == "") {
        console.log("E-mail vide")
    } else {
        console.log(`E-mail: ${userEmail}`)
    }
    if (userPassword == "") {
        console.log("Mot de passe vide")
    } else {
        console.log(`MDP: ${userPassword}`)
    }

    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": `${userEmail}`,
            "password": `${userPassword}`
        })
    })
    .then(res => {
        return res.json()
    })
    .then(data => {
        userToken = data.token
        console.log(userToken)
        //si l'utilisateur a eu un token de connexion, on sauve l'état connecté
        //sur le local storages
        if (userToken) {
            localStorage.setItem("connected", "true")
            localStorage.setItem("token", `${data.token}`)
            document.location.href = "./index.html"
        } else {
            let errorMessage = document.getElementById("error-message")
            errorMessage.classList.replace("display-none", "message-appear")
            document.getElementById("email").classList.add("box-wrong")
            document.getElementById("password").classList.add("box-wrong")
            setTimeout(function() {
                document.getElementById("email").classList.remove("box-wrong")
            document.getElementById("password").classList.remove("box-wrong")
            }, 500)
        }
    })
    .catch(error => console.log("ERROR"))
    event.preventDefault()
}


const form  = document.getElementById("log-in_form")
form.addEventListener("submit", connectUser)
console.log(form)