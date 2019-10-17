'use strict';

const mongoose = require("mongoose");

const colorSchema = mongoose.Schema({
    label: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Color", colorSchema);
