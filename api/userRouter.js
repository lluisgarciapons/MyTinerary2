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

userRouter.route("/favorites").put((req, res) => {
  let isInArray = req.user.favorites.some(iti =>
    iti.equals(req.body.itinerary)
  );
  if (!isInArray) {
    User.findByIdAndUpdate(req.user.id, {
      favorites: [...req.user.favorites, req.body.itinerary]
    }).then(currentUser => {
      res.status(201).send(req.body.itinerary);
    });
  } else {
    User.findByIdAndUpdate(req.user.id, {
      $pull: {
        favorites: req.body.itinerary
      }
    }).then(currentUser => {
      res.status(202).send(req.body.itinerary);
    });
  }
});

module.exports = userRouter;
