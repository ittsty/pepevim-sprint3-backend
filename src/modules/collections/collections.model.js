import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    collectionName: { type: String, required: true, trim: true, maxlength: 20 },
    collectionDesc: { type: String, required: true, trim: true, maxlength: 100 },
  },
  {
    timestamps: true,
  },
);

export const Collection = mongoose.model("collection",collectionSchema);