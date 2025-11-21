// backend/src/routes/productRoutes.js
import express from "express";
import upload from "../middlewares/uploadMiddlewares.js";
import { protect, admin } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  getCategories
} from "../controllers/productController.js";

const router = express.Router();

// Public routes
router.get("/", getProducts);
router.get("/categories", getCategories);
router.get("/:id", getProductById);

// Admin-only routes
router.post("/", protect, admin, upload.array("images", 6), createProduct);
router.post("/upload", protect, admin, upload.single("file"), createProduct);
router.put("/:id", protect, admin, upload.array("images", 6), updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

export default router;
