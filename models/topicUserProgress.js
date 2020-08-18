import mongoose from "mongoose";

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
      value: {
        type: Number,
        default: 0,
      },
      total: {
        type: Number,
        default: 0,
      },
    },
    masteringProgress: {
      value: {
        type: Number,
        default: 0,
      },
      total: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("TopicUserProgress", topicUserProgressSchema);
