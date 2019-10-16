'use strict';

const mongoose = require("mongoose");
const Housing = require("../models/housing");

exports.create = async (req, res) => {
    const imgUrl = req.body.url;
    const colorId = mongoose.mongo.ObjectId(req.body.color);
    try {
        const housing = new Housing({
            colorId,
            imgUrl
        });
        try {
            await housing.save();
            return res.status(201).send("housing/create: Created!");
        } catch(err) {
            return res.status(400).send('housing/create: Bad request');
        }
    } catch(err) {
        return res.status(500).send('housing/create: Internal Server Error');
    }
}
