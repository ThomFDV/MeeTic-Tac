"use strict";

const mongoose = require("mongoose");
const Bracelet = require("../models/bracelet");

exports.create = async (req, res) => {
    const length = req.body.length;
    const price = req.body.price;
    const imgUrl = req.body.imgUrl;
    const widthId = req.body.widthId;
    const materialId = req.body.materialId;
    /*const patternId = req.body.patternId;*/

    try {
        const bracelet = new Bracelet({
            length,
            price,
            imgUrl,
            widthId,
            materialId/*,
            patternId*/
        });
        await bracelet.save(err => {
            if (err) return res.status(400);
        });
        return res.status(201).send("Created!").end();
    } catch (err) {
        return res.json(err).status(400);
    }
};
