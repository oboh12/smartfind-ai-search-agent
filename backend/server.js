// Load environment variables FIRST
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// Routes
import chatRoute from "./routes/chat.js";
import searchRoute from "./routes/search.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/chat", chatRoute);
app.use("/api/search", searchRoute);

// Port from .env with fallback
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`SmartFind AI backend running on port ${PORT}`);
});