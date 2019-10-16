'use strict';

const mongoose = require("mongoose");
const Dial = require("../models/dial");

exports.create = async (req, res) => {
    const name = req.body.name;
    const patternId = mongoose.mongo.ObjectId(req.body.pattern);

    try {
        const dial = new Dial({
            name,
            patternId
        });
        try {
            await dial.save();
            return res.status(201).send("housing/create: Created!");
        } catch(err) {
            return res.status(400).send('housing/create: Bad request');
        }
    } catch(err) {
        return res.status(500).send('dial/create: Internal Server Error');
    }
}
