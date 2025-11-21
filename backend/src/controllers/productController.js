// backend/src/controllers/productController.js
import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";
import cloudinary from "../utils/cloudinary.js";

/**
 * Helper: upload one file buffer to Cloudinary and return { public_id, url }
 */
async function uploadBufferToCloudinary(fileBuffer, originalname) {
  const filename = `${Date.now()}-${originalname.split(".")[0]}`;
  const resu = await new Promise((resolve, reject) => {
    const s = cloudinary.uploader.upload_stream(
      { folder: "ecommerce_products", resource_type: "image", public_id: filename },
      (err, result) => (err ? reject(err) : resolve(result))
    );
    s.end(fileBuffer);
  });
  return { public_id: resu.public_id, url: resu.secure_url };
}

// Create a product with images (multipart/form-data)
// Accepts:
// - multiple files in req.files (field name 'images')
// - OR single file in req.file (field name 'file')
// Fields expected: name, description, price, category
export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category } = req.body;
  if (!name || !price) {
    res.status(400);
    throw new Error("Name and price are required");
  }

  // Gather files from either req.files (array) or req.file (single)
  let filesArray = [];
  if (Array.isArray(req.files) && req.files.length > 0) {
    filesArray = req.files;
  } else if (req.file) {
    filesArray = [req.file];
  }

  // Upload images to Cloudinary if provided
  const uploadedImages = [];
  for (const file of filesArray) {
    // note: file.buffer exists because multer uses memoryStorage
    const uploaded = await uploadBufferToCloudinary(file.buffer, file.originalname || "image");
    uploadedImages.push(uploaded);
  }

  // Create product document
  const product = new Product({
    name,
    description,
    price: Number(price),
    category,
    images: uploadedImages
  });

  const saved = await product.save();
  res.status(201).json(saved);
});

// Get all products with filtering, sorting, and pagination
export const getProducts = asyncHandler(async (req, res) => {
  const { category, minPrice, maxPrice, sort, page = 1, limit = 10 } = req.query;

  // Build query object
  const query = {};

  if (category) {
    query.category = category;
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  // Build sort object
  let sortOptions = {};
  if (sort === "price_asc") {
    sortOptions.price = 1;
  } else if (sort === "price_desc") {
    sortOptions.price = -1;
  } else if (sort === "newest") {
    sortOptions.createdAt = -1;
  } else {
    // Default sort
    sortOptions.createdAt = -1;
  }

  // Pagination
  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  const products = await Product.find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(limitNum);

  const total = await Product.countDocuments(query);

  res.json({
    products,
    page: pageNum,
    pages: Math.ceil(total / limitNum),
    total,
  });
});

// Get single product
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Update product
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;

    // Handle image upload if files are present
    let filesArray = [];
    if (Array.isArray(req.files) && req.files.length > 0) {
      filesArray = req.files;
    } else if (req.file) {
      filesArray = [req.file];
    }

    if (filesArray.length > 0) {
      const uploadedImages = [];
      for (const file of filesArray) {
        const uploaded = await uploadBufferToCloudinary(file.buffer, file.originalname || "image");
        uploadedImages.push(uploaded);
      }
      // Append to existing images
      product.images = [...product.images, ...uploadedImages];
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Delete product
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    // Optional: Delete images from cloudinary
    // for (const img of product.images) {
    //   await cloudinary.uploader.destroy(img.public_id);
    // }

    await product.deleteOne();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Get all distinct categories
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct("category");
  res.json(categories);
});
