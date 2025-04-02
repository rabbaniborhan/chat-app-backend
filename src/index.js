import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./lib/db.js";
import { app, server } from "./lib/socket.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

// Configuration
dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB();
connectDB();

app.use(
  cors({
    origin: "https://chat-web-chi.vercel.app", // Only this origin is allowed
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.use("/", (req, res) => {
  res.send("server is running");
});

// Start server
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
