const db = require('../models/db.js'); // Connexion à la base PostgreSQL

// Fonction : récupérer toutes les catégories 
const categorieService = require('../services/categorieService.js');

exports.getAllCategories = async (req, res) => {
    try{
        const categories = await categorieService.getAll();
        res.status(200).json({categories});

    } catch(error){
        console.error("Erreur de récupération categories : ", error);
        res.status(500).json({error : "Erreur serveur"})
    }
}