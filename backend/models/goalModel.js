import mongoose from "mongoose";

const { Schema, model } = mongoose;
const goalSchema = Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: { type: String, required: [true, "please provide a text value"] },
  },
  {
    timestamps: true,
  }
);

const Goal = model("Goal", goalSchema);
export default Goal;
