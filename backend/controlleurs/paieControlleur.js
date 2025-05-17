// pour une fiche individuel

const paieService = require('../services/paieService');

exports.generateIndividual = async (req, res) => {
  try {
    const { agentId } = req.params;
    const fiche = await paieService.generateFicheIndividuelle(agentId);
    res.status(201).json(fiche);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la génération", erreur: error.message });
  }
};
