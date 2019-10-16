const express = require("express");
const BraceletController = require("../controllers/bracelet");
const router = express.Router();

router.post("/create", BraceletController.create);
router.post("/update", BraceletController.update);

module.exports = router;
