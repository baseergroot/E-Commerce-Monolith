import { Router } from "express";
import Order from "../models/order.js";


const placeOrderRouter = Router();

placeOrderRouter.post("/", async (req, res) => {
    const {user, items, total} = req.body;

    if (!user || !items || !total) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    try {
        const order = await Order.create({user, items, total});
        res.json({success: true, order});
    } catch (error) {
        console.error("Error fetching orders", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

export default placeOrderRouter;