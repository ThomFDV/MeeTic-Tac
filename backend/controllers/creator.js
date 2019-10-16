'use strict';

const mongoose = require("mongoose");
const Creator = require("../models/creator");

exports.create = async (req, res) => {
    const userId = mongoose.mongo.ObjectId(req.body.userId);
    const watchId = mongoose.mongo.ObjectId(req.body.watchId);
    const isLiked =req.body.isLiked;

    try {
        const creator = new Creator({
            userId,
            watchId,
            isLiked
        });
        try {
            await creator.save();
            return res.status(201).send("creator/create: Created!");
        } catch(err) {
            return res.status(400).send('creator/create: Bad request');
        }
    } catch(err) {
        return res.status(500).send('creator/create: Internal Server Error');
    }
}
