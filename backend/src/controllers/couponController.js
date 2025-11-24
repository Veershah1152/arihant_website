import asyncHandler from "express-async-handler";
import Coupon from "../models/Coupon.js";

// @desc    Create a new coupon
// @route   POST /api/coupons
// @access  Private/Admin
const createCoupon = asyncHandler(async (req, res) => {
    const { code, discount, expirationDate } = req.body;

    const couponExists = await Coupon.findOne({ code });

    if (couponExists) {
        res.status(400);
        throw new Error("Coupon already exists");
    }

    const coupon = await Coupon.create({
        code,
        discount,
        expirationDate,
    });

    if (coupon) {
        res.status(201).json(coupon);
    } else {
        res.status(400);
        throw new Error("Invalid coupon data");
    }
});

// @desc    Validate coupon
// @route   POST /api/coupons/validate
// @access  Private
const validateCoupon = asyncHandler(async (req, res) => {
    const { code } = req.body;

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (coupon && coupon.isActive) {
        if (new Date() > coupon.expirationDate) {
            res.status(400);
            throw new Error("Coupon has expired");
        }
        res.json({
            code: coupon.code,
            discount: coupon.discount,
        });
    } else {
        res.status(404);
        throw new Error("Invalid or inactive coupon");
    }
});

// @desc    Get all coupons
// @route   GET /api/coupons
// @access  Private/Admin
const getCoupons = asyncHandler(async (req, res) => {
    const coupons = await Coupon.find({});
    res.json(coupons);
});

// @desc    Delete coupon
// @route   DELETE /api/coupons/:id
// @access  Private/Admin
const deleteCoupon = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findById(req.params.id);

    if (coupon) {
        await coupon.deleteOne();
        res.json({ message: "Coupon removed" });
    } else {
        res.status(404);
        throw new Error("Coupon not found");
    }
});

export { createCoupon, validateCoupon, getCoupons, deleteCoupon };
