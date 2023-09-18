import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

// routes
import authRoutes from "./routes/User.js";

const app = express();
const port = 5000;

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// database connection
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "auth",
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database cant connect", err));

app.use("/api", authRoutes);

app.listen(port, () => {
  console.log("Server running on port", port);
});
