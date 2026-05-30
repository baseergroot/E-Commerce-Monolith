import { Router } from "express";
import Product from "../models/product";


const updateProductRouter = Router();

updateProductRouter.put("/:id", async (req, res) => {

  const productId = req.params.id;

  if (!productId) {
    return res.status(400).json({ success: false, message: "No product ID provided" });
  }

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ success: false, message: "No product with this ID found" });
  }

  const {name, price, description, images, category, stock} = req.body;

  if (!name || !price || !description || !images || !category || !stock) {
    return res.status(400).json({ success: false, message: "Missing product details" });
  }

  try {
    await Product.updateOne({_id: productId}, {name, price, description, images, category, stock});

    return res.status(200).json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default updateProductRouter;