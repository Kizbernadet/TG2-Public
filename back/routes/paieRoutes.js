const express = require("express");
const router = express.Router();
const paieController = require("../controllers/paieController");

router.post("/generate/category/", paieController.generateByCategory);

module.exports = router;