import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import connectDB from "./db/index.js";

dotenv.config({ path: "./.env" });

const sampleProducts = [
    {
        name: "Modern Walnut Desk",
        description: "A sleek, adjustable standing desk made from premium walnut wood. Perfect for your home office.",
        price: 899,
        category: "Workspace",
        images: [
            {
                public_id: "seed-desk-1",
                url: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
            },
            {
                public_id: "seed-desk-2",
                url: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80",
            },
        ],
    },
    {
        name: "Ergonomic Office Chair",
        description: "Supportive mesh chair with lumbar support and adjustable armrests.",
        price: 299,
        category: "Workspace",
        images: [
            {
                public_id: "seed-chair-1",
                url: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=800&q=80",
            },
        ],
    },
    {
        name: "Minimalist Table Lamp",
        description: "Warm LED light with a matte black finish. Touch control brightness.",
        price: 49,
        category: "Living",
        images: [
            {
                public_id: "seed-lamp-1",
                url: "https://images.unsplash.com/photo-1507473888900-52e1adad5420?auto=format&fit=crop&w=800&q=80",
            },
        ],
    },
    {
        name: "Ceramic Plant Pot",
        description: "Hand-crafted ceramic pot, perfect for indoor plants.",
        price: 25,
        category: "Living",
        images: [
            {
                public_id: "seed-plant-1",
                url: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80",
            },
        ],
    },
    {
        name: "Wireless Noise Cancelling Headphones",
        description: "Immersive sound with active noise cancellation and 30-hour battery life.",
        price: 349,
        category: "Tech",
        images: [
            {
                public_id: "seed-headphones-1",
                url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
            },
        ],
    },
    {
        name: "Travel Backpack",
        description: "Water-resistant, durable backpack with laptop compartment.",
        price: 120,
        category: "Travel",
        images: [
            {
                public_id: "seed-bag-1",
                url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
            },
        ],
    },
];

const seedDB = async () => {
    try {
        await connectDB();

        // Optional: Clear existing products
        // await Product.deleteMany({});
        // console.log("Cleared existing products");

        await Product.insertMany(sampleProducts);
        console.log("✅ Seeded database with sample products!");

        process.exit();
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
};

seedDB();
