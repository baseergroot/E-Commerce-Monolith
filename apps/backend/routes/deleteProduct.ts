import { Router } from "express";
import Product from "../models/product.js";


const deleteProductRouter = Router();

deleteProductRouter.delete("/:id", async (req, res) => {

  const productId = req.params.id;

  if (!productId) {
    return res.status(400).json({ success: false, message: "No product ID provided" });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "No product with this ID found" });
    }

    return res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default deleteProductRouter;