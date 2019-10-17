'use strict';

const mongoose = require("mongoose");
const Pattern = require("../models/pattern");

exports.create = async (req, res) => {
    const patternType = mongoose.mongo.ObjectId(req.body.type);
    const mainColor = mongoose.mongo.ObjectId(req.body.color);
    const description = req.body.description;

    try {
        const pattern = new Pattern({
            description,
            mainColor,
            patternType
        });
        try {
            await pattern.save();
            return res.status(201).send("pattern/create: Created!");
        } catch(err) {
            return res.status(400).json({
                message: "pattern/create: Bad request",
                err: err.message
            });
        }
    } catch(err) {
        return res.status(500).json({message: 'pattern/create: Internal Server Error', err: err.message});
    }
}
