const express = require('express');
const router = express.Router();
const paieContolleur = require('../controlleurs/paieControlleur');

router.post('/fiche/individuelle/:agentId', paieContolleur.generateIndividual);

module.exports = router;














