const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wordSchema = new Schema({
  section: {
    type: Schema.Types.ObjectId,
    ref: "Section",
  },

  topic: {
    type: Schema.Types.ObjectId,
    ref: "Topic",
  },

  img: {
    type: String,
    required: true,
  },

  eng: {
    type: String,
    required: true,
  },

  pl: {
    type: String,
    required: true,
  },
});

wordSchema.pre("save", (next) => {
  console.log("Word add succesfull");
});

module.exports = mongoose.model("Word", wordSchema);
