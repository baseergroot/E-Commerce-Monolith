import { Router } from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const createAdminRouter = Router();

createAdminRouter.post("/", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("112233", salt);
  const user = await User.create({
    email: "admin",
    password: hashedPassword,
    role: "admin",
  });
  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET!, {expiresIn: "7d"});
  res.json({success: true, message: "Admin created successfully", token});
});

export default createAdminRouter;