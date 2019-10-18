'use strict';
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
console.log(req.body);
    bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: hash,
        isAdmin: false,
    });
    console.log(user);
    user.save()
        .then(result => {
            res.status(201).json({
                message: "User created!",
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Invalid authentication credentials!",
                error: err
            });
        });
    });
};

exports.login = (req, res) => {

    let user = req.user;

    let token = generateToken(user);
    res.json({ user, token });

};

exports.profile = (req, res) => {
    return res.json({user: req.user});
};

function generateToken(user) {
    const payload = JSON.stringify(user);
    return jwt.sign(payload, "JWSecret-Hackathon-MeeTic-Tac");
}
