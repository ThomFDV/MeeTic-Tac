'use strict';

const mongoose = require("mongoose");
const Pattern = require("./pattern");

const dialSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    patternId: {
        type: mongoose.Schema.ObjectId,
        ref: Pattern,
        required: true
    },
    imgUrl: {
        type: String,
        required: false,
        default: null
    }
});

module.exports = mongoose.model("Dial", dialSchema);
