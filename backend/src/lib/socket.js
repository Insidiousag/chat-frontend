import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "../routes/auth.route.js";
import messageRoutes from "../routes/message.route.js";

const app = express();
const server = http.createServer(app);

const WHITELIST = process.env.FRONTEND_ORIGINS.split(",").map((url) => url.trim());

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: WHITELIST,
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const io = new Server(server, {
  cors: {
    origin: WHITELIST,
    credentials: true
  },
});


export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
