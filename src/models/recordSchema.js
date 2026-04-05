import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // this is linked to user collection
      required: true,
    },

    amount: { type: Number, required: true },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },

    category: {
      type: String,
      enum: ["food", "travel","shopping"],
      required: true, 
    },

    date:{
      type: Date,
      required: true,
      default: Date.now,
    },

    notes: { type: String},

    isDeleted: { type: Boolean, default: false }

  },
  {
    timestamps: true, 
  }
);

const Record = mongoose.model("Record", recordSchema);

export default Record;