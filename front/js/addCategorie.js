// Variables Utilisées
const categorie_grid = document.querySelector(".categorie-grid");
const api_url = "http://localhost:3000/api/categories";
const button = document.querySelectorAll(".view-button");


function sendCategoryId(){

}
function loadCategorie(objects){
    for (item in objects){
        const data = objects[item];
        const key_list = Object.keys(data);
        const values = Object.values(data)
        values.splice(0, 1);
        key_list.splice(0, 1)

        const container = document.createElement("div");
        container.classList.add("categorie-card");
        container.id = data.id;

        const content = document.createElement("div");
        content.classList.add("content");
        
        for (key of key_list){
            let value_index = key_list.indexOf(key);

            const li = document.createElement('li');
            li.classList.add(`${key}`)
            if (key === "bonus") {
                li.textContent = `${key} : ${values[value_index]} %`;
            }
            else if(key === "nombre_agents") {
                li.textContent = `Agents : ${values[value_index]}`;
            }
            else {
                li.textContent = `${key} : ${values[value_index]}`;
            }
            content.appendChild(li);
        }
        
        container.appendChild(content);

        const button = document.createElement("div");
        button.classList.add("view-button");

        button.textContent = "Voir les agents";

        container.appendChild(button);

        categorie_grid.appendChild(container);
    }
}

document.addEventListener("click", (event) => {
    if (event.target.matches(".view-button")) {
        const categoryCard = event.target.closest(".categorie-card");
        console.log(categoryCard)
        const li = categoryCard.querySelector(".nom");
        const categoryName = li ? li.textContent.split(":")[1].trim() : null;
        const categoryId = categoryCard ? categoryCard.id : null;
        console.log(categoryName)

        const categoryData = {
            id : categoryId, 
            name : categoryName
        }

        if (categoryId) {
            console.log(typeof categoryData);
            localStorage.setItem("selectedCategory", JSON.stringify(categoryData));
            window.open("agents.html"); // ouverture dans un nouvel onglet
        }
    }
});


function init() {
    fetch(api_url)
        .then((response) => response.json())
        .then((data) => {
            loadCategorie(data.categories);
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération des catégories", error);
            const error_message = document.createElement("p");
            error_message.textContent = "Erreur lors du changement";
            categorie_grid.appendChild(error_message);
        });
}

document.addEventListener("DOMContentLoaded", init);
