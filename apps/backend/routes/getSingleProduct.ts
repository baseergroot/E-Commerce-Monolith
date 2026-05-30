import { Router } from "express";
import Product from "../models/product";


const getSingleProductRouter = Router();

getSingleProductRouter.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: "No product with this ID found" });
        }

        res.json({success: true, product});
    } catch (error) {
        console.error("Error fetching product", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

export default getSingleProductRouter;