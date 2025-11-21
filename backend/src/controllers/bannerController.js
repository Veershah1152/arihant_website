import asyncHandler from "express-async-handler";
import Banner from "../models/Banner.js";
import cloudinary from "../utils/cloudinary.js";

// Helper: upload buffer to Cloudinary
async function uploadBufferToCloudinary(fileBuffer, originalname) {
    const filename = `banner-${Date.now()}-${originalname.split(".")[0]}`;
    const resu = await new Promise((resolve, reject) => {
        const s = cloudinary.uploader.upload_stream(
            { folder: "ecommerce_banners", resource_type: "image", public_id: filename },
            (err, result) => (err ? reject(err) : resolve(result))
        );
        s.end(fileBuffer);
    });
    return { public_id: resu.public_id, url: resu.secure_url };
}

// Get active banners
export const getBanners = asyncHandler(async (req, res) => {
    const banners = await Banner.find({ isActive: true });
    res.json(banners);
});

// Create banner (admin)
export const createBanner = asyncHandler(async (req, res) => {
    const { title, subtitle, link } = req.body;

    if (!req.file) {
        res.status(400);
        throw new Error("Banner image is required");
    }

    const uploaded = await uploadBufferToCloudinary(req.file.buffer, req.file.originalname);

    const banner = new Banner({
        title,
        subtitle,
        link,
        image: uploaded,
    });

    const saved = await banner.save();
    res.status(201).json(saved);
});
