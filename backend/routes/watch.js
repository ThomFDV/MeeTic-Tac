'use strict';

const express = require("express");
const WatchController = require("../controllers/watch");
const router = express.Router();

router.post("/create", WatchController.create);

module.exports = router;
