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

await connectDB();

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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});