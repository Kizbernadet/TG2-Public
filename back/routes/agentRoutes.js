const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController.js');

// Route pour obtenir tous les agents
router.get('/', agentController.getAllAgents);

// Route pour obtenir les agents par catégorie
router.get('/by-category/:id', agentController.getAgentsByCategory);

// Route pour obtenir les informations d'un agent pour son profil via son identifiant 
router.get('/profile/:id', agentController.getAgentProfile);

// Export du routeur avec toutes les routes
module.exports = router;
