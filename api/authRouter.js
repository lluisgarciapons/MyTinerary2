const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../config/keys");
const User = require("../models/userModel");

/* POST login. */
authRouter.post("/login", function(req, res, next) {
  passport.authenticate("login", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info.message,
        user: user
      });
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      let token = jwt.sign({ id: user._id }, keys.session.cookieKey, {
        expiresIn: "20h"
      });
      return res.json({ token });
    });
  })(req, res);
});

//post signup
authRouter.post("/signup", (req, res, next) => {
  if (req.body.password === req.body.passwordVal) {
    if (req.body.username.length >= 4) {
      if (req.body.password.length >= 6) {
        User.find({
          $or: [
            { "auth.local.email": req.body.email },
            { "auth.google.email": req.body.email }
          ]
        }).then(currentUsers => {
          if (currentUsers.length === 0) {
            let user = new User({
              "auth.local.name": req.body.username,
              "auth.local.email": req.body.email,
              "auth.local.password": req.body.password
            });

            user
              .save()
              .then(doc => {
                res.send(doc);
              })
              .catch(err => {
                next(err);
              });
          } else {
            //using next() is the same as the send() and json() but we pass it first for the error handler middleware
            next({
              status: 401,
              success: false,
              message: "This email is already in use."
            });
            // res.send(401).json({
            //   success: false,
            //   message: "This email is already in use."
            // });
          }
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Password must be at least 6 characters long."
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "username must be at least 4 characters long."
      });
    }
  } else
    res
      .status(400)
      .json({ success: false, message: "Passwords must be equal." });
});

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

authRouter.get(
  "/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    let token = jwt.sign({ id: req.user._id }, keys.session.cookieKey, {
      expiresIn: "24h"
    });
    res.redirect(`http://localhost:3000/user/${token}`);
  }
);

module.exports = authRouter;
