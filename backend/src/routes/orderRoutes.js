import express from "express";
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderToDelivered,
} from "../controllers/orderController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, admin, getAllOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
