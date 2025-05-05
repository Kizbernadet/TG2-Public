const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  //password: '',
  database: 'ecommerce',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

//module.exports = pool;


//const pool = require('./db_connexion'); // Import du pool défini dans db_connexion.js

async function testConnexion() {
  try {
    // Utilisation du pool pour exécuter une requête
    const [rows] = await pool.query('SELECT 1 + 1 AS resultat');

    console.log(' Connexion réussie via pool !');
    console.log('Résultat de la requête :', rows[0].resultat);
  } catch (err) {
    console.error('Erreur de connexion ou de requête :', err.message);
  }
}

testConnexion();