import { createOrder } from "../controllers/orderController.js";
import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const router = express.Router();

router.post("/createOrder", isLoggedIn, createOrder);


export default router;