import { Router } from "express";
import Product from "../models/product.js";


const getAllProductsRouter = Router();

getAllProductsRouter.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json({success: true, products});
    } catch (error) {
        console.error("Error fetching products", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

export default getAllProductsRouter;