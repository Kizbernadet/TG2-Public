const express = require("express");
const router = express.Router();
const paieController = require("../controllers/paieController");

router.post("/generate/category/", paieController.generateByCategory);

router.post("/generate/individual", paieController.generateForAgent);

router.get("/payslips", paieController.displayAll);


module.exports = router;