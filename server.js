//require from dependencies
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
//require other files
const keys = require("./config/keys");
const cityRouter = require("./api/cityRouter");
const itineraryRouter = require("./api/itineraryRouter");
const activityRouter = require("./api/activityRouter");
const commentRouter = require("./api/commentRouter");
const authRouter = require("./api/authRouter");
const userRouter = require("./api/userRouter");
require("./config/passport");

//init express
const app = express();

//set port
const port = process.env.PORT || 5000;

//init body-parses
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//initialize passport
app.use(passport.initialize());

//connect mongoose to the mLab database
mongoose.connect(
  keys.mongoDB.dbURI,
  { useNewUrlParser: true }
);

//connect each url call to one API route
app.use("/cities", cityRouter);
app.use("/itineraries", itineraryRouter);
app.use("/activities", activityRouter);
app.use(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  commentRouter
);
app.use("/auth", authRouter);
app.use("/user", passport.authenticate("jwt", { session: false }), userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json(err);
});

//listen to the port
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
