import mongoose from "mongoose";

const couponSchema = mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },
        discount: {
            type: Number,
            required: true,
            min: 0,
            max: 100, // Percentage
        },
        expirationDate: {
            type: Date,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        minPurchaseAmount: {
            type: Number,
            default: 0,
        },
        maxDiscountAmount: {
            type: Number,
            default: null,
        },
        usageLimit: {
            type: Number,
            default: null, // Total times coupon can be used by everyone
        },
        usedCount: {
            type: Number,
            default: 0,
        },
        userUsageLimit: {
            type: Number,
            default: null, // Times a single user can use it
        },
    },
    {
        timestamps: true,
    }
);

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
