const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sectionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Section", sectionSchema);
