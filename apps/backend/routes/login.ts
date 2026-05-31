import { Router } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const loginRouter = Router();

loginRouter.post("/", async (req, res) => {
  const user = await User.findOne({email: req.body.email});
  if(!user){
    return res.status(404).json({success: false, message: "Invalid credentials"});
  }
  const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  if(!isPasswordValid){
    return res.status(401).json({success: false, message: "Invalid credentials"});
  }
  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET!, {expiresIn: "7d"});
  res.json({success: true, message: "Login successful", token});
});

export default loginRouter;