const db = require('../models/db.js');
const paieServices = require("../services/paieService.js");

// Générer les fiches de paies par catégorie
exports.generateByCategory = async (req, res) => {
  try {
    const { categorie, paie_month, paie_year } = req.body;

    // Appel au service
    const result = await paieServices.generateByCategory(categorie, paie_month, paie_year);

    // Log de contrôle
    console.log("Contrôleur - Demande reçue :", { categorie, paie_month, paie_year });
    console.log("Contrôleur - Résultat :", result);

    // Réponse envoyée au front
    res.status(200).json({
      message: "Fiches générées avec succès",
      data: result // { fichesCreees, fichesExistantes, fichesIgnorees }
    });

  } catch (error) {
    console.error("Erreur dans le contrôleur de paie :", error);
    res.status(500).json({ error: "Erreur serveur lors de la génération des fiches" });
  }
};