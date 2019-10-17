'use strict';

const express = require("express");
const DialController = require("../controllers/dial");
const router = express.Router();

router.post("/create", DialController.create);

module.exports = router;
