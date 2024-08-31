import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./DB/connectDB.js";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
dotenv.config();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json()); // Allow us to parse incoming requests :req.body
app.use(cookieParser()); // allows us to parse incoming cookies

app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server started on port: ", PORT);
});
