import express from "express";
import upload from "../middlewares/uploadMiddlewares.js";
import { protect, admin } from "../middlewares/authMiddleware.js";
import { getBanners, createBanner } from "../controllers/bannerController.js";

const router = express.Router();

router.get("/", getBanners);
router.post("/", protect, admin, upload.single("image"), createBanner);

export default router;
