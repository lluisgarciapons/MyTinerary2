const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const keys = require("./keys");
const User = require("../models/userModel");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    function(email, password, cb) {
      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      return User.findOne({
        "auth.local.email": email,
        "auth.local.password": password
      })
        .then(user => {
          if (!user) {
            return cb(null, false, { message: "Incorrect email or password." });
          }
          return cb(null, user, { message: "Logged In Successfully" });
        })
        .catch(err => cb(err));
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: keys.session.cookieKey
    },
    function(jwtPayload, cb) {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return User.findById(jwtPayload.id)
        .then(user => {
          return cb(null, user);
        })
        .catch(err => {
          return cb(err);
        });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      //options for the Strategy
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      //check if user already exist on the database
      User.findOne({ "auth.google.id": profile.id }).then(user => {
        if (user) {
          //already have the user, change whatever change there might be on google
          User.findOneAndUpdate(
            { "auth.google.id": profile.id },
            {
              "auth.google.email": profile.emails[0].value,
              "auth.google.name": profile.displayName,
              "auth.google.image": profile.photos[0].value
            }
          ).then(currentUser => {
            console.log("user is: ", currentUser);
            done(null, currentUser);
          });
        } else {
          User.findOne({ "auth.local.email": profile.emails[0].value }).then(
            currentUser => {
              //already have the user logged in with local before, so update the google part
              if (currentUser) {
                User.findOneAndUpdate(
                  { "auth.local.email": profile.emails[0].value },
                  {
                    "auth.google.id": profile.id,
                    "auth.google.email": profile.emails[0].value,
                    "auth.google.name": profile.displayName,
                    "auth.google.image": profile.photos[0].value
                  }
                ).then(updatedUser => {
                  console.log("user updated: ", updatedUser);
                  done(null, updatedUser);
                });
              } else {
                console.log("3", profile);
                //create new User and put it on the db
                new User({
                  "auth.google.id": profile.id,
                  "auth.google.name": profile.displayName,
                  "auth.google.email": profile.emails[0].value,
                  "auth.google.image": profile.photos[0].value
                })
                  .save()
                  .then(newUser => {
                    console.log("new user created: ", newUser);
                    done(null, newUser);
                  })
                  .catch(err => {
                    done(err, null);
                  });
              }
            }
          );
        }
      });
    }
  )
);
