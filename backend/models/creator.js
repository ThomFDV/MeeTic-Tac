'use strict';

const mongoose = require("mongoose");
const User = require("./user");
const Watch = require("./watch");

const creatorSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: true
    },
    wacthId: {
        type: mongoose.Schema.ObjectId,
        ref: Watch,
        required: true
    }
});

module.exports = mongoose.model("Creator", creatorSchema);
