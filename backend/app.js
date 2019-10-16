const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const colorRoutes = require("./routes/color");
const widthRoutes = require("./routes/width");
const materialRoutes = require("./routes/material");
const braceletRoutes = require("./routes/bracelet");
const typeRoutes = require("./routes/type");
const patternRoutes = require("./routes/pattern");
const housingRoutes = require("./routes/housing");
const dialRoutes = require("./routes/dial");

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

app.use("/", colorRoutes);
app.use("/width", widthRoutes);
app.use("/material", materialRoutes);
app.use("/bracelet", braceletRoutes);
app.use("/color", colorRoutes);
app.use("/type", typeRoutes);
app.use("/pattern", patternRoutes);
app.use("/housing", housingRoutes);
app.use("/dial", dialRoutes);

module.exports = app;
