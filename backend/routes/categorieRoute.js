const express = require('express');
const router = express.Router();
const categorieControlleur = require('../controlleurs/categorieControlleur');

// Route pour récupérer tous les agents
router.get('/', categorieControlleur.getAllCategories);

module.exports = router;