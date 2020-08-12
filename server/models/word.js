import mongoose from "mongoose";

const Schema = mongoose.Schema;

const wordSchema = new Schema({
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

export default mongoose.model("Word", wordSchema);
