import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  descriptor: [Number],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("User", userSchema);