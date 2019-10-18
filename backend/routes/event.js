'use strict';

const express = require("express");
const passport = require("passport");
const EventController = require("../controllers/event");

const router = express.Router();

router.post('/create', EventController.createEvent);
router.post('/go/:id', EventController.addParticipant);
router.put('/leave/:id', EventController.rmvParticipant);
router.get('/', EventController.getEvents);
router.get('/:id', EventController.getEventById);
router.delete('/:id', EventController.rmvEventById);

module.exports = router;