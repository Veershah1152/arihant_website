import express from "express";
import {
    authUser,
    registerUser,
    googleAuth,
    getUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", authUser);
router.post("/google", googleAuth);
router.get("/profile", protect, getUserProfile);

export default router;
