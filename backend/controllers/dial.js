'use strict';

const mongoose = require("mongoose");
const Dial = require("../models/dial");

exports.create = async (req, res) => {
    const name = req.body.name;
    const patternId = req.body.pattern;

    try {
        const dial = new Dial({
            name,
            patternId
        });
        await dial.save(err => {
            if(err) return res.status(400).send('dial/create: Bad request');
        });
        return res.status(201).send("dial/create: Created!");
    } catch(err) {
        return res.status(500).send('dial/create: Internal Server Error');
    }
}
