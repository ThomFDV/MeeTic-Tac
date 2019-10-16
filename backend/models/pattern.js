'use strict';

const mongoose = require("mongoose");
const Color = require("./color");
const Type = require("./type");

const patternSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    mainColor: {
        type: mongoose.Schema.ObjectId,
        ref: Color,
        required: true
    },
    patternType: {
        type: mongoose.Schema.ObjectId,
        ref: Type,
        required: true
    },
    imgUrl: {
        type: String,
        required: false,
        default: null
    }
});

module.exports = mongoose.model("Pattern", patternSchema);
