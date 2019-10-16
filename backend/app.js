const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

mongoose.connect("mongodb+srv://thomfdv:meetic-tac@mainCluster-e8dof.mongodb.net/test?retryWrites=true&w=majority", {
                useCreateIndex: true,
                useUnifiedTopology: true,
                useNewUrlParser: true
            }).then(() => {
                console.log("Connected to database!");
            }).catch(() => {
                console.log("Connection failed!");
            });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PATCH, PUT, DELETE, OPTIONS"
//     );
//     next();
// });

module.exports = app;