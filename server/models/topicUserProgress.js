const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const topicUserProgressSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "TopicUserProgress",
    },
    topicId: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
    },
    unlock: {
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
        required: true,
      },
    },
    masteringProgress: {
      actual: {
        type: Number,
        default: 0,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TopicUserProgress", topicUserProgressSchema);
