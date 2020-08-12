import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sectionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  topics: [
    {
      type: Schema.Types.ObjectId,
      ref: "Topic",
    },
  ],
});

export default mongoose.model("Section", sectionSchema);
