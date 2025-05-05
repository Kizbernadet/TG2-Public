// Importation du module mysql2 qui permet de se connecter à une base MySQL 
// version avec promesses
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: '',//data base name
  waitForConnections: true, // Attend une connexion libre si le pool est plein
  connectionLimit: 10,// Nombre maximum de connexions en parallèle
   queueLimit: 0 //0 signifie aucune limite de file d’attente
});

// Exportation du pool pour l'utiliser ailleurs dans l'application
module.exports = pool;