import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import Coupon from "./models/Coupon.js";

dotenv.config({ path: "./.env" });

const coupons = [
    {
        code: "WELCOME10",
        discount: 10,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        isActive: true,
    },
    {
        code: "SAVE20",
        discount: 20,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        isActive: true,
    },
    {
        code: "FLASH50",
        discount: 50,
        expirationDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
        isActive: true,
    },
];

const seedCoupons = async () => {
    try {
        await connectDB();

        await Coupon.deleteMany();
        console.log("Coupons deleted");

        await Coupon.insertMany(coupons);
        console.log("Coupons imported!");

        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedCoupons();
