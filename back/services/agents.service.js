// services/agents.service.js

const db = require('../models/db.js');

exports.fetchAllAgents = async () => {
  const result = await db.query('SELECT * FROM agents ORDER BY id');
  return result.rows; // .rows si tu es bien avec PostgreSQL
};

exports.getByCategory = async (categoryId) => {
  const result = await db.query(
    ` 
      SELECT
      id, nom, prenom, 
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

