import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: String,

    city: String,

    source: {
      type: String,
      enum: ["offline", "google", "meta", "excel","facebook"],
      default: "offline",
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: [
        "New",
        "Called",
        "Interested",
        "Converted",
        "No Response",
        "Callback Requested",
        "Not Interested",
        "Invalid Number",
      ],
      default: "New",
    },

    remarks: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Lead", leadSchema);