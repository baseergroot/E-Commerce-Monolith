import { Router } from "express";


const healthRouter = Router();

healthRouter.get("/", async (req, res) => {
  res.json({ success: true, message: "OK" });
});

export default healthRouter;