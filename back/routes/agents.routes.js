// routes/agents.routes.js

const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agents.controller.js');

router.get('/', agentController.getAllAgents);

module.exports = router;
