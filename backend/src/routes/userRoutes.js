import express from "express";
import {
    authUser,
    registerUser,
    googleAuth,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getWishlist,
    addToWishlist,
    removeFromWishlist,
} from "../controllers/userController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
router.post("/google", googleAuth);
router
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router
    .route("/wishlist")
    .get(protect, getWishlist)
    .post(protect, addToWishlist);

router.delete("/wishlist/:productId", protect, removeFromWishlist);

export default router;
