'use strict';

const express = require("express");
const PatternController = require("../controllers/pattern");
const router = express.Router();

router.post("/create", PatternController.create);

module.exports = router;
