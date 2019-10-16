'use strict';

const mongoose = require("mongoose");
const Watch = require("../models/watch");
const Bracelet = require('../models/bracelet');
const Dial = require('../models/bracelet');
const Housing = require('../models/bracelet');

exports.create = async (req, res) => {
    const name = mongoose.mongo.ObjectId(req.body.name);
    const braceletId = mongoose.mongo.ObjectId(req.body.bracelet);
    const dialId = mongoose.mongo.ObjectId(req.body.dial);
    const housingId = mongoose.mongo.ObjectId(req.body.housing);
    const description = mongoose.mongo.ObjectId(req.body.description);

    try {
        const watch = new Watch({
            name,
            braceletId,
            dialId,
            housingId,
            description
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

// function getOneT(watchId) {
//     return Watch.findById(watchId, (err, watch) => {
//         if(err) return null;
//         return watch;
//     });
// }

exports.getOne = async (req, res) => {
    const watchId = mongoose.mongo.ObjectId(req.body.watch);
    const watch = Watch.findById(watchId, (err, result) => {
        if(err) return null;
        return result;
    });
    if(result != null) {
        const braceletUrl = Bracelet.findById(watch.braceletId, (err, url) => {
            if(err) return null;
            return url;
        });
        const dialUrl = Dial.findById(watch.dialId, (err, url) => {
            if(err) return null;
            return url;
        });
        const housingUrl = Housing.findById(watch.housingId, (err, url) => {
            if(err) return null;
            return url;
        });
        return res.status(200).json({
            braceletUrl: braceletUrl,
            dialUrl: dialUrl,
            housingUrl: housingUrl,

        });
    }
    return res.status(404).json({
        message: 'La montre n\'a pas été trouvée'
    });
}
