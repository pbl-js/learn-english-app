const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wordUserProgressSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "TopicUserProgress",
    },
    wordId: {
      type: Schema.Types.ObjectId,
      ref: "Word",
    },
    seen: {
      type: Boolean,
      default: false,
    },
    started: {
      type: Boolean,
      default: false,
    },
    passed: {
      type: Boolean,
      default: false,
    },
    mastering: {
      type: Boolean,
      default: false,
    },
    learningProgress: {
      actual: {
        type: Number,
        default: 0,
      },
      total: {
        type: Number,
        default: 100,
      },
    },
    masteringProgress: {
      actual: {
        type: Number,
        default: 0,
      },
      total: {
        type: Number,
        default: 100,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WordUserProgress", wordUserProgressSchema);
