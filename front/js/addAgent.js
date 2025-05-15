const params = new URLSearchParams(window.location.search);
const categorieId = params.get('categorieId');
console.log('categorieId récupéré :', categorieId);

let employes = [];
let currentPage = 1;
const agentsPerPage = 5; // À adapter selon ton besoin
const colonnes = [ "nom", "prenom", "diplome", "salaire_base", "date_recrutement"]; // À adapter selon ta table

// Récupère les agents de la catégorie depuis l'API
async function fetchAgents() {
  if (!categorieId) {
  alert("Aucune catégorie sélectionnée !");
  return;
}
  const response = await fetch(`http://localhost:3000/api/agents?categorieId=${categorieId}`);
  employes = await response.json();
  console.log("Agents récupérés :", employes);
}

// Efface le contenu du tableau
function clearTable() {
  const tbody = document.querySelector("#agent-table tbody");
  if (tbody) tbody.innerHTML = "";
}

// Affiche les agents sur la page courante
function loadAgents(pageAgents) {
  const tbody = document.querySelector("#agent-table tbody");
  if (!tbody) return;

  pageAgents.forEach(agent => {
    const tr = document.createElement("tr");
    tr.setAttribute("data-id", agent.id);

    // Respecte l'ordre des colonnes du tableau HTML
    const tdNom = document.createElement("td");
    tdNom.textContent = agent.nom || "";
    tr.appendChild(tdNom);

    const tdPrenom = document.createElement("td");
    tdPrenom.textContent = agent.prenom || "";
    tr.appendChild(tdPrenom);

    const tdDiplome = document.createElement("td");
    tdDiplome.textContent = agent.diplome || "";
    tr.appendChild(tdDiplome);

    const tdSalaire = document.createElement("td");
    tdSalaire.textContent = agent.salaire_base !== undefined ? agent.salaire_base : "";
    tr.appendChild(tdSalaire);

    const tdDate = document.createElement("td");
    if (agent.date_recrutement) {
      // Formatage simple (YYYY-MM-DD)
      const date = new Date(agent.date_recrutement);
      tdDate.textContent = date.toLocaleDateString('fr-FR');
    } else {
      tdDate.textContent = "";
    }
    tr.appendChild(tdDate);

    tr.style.cursor = "pointer";
    tr.addEventListener("click", () => {
      window.location.href = `profil.html?agentId=${agent.id}`;
    });
    tbody.appendChild(tr);
  });
}

// Gère la pagination
function loadPage(pageNumber) {
  const totalPages = Math.ceil(employes.length / agentsPerPage);
  if (pageNumber < 1 || pageNumber > totalPages) return;

  currentPage = pageNumber;
  const start = (currentPage - 1) * agentsPerPage;
  const end = start + agentsPerPage;
  const pageAgents = employes.slice(start, end);

  clearTable();
  loadAgents(pageAgents);


  // Met à jour l'affichage de la pagination (optionnel)
  // document.getElementById("page-info").textContent = `Page ${currentPage} / ${totalPages || 1}`;
}

// Initialisation au chargement de la page
window.onload = async () => {
  // Boutons de pagination
  const prevButton = document.getElementById("before-btn");
  const nextButton = document.getElementById("next-btn");

  prevButton.addEventListener("click", () => {
    loadPage(currentPage - 1);
  });

  nextButton.addEventListener("click", () => {
    loadPage(currentPage + 1);
  });

  await fetchAgents();
  loadPage(1);
};