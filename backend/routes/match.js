'use strict';

const express = require("express");
const MatchController = require("../controllers/match");
const router = express.Router();

router.post("/create", MatchController.create);

module.exports = router;
