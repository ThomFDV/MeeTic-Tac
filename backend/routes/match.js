'use strict';

const express = require("express");
const passport = require("passport");
const config = require("../config/passport");
const MatchController = require("../controllers/match");
const GetStats = require("../services/getStats");
const router = express.Router();

router.post("/create", MatchController.create);
router.get("/stats", passport.authenticate('jwt', { session: false }), GetStats.getStats);
router.post("/next", MatchController.getNextMatch);
router.delete('/reset', passport.authenticate('jwt', { session: false }), MatchController.resetMatches);

module.exports = router;
