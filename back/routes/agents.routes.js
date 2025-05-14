const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agents.controller.js');

// Route pour obtenir tous les agents
router.get('/', agentController.getAllAgents);

// Route pour obtenir les agents par catégorie
router.get('/by-category/:id', agentController.getAgentsByCategory);

// Export du routeur avec toutes les routes
module.exports = router;
