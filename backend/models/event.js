'use strict';


const mongoose = require("mongoose");
const User = require("./user");

const participantSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: true
    },
    userEmail: {
        type: String,
        ref: User,
        required: true
    },
    enableNotification: {
        type: Boolean,
        required: true
    }
});

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    participant: [participantSchema],
    creator: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Event", eventSchema);