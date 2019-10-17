'use strict';

const express = require("express");
const ColorController = require("../controllers/color");
const router = express.Router();

router.post("/create", ColorController.create);

module.exports = router;
