'use strict';

const mongoose = require("mongoose");
const Watch = require("../models/watch");

exports.create = async (req, res) => {
    const name = mongoose.mongo.ObjectId(req.body.name);
    const braceletId = mongoose.mongo.ObjectId(req.body.bracelet);
    const dialId = mongoose.mongo.ObjectId(req.body.dial);
    const housingId = mongoose.mongo.ObjectId(req.body.housing);

    try {
        const watch = new Watch({
            name,
            braceletId,
            dialId,
            housingId
        });
        try {
            await watch.save();
            return res.status(201).send("watch/create: Created!");
        } catch(err) {
            return res.status(400).send('watch/create: Bad request');
        }
    } catch(err) {
        return res.status(500).send('watch/create: Internal Server Error');
    }
};

function getOneT(watchId) {
    return Watch.findById(watchId, (err, watch) => {
        if(err) return null;
        return watch;
    });
}

exports.getOne = async (req, res) => {
    const watchId = mongoose.mongo.ObjectId(req.body.watch);
    
}
