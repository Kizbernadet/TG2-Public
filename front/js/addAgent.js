const { addClass } = require("@splidejs/splide/src/js/utils");

const agents = [
    { id: "AG01", nom: "Sow Binta", poste: "Caissière" },
    { id: "AG02", nom: "Diallo Amadou", poste: "Responsable" },
    { id: "AG03", nom: "Ba Mamadou", poste: "Agent" }
  ];
  
  function loadAgents() {
    const tbody = document.querySelector("#agentTable tbody");
    agents.forEach(agent => {
      const row = document.createElement("tr");
      row.classList.add("table-row");
  
      row.innerHTML = `
        <td>${agent.id}</td>
        <td>${agent.nom}</td>
        <td>${agent.poste}</td>
        <td>
          <button onclick="voirProfil('${agent.id}')">Profil</button>
          <button onclick="genererFiche('${agent.id}')">Fiche de paie</button>
        </td>
      `;
  
      tbody.appendChild(row);
    });
  }
  
  function voirProfil(id) {
    alert(`Voir le profil de ${id}`);
    // Redirection ou affichage du profil
  }
  
  function genererFiche(id) {
    alert(`Génération de la fiche de paie pour ${id}`);
    // Appel à une API ou calcul local
  }
  
  window.onload = loadAgents;
  