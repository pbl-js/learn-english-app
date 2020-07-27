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

    learningValue: {
      type: Number,
      default: 0,
    },
    learningTotal: {
      type: Number,
      required: true,
    },

    masteringValue: {
      type: Number,
      default: 0,
    },
    masteringTotal: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TopicUserProgress", topicUserProgressSchema);
