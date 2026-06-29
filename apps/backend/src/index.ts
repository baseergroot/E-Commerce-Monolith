import express from "express";
import connectDB from "../lib/db.js";
import router from "../routes/helper.js";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(express.json());

app.use(async (req, res, next) => {
  if (
    req.path === "/" ||
    req.path === "/docs" ||
    req.path === "/api/v1/health" ||
    req.path === "/swagger-output.json"
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

// Serve swagger spec
app.get("/swagger-output.json", (_req, res) => {
  try {
    const spec = readFileSync("public/swagger-output.json", "utf-8");
    res.json(JSON.parse(spec));
  } catch {
    res.status(404).json({ error: "swagger-output.json not found" });
  }
});

// Serve Swagger UI docs (CDN-based, no express.static needed)
app.get("/docs", (_req, res) => {
  res.type("text/html").send(`<!DOCTYPE html>
<html>
<head>
  <title>API Docs</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css">
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script>SwaggerUIBundle({ url: '/swagger-output.json', dom_id: '#swagger-ui' })</script>
</body>
</html>`);
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
