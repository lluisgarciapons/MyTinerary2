//routes/user.js
const express = require("express");
const userRouter = express.Router();
const User = require("../models/userModel");

/* GET users listing. */
userRouter.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

/* GET user profile. */
userRouter.get("/profile", function(req, res, next) {
  res.send(req.user);
  // res.json({ succes: true, message: "Login successful" });
});

module.exports = userRouter;
