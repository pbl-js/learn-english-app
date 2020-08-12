import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessLevel: {
    type: Number,
    default: 1,
  },
});

export default mongoose.model("User", userSchema);
