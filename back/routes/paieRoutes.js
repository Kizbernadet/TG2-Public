const express = require('express');
const router = express.Router();
const PaieController = require('../controllers/paieController');

router.post('/generate/category/:categoryId', PaieController.generatePaieByCategory);
router.post('/generate/agent/:agentId', PaieController.generateIndividualPaie);
// router.get('/agent/:agentId', PaieController.getPaiesByAgent);
// router.get('/filter', PaieController.getPaiesByCriteria);

module.exports = router;
