import { createOrder,getOrderById, getOrderByUserId , updateOrderStatus, updatePaymentStatus} from "../controllers/orderController.js";
import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const router = express.Router();

router.post("/createOrder", isLoggedIn, createOrder);
router.get("/:id", isLoggedIn, getOrderById);
router.get("/userId/:id", isLoggedIn, getOrderByUserId);
router.put("/updateOrderStatus/:id", isLoggedIn, updateOrderStatus);
router.put("/updatePaymentStatus/:id", isLoggedIn, updatePaymentStatus);

export default router;