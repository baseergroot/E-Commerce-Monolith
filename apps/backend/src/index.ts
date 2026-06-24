import express from "express";
import connectDB from "../lib/db";
import router from "../routes/helper";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./generated/routes";
import fs from "fs";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World! from backend");
});

// Serve swagger docs
app.use("/docs", swaggerUi.serve, (_req: any, res: any) => {
  const swaggerDoc = JSON.parse(
    fs.readFileSync(new URL("./generated/swagger.json", import.meta.url), "utf-8")
  );
  return res.send(swaggerUi.generateHTML(swaggerDoc));
});

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
