import { Router } from "express";
import Product from "../models/product";


const searchProductsRouter = Router();

searchProductsRouter.get("/", async (req, res) => {

    const { searchTerm } = req.query;

    console.log("search params", req.query.searchTerm);

    if (!searchTerm) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    try {
      // we should use or operator to find the product not and operator as it will only give result if both condition are true and add categroy and should replce price with description as well bcz no search on price base
      // also check stock is greater than 0 and catgeory should also be matching
      
        const term = searchTerm as string;
        const result = await Product.find({
          // stock: { $gt: 0 },
          $or: [
            {
              name: {
                $regex: term,
                $options: "i"
              }
            },
            {
              description: {
                $regex: term,
                $options: "i"
              }
            },
            {
              category: {
                $regex: term,
                $options: "i"
              }
            }
          ]
        });

        
        res.json({success: true, result});
    } catch (error) {
        console.error("Error fetching orders", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

export default searchProductsRouter;