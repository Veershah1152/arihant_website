import express from "express";
import {
    createCoupon,
    validateCoupon,
    getCoupons,
    deleteCoupon,
} from "../controllers/couponController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, admin, createCoupon).get(protect, admin, getCoupons);
router.route("/validate").post(protect, validateCoupon);
router.route("/:id").delete(protect, admin, deleteCoupon);

export default router;
