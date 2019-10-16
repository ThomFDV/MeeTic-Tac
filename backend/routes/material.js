const express = require("express");
const MaterialController = require("../controllers/material");
const router = express.Router();

router.post("/create", MaterialController.create);

module.exports = router;
