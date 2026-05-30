import { Router } from "express";
import Product from "../models/product";

const seedProductsRouter = Router();

seedProductsRouter.get("/", async (req, res) => {
  try {
    const adjectives = ["Wireless", "Smart", "Portable", "Ergonomic", "Premium", "Durable", "Compact", "Luxury", "Classic", "Modern"];
    const nouns = ["Headphones", "Speaker", "Monitor", "Keyboard", "Mouse", "Jacket", "Sneakers", "Backpack", "Watch", "Camera"];
    const categories = ["Electronics", "Clothing", "Home & Kitchen", "Sports", "Accessories"];

    const productsToSeed = [];

    for (let i = 1; i <= 50; i++) {
      const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      const category = categories[i % categories.length];
      
      productsToSeed.push({
        name: `${adjective} ${noun} ${i}`,
        description: `This ${adjective.toLowerCase()} ${noun.toLowerCase()} is perfect for your everyday needs. Highly recommended in the ${category} category.`,
        price: Math.floor(Math.random() * 1000) + 15,
        stock: Math.floor(Math.random() * 50) + 5,
        images: [`https://via.placeholder.com/300?text=${adjective}+${noun}`],
        category: category
      });
    }

    // Clear existing products
    await Product.deleteMany({});
    
    // Insert new products
    const inserted = await Product.insertMany(productsToSeed);
    
    res.json({ success: true, message: `Successfully seeded ${inserted.length} products.`, products: inserted });
  } catch (error) {
    console.error("Failed to seed products", error);
    res.status(500).json({ success: false, message: "Failed to seed products", error });
  }
});

export default seedProductsRouter;