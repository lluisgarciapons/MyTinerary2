const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: { type: String },
  country: { type: String }
});
module.exports = City = mongoose.model("City", citySchema);
