// === 🔧 Sélection des éléments DOM et variables ===
const table_body = document.querySelector("#agentTable tbody");
const btnPrev = document.querySelector("#before-btn");
const btnNext = document.querySelector("#next-btn");

// Liste des keys contenus dans la response de la requête fetch
let colonnes = ["matricule", "nom", "prenom", "diplome", "salaire_base", "date_embauche"];

let currentPage = 1;
const agentsPerPage = 10;

// === 🧽 Nettoie le tableau HTML avant rechargement ===
function clearTable() {
  let firstChild;
  while ((firstChild = table_body.firstChild)) {
    table_body.removeChild(firstChild);
  }
}

// Récupérer l'idenifiant via le matricule 
function getAgentId(matricule){
  const splitted = matricule.split('-');
  console.log(splitted)
  const id = parseInt(splitted[splitted.length - 1], 10);
  return id;
}

// Ajoute de la nom de la categorie sur le titre de la page 
function addCategoryName(categoryName){
  const span = document.querySelector("#categoryName");
  span.textContent = `${categoryName}`
}

// === 📦 Remplit le tableau avec une liste d'agents ===
function loadAgents(agentList) {
  agentList.forEach(agent => {
    const line = document.createElement("tr");
    line.classList.add("table-row");

    colonnes.forEach(key => {
      const td = document.createElement("td");

      if (key === "matricule") {
        td.classList.add("agentId");
        td.textContent = agent[key];
      } else {
        td.textContent = agent[key];
      }

      line.appendChild(td);
    });

    table_body.appendChild(line);
  });
}

// === 📄 Charge une page spécifique d'agents ===
function loadPage(pageNumber) {
  const totalPages = Math.ceil(employes.length / agentsPerPage);
  if (pageNumber < 1 || pageNumber > totalPages) return;

  currentPage = pageNumber;
  const start = (currentPage - 1) * agentsPerPage;
  const end = start + agentsPerPage;
  const pageAgents = employes.slice(start, end);

  clearTable();
  loadAgents(pageAgents);

  // Complète avec des lignes vides si besoin
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

// === 🔁 Active/désactive les boutons de pagination ===
function updateButtonState(totalPages) {
  btnPrev.disabled = currentPage === 1;
  btnPrev.classList.toggle("disabled", currentPage === 1);

  btnNext.disabled = currentPage === totalPages;
  btnNext.classList.toggle("disabled", currentPage === totalPages);
}

// ==== Gestion des évenements ====
document.addEventListener("click", (event) => {
  // ==== Récupérer l'idenfiant d'un agent ====
  if (event.target.matches(".agentId")) {
    event.preventDefault();
    
    const agentMatricule = event.target.textContent;
    const agentId = getAgentId(agentMatricule)
    console.log(agentId)
    localStorage.setItem("selectedAgentId", JSON.stringify({id: agentId}));
    window.location.href = "profile.html"; // ou la page souhaitée
  }

  // ==== Action du bouton Générer les fiches de paies par catégorie ====
  if (event.target.matches("#generate")) {
    const categoryData = JSON.parse(localStorage.getItem("selectedCategory"));
    const categoryId = categoryData?.id;
    const categoryName = categoryData?.name;

    if (!categoryId) {
      alert("Aucune catégorie sélectionnée.");
      return;
    }

    const confirmed = confirm(`⚠️ Voulez-vous vraiment générer les fiches de paie pour la catégorie "${categoryName}" ?`);

    if (!confirmed) return;

    // Envoi de la requête POST au serveur
    // try {
    //   fetch(`http://localhost:3000/api/paie/generate/category/${categoryId}`, {
    //     method: "POST",
    //   })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error("Erreur lors de la génération des fiches.");
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     if (data?.fiches?.length > 0) {
    //       alert(`✅ ${data.fiches.length} fiches générées avec succès !\nExemple :\n- Agent ${data.fiches[0].agent_id}, mois ${data.fiches[0].mois}, salaire ${data.fiches[0].salaire_total}€`);
    //     } else {
    //       alert("⚠️ Aucun agent trouvé pour cette catégorie ou aucun chiffre d'affaires disponible.");
    //     }

    //     console.log("Fiches générées :", data.fiches);
    //   })

    //   .catch(error => {
    //     console.error("Erreur serveur :", error);
    //     alert("❌ Une erreur est survenue lors de la génération.");
    //   });
    // } catch (error) {
    //   console.error("Erreur JS :", error);
    //   alert("❌ Erreur interne.");
    // }
  }
});


// === 🌐 Récupère les agents de la catégorie sélectionnée ===
document.addEventListener("DOMContentLoaded", async () => {
  const categoryData = JSON.parse(localStorage.getItem("selectedCategory"));
  const categoryId = categoryData.id;
  const categoyName = categoryData.name;


  //localStorage.removeItem("selectedCategory")

  if (!categoryId) {
    console.error("Catégorie non sélectionnée.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/agents/by-category/${categoryId}`);
    const data = await response.json();

    // On suppose que data.agents contient un objet → on convertit en tableau
    employes = Object.values(data.agents);

    loadPage(currentPage); // Chargement de la première page
    addCategoryName(categoyName);
  } catch (error) {
    console.error("Erreur lors de la récupération des agents :", error);
  }
});

// === 🚀 Initialisation des boutons au chargement ===
window.onload = () => {
  btnPrev.addEventListener("click", () => loadPage(currentPage - 1));
  btnNext.addEventListener("click", () => loadPage(currentPage + 1));
};
