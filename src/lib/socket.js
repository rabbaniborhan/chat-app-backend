import express from "express";
import http from "http";
import { Server } from "socket.io";

export const app = express();
export const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: ["https://chat-web-chi.vercel.app", "http://localhost:5173"],
    credentials: true,
  },
});

const userSocketMap = {};

export const getReceiverId = (userId) => userSocketMap[userId] || null;

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId?.trim();

  if (userId) {
    if (userSocketMap[userId]) {
      const prevSocketId = userSocketMap[userId];
      io.sockets.sockets.get(prevSocketId)?.disconnect();
    }

    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    if (userId && userId in userSocketMap) {
      delete userSocketMap[userId];
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
