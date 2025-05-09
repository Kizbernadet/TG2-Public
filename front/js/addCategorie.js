// Variables Utilisées 
const categorie_grid = document.querySelector(".categorie-grid");

const keys = ["nom", "nbAgents", "salaireBase", "seuil", "bonusPourcent"];
  
function loadCategorie(){
    categories.forEach(categorie => {
        const container = document.createElement("div");
        container.classList.add("categorie-card");
        container.id = categorie.id;

        const content = document.createElement("div");
        content.classList.add("content");

        const models_content = {
            nom : `Nom : ${categorie.nom}`, 
            nbAgents : `Agents : ${categorie.nbAgents}`, 
            salaireBase : `Salaire : ${categorie.salaireBase}`, 
            seuil : `Seuil : ${categorie.seuil}`, 
            bonusPourcent : `Bonus : ${categorie.bonusPourcent} %`, 
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
        link.setAttribute('href', 'categorie_table.html');
        link.textContent = "Voir les agents";
        button.appendChild(link);

        container.appendChild(button);

        categorie_grid.appendChild(container);
    });
}

window.onload = loadCategorie;