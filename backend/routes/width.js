const express = require("express");
const WidthController = require("../controllers/width");
const router = express.Router();

router.post("/create", WidthController.create);

module.exports = router;
