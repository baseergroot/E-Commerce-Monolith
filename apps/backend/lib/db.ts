import mongoose from "mongoose";

let connectionPromise: Promise<typeof mongoose> | null = null;

mongoose.connection.on("connected", () => {
  console.log("[DB] Mongoose connected");
});
mongoose.connection.on("error", (err) => {
  console.error("[DB] Mongoose connection error:", err);
});
mongoose.connection.on("disconnected", () => {
  console.log("[DB] Mongoose disconnected");
});

export default async function connectDB() {
  const mongo_uri = process.env.MONGO_URI;
  if (!mongo_uri) {
    console.warn("[DB] MONGO_URI is not defined; skipping database connection.");
    return;
  }
  console.log(`[DB] MONGO_URI is set (length: ${mongo_uri.length})`);
  console.log(`[DB] Connection readyState: ${mongoose.connection.readyState}`);

  if (mongoose.connection.readyState === 1) {
    console.log("[DB] Already connected");
    return;
  }

  if (!connectionPromise) {
    console.log("[DB] Initiating connection...");
    connectionPromise = mongoose.connect(mongo_uri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
  }

  try {
    await connectionPromise;
    console.log("[DB] Database connected successfully");
  } catch (error) {
    connectionPromise = null;
    console.error("[DB] Database connection failed:", error instanceof Error ? error.message : error);
    if (error instanceof Error && error.stack) {
      console.error("[DB] Stack:", error.stack);
    }
    throw error;
  }
}
