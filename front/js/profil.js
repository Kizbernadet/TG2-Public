// front/js/profil.js
const params = new URLSearchParams(window.location.search);
const agentId = params.get('agentId');

async function loadProfil() {
  if (!agentId) return;
  const response = await fetch(`http://localhost:3000/api/agents/profil?agentId=${agentId}`);
  const agent = await response.json();
  console.log('Agent reçu :', agent);

  // Mets à jour le HTML avec les infos reçues
  const infoList = document.querySelector('.profile-info');
  if (!infoList) {
    console.error('Élément .profile-info introuvable');
    return;
  }
  infoList.innerHTML = `
    <li><i class="fa fa-user"></i><span>Nom :</span> ${agent.nom} ${agent.prenom}</li>
    <li><i class="fa fa-briefcase"></i><span>Catégorie :</span> ${agent.categorie}</li>
    <li><i class="fa fa-calendar-alt"></i><span>Date d'entrée :</span> ${new Date(agent.date_recrutement).toLocaleDateString('fr-FR')}</li>
    <li><i class="fa fa-money-bill-wave"></i><span>Salaire de base :</span> ${agent.salaire_base} F</li>
    <li><i class="fa fa-chart-line"></i><span>Seuil de performance :</span> ${agent.montant} F</li>
    <li><i class="fa fa-gift"></i><span>Bonus :</span> ${agent.bonus_pourcentage} %</li>
    <li>
    <i class="fa fa-circle" style="color:${agent.statut == 1 ? 'green' : 'red'};"></i>
    <span>Statut :</span> ${agent.statut == 1 ? 'Actif' : 'Désactivé'}
  </li>
  `;
}

window.onload = loadProfil;