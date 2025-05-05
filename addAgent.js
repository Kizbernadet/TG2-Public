// Variables utilisées 
const table_body = document.querySelector("#agentTable tbody");
let currentPage = 1;
const agentsPerPage = 10;

const btnPrev = document.querySelector("#before-btn");
const btnNext = document.querySelector("#next-btn");



// base de données fictives pour le test 
const employes = [
  { id: 1, nom: "Alice Traoré", salaire: 350000, bonus: 25000, chiffreAffaire: 1500000, salaireTotal: 375000 },
  { id: 2, nom: "Moussa Diarra", salaire: 400000, bonus: 50000, chiffreAffaire: 2000000, salaireTotal: 450000 },
  { id: 3, nom: "Fatoumata Keita", salaire: 300000, bonus: 15000, chiffreAffaire: 1000000, salaireTotal: 315000 },
  { id: 4, nom: "Ibrahim Coulibaly", salaire: 280000, bonus: 20000, chiffreAffaire: 800000, salaireTotal: 300000 },
  { id: 5, nom: "Nafissatou Koné", salaire: 320000, bonus: 30000, chiffreAffaire: 1200000, salaireTotal: 350000 },
  { id: 6, nom: "Abdoulaye Sissoko", salaire: 270000, bonus: 10000, chiffreAffaire: 600000, salaireTotal: 280000 },
  { id: 7, nom: "Mariama Sangaré", salaire: 360000, bonus: 40000, chiffreAffaire: 1800000, salaireTotal: 400000 },
  { id: 8, nom: "Yacouba Diallo", salaire: 310000, bonus: 25000, chiffreAffaire: 1100000, salaireTotal: 335000 },
  { id: 9, nom: "Aminata Cissé", salaire: 295000, bonus: 18000, chiffreAffaire: 950000, salaireTotal: 313000 },
  { id: 10, nom: "Cheick Sidibé", salaire: 330000, bonus: 27000, chiffreAffaire: 1250000, salaireTotal: 357000 }, 
  { id: 11, nom: "Salimata Traoré", salaire: 340000, bonus: 22000, chiffreAffaire: 1450000, salaireTotal: 362000 },
  { id: 12, nom: "Mahamadou Kanté", salaire: 310000, bonus: 30000, chiffreAffaire: 1000000, salaireTotal: 340000 },
  { id: 13, nom: "Bintou Fofana", salaire: 295000, bonus: 20000, chiffreAffaire: 900000, salaireTotal: 315000 },
  { id: 14, nom: "Ismaël Konaté", salaire: 350000, bonus: 25000, chiffreAffaire: 1300000, salaireTotal: 375000 },
  { id: 15, nom: "Awa Sidibé", salaire: 280000, bonus: 18000, chiffreAffaire: 850000, salaireTotal: 298000 },
  { id: 16, nom: "Seydou Coulibaly", salaire: 330000, bonus: 40000, chiffreAffaire: 1600000, salaireTotal: 370000 },
  { id: 17, nom: "Kadidia Cissé", salaire: 320000, bonus: 15000, chiffreAffaire: 1200000, salaireTotal: 335000 },
  { id: 18, nom: "Bakary Doumbia", salaire: 300000, bonus: 12000, chiffreAffaire: 950000, salaireTotal: 312000 },
  { id: 19, nom: "Aminata Diallo", salaire: 310000, bonus: 17000, chiffreAffaire: 980000, salaireTotal: 327000 },
  { id: 20, nom: "Oumar Sow", salaire: 360000, bonus: 28000, chiffreAffaire: 1500000, salaireTotal: 388000 }, 
  { id: 20, nom: "Oumar Sow", salaire: 360000, bonus: 28000, chiffreAffaire: 1500000, salaireTotal: 388000 }, 
  { id: 20, nom: "Oumar Sow", salaire: 360000, bonus: 28000, chiffreAffaire: 1500000, salaireTotal: 388000 }
];

const colonnes = ["id", "nom", "salaire", "bonus", "chiffreAffaire", "salaireTotal"];

function clearTable() {
  let firstChild;
  while (firstChild = table_body.firstChild) {
    if (firstChild.nodeType === Node.ELEMENT_NODE) {
      table_body.removeChild(firstChild);
    } else {
      // Si ce n'est pas un élément, tu pourrais essayer de le nettoyer
      table_body.removeChild(firstChild);
      console.warn('Nœud non élément trouvé et supprimé');
    }
  }
}



function loadAgents(agentList) {
  agentList.forEach(agent => {
    const line = document.createElement("tr");
    line.classList.add("table-row");

    colonnes.forEach(key => {
      const td = document.createElement("td");

      if(key === "id"){
        td.classList.add("agentId");
        const link = document.createElement("a");
        link.setAttribute("href", 'profil.html');
        link.classList.add("agent-id");
        link.textContent = agent[key]; 
        td.appendChild(link);
        line.appendChild(td);
      }
      else{
        td.textContent = agent[key];
      }

      line.appendChild(td);
    });

    table_body.appendChild(line);
  });
}


function loadPage(pageNumber) {
  const totalPages = Math.ceil(employes.length / agentsPerPage);
  if (pageNumber < 1 || pageNumber > totalPages) return;

  currentPage = pageNumber;
  const start = (currentPage - 1) * agentsPerPage;
  const end = start + agentsPerPage;
  const pageAgents = employes.slice(start, end);

  clearTable();
  loadAgents(pageAgents);

  // Compléter les lignes manquantes pour atteindre agentsPerPage
  const missingRows = agentsPerPage - pageAgents.length;
  for (let i = 0; i < missingRows; i++) {
    const line = document.createElement("tr");
    line.classList.add("table-row");

    // Compléter chaque colonne avec des valeurs par défaut
    colonnes.forEach(() => {
      const td = document.createElement("td");
      td.textContent = "N/A"; // Ou "-" ou toute autre valeur par défaut
      line.appendChild(td);
    });

    table_body.appendChild(line);
  }

  updateButtonState(totalPages);
}


function updateButtonState(totalPages) {
  document.getElementById("before-btn").disabled = currentPage === 1;
  document.getElementById("before-btn").classList.toggle("disabled");

  document.getElementById("next-btn").disabled = currentPage === totalPages;
  document.getElementById("next-btn").classList.toggle("disabled");
}

// Lancement au chargement
// Événement DOM prêt
window.onload = () => {
  const prevButton = document.getElementById("before-btn");
  const nextButton = document.getElementById("next-btn");

  prevButton.addEventListener("click", () => {
    loadPage(currentPage - 1);
  });

  nextButton.addEventListener("click", () => {
    loadPage(currentPage + 1);
  });

  // Chargement initial
  loadPage(currentPage);
};

