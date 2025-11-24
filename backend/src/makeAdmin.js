// Run this script to make a user an admin
// Usage: node makeAdmin.js <email>

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import User from "./models/User.js";

dotenv.config({ path: "./.env" });

const makeAdmin = async (email) => {
    try {
        await connectDB();

        const user = await User.findOne({ email });

        if (!user) {
            console.log(`❌ User with email ${email} not found`);
            process.exit(1);
        }

        user.isAdmin = true;
        await user.save();

        console.log(`✅ User ${user.name} (${user.email}) is now an admin!`);
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

const email = process.argv[2];

if (!email) {
    console.log("Usage: node makeAdmin.js <email>");
    process.exit(1);
}

makeAdmin(email);
