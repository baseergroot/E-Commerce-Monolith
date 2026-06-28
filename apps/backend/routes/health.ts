import { Router } from "express";


const healthRouter = Router();

healthRouter.get("/", async (req, res) => {
  res.json({ success: true, message: "OK", update: "updated 1" });
});

export default healthRouter;