import { Router } from "express";
import Product from "../models/product";


const recommendProductsRouter = Router();

recommendProductsRouter.get("/", async (req, res) => {

    const { category } = req.query;

    console.log("recommendation routes query:", req.query);

    if (!category) {
        return res.status(400).json({ success: false, message: "Category is required" });
    }
    try {

        // only get 5 products based on the category (case-insensitive)
        const result = await Product.find({
            category: {
                $regex: category as string,
                $options: "i"
            }
        }).limit(5);

        if (!result || result.length === 0) {
            return res.status(404).json({ success: false, message: "No products found" });
        }

        res.json({ success: true, result, length: result.length });
    } catch (error) {
        console.error("Error fetching orders", error);
        res.status(500).json({ success: false, message: "Internal server error at recommendProductsRouter" });
    }
});

export default recommendProductsRouter;