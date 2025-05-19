const db = require('../models/db.js');

exports.generateByCategory = async (categoryId, month, year) => {

  //
  const result = await db.query(
    `
    SELECT
      p.id,
      TO_CHAR(p.date, 'MM') AS mois,
      TO_CHAR(p.date, 'YYYY') AS annee,
      p.matricule, p.salaire_base, 
      p.bonus, p.salaire_total, 
      p.id_agent, a.id_categorie
    FROM paies as p 
    JOIN agents a ON a.id = p.id_agent
    JOIN categories cat ON cat.id = a.id_categorie
    WHERE cat.id = $1
    AND EXTRACT(MONTH FROM p.date) = $2
          AND EXTRACT(YEAR FROM p.date) = $3
    `, [categoryId, month, year]
  )

  console.log("rows : ", result);
  // const result = await db.query(`
  //   SELECT 
  //     agents.id AS agent_id,
  //     agents.salaire_base,
  //     ca.montant AS chiffre_affaire,
  //     TO_CHAR(ca.date, 'MM') AS mois,
  //     TO_CHAR(ca.date, 'YYYY') AS annee,
  //     categories.bonus_pourcentage,
  //     seuils.montant AS seuil
  //   FROM agents
  //   JOIN chiffre_affaire ca ON ca.id_agent = agents.id 
  //   JOIN categories ON agents.id_categorie = categories.id 
  //   JOIN avoir ON avoir.id_categorie = categories.id
  //   JOIN seuils ON seuils.id = avoir.id_seuil
  //   WHERE agents.id_categorie = $1 
  //     AND EXTRACT(MONTH FROM ca.date) = $2 
  //     AND EXTRACT(YEAR FROM ca.date) = $3
  // `, [categoryId, month, year]);

  // console.log("Service : ", categoryId, month, year);

//   const fiches = [];

//   for (const row of result.rows) {
//     const {
//       agent_id,
//       salaire_base,
//       chiffre_affaire,
//       bonus_pourcentage,
//       seuil
//     } = row;

//     let bonus = 0;
//     if (chiffre_affaire > seuil) {
//       bonus = (chiffre_affaire - seuil) * (bonus_pourcentage / 100);
//     }

//     const salaire_total = salaire_base + bonus;

//     // Insertion dans la table paies
//     await db.query(`
//       INSERT INTO paies (mois, annee, bonus, salaire_total, id_agent)
//       VALUES ($1, $2, $3, $4, $5)
//     `, [month, year, bonus, salaire_total, agent_id]);

//     fiches.push({
//       agent_id,
//       mois: month,
//       annee: year,
//       bonus,
//       salaire_total
//     });
//   }

//   return {
//     message: "Fiches générées avec succès",
//     fiches
//   };
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



