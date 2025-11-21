import mongoose from "mongoose";
import dotenv from "dotenv";
import Banner from "./models/Banner.js";
import connectDB from "./db/index.js";

dotenv.config({ path: "./.env" });

const sampleBanners = [
    {
        title: "Modern Living",
        subtitle: "Upgrade your space with our new collection.",
        image: {
            public_id: "seed-banner-1",
            url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
        },
        link: "/shop?category=Living",
    },
    {
        title: "Work From Home",
        subtitle: "Ergonomic furniture for maximum productivity.",
        image: {
            public_id: "seed-banner-2",
            url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
        },
        link: "/shop?category=Workspace",
    },
];

const seedBanners = async () => {
    try {
        await connectDB();

        // Optional: Clear existing banners
        // await Banner.deleteMany({});

        await Banner.insertMany(sampleBanners);
        console.log("✅ Seeded database with sample banners!");

        process.exit();
    } catch (error) {
        console.error("❌ Error seeding banners:", error);
        process.exit(1);
    }
};

seedBanners();
