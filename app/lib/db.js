import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export async function connectDB() {
  try {
    console.log("URI Exists:", !!MONGODB_URI);

    const connection = await mongoose.connect(MONGODB_URI);

    console.log("MongoDB Connected");

    return connection;
  } catch (error) {
    console.error("MongoDB Connection Error:", error);

    throw error; // IMPORTANT
  }
}