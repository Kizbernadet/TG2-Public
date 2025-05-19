// models/paieGenerator.js
const db = require('../models/db.js');

/**
 * Récupère les agents d'une catégorie donnée
 */
async function getAgentsByCategory(categoryId) {
  const result = await db.query(
    `SELECT id FROM agents WHERE id_categorie = $1`,
    [categoryId]
  );
  return result.rows;
}

/**
 * Vérifie si une fiche existe déjà pour un agent à une date donnée
 */
async function ficheExists(agentId, categoryId, month, year) {
  const result = await db.query(
    `SELECT 1 FROM paies p
     JOIN agents a ON a.id = p.id_agent
     WHERE id_agent = $1 AND a.id_categorie = $4
       AND EXTRACT(MONTH FROM date) = $2
       AND EXTRACT(YEAR FROM date) = $3`,
    [agentId, month, year, categoryId]
  );
  return result.rows.length > 0;
}

/**
 * Récupère le chiffre d'affaire d'un agent pour une période donnée
 */
async function getTurnover(agentId, categoryId, month, year) {
  const result = await db.query(
    `SELECT ca.montant
     FROM chiffre_affaire ca
     JOIN agents ON agents.id = ca.id_agent
     WHERE ca.id_agent = $1 AND id_categorie = $2
       AND EXTRACT(MONTH FROM ca.date) = $3
       AND EXTRACT(YEAR FROM ca.date) = $4`,
    [agentId, categoryId, month, year]
  );
  return result.rows.length > 0 ? parseFloat(result.rows[0].montant) : null;
}

/**
 * Récupère les données d'un agent
 */
async function getAgentData(agentId) {
  const result = await db.query(
    `SELECT matricule, salaire_base FROM agents WHERE id = $1`,
    [agentId]
  );
  return result.rows[0];
}

/**
 * Récupère les données de bonus d'une catégorie
 */
async function getCategoryBonus(categoryId) {
  const result = await db.query(
    `SELECT bonus_pourcentage AS bonus, montant
     FROM categories cat
     JOIN avoir ON avoir.id_categorie = cat.id
     JOIN seuils ON avoir.id_seuil = seuils.id
     WHERE cat.id = $1`,
    [categoryId]
  );
  return result.rows[0];
}

/**
 * Insère une fiche de paie dans la base de données
 */
async function insertPaySlip(agentId, matricule, salaireBase, bonus, total, createdDate) {
  await db.query(
    `INSERT INTO paies (date, matricule, salaire_base, bonus, salaire_total, id_agent)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [createdDate, matricule, salaireBase, bonus, total, agentId]
  );
}

/**
 * Génère les fiches pour une catégorie, un mois et une année donnés
 */
exports.generateByCategory = async (categoryId, month, year) => {
  const agents = await getAgentsByCategory(categoryId);

  let fichesCreees = 0;
  let fichesExistantes = 0;
  let fichesIgnorees = 0;

  for (const agent of agents) {
    const alreadyExists = await ficheExists(agent.id, categoryId, month, year);

    if (alreadyExists) {
      fichesExistantes++;
      continue;
    }

    const turnover = await getTurnover(agent.id, categoryId, month, year);

    if (turnover === null) {
      fichesIgnorees++;
      continue;
    }

    const agentData = await getAgentData(agent.id);
    const categoryData = await getCategoryBonus(categoryId);

    const salaireBase = parseFloat(agentData.salaire_base);
    const seuil = parseFloat(categoryData.montant);
    const pourcentage = parseFloat(categoryData.bonus);

    const difference = turnover - seuil;

    if (difference > 0) {
      const bonus = difference * pourcentage;
      const total = bonus + salaireBase;
      const createdDate = new Date();

      await insertPaySlip(agent.id, agentData.matricule, salaireBase, bonus, total, createdDate);
      fichesCreees++;
    } else {
      fichesIgnorees++;
    }
  }

  return {
    fichesCreees,
    fichesExistantes,
    fichesIgnorees
  };
};
