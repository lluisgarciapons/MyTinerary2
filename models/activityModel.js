const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const activitySchema = new Schema({
  city: { type: Schema.Types.ObjectId, ref: "City" },
  itinerary: { type: Schema.Types.ObjectId, ref: "Itinerary" },
  image: { type: String },
  alt: { type: String }
});
module.exports = activityModel = mongoose.model("Activity", activitySchema);
