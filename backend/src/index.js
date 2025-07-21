

// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import path from "path";

// import { connectDB } from "./lib/db.js";
// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";
// import { app, server } from "./lib/socket.js";


// dotenv.config();


// const __dirname = path.resolve();
// const PORT = process.env.PORT || 5001;


// app.use(express.json());
// app.use(cookieParser());


// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);
// app.use(express.static(path.join(__dirname, "..", "dist")));



// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
// });


// (async () => {
//   try {
//     await connectDB();
//     console.log(" MongoDB connected");

//     server.listen(PORT, () => {
//       console.log(` Server running on port ${PORT}`);
//     });
//   } catch (err) {
//     console.error(" Failed to connect to MongoDB:", err);
//     process.exit(1);
//   }
// })();


import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5001;

// 1) Enable CORS for your frontend origins
const origins = (process.env.FRONTEND_ORIGINS || "")
  .split(",")
  .map((u) => u.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: origins,
    credentials: true,      // Allow cookies over CORS
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

// 2) Your API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// 3) Serve frontend
app.use(express.static(path.join(__dirname, "..", "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

(async () => {
  try {
    await connectDB();
    console.log("MongoDB connected");

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
})();
