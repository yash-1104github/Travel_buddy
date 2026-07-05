import mongoose from "mongoose";

export async function connectDB() {
  console.log("Connecting to MongoDB");
  const url = process.env.MONGO_DB_URL;
  console.log(url);
  try{
    await mongoose.connect(url);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection failed");
    console.log(error);
  }
}
