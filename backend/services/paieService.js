const db = require('../models/db.js'); // Connexion MySQL
const moment = require('moment');

exports.generateFicheIndividuelle = async (agentId) => {
  const mois = moment().month() + 1; // de 1 à 12
  const annee = moment().year();

  /* 1. Récupérer l'agent
  const [agentRows] = await db.query("SELECT * FROM agent WHERE id = ?", [agentId]);
  if (agentRows.length === 0) throw new Error("Agent non trouvé");

  const agent = agentRows[0];
*/
  // 2. Récupérer le bonus de sa catégorie
  const [categorieRows] = await db.query("SELECT bonus_pourcentage FROM categorie WHERE id = ?", [agent.id_categorie]);
  const bonusPourcentage = categorieRows[0]?.bonus_pourcentage || 0;

  // 3. Récupérer le chiffre d'affaires de l'agent pour ce mois
  const [chiffreRows] = await db.query(
    `SELECT SUM(montant) AS total FROM chiffre_affaire 
     WHERE id_agent = ? AND MONTH(date) = ? AND YEAR(date) = ?`,
    [agentId, mois, annee]
  );
  const totalCA = chiffreRows[0]?.total || 0;

  // 4. Calculer le bonus et net à payer
  const bonus = totalCA * bonusPourcentage;
  const netAPayer = agent.salaire_base + bonus;

  // 5. Insérer la fiche dans la base
  const [result] = await db.query(
    `INSERT INTO fiche_paie (id_agent, montant_base, bonus, total_paie, mois)
     VALUES (?, ?, ?, ?, ?)`,
    [agentId, agent.salaire_base, bonus, netAPayer, mois]
  );

  return {
    id: result.insertId,
    agent: `${agent.nom} ${agent.prenom}`,
    salaire_base: agent.salaire_base,
    bonus,
    net_a_payer: netAPayer,
    mois
  };
};
