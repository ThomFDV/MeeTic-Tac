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
        await color.save(err => {
            if (err) return res.status(400).send('color/create: Bad request');
        });
        return res.status(201).send("color/create: Created!").end();
    } catch (err) {
        return res.json(err).status(500).send('color/create: Internal Server Error');
    }
};
