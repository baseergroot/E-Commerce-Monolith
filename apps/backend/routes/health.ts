import { Router } from "express";


const healthRouter = Router();

healthRouter.get("/", async (req, res) => {
  res.json({ success: true, message: "OK", update: "update 3" });
});

export default healthRouter; 