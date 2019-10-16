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
        await type.save(err => {
            if (err) return res.status(400);
        });
        return res.status(201).send("Created!").end();
    } catch (err) {
        return res.json(err).status(400);
    }
};
