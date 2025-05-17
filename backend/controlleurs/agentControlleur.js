const agentService = require('../services/agentService');

// Contrôleur pour récupérer tous les agents
exports.getAllAgents = async (req, res) => {
     try {
        const { categorieId } = req.query;
        const agents = await agentService.getAllAgents(categorieId);
        res.json(agents);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération des agents', error: err.message });
    }
};

// Contrôleur pour récupérer un agent spécifique
exports.getAgentById = async (req, res) => {
  try {
    const agent = await agentService.getAgentById(req.params.id);
    res.json(agent);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Controlleur pour récupérer du profil d'un agent spécifique
exports.getAgentProfil = async (req, res) => {
  try {
    const agentId = req.query.agentId;
    const profil = await agentService.getAgentProfil(agentId);
    res.json(profil);
  } catch (err) {
    console.error('Erreur dans getAgentProfil:', err);
    res.status(404).json({ message: err.message });
  }
};

// Controlleur pour récupérer les donnees
exports.checkFichePaie = async (req, res) => {
  try {
    const { agentId, mois, annee } = req.query;
    const exists = await agentService.checkFichePaie(agentId, mois, annee);
    res.json({ exists });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};