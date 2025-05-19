// services/agents.service.js

const db = require('../models/db.js');

// Affichage de tous les agents
exports.fetchAllAgents = async () => {
  const result = await db.query('SELECT * FROM agents ORDER BY id');
  return result.rows; // .rows si tu es bien avec PostgreSQL
};


// Affichage des agents par catégorie
exports.getByCategory = async (categoryId) => {
  const result = await db.query(
    ` 
      SELECT
      id, nom, 
      prenom, matricule, 
      diplome, TO_CHAR(date_recrutement, 'DD/MM/YYYY') AS date_embauche , 
      salaire_base
      FROM agents WHERE id_categorie = $1
    `,
    [categoryId]
  );

  const rows = result.rows;

  const agentsObject = {};
  rows.forEach(agent => {
    agentsObject[agent.nom] = agent;
  });

  return agentsObject;
};


// Affichage du profil d'un agent
exports.getAgentProfile = async(agentId) => {
  const result = await db.query(
    `
    SELECT
    agents.id, matricule, agents.nom, agents.prenom, 
    TO_CHAR(agents.date_recrutement, 'DD/MM/YYYY') AS date_recrutement, 
    agents.salaire_base, agents.statut, 
    cat.nom as categorie, cat.bonus_pourcentage as bonus, 
    seuils.montant as seuil
    FROM agents
    JOIN categories as cat ON agents.id_categorie = cat.id
    JOIN avoir ON avoir.id_categorie = cat.id
    JOIN seuils ON avoir.id_seuil = seuils.id
    WHERE agents.id = $1
    `, [agentId]);

  // Renvoyer un seul objet agent (ou null s’il n’existe pas)
  return result.rows[0] || null;
}

