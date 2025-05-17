const db = require('../models/db.js'); // Connexion MySQL

// Récupérer tous les agents
exports.getAllCategories = async () => {
  const [rows] = await db.query(
   `
    SELECT c.id, c.nom, COUNT(a.id_categorie) as nbr_agent, s.montant, ROUND((c.bonus_pourcentage *100),0) as bonus_pourcentage 
    FROM categorie as c 
    JOIN agent as a ON c.id = a.id_categorie
    JOIN avoir as av ON c.id = av.id_categorie
    JOIN seuil as s ON av.id_seuil = s.id
    GROUP BY c.id;
    `
);
  return rows;
};