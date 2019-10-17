'use strict';

const express = require("express");
const HousingController = require("../controllers/housing");
const router = express.Router();

router.post("/create", HousingController.create);

module.exports = router;
