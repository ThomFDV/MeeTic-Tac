'use strict';

const express = require("express");
const MatchController = require("../controllers/match");
const GetStats = require("../services/getStats");
const router = express.Router();

router.post("/create", MatchController.create);
router.get("/stats", passport.authenticate('jwt', { session: false }), GetStats.getStats);

module.exports = router;
