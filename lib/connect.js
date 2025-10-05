import mongoose from "mongoose";

const mongo_uri = process.env.MONGO_URI;

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("DB Already connected....");
  }

  try {
    await mongoose.connect(mongo_uri);
    console.log("DB connected ...."); 
  } catch (error) {
    console.log("Error while connecting to DB...", error);
    throw error;
  }
};
