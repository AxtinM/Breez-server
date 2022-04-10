const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// for use for another time

const breezSchema = new Schema({
  name: {
    type: String,
    required: false,
    unique: true,
    defualt: "Breez",
  },
  mac: {
    type: String,
  },
  type: {
    type: String,
    default: "Breez",
  },
  status: {
    type: Boolean,
    default: false,
  },
  openTimes: [Date],
  closeTimes: [Date],
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Breez", breezSchema);
