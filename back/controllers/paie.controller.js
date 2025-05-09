const PaieService = require('../services/paie.service.js');

// Générer les fiches de paie par catégorie
exports.generatePaieByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const result = await PaieService.generateByCategory(categoryId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la génération des fiches", error });
  }
};

// Générer une fiche individuelle
exports.generateIndividualPaie = async (req, res) => {
  try {
    const { agentId } = req.params;
    const result = await PaieService.generateIndividual(agentId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Erreur de génération de fiche individuelle", error });
  }
};

// Voir les fiches d’un agent
exports.getPaiesByAgent = async (req, res) => {
  try {
    const { agentId } = req.params;
    const result = await PaieService.getByAgent(agentId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Erreur de récupération des fiches", error });
  }
};

// Voir la table selon les critères (mois, catégorie)
exports.getPaiesByCriteria = async (req, res) => {
  try {
    const { mois, categorieId } = req.query;
    const result = await PaieService.getByCriteria(mois, categorieId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Erreur de récupération", error });
  }
};
