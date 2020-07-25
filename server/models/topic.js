const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const topicSchema = new Schema({
  section: {
    type: Schema.Types.ObjectId,
    ref: "Section",
  },

  title: {
    type: String,
    required: true,
  },

  img: {
    type: String,
    required: true,
  },

  totalWords: {
    type: Number,
    default: 0,
  },

  words: [
    {
      type: Schema.Types.ObjectId,
      ref: "Word",
    },
  ],
});

module.exports = mongoose.model("Topic", topicSchema);
