const db = require('../models/db.js');

// Récupère toutes les catégories avec leur bonus, seuils, et nombre d'agents
exports.getAll = async () => {
  const result = await db.query(`
    SELECT 
      c.id, 
      c.nom, 
      c.bonus_pourcentage AS bonus,
      s.montant AS seuil,
      COUNT(a.id) AS nombre_agents
    FROM categories c
    JOIN avoir av ON av.id_categorie = c.id
    JOIN seuils s ON av.id_seuil = s.id
    LEFT JOIN agents a ON a.id_categorie = c.id
    GROUP BY c.id, c.nom, c.bonus_pourcentage, s.montant
    ORDER BY c.id ASC;
  `);

  const rows = result.rows
  const categoriesObject = {};
  rows.forEach(cat => {
    categoriesObject[cat.nom] = cat;
  });

  return categoriesObject;
};
