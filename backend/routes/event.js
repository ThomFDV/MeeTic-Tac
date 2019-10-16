'use strict';

const express = require("express");
const passport = require("passport");
const EventController = require("../controllers/event");

const router = express.Router();

router.post('/create', passport.authenticate('jwt', { session: false }), EventController.createEvent);

module.exports = router;