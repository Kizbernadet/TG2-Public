// controllers/agents.controller.js

const agentService = require('../services/agents.service.js');

// Contrôleur : récupère les agents depuis le service
exports.getAllAgents = async (req, res) => {
  try {
    const agents = await agentService.fetchAllAgents();
    res.status(200).json({agents});
  } catch (error) {
    console.error('Erreur contrôleur agents :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des agents' });
  }
};


exports.getAgentsByCategory = async (req, res) => {
  const categoryId = req.params.id;

  if (!categoryId) {
    return res.status(400).json({ error: "ID de catégorie manquant" });
  }

  try {
    const agents = await agentService.getByCategory(categoryId);
    res.status(200).json({ agents });
  } catch (error) {
    console.error("Erreur récupération agents :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

