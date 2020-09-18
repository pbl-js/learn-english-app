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
    status: {
      type: String,
      enum: ["locked", "normal", "learning", "mastering", "complete"],
      default: "normal",
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
