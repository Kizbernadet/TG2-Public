const mysql = require('mysql2/promise');
require('dotenv').config({  path:  '../.env' }); // Charge les variables d'environnement

/*
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***' : '(vide)');
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);
*/
// Création du pool de connexions
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10, // Nombre maximum de connexions dans le pool
  queueLimit: 0// Pas de limite pour la file d'attente
 });

// Vérification de la connexion au pool
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connexion au pool de la base de données réussie !');
    connection.release(); // Libère la connexion pour qu'elle soit réutilisée
  } catch (err) {
    console.error('❌ Erreur de connexion à la base de données :', err.message);
  }
})();
// Exporter le pool pour l'utiliser dans d'autres fichiers
module.exports = pool;