const mongoose = require("mongoose");

const typeSchema = mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Type", typeSchema);
