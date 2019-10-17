'use strict';

const mongoose = require("mongoose");
const Bracelet = require("./bracelet");
const Dial = require("./dial");
const Housing = require("./housing");

const watchSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    braceletId: {
        type: mongoose.Schema.ObjectId,
        ref: Bracelet,
        required: true
    },
    dialId: {
        type: mongoose.Schema.ObjectId,
        ref: Dial,
        required: true
    },
    housingId: {
        type: mongoose.Schema.ObjectId,
        ref: Housing,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: ""
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Watch", watchSchema);
