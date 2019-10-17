'use strict';

const mongoose = require("mongoose");
const Type = require("../models/type");

exports.create = async (req, res) => {
    const label = req.body.label;
    const price = req.body.price;

    try {
        const type = new Type({
            label,
            price
        });
        try {
            await type.save();
            return res.status(201).send("housing/create: Created!");
        } catch(err) {
            return res.status(400).send('housing/create: Bad request');
        }
    } catch (err) {
        return res.status(500).send('type/create: Internal Server Error');
    }
};
