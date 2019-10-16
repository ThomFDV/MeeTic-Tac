'use strict';
const express = require("express");
const passport = require("passport");
const config = require("../config/passport");
const UserController = require("../controllers/user");
const router = express.Router();

router.post('/register', UserController.createUser);
router.post('/login', passport.authenticate('local', { session: false }), UserController.login);
router.get('/profile', passport.authenticate('jwt', { session: false }), UserController.profile);

module.exports = router;