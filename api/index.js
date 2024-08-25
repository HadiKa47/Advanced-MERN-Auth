import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./DB/connectDB.js";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(express.json()); // Allow us to parse incoming requests :req.body
app.use(cookieParser()); // allows us to parse incoming cookies

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server started on port: ", PORT);
});
