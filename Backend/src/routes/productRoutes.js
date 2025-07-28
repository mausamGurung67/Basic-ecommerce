import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
} from "../controllers/productController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { upload } from "../cofig/cloudinary.js";

const router = express.Router();

router.post("/createProduct",upload.single('image'),createProduct);
router.get("/getAllProducts", getAllProducts);
router.get("/getProductById/:id", getProductById);
router.delete("/deleteProductById/:id",isLoggedIn,isAdmin,deleteProductById);
router.put("/updateProductById/:id",isLoggedIn,isAdmin,updateProductById);

export default router;
