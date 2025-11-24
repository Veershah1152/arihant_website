import express from "express";
import productRoutes from "./routes/productRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddlewares.js";

const app = express();

// CORS - Allow all origins for development (must be first!)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && (origin.includes('localhost') || origin.includes('127.0.0.1'))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ADD THIS 👇
app.get("/", (req, res, next) => {
  res.send({ ok: true, message: "Backend is running" });
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/coupons", couponRoutes);

// Errors
app.use(notFound);
app.use(errorHandler);

export default app;

