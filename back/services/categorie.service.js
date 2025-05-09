const db = require('../models/db.js');

// Récupère toutes les catégories ave leur bonus et seuils associé
exports.getAll = async () => {
    const result = await db.query(
    `
        SELECT cat.nom, s.montant as seuil,  cat.bonus_pourcentage as bonus 
        FROM categories as cat
        JOIN agents as a ON a.id_categorie = cat.id
        JOIN avoir as av ON av.id_categorie = a.id
        JOIN seuils as s ON av.id_seuil = s.id
    `
    );
    
    return result.rows
}