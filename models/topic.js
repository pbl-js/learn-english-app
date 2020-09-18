import mongoose from "mongoose";

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

  defaultStatus: {
    type: String,
    enum: ["locked", "normal", "learning", "mastering", "complete"],
    default: "normal",
  },

  totalWords: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Topic", topicSchema);
