import express from "express";
import connectDB from "../lib/db.js";
import router from "../routes/helper.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(express.json());

app.use(async (req, res, next) => {
  if (
    req.path === "/" ||
    req.path === "/api/v1/health"
  ) {
    return next();
  }

  if (mongoose.connection.readyState !== 1) {
    console.log(`[DB] readyState=${mongoose.connection.readyState} for ${req.method} ${req.path}, waiting...`);
    try {
      await connectDB();
    } catch {
      console.warn("[DB] Connection attempt failed, returning 503");
      return res.status(503).json({
        success: false,
        message: "Database is not connected yet",
      });
    }
  }

  return next();
});

app.get("/", (_req, res) => {
  res.send(`Hello World! from backend, ${mongoose.connection.readyState}`);
});

app.use(router);

async function bootstrapDatabase() {
  try {
    await connectDB();
  } catch (error) {
    console.error("Database initialization failed", error);
  }
}

if (process.env.VERCEL) {
  void bootstrapDatabase();
} else {
  const port = process.env.PORT || 3000;
  void bootstrapDatabase().finally(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });
}

export default app;
