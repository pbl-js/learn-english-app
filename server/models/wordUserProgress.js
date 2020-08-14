import mongoose from "mongoose";

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
        default: 100,
      },
    },
    masteringProgress: {
      value: {
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

export default mongoose.model("WordUserProgress", wordUserProgressSchema);
