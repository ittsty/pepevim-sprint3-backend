import mongoose from "mongoose";
// import { env } from "../utils/env.js";

export const connectDB = async () => {
  const URI = process.env.MONGODB_URI;
  const DB_NAME = process.env.DB_NAME;

  try {
    await mongoose.connect(URI, { dbName: DB_NAME });
    console.log("MongoDB connected ✅ 🎉");
  } catch (error) {
    console.error("MongoDB connection error ❌", error);
    process.exit(1);
  }
};
