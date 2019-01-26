const express = require("express");
const Activity = require("../models/activityModel");
const activityRouter = express.Router();

activityRouter.route("/:id").get((req, res) => {
  Activity.find({ city: req.params.id })
    .populate("itinerary", "title")
    .populate("city", "name")
    .exec((err, activities) => {
      res.json(activities);
    });
});

activityRouter.route("/").get((req, res) => {
  Activity.find({}, (err, activities) => {
    res.json(activities);
  });
});

module.exports = activityRouter;
