// === 🔧 Sélection des éléments DOM ===
const table_body = document.querySelector("#agentTable tbody");
const btnPrev = document.querySelector("#before-btn");
const btnNext = document.querySelector("#next-btn");
const generateButton = document.querySelector("#generate");
const closeButton = document.querySelector("#closePopover");
const confirmButton = document.querySelector("#confirmPopover");
const generateRoute = `http://localhost:3000/api/paie/generate/category`;
const functionsBtn = document.querySelector(".functions-buttons");

let colonnes = ["matricule", "nom", "prenom", "diplome", "salaire_base", "date_embauche"];
let currentPage = 1;
const agentsPerPage = 10;

// === 🧩 Fonctions utilitaires ===
function getAgentId(matricule) {
  const splitted = matricule.split("-");
  return parseInt(splitted[splitted.length - 1], 10);
}

function clearTable() {
  while (table_body.firstChild) {
    table_body.removeChild(table_body.firstChild);
  }
}

function addCategoryName(categoryName) {
  document.querySelector("#categoryName").textContent = categoryName;
}

// === 🎛️ Fonctions liées au DOM ===
function showPopover() {
  document.querySelector("#dialog-popover").classList.add("show");
}

function hidePopover() {
  document.querySelector("#dialog-popover").classList.remove("show");
}

function showOrHidePop() {
  document.querySelector("#result-popover").classList.toggle("show");
}

function displayValidPop(object, status) {
  const popover = document.querySelector('#result-popover');

  // Supprime le contenu précédent
  while (popover.firstChild) {
    popover.removeChild(popover.firstChild);
  }

  const title = document.createElement("h3");
  const icon = document.createElement("span");
  icon.style.marginRight = "8px";

  if (status === "valid") {
    icon.textContent = "✅";
    title.textContent = "Operation Effectuée";
    title.prepend(icon);
    popover.appendChild(title);

    const list = document.createElement("ul");
    for (let item in object) {
      const li = document.createElement("li");
      li.textContent = `${item} : ${object[item]}`;
      list.appendChild(li);
    }
    popover.appendChild(list);
  } else {
    icon.textContent = "❌";
    title.textContent = "Operation Non Effectuée";
    title.prepend(icon);
    popover.appendChild(title);

    const paragraph = document.createElement("p");
    paragraph.textContent = "Impossible de joindre le serveur ou l'opération a échoué.";
    popover.appendChild(paragraph);
  }

  const valideBtn = document.createElement("button");
  valideBtn.classList.add("valideBtn");
  valideBtn.textContent = "Fermer";
  valideBtn.setAttribute("onclick", "showOrHidePop()");
  popover.appendChild(valideBtn);
}



// === 📄 Chargement et affichage des agents ===
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

function updateButtonState(totalPages) {
  btnPrev.disabled = currentPage === 1;
  btnPrev.classList.toggle("disabled", currentPage === 1);
  btnNext.disabled = currentPage === totalPages;
  btnNext.classList.toggle("disabled", currentPage === totalPages);
}

// === 🌐 Génération de la paie ===
async function generatePayroll() {
  const month = document.querySelector("#paie_month").value;
  const year = document.querySelector("#paie_year").value;
  const categoryData = JSON.parse(localStorage.getItem("selectedCategory"));
  const categoryId = categoryData?.id;

  if (!categoryId || !month || !year) {
    alert("Veuillez sélectionner une catégorie et renseigner le mois et l'année.");
    return;
  }

  // ⛔ Désactiver le bouton de confirmation et indiquer que c'est en cours
  confirmButton.disabled = true;
  const originalText = confirmButton.textContent;
  confirmButton.textContent = "En cours...";

  try {
    const response = await fetch(generateRoute, {
      method: "POST",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({
        categorie: categoryId,
        paie_month: month,
        paie_year: year 
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur serveur : ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    hidePopover(); // Ferme la pop-up de confirmation
    displayValidPop(data.data, "valid"); // Affiche le pop-up de succès
    showOrHidePop();
  } catch (error) {
    console.error("Erreur lors de la génération :", error);
    hidePopover();
    displayValidPop(null, "invalid");
    showOrHidePop();
  } finally {
    // ✅ Réactivation du bouton avec son texte initial
    confirmButton.disabled = false;
    confirmButton.textContent = originalText;
  }
}



// === 🚀 Initialisation et événements ===
generateButton.addEventListener("click", showPopover);
closeButton.addEventListener("click", hidePopover);
confirmButton.addEventListener("click", generatePayroll);

document.addEventListener("click", (event) => {
  if (event.target.matches(".agentId")) {
    event.preventDefault();
    const agentId = getAgentId(event.target.textContent);
    localStorage.setItem("selectedAgentId", JSON.stringify({ id: agentId }));
    window.location.href = "profile.html";
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const categoryData = JSON.parse(localStorage.getItem("selectedCategory"));
  const categoryId = categoryData?.id;
  const categoryName = categoryData?.name;

  if (!categoryId) {
    console.error("Catégorie non sélectionnée.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/agents/by-category/${categoryId}`);
    const data = await response.json();
    employes = Object.values(data.agents);
    loadPage(currentPage);
    addCategoryName(categoryName);
  } catch (error) {
    console.error("Erreur lors de la récupération des agents :", error);
  }
});

window.onload = () => {
  btnPrev.addEventListener("click", () => loadPage(currentPage - 1));
  btnNext.addEventListener("click", () => loadPage(currentPage + 1));
};
