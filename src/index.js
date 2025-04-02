import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./lib/db.js";
import { app, server } from "./lib/socket.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

//configuration
const PORT = process.env.PORT || 5000;
dotenv.config();
connectDB();
connectDB();

//use middlewares
app.use(
  cors({
    origin: "https://chat-web-chi.vercel.app/",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/", (req, res) => {
  res.send("server is running");
});
server.listen(5000, () => {
  console.log("server is running on port 5000");
});
