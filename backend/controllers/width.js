"use strict";

const mongoose = require("mongoose");
const Width = require("../models/width");

exports.create = async (req, res) => {
    const label = req.body.label;
    const size = req.body.size;

    try {
        const width = new Width({
            label,
            size
        });
        await width.save(err => {
            if (err) return res.status(400);
        });
        return res.status(201).send("width/create : Created!").end();
    } catch (err) {
        return res.json(err).status(400);
    }
};
