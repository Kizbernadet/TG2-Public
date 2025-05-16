const db = require('../models/db.js'); // Connexion MySQL

// Récupérer tous les agents d'une catégorie (ou tous si pas de filtre)
exports.getAllAgents = async (categorieId) => {
    let query = 'SELECT id, nom, prenom, diplome, salaire_base, date_recrutement FROM agent';
    let params = [];
    if (categorieId) {
        query += ' WHERE id_categorie = ?';
        params.push(categorieId);
    }
    const [rows] = await db.query(query, params);
    return rows;
};

// Récupérer un agent spécifique par ID
exports.getAgentById = async (agentId) => {
    const [rows] = await db.query(
      'SELECT * FROM agent WHERE id = ?', [agentId]);
    if (rows.length === 0) {
        throw new Error('Agent non trouvé');
    }
    return rows[0];
};

// Récupérer les donnees d'un agent spécifier par ID
exports.getAgentProfil = async (agentId) => {
  const [rows] = await db.query(
    `SELECT a.id, a.nom, a.prenom, a.date_recrutement, a.salaire_base, c.nom AS categorie, s.montant, 
            ROUND((c.bonus_pourcentage * 100), 0) as bonus_pourcentage, a.statut
     FROM agent as a
     JOIN categorie as c ON a.id_categorie = c.id
     LEFT JOIN avoir as av ON c.id = av.id_categorie
     LEFT JOIN seuil as s ON av.id_seuil = s.id
     WHERE a.id = ?
     GROUP BY a.id`, [agentId]
  );
  if (rows.length === 0) throw new Error('Agent non trouvé');
  return rows[0];
};

// Récupérer les donnes sur l'agent
exports.checkFichePaie = async (agentId, mois, annee) => {
  const [rows] = await db.query(
  `SELECT 1 FROM paie WHERE id_agent = ? AND MONTH(date) = ? AND YEAR(date) = ? LIMIT 1`,
  [agentId, mois, annee]
  )
  return rows.length > 0;
};