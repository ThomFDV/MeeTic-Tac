'use strict';

const mongoose = require("mongoose");
const Watch = require("../models/watch");
const Bracelet = require('../models/bracelet');
const Dial = require('../models/dial');
const Housing = require('../models/housing');

exports.create = async (req, res) => {
    const name = mongoose.mongo.ObjectId(req.body.name);
    const braceletId = mongoose.mongo.ObjectId(req.body.bracelet);
    const dialId = mongoose.mongo.ObjectId(req.body.dial);
    const housingId = mongoose.mongo.ObjectId(req.body.housing);
    const description = req.body.description;

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
    try {
        const watch = await Watch.findById(req.params.watchId);
        if (watch != null) {
            const braceletUrl = await Bracelet.findById(watch.braceletId, 'imgUrl');
            const dialUrl = await Dial.findById(watch.dialId, 'imgUrl');
            const housingUrl = await Housing.findById(watch.housingId, 'imgUrl');
            // return {
            //     braceletUrl: braceletUrl.imgUrl,
            //     dialUrl: dialUrl.imgUrl,
            //     housingUrl: housingUrl.imgUrl,
            //     description: watch.description
            // };
            return res.status(200).json({
                    braceletUrl: braceletUrl.imgUrl,
                    dialUrl: dialUrl.imgUrl,
                    housingUrl: housingUrl.imgUrl,
                    description: watch.description
                });
        }
        return null;
    } catch(err) {
        return res.status(400).json(err);
    }
}
