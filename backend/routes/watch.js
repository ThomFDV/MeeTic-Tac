'use strict';

const express = require("express");
const WatchController = require("../controllers/watch");
const router = express.Router();

router.post("/create", WatchController.create);
router.post("/getOne", WatchController.getOne);

module.exports = router;
