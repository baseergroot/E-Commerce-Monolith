// this import all routers and add prefix to them api/v1

import { Router } from "express";
import getAllProductsRouter from "./getAllProducts.js";
import healthRouter from "./health.js";
import createProductRouter from "./createProduct.js";
import deleteProductRouter from "./deleteProduct.js";
import updateProductRouter from "./updateProduct.js";
import getSingleProductRouter from "./getSingleProduct.js";
import placeOrderRouter from "./placeOrder.js";
import searchProductsRouter from "./searchProducts.js";
import recommendProductsRouter from "./recommendedProducts.js";
import seedProductsRouter from "./bulkSeedProducts.js";
import createAdminRouter from "./createAdmin.js";
import loginRouter from "./login.js";

const router = Router();

router.use("/api/v1/health", healthRouter);
router.use("/api/v1/products/seed", seedProductsRouter);
router.use("/api/v1/products/order", placeOrderRouter);
router.use("/api/v1/products/search", searchProductsRouter);
router.use("/api/v1/products/recommend", recommendProductsRouter);
router.use("/api/v1/products", getAllProductsRouter);
router.use("/api/v1/products", createProductRouter);
router.use("/api/v1/products", deleteProductRouter);
router.use("/api/v1/products", updateProductRouter);
router.use("/api/v1/products", getSingleProductRouter);
router.use("/api/v1/admin", createAdminRouter);
router.use("/api/v1/login", loginRouter);

export default router;
