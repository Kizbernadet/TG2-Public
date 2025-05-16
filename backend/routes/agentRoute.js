const express = require('express');
const router = express.Router();
const agentControlleur = require('../controlleurs/agentControlleur');

// Route pour récupérer tous les agents
router.get('/', agentControlleur.getAllAgents);

// Route pour le profil
router.get('/profil', agentControlleur.getAgentProfil);

// Route pour récupérer la fiche 
router.get('/check-fiche', agentControlleur.checkFichePaie);

// Route pour récupérer un agent spécifique
router.get('/:id', agentControlleur.getAgentById);

module.exports = router;