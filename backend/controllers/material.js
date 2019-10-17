"use strict";

const mongoose = require("mongoose");
const Material = require("../models/material");

exports.create = async (req, res) => {
    const label = req.body.label;
    const price = req.body.price;

    try {
        const material = new Material({
            label,
            price
        });
        await material.save(err => {
            if (err) return res.status(400);
        });
        return res.status(201).send("material/create : Created!").end();
    } catch (err) {
        return res.json(err).status(400);
    }
};

exports.getAllT = () => {
    let materialsMap = [];
    Material.find({}, (err, materials) => {
       materials.forEach(material => {
           materialsMap.push(material.label);
       }) ;
    });
    return materialsMap;
}
