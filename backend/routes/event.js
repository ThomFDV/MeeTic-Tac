'use strict';

const express = require("express");
const passport = require("passport");
const EventController = require("../controllers/event");

const router = express.Router();

router.post('/create', passport.authenticate('jwt', { session: false }), EventController.createEvent);
router.post('/go/:id', passport.authenticate('jwt', { session: false }), EventController.addParticipant);
router.put('/leave/:id', passport.authenticate('jwt', { session: false }), EventController.rmvParticipant);
router.get('/', passport.authenticate('jwt', { session: false }), EventController.getEvents);
router.get('/:id', passport.authenticate('jwt', { session: false }), EventController.getEventById);
router.delete('/:id', passport.authenticate('jwt', { session: false }), EventController.rmvEventById);

module.exports = router;