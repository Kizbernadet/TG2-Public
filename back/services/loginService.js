const pool = require('../models/db'); // ta connexion pg
const bcrypt = require('bcrypt');

async function authenticate(matricule, password) {
  const result = await pool.query(
    `SELECT c.*, r.code FROM comptes c
     JOIN roles r ON c.id_role = r.id
     WHERE c.matricule = $1`,
    [matricule]
  );

  if (result.rows.length === 0) {
    throw new Error('Matricule incorrect');
  }

  const compte = result.rows[0];
  const valid = await bcrypt.compare(password, compte.password);

  if (!valid) {
    throw new Error('Mot de passe incorrect');
  }

  // Retourne les infos utiles (sans le mot de passe)
  return {
    id: compte.id,
    matricule: compte.matricule,
    role: compte.nom_role,
  };
}

module.exports = { authenticate };
