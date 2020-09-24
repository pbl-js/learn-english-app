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
    status: {
      type: String,
      enum: ["unseen", "learning", "mastering", "complete"],
      default: "unseen",
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
