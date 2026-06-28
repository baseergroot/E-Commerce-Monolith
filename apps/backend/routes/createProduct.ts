import { Router } from "express";
import Product from "../models/product.js";


const createProductRouter = Router();

createProductRouter.post("/", async (req, res) => {
  const product = req.body;

  if (!product) {
    return res.status(400).json({ success: false, message: "No product provided" });
  }

  const {name, price, description, images, category, stock} = product;

  if (!name || !price || !description || !images || !category || !stock) {
    return res.status(400).json({ success: false, message: "Missing product details" });
  }

  await Product.create({name, price, description, images, category, stock});

  return res.status(201).json({ success: true, message: "Product is created successfully" });
});

export default createProductRouter;