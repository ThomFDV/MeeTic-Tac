'use strict';

const mongoose = require("mongoose");
const Match = require("../models/match");

exports.create = async (req, res) => {
    const userId = mongoose.mongo.ObjectId(req.body.userId);
    const watchId = mongoose.mongo.ObjectId(req.body.watchId);
    const isLiked =req.body.isLiked;

    try {
        const match = new Match({
            userId,
            watchId,
            isLiked
        });
        try {
            await match.save();
            return res.status(201).send("match/create: Created!");
        } catch(err) {
            return res.status(400).send('match/create: Bad request');
        }
    } catch(err) {
        return res.status(500).send('watch/create: Internal Server Error');
    }
}
