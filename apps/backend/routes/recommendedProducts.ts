import { Router } from "express";
import Product from "../models/product";


const recommendProductsRouter = Router();

recommendProductsRouter.get("/", async (req, res) => {

    const { catagory } = req.query; 

    console.log("recomendation routes query:", req.query);

    if (!catagory) {
        return res.status(400).json({ success: false, message: "Catagory is required" });
    }
    try {

        // only get 5 products based on the catagory (case-insensitive)
        const result = await Product.find({
            category: {
                $regex: catagory as string,
                $options: "i"
            }
        }).limit(5);

        if (!result) {
            return res.status(404).json({ success: false, message: "No products found" });
        }
        
        res.json({success: true, result, length: result.length});
    } catch (error) {
        console.error("Error fetching orders", error);
        res.status(500).json({ success: false, message: "Internal server error at recommendProductsRouter" });
    }
});

export default recommendProductsRouter;