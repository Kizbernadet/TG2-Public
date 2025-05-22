// Variables Utilisées 
let colonnes = ["matricule", "nom", "prenom", "salaire", "salaire_base", "date_embauche"];
let currentPage = 1;
const agentsPerPage = 10;
let employes = []; // Tableau à remplir dynamiquement
const table_body = document.querySelector("#agentTable tbody");
const btnPrev = document.querySelector("#before-btn");
const btnNext = document.querySelector("#next-btn");
const apiUrl = "http://localhost:3000/api/paie/payslips"


// ==== Fonctions Utilitaires 
function clearTable() {
  while (table_body.firstChild) {
    table_body.removeChild(table_body.firstChild);
  }
}

function init() {
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            loadCategorie(data.categories);
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération des fiches", error);
            const error_message = document.createElement("p");
            error_message.textContent = "Erreur lors du changement";
            categorie_grid.appendChild(error_message);
        });
}

// ==== Chargement et Affichage 
function loadAgents(agentList) {
  agentList.forEach(agent => {
    const line = document.createElement("tr");
    line.classList.add("table-row");

    colonnes.forEach(key => {
      const td = document.createElement("td");
      td.textContent = agent[key];
      if (key === "matricule") td.classList.add("agentId");
      line.appendChild(td);
    });

    table_body.appendChild(line);
  });
}

function loadPage(pageNumber) {
  const totalPages = Math.ceil(employes.length / agentsPerPage);
  if (pageNumber < 1 || pageNumber > totalPages) return;

  currentPage = pageNumber;
  const pageAgents = employes.slice((currentPage - 1) * agentsPerPage, currentPage * agentsPerPage);
  clearTable();
  loadAgents(pageAgents);

  const missingRows = agentsPerPage - pageAgents.length;
  for (let i = 0; i < missingRows; i++) {
    const line = document.createElement("tr");
    line.classList.add("table-row");

    colonnes.forEach(() => {
      const td = document.createElement("td");
      td.textContent = "N/A";
      line.appendChild(td);
    });

    table_body.appendChild(line);
  }

  updateButtonState(totalPages);
}


// ==== Gestion des Boutons de navigation 
function updateButtonState(totalPages) {
  btnPrev.disabled = currentPage === 1;
  btnPrev.classList.toggle("disabled", currentPage === 1);
  btnNext.disabled = currentPage === totalPages;
  btnNext.classList.toggle("disabled", currentPage === totalPages);
}


// ==== Initialisation des évenements
btnPrev.addEventListener("click", () => loadPage(currentPage - 1));
btnNext.addEventListener("click", () => loadPage(currentPage + 1));

document.addEventListener("DOMContentLoaded", init);
