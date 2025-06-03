import mongoose from "mongoose";
import { config } from "dotenv";
config();

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI).then(() => {
      console.log("Connected to Database");
    });
  } catch (error) {
    console.log("Error connecting to database : ", error.message);
  }
};
