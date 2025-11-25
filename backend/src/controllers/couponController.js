import asyncHandler from "express-async-handler";
import Coupon from "../models/Coupon.js";

// @desc    Create a new coupon
// @route   POST /api/coupons
// @access  Private/Admin
const createCoupon = asyncHandler(async (req, res) => {
    const { code, discount, expirationDate, minPurchaseAmount, maxDiscountAmount, usageLimit, userUsageLimit } = req.body;

    const couponExists = await Coupon.findOne({ code });

    if (couponExists) {
        res.status(400);
        throw new Error("Coupon already exists");
    }

    const coupon = await Coupon.create({
        code,
        discount,
        expirationDate,
        minPurchaseAmount: minPurchaseAmount || 0,
        maxDiscountAmount: maxDiscountAmount || null,
        usageLimit: usageLimit || null,
        userUsageLimit: userUsageLimit || null,
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
    const { code, cartTotal } = req.body;

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
        res.status(404);
        throw new Error("Invalid coupon code");
    }

    if (!coupon.isActive) {
        res.status(400);
        throw new Error("Coupon is inactive");
    }

    if (new Date() > coupon.expirationDate) {
        res.status(400);
        throw new Error("Coupon has expired");
    }

    // Check minimum purchase amount
    if (cartTotal < coupon.minPurchaseAmount) {
        res.status(400);
        throw new Error(`Minimum purchase of $${coupon.minPurchaseAmount} required`);
    }

    // Check total usage limit
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
        res.status(400);
        throw new Error("Coupon usage limit reached");
    }

    // Check per-user usage limit
    if (coupon.userUsageLimit) {
        const Order = (await import("../models/Order.js")).default;
        const userOrdersWithCoupon = await Order.countDocuments({
            user: req.user._id,
            couponCode: coupon.code,
        });

        if (userOrdersWithCoupon >= coupon.userUsageLimit) {
            res.status(400);
            throw new Error(`You have already used this coupon ${coupon.userUsageLimit} time(s)`);
        }
    }

    // Calculate discount amount with max cap
    let discountAmount = (cartTotal * coupon.discount) / 100;
    if (coupon.maxDiscountAmount && discountAmount > coupon.maxDiscountAmount) {
        discountAmount = coupon.maxDiscountAmount;
    }

    res.json({
        code: coupon.code,
        discount: coupon.discount,
        discountAmount: discountAmount.toFixed(2),
        minPurchaseAmount: coupon.minPurchaseAmount,
        maxDiscountAmount: coupon.maxDiscountAmount,
    });
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
