const mongoose = require("mongoose");

const materialSchema = mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Material", materialSchema);
