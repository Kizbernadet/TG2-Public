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

exports.getAgentProfile = async (req, res) => {
  const agentId = req.params.id;

  if (!agentId) {
    return res.status(400).json({ erreur: "ID de l'agent manquant" });
  }

  try {
    const agent = await agentService.getAgentProfile(agentId);

    if (!agent) {
      return res.status(404).json({ erreur: "Agent non trouvé" });
    }

    res.status(200).json(agent);
  } catch (error) {
    console.error("Erreur récupération des informations de l'agent", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


