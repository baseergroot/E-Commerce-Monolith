import express from "express";
import connectDB from "../lib/db.js";
import router from "../routes/helper.js";
import dotenv from "dotenv";
import { apiReference } from "@scalar/express-api-reference";
import { RegisterRoutes } from "./generated/routes.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  if (
    req.path === "/" ||
    req.path === "/docs" ||
    req.path === "/api/v1/health" ||
    req.path.startsWith("/docs/")
  ) {
    return next();
  }

  if (mongoose.connection.readyState !== 1) {
    console.warn(
      `[DB] Blocking ${req.method} ${req.path} — readyState=${mongoose.connection.readyState} ` +
      `(0=disconnected, 1=connected, 2=connecting, 3=disconnecting)`
    );
    return res.status(503).json({
      success: false,
      message: "Database is not connected yet",
    });
  }

  return next();
});

app.get("/", (_req, res) => {
  res.send(`Hello World! from backend, ${mongoose.connection.readyState}`);
});

// Serve Scalar API reference (works on Vercel, unlike swagger-ui-express which needs express.static())
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let swaggerDoc: Record<string, unknown> | null = null;
try {
  swaggerDoc = JSON.parse(
    readFileSync(join(__dirname, "generated/swagger.json"), "utf-8")
  );
} catch {
  console.warn("swagger.json not found at", join(__dirname, "generated/swagger.json"));
}
app.use("/docs", apiReference({
  spec: { content: swaggerDoc ?? {} },
}));

// Register TSOA auto-generated routes FIRST so they handle products endpoints
RegisterRoutes(app);

// Use existing router for any routes not migrated to TSOA (like seed, order, search, etc.)
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
