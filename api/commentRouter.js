const express = require("express");
const Comment = require("../models/commentModel");
const commentRouter = express.Router();

commentRouter.route("/:cityId").get((req, res) => {
  Comment.find({ city: req.params.cityId })
    .populate("city", "name")
    .populate("itinerary", "title")
    .exec((err, comments) => {
      //we send the comments sorted by date, so the newest ones goes on top
      res.json(comments.sort((a, b) => a.date < b.date));
    });
});

commentRouter
  .route("/find/:id")
  .get((req, res) => {
    Comment.find({ _id: req.params.id }, (err, comment) => {
      res.json(comment);
    });
  })
  .delete((req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
      if (
        comment.user.name ===
        (req.user.auth.google.name
          ? req.user.auth.google.name
          : req.user.auth.local.name)
      ) {
        comment.remove(err => {
          if (err) {
            res.status(500).send(err);
          } else {
            //202 accepted
            res.status(202).send("Comment deleted.");
          }
        });
      } else {
        res.status(401).send("You are not authorized to delete this comment.");
      }
    });
  });

commentRouter
  .route("/")
  .get((req, res) => {
    Comment.find({}, (err, comments) => {
      res.json(comments);
    });
  })
  .post((req, res) => {
    let comment = new Comment({
      ...req.body
    });
    comment.save();
    res.status(201).send(comment);
  });

module.exports = commentRouter;
