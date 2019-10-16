'use strict';

const mongoose = require("mongoose");
const Pattern = require("../models/pattern");
const Type = require("../models/type");
const Color = require("../models/color");

exports.create = async (req, res) => {
    const typeId = req.body.type;
    const colorId = req.body.color;
    const description = req.body.description;
    const imgUrl = req.body.url;

    try {
        const pattern = new Pattern({
            description,
            colorId,
            typeId,
            imgUrl
        });
        await pattern.save(err => {
            if(err) return res.status(400).send('pattern/create: Bad request');
        });
        return res.status(201).send("pattern/create: Created!");
    } catch(err) {
        return res.status(500).send('pattern/create: Internal Server Error');
    }
}
