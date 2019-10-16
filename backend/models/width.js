const mongoose = require("mongoose");

const widthSchema = mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Width", widthSchema);
