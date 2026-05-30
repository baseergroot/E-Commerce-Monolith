import mongoose from "mongoose";

export default async function connectDB() {
  const mongo_uri = process.env.MONGO_URI;
  if (!mongo_uri) {
    throw new Error("MONGO_URI is not defined");
  }
  
  try {
    await mongoose.connect(mongo_uri);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed", error);
  }
}