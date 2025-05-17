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

document.addEventListener('DOMContentLoaded', function() {
  // Remplir la liste des années
  const anneeSelect = document.getElementById('annee');
  if (anneeSelect) {
    for (let y = 2020; y <= 2030; y++) {
      const opt = document.createElement('option');
      opt.value = y;
      opt.textContent = y;
      anneeSelect.appendChild(opt);
    }
  }

  // Afficher le formulaire au centre au clic sur "Générer une fiche"
  const btn = document.querySelector('.addPaySlip');
  const ficheForm = document.getElementById('fiche-form');
  if (btn && ficheForm) {
    btn.addEventListener('click', () => {
      ficheForm.style.display = 'flex';
      // Affiche le formulaire de sélection et masque le message
      const form = ficheForm.querySelector('form');
      const ficheMessage = document.getElementById('fiche-message');
      if (form) form.style.display = 'flex';
      if (ficheMessage) ficheMessage.style.display = 'none';
    });

    // Fermer le formulaire si on clique en dehors ou sur un bouton "Fermer"
    ficheForm.addEventListener('click', (e) => {
      if (e.target === ficheForm) {
        ficheForm.style.display = 'none';
      }
    });
    // Optionnel : bouton fermer dans le formulaire
    const closeBtn = document.getElementById('close-fiche-form');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        ficheForm.style.display = 'none';
      });
    }
  }

  const form = ficheForm ? ficheForm.querySelector('form') : null;
  const ficheMessage = document.getElementById('fiche-message');
  const ficheMessageText = document.getElementById('fiche-message-text');
  const ficheActionBtn = document.getElementById('fiche-action-btn');
  const ficheRetourBtn = document.getElementById('fiche-retour-btn');

  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const mois = document.getElementById('mois').value;
      const annee = document.getElementById('annee').value;
      const params = new URLSearchParams(window.location.search);
      const agentId = params.get('agentId');
      const res = await fetch(`http://localhost:3000/api/agents/check-fiche?agentId=${agentId}&mois=${mois}&annee=${annee}`);
      const data = await res.json();

      // Masque le formulaire de sélection
      form.style.display = 'none';
      // Affiche le "nouveau formulaire" avec message et bouton
      ficheMessage.style.display = 'flex';

      if (data.exists) {
        ficheMessageText.textContent = "La fiche existe déjà.";
        ficheActionBtn.textContent = "Voir";
        ficheActionBtn.onclick = function() {
          window.location.href = `fiches.html?agentId=${agentId}&mois=${mois}&annee=${annee}`;
        };
      } else {
        ficheMessageText.textContent = "La fiche n'existe pas.";
        ficheActionBtn.textContent = "Créer une nouvelle fiche";
        ficheActionBtn.onclick = function() {
          window.location.href = `creer-fiche.html?agentId=${agentId}&mois=${mois}&annee=${annee}`;
        };
      }
    });
  }

  // Gestion du bouton retour (dans le message)
  if (ficheRetourBtn) {
    ficheRetourBtn.onclick = function() {
      ficheMessage.style.display = 'none';
      if (form) form.style.display = 'flex';
    };
  }
});