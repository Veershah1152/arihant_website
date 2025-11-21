console.log(">>> USING THIS APP.JS <<<");
import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddlewares.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// ADD THIS 👇
app.get("/", (req, res, next) => {
  res.send({ ok: true, message: "Backend is running" });
});

app.use((req, res, next) => {
  console.log("REQUEST PATH:", JSON.stringify(req.originalUrl));
  next();
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/users", userRoutes);

// Errors
app.use(notFound);
app.use(errorHandler);

export default app;

