const db = require('../models/database.js');

exports.generateByCategory = async (categoryId) => {

    // Récupérer les données nécessaires depuis la base de données , on obtient un élément du type QueryResult 
    const result = await db.query(`
        SELECT 
        agents.id AS agent_id,
        agents.salaire_base,
        ca.montant AS chiffre_affaire,
        ca.date,
        categories.bonus_pourcentage,
        seuils.montant AS seuil
        FROM agents
        JOIN chiffre_affaire ca ON ca.id_agent = agents.id 
        JOIN categories ON agents.id_categorie = categories.id 
        JOIN avoir ON avoir.id_categorie = categories.id
        JOIN seuils ON seuils.id = avoir.id_seuil
        WHERE agents.id_categorie = $1
    `, [categoryId]);
    
    // Créer une liste pour stocker les fiches qui seront créées 
    const fiches = [];

    // 
    for (const row of result.rows) {
        const { agent_id, salaire_base, chiffre_affaire, bonus_pourcentage, seuil, date } = row;

        let bonus = 0;
        if (chiffre_affaire > seuil) {
        bonus = (chiffre_affaire - seuil) * (bonus_pourcentage / 100);
        }

        const salaire_total = salaire_base + bonus;

        // Insertion dans la table paies
        await db.query(`
        INSERT INTO paies (mois, bonus, salaire_total, id_agent)
        VALUES ($1, $2, $3, $4)
        `, [date, bonus, salaire_total, agent_id]);

        fiches.push({
        agent_id,
        mois: date,
        bonus,
        salaire_total
        });
    }

    return {
        message: "Fiches générées avec succès",
        fiches
    };
};


// exports.generateIndividual = async (agentId) => {
//   // Même logique mais pour un seul agent
// };

// exports.getByAgent = async (agentId) => {
//   const result = await db.query('SELECT * FROM paies WHERE id_agent = $1', [agentId]);
//   return result.rows;
// };

// exports.getByCriteria = async (mois, categorieId) => {
//   const result = await db.query(
//     `SELECT p.* FROM paies p JOIN agents a ON p.id_agent = a.id WHERE mois = $1 AND a.id_categorie = $2`,
//     [mois, categorieId]
//   );
//   return result.rows;
// };
