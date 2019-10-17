'use strict';

const express = require("express");
const passport = require("passport");
const config = require("../config/passport");
const WatchController = require("../controllers/watch");
const router = express.Router();

router.post('/create', WatchController.create);
router.post('/getOne', WatchController.getOne);
router.delete('/reset', passport.authenticate('jwt', { session: false }), WatchController.resetMatches);

module.exports = router;
