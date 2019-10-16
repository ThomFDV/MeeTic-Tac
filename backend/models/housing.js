'use strict';

const mongoose = require("mongoose");
const Color = require("./color");

const housingSchema = mongoose.Schema({
    mainColor: {
        type: mongoose.Schema.ObjectId,
        ref: Color,
        required: true
    },
    imgUrl: {
        type: String,
        required: false,
        default: null
    }
});

module.exports = mongoose.model("Housing", housingSchema);
