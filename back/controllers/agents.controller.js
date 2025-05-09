// controllers/agents.controller.js

const agentService = require('../services/agents.service.js');

// Contrôleur : récupère les agents depuis le service
exports.getAllAgents = async (req, res) => {
  try {
    const agents = await agentService.fetchAllAgents();
    res.status(200).json(agents);
  } catch (error) {
    console.error('Erreur contrôleur agents :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des agents' });
  }
};
