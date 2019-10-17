'use strict';

const mongoose = require("mongoose");
const User = require("./user");
const Watch = require("./watch");

const matchSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: true
    },
    watchId: {
        type: mongoose.Schema.ObjectId,
        ref: Watch,
        required: true
    },
    isLiked: {
        type: Boolean,
        required: false
    }
});

module.exports = mongoose.model("Match", matchSchema);
