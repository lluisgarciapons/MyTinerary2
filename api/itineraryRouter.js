const express = require("express");
const Itinerary = require("../models/itineraryModel");
const City = require("../models/cityModel");
const itineraryRouter = express.Router();

//find the itineraries of that particular city
itineraryRouter.route("/:id").get((req, res) => {
  Itinerary.find({ city: req.params.id })
    .populate("city", "name")
    .exec((err, itineraries) => {
      if (err) {
        res
          .status(400)
          .send({
            status: 400,
            message:
              "This city does not exist, mate. How... how did you even get to this page?"
          });
        return;
      }
      res.json(itineraries);
    });
});

//Find all the itineraries (not used, just for testing)
itineraryRouter.route("/").get((req, res) => {
  Itinerary.find({}, (err, itineraries) => {
    if (err) {
      res.status(400).send(err);
      return;
    }
    res.json(itineraries);
  });
});

module.exports = itineraryRouter;
