//require from dependencies
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
//require other files
const keys = require("./keys");
const cityRouter = require("./api/cityRouter");
const itineraryRouter = require("./api/itineraryRouter");
const activityRouter = require("./api/activityRouter");

//init express
const app = express();

//set port
const port = process.env.PORT || 5000;

//init body-parses
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//connect mongoose to the mLab database
mongoose.connect(
  keys.mongoDB.dbURI,
  { useNewUrlParser: true }
);

//connect each url call to one API route
app.use("/cities", cityRouter);
app.use("/itineraries", itineraryRouter);
app.use("/activities", activityRouter);

//listen to the port
app.listen(port, () => console.log(`Listening on port ${port}`));
