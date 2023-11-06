fetch("http://localhost:5678/api/categories")
.then(res => res.json)
.then(data => console.log(data))