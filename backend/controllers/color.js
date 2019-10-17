'use strict';

const mongoose = require("mongoose");
const Color = require("../models/color");

exports.create = async (req, res) => {
    const label = req.body.label;
    const price = req.body.price;

    try {
        const color = new Color({
            label,
            price
        });
        try {
            await color.save();
            return res.status(201).send("housing/create: Created!");
        } catch(err) {
            return res.status(400).send('housing/create: Bad request');
        }
    } catch (err) {
        return res.json(err).status(500).send('color/create: Internal Server Error');
    }
};

exports.getAllT = () => {
    let colorsMap = [];
    Color.find({}, (err, colors) => {
        colors.forEach(color => {
            colorsMap.push(color.label);
        });
    });
    return colorsMap;
}
