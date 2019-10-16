'use strict';

const mongoose = require("mongoose");
const Housing = require("../models/housing");
const Color = require("../models/color");

exports.create = async (req, res) => {
    const colorId = req.body.color;
    const imgUrl = req.body.url;

    try {
        const pattern = new Pattern({
            colorId,
            imgUrl
        });
        await pattern.save(err => {
            if(err) return res.status(400).send('housing/create: Bad request');
        });
        return res.status(201).send("housing/create: Created!");
    } catch(err) {
        return res.status(500).send('housing/create: Internal Server Error');
    }
}
