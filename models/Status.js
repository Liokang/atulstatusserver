const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
  currentStatus: {
    type: String,
    enum: [
      "Working",
      "In Office",
      "In Gym",
      "Sleeping",
      "Available",
      "Driving"
    ],
    default: "Available"
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Status", statusSchema);
