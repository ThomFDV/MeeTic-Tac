'use strict';

const mongoose = require("mongoose");
const Pattern = require("../models/pattern");

exports.create = async (req, res) => {
    const typeId = mongoose.mongo.ObjectId(req.body.type);
    const colorId = mongoose.mongo.ObjectId(req.body.color);
    const description = req.body.description;
    const imgUrl = req.body.url;

    try {
        const pattern = new Pattern({
            description,
            colorId,
            typeId,
            imgUrl
        });
        try {
            await pattern.save();
            return res.status(201).send("housing/create: Created!");
        } catch(err) {
            return res.status(400).send('housing/create: Bad request');
        }
    } catch(err) {
        return res.status(500).send('pattern/create: Internal Server Error');
    }
}
