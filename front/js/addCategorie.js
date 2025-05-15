const categorie_grid = document.querySelector(".categorie-grid");
const keys = ["nom", "nbr_agent", "seuil", "bonus_pourcentage"];

async function loadCategorie() {
    // Appel à l'API du back-end
    const response = await fetch('http://localhost:3000/api/categories');
    const categories = await response.json();

    categorie_grid.innerHTML = ""; // Vide l'affichage avant de remplir

    categories.forEach(categorie => {
        const container = document.createElement("div");
        container.classList.add("categorie-card");
        container.id = categorie.id;

        const content = document.createElement("div");
        content.classList.add("content");

        const models_content = {
            id : `ID : ${categorie.id}`, 
            nom : `Nom : ${categorie.nom}`, 
            nbr_agent : `Agents : ${categorie.nbr_agent}`, 
            seuil : `Seuil : ${categorie.montant}`, 
            bonus_pourcentage : `Bonus : ${categorie.bonus_pourcentage} %`, 
        };

        keys.forEach(key => {
            const li = document.createElement("li");
            li.classList.add(`${key}`)
            li.textContent = `${models_content[key]}`;
            content.appendChild(li);
        });

        container.appendChild(content);

        const button = document.createElement("div");
        button.classList.add("view-button")

        const link = document.createElement("a");
        link.setAttribute('href', `categorie_table.html?categorieId=${categorie.id}`);
        link.textContent = "Voir les agents";
        button.appendChild(link);

        container.appendChild(button);

        categorie_grid.appendChild(container);
    });
}

window.onload = loadCategorie;