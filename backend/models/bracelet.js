const mongoose = require("mongoose");

const Width = require("../models/width");
const Material = require("../models/material");
//const Pattern = required("../models/pattern");

const braceletSchema = mongoose.Schema({
    length: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imgUrl: {
        type : String,
        required : true
    },
    widthId: {
        type : mongoose.Schema.ObjectId,
        ref : Width,
        required : true
    },
    materialId: {
        type : mongoose.Schema.ObjectId,
        ref : Material,
        required : true
    }/*,
    patternId: {
        type : mongoose.Schema.ObjectId,
        ref :  Pattern,
        required : true
    }
    */
});

module.exports = mongoose.model("Bracelet", braceletSchema);
