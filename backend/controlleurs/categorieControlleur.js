const categorieService = require('../services/categorieService');

// Contrôleur pour récupérer tous les agents
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categorieService.getAllCategories();
    res.json(categories);
  } catch (err) {
    console.error('Erreur lors de la récupération des agents :', err.message);
    res.status(500).json({ message: 'Erreur lors de la récupération des agents', error: err.message });
  }
};
