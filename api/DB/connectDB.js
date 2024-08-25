import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("mongo_uri: ", process.env.DataBase_URL);
    const con = await mongoose.connect(process.env.DataBase_URL);
    console.log(`MongoDB connected successfully: ${con.connection.host}`);
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error.message);
    process.exit(1); // 1 is failure, 0 status code is successful
  }
};
