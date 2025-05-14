// === 🔧 Sélection des éléments DOM et variables ===
const table_body = document.querySelector("#agentTable tbody");
const categoryName = document.querySelector('#categoryName');
const btnPrev = document.querySelector("#before-btn");
const btnNext = document.querySelector("#next-btn");

let currentPage = 1;
const agentsPerPage = 10;

// === 🧽 Nettoie le tableau HTML avant rechargement ===
function clearTable() {
  let firstChild;
  while ((firstChild = table_body.firstChild)) {
    table_body.removeChild(firstChild);
  }
}

// Ajoute de la nom de la categorie sur le titre de la page 
function addCategoryName(categoryName){
  const span = document.querySelector("#categoryName span");
  span.textContent = `${categoryId}`
}

// === 📦 Remplit le tableau avec une liste d'agents ===
function loadAgents(agentList) {
  console.log(agentList);
  // agentList.forEach(agent => {
  //   const line = document.createElement("tr");
  //   line.classList.add("table-row");

  //   colonnes.forEach(key => {
  //     const td = document.createElement("td");

  //     if (key === "id") {
  //       td.classList.add("agentId");
  //       const link = document.createElement("a");
  //       link.setAttribute("href", "profil.html");
  //       link.classList.add("agent-id");
  //       link.textContent = agent[key];
  //       td.appendChild(link);
  //     } else {
  //       td.textContent = agent[key];
  //     }

  //     line.appendChild(td);
  //   });

  //   table_body.appendChild(line);
  // });
}

// === 📄 Charge une page spécifique d'agents ===
// function loadPage(pageNumber) {
//   const totalPages = Math.ceil(employes.length / agentsPerPage);
//   if (pageNumber < 1 || pageNumber > totalPages) return;

//   currentPage = pageNumber;
//   const start = (currentPage - 1) * agentsPerPage;
//   const end = start + agentsPerPage;
//   const pageAgents = employes.slice(start, end);

//   clearTable();
//   loadAgents(pageAgents);

//   // Complète avec des lignes vides si besoin
//   const missingRows = agentsPerPage - pageAgents.length;
//   for (let i = 0; i < missingRows; i++) {
//     const line = document.createElement("tr");
//     line.classList.add("table-row");

//     colonnes.forEach(() => {
//       const td = document.createElement("td");
//       td.textContent = "N/A";
//       line.appendChild(td);
//     });

//     table_body.appendChild(line);
//   }

//   updateButtonState(totalPages);
// }

// === 🔁 Active/désactive les boutons de pagination ===
// function updateButtonState(totalPages) {
//   btnPrev.disabled = currentPage === 1;
//   btnPrev.classList.toggle("disabled", currentPage === 1);

//   btnNext.disabled = currentPage === totalPages;
//   btnNext.classList.toggle("disabled", currentPage === totalPages);
// }

// === 🌐 Récupère les agents de la catégorie sélectionnée ===
document.addEventListener("DOMContentLoaded", async () => {
  const categoryId = localStorage.getItem("selectedCategoryId");

  if (!categoryId) {
    console.error("Catégorie non sélectionnée.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/agents/by-category/${categoryId}`);
    const data = await response.json();

    // On suppose que data.agents contient un objet → on convertit en tableau
    employes = Object.values(data.agents);
    keys = Object.keys(data.agents);
    console.log(typeof employes, typeof keys);

    // loadPage(currentPage); // Chargement de la première page
  } catch (error) {
    console.error("Erreur lors de la récupération des agents :", error);
  }
});

// === 🚀 Initialisation des boutons au chargement ===
// window.onload = () => {
//   btnPrev.addEventListener("click", () => loadPage(currentPage - 1));
//   btnNext.addEventListener("click", () => loadPage(currentPage + 1));
// };
