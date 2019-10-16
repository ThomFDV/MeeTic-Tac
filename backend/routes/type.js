'use strict';

const express = require("express");
const TypeController = require("../controllers/type");
const router = express.Router();

router.post("/create", TypeController.create);

module.exports = router;
