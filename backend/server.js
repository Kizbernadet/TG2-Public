// server.js

// 1. Charger les variables d’environnement
require('dotenv').config('env');

// 2. Importer Express et CORS
const express = require('express');
const cors = require('cors');

// 3. Créer l’app Express
const app = express();

// 4. Middlewares de base
app.use(cors()); // Pour autoriser les appels depuis le front
app.use(express.json()); // Pour parser le JSON des requêtes

// 5. Importer la connexion à la base (MySQL)
const db = require('./models/db.js');

// 6. Route de test pour la base de données
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS solution');
    res.json({ message: 'Connexion réussie à la base de données', solution: rows[0].solution });
  } catch (err) {
    console.error('Erreur lors de la connexion à la base de données :', err.message);
    res.status(500).json({ message: 'Erreur de connexion à la base de données', error: err.message });
  }
});

// 7. Importer et utiliser les routes
const agentRoute = require('./routes/agentRoute');
app.use('/api/agents', agentRoute);

const paieRoute = require('./routes/paieRoute');
app.post('/api/paie', paieRoute);

const categorieRoute = require('./routes/categorieRoute');
app.use('/api/categories', categorieRoute);



// 8. Gestion des 404
app.use((req, res) => {
  res.status(404).json({ message: 'Ressource non trouvée' });
});

// 9. Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});