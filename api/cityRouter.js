const express = require("express");
const cityRouter = express.Router();
const City = require("../models/cityModel");

cityRouter
  .route("/")
  .get((req, res) => {
    //it finds all the cities
    City.find({}, (err, cities) => {
      if (err) {
        res.status(400).send(err.response.data);
      }
      res.json(cities);
    });
  })
  .post((req, res) => {
    //in case we wanted to add a new city
    let city = new City(req.body);
    city.save();
    res.status(201).send(city);
  });

module.exports = cityRouter;
