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
    }
});

module.exports = mongoose.model("Dial", dialSchema);
