import express from "express";
import connectDB from "../lib/db";
import router from "../routes/helper";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());


await connectDB();

app.use(router) 


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});