import express from "express";
import upload from "../middlewares/uploadMiddlewares.js";
import { protect, admin } from "../middlewares/authMiddleware.js";
import { getBanners, createBanner, deleteBanner, updateBannerStatus } from "../controllers/bannerController.js";

const router = express.Router();

router.get("/", getBanners);
router.post("/", protect, admin, upload.single("image"), createBanner);
router.delete("/:id", protect, admin, deleteBanner);
router.put("/:id/status", protect, admin, updateBannerStatus);

export default router;
