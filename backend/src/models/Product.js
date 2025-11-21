import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  public_id: { type: String, required: true },
  url: { type: String, required: true }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true, default: 0 },
  images: [ImageSchema],
  category: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Product", productSchema);
