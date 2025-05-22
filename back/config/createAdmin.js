const pool = require('../models/db'); // ta connexion pg
const bcrypt = require('bcrypt');

async function createAdminIfNotExists() {
  try {
    // 1. Vérifier si admin existe
    const res = await pool.query(
      "SELECT * FROM comptes WHERE matricule = $1",
      ['SYS-ADMIN-0000']
    );

    if (res.rowCount === 0) {
      // 2. Créer le compte admin

      const plainPassword = 'admin123'; // mot de passe initial (à changer)
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      // Récupérer l'id_role ADMIN (supposons que code='ADMIN')
      const roleRes = await pool.query(
        "SELECT id FROM roles WHERE code = $1",
        ['ADMIN']
      );
      if (roleRes.rowCount === 0) {
        throw new Error("Le rôle ADMIN n'existe pas dans la table roles.");
      }
      const adminRoleId = roleRes.rows[0].id;

      // Insérer le compte admin (le matricule sera généré automatiquement par trigger)
      await pool.query(
        `INSERT INTO comptes (password, id_role) VALUES ($1, $2)`,
        [hashedPassword, adminRoleId]
      );

      console.log("Compte admin créé avec succès !");
    } else {
      console.log("Compte admin déjà existant.");
    }
  } catch (error) {
    console.error("Erreur lors de la création du compte admin :", error);
  }
}


module.exports = createAdminIfNotExists;
