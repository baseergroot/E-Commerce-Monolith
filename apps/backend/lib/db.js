import mongoose from "mongoose";
let connectionPromise = null;
export default async function connectDB() {
    const mongo_uri = process.env.MONGO_URI;
    if (!mongo_uri) {
        console.warn("MONGO_URI is not defined; skipping database connection.");
        return;
    }
    if (mongoose.connection.readyState === 1) {
        return;
    }
    if (!connectionPromise) {
        connectionPromise = mongoose.connect(mongo_uri, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 5000,
        });
    }
    try {
        await connectionPromise;
        console.log("Database connected");
    }
    catch (error) {
        connectionPromise = null;
        console.error("Database connection failed", error);
        throw error;
    }
}
