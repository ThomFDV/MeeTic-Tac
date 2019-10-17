'use strict';

const express = require("express");
const passport = require("passport");
const config = require("../config/passport");
const WatchController = require("../controllers/watch");
const router = express.Router();

router.post('/create', WatchController.create);
router.get('/getOne/:id', WatchController.getOne);

module.exports = router;
