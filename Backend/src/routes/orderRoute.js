import { createOrder,getOrderById, getOrderByUserId , updateOrderStatus, updatePaymentStatus, updateKhaltiPaymentStatus} from "../controllers/orderController.js";
import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const router = express.Router();

router.post("/createOrder", isLoggedIn, createOrder);   
router.get("/:id", isLoggedIn, getOrderById);
router.get("/userId/:id", isLoggedIn, getOrderByUserId);
router.post("/updateOrderStatus/:id", isLoggedIn, updateOrderStatus);
router.post("/updatePaymentStatus/:id", isLoggedIn, updatePaymentStatus);
router.post("/updateKhaltiPaymentStatus", isLoggedIn, updateKhaltiPaymentStatus);

export default router;