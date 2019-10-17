'use strict';

const express = require("express");
const CreatorController = require("../controllers/creator");
const router = express.Router();

router.post("/create", CreatorController.create);

module.exports = router;
