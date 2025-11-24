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
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  rating: { type: Number, required: true, default: 0 },
  numReviews: { type: Number, required: true, default: 0 },
  isHidden: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Product", productSchema);
