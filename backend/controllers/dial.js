'use strict';

const mongoose = require("mongoose");
const Dial = require("../models/dial");

exports.create = async (req, res) => {
    const name = req.body.name;
    const patternId = mongoose.mongo.ObjectId(req.body.pattern);
    const imgUrl = req.body.imgUrl;

    try {
        const dial = new Dial({
            name,
            patternId,
            imgUrl
        });
        try {
            await dial.save();
            return res.status(201).send("dial/create: Created!");
        } catch(err) {
            return res.status(400).send('dial/create: Bad request');
        }
    } catch(err) {
        return res.status(500).send('dial/create: Internal Server Error');
    }
}
