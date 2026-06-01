import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,

    role: {
      type: String,
      enum: ["admin", "caller", "offline_user"],
      default: "caller",
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);