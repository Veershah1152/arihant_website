import asyncHandler from "express-async-handler";
import Collection from "../models/Collection.js";
import cloudinary from "../utils/cloudinary.js";

// @desc    Get all active collections (public)
// @route   GET /api/collections
// @access  Public
const getCollections = asyncHandler(async (req, res) => {
    const collections = await Collection.find({ isActive: true }).sort({ order: 1 });
    res.json(collections);
});

// @desc    Get all collections (admin)
// @route   GET /api/collections/admin
// @access  Private/Admin
const getAllCollections = asyncHandler(async (req, res) => {
    const collections = await Collection.find({}).sort({ order: 1 });
    res.json(collections);
});

// @desc    Create a new collection
// @route   POST /api/collections
// @access  Private/Admin
const createCollection = asyncHandler(async (req, res) => {
    const { title, description, category, productCount, image, order } = req.body;

    const categoryExists = await Collection.findOne({ category: category.toLowerCase() });

    if (categoryExists) {
        res.status(400);
        throw new Error("Collection with this category already exists");
    }

    // Upload image to Cloudinary
    let uploadedImage;
    if (image) {
        uploadedImage = await cloudinary.uploader.upload(image, {
            folder: "collections",
            transformation: [
                { width: 800, height: 600, crop: "fill" },
                { quality: "auto" },
            ],
        });
    } else {
        res.status(400);
        throw new Error("Image is required");
    }

    const collection = await Collection.create({
        title,
        description,
        category: category.toLowerCase(),
        productCount: productCount || 0,
        image: {
            url: uploadedImage.secure_url,
            publicId: uploadedImage.public_id,
        },
        order: order || 0,
    });

    res.status(201).json(collection);
});

// @desc    Update a collection
// @route   PUT /api/collections/:id
// @access  Private/Admin
const updateCollection = asyncHandler(async (req, res) => {
    const { title, description, category, productCount, image, isActive, order } = req.body;

    const collection = await Collection.findById(req.params.id);

    if (!collection) {
        res.status(404);
        throw new Error("Collection not found");
    }

    // Check if category is being changed and if it already exists
    if (category && category.toLowerCase() !== collection.category) {
        const categoryExists = await Collection.findOne({
            category: category.toLowerCase(),
            _id: { $ne: req.params.id }
        });

        if (categoryExists) {
            res.status(400);
            throw new Error("Collection with this category already exists");
        }
    }

    // Update image if provided
    if (image && image !== collection.image.url) {
        // Delete old image from Cloudinary
        if (collection.image.publicId) {
            await cloudinary.uploader.destroy(collection.image.publicId);
        }

        // Upload new image
        const uploadedImage = await cloudinary.uploader.upload(image, {
            folder: "collections",
            transformation: [
                { width: 800, height: 600, crop: "fill" },
                { quality: "auto" },
            ],
        });

        collection.image = {
            url: uploadedImage.secure_url,
            publicId: uploadedImage.public_id,
        };
    }

    collection.title = title || collection.title;
    collection.description = description || collection.description;
    collection.category = category ? category.toLowerCase() : collection.category;
    collection.productCount = productCount !== undefined ? productCount : collection.productCount;
    collection.isActive = isActive !== undefined ? isActive : collection.isActive;
    collection.order = order !== undefined ? order : collection.order;

    const updatedCollection = await collection.save();
    res.json(updatedCollection);
});

// @desc    Delete a collection
// @route   DELETE /api/collections/:id
// @access  Private/Admin
const deleteCollection = asyncHandler(async (req, res) => {
    const collection = await Collection.findById(req.params.id);

    if (!collection) {
        res.status(404);
        throw new Error("Collection not found");
    }

    // Delete image from Cloudinary
    if (collection.image.publicId) {
        await cloudinary.uploader.destroy(collection.image.publicId);
    }

    await collection.deleteOne();
    res.json({ message: "Collection removed" });
});

export { getCollections, getAllCollections, createCollection, updateCollection, deleteCollection };
