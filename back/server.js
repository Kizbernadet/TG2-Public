// server.js

// 1. Charger les variables d’environnement
require('dotenv').config();

// 2. Importer Express et CORS
const express = require('express');
const cors = require('cors');

// 3. Créer l’app Express
const app = express();

// 4. Middlewares de base
app.use(cors());            // Pour autoriser les appels depuis le front
app.use(express.json());    // Pour parser le JSON des requêtes

// 5. Importer la connexion à la base (MySQL ou PostgreSQL)
const db = require('./models/db');  // <-- à créer si non existant

// 6. Routes
const agentRoutes = require('./routes/agents.routes');
const categorieRoutes = require('./routes/categorie.routes');
const PaieController = require('./controllers/paie.controller');

// Routes agents
app.use('/api/agents', agentRoutes);

// Routes catégories
app.use('/api/categories', categorieRoutes);

// Routes paie
app.post('/api/generate/category/:categoryId', PaieController.generatePaieByCategory);
app.post('/api/generate/agent/:agentId', PaieController.generateIndividualPaie);
app.get('/api/agent/:agentId', PaieController.getPaiesByAgent);
app.get('/api/filter', PaieController.getPaiesByCriteria);

// 7. Route de test
app.get('/', (req, res) => {
  res.send('✅ API Mypaie opérationnelle (v1)');
});

// 8. Gestion des 404
app.use((req, res) => {
  res.status(404).json({ message: 'Ressource non trouvée' });
});

// 9. Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
