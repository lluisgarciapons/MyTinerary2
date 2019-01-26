const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itinerarySchema = Schema({
  name: { type: String },
  //I don't know why but it doesn't work when I put Schema.Types.ObjectId as a type. it only works with a String
  city: { type: Schema.Types.ObjectId, ref: "City" },
  //maybe connect it to the user schema afterwards.
  user: {
    userName: { type: String },
    profilePicture: { type: String }
  },
  likes: { type: Number },
  time: { type: Number },
  price: { type: String },
  hastags: { type: Array }
});

module.exports = Itinerary = mongoose.model("Itinerary", itinerarySchema);
