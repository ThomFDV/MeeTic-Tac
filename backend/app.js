'use strict';
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const colorRoutes = require("./routes/color");
const userRoutes = require("./routes/user");
const eventRoutes = require("./routes/event");

const app = express();

mongoose.connect("mongodb+srv://admin:QLwDKdjsq9DwsUn3@maincluster-e8dof.mongodb.net/test?retryWrites=true&w=majority", {
                useCreateIndex: true,
                useUnifiedTopology: true,
                useNewUrlParser: true
            }).then(() => {
                console.log("Connected to database!");
            }).catch((err) => {
                console.log("Connection failed! " + err);
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

app.use("/color", colorRoutes);
app.use("/user", userRoutes);
app.use("/event", eventRoutes);

module.exports = app;