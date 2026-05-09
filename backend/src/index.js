
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

(async () => {
  try {
    await connectDB();
    console.log("✓ MongoDB connected");

    server.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("✗ Failed to connect to MongoDB:", err);
    process.exit(1);
  }
})();
