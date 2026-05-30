// this import all routers and add prefix to them api/v1

import { Router } from "express";
import getAllProductsRouter from "./getAllProducts";
import healthRouter from "./health";
import createProductRouter from "./createProduct";
import deleteProductRouter from "./deleteProduct";
import getSingleProductRouter from "./getSingleProduct";
import placeOrderRouter from "./placeOrder";
import searchProductsRouter from "./searchProducts";
import recommendProductsRouter from "./recommendedProducts";
import seedProductsRouter from "./bulkSeedProducts";

const router = Router();

router.use("/api/v1/health", healthRouter);
router.use("/api/v1/products/seed", seedProductsRouter);
router.use("/api/v1/products/order", placeOrderRouter);
router.use("/api/v1/products/search", searchProductsRouter);
router.use("/api/v1/products/recommend", recommendProductsRouter);
router.use("/api/v1/products", getAllProductsRouter);
router.use("/api/v1/products", createProductRouter);
router.use("/api/v1/products", deleteProductRouter);
router.use("/api/v1/products", getSingleProductRouter);

export default router;
