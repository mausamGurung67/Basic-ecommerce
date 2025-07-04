import express from 'express';
import { createProduct, getAllProducts, getProductById, deleteProductById } from '../controllers/productController.js';

const router = express.Router();

router.post('/createProduct',createProduct)
router.get('/getAllProducts', getAllProducts);
router.get('/getProductById/:id', getProductById);
router.delete('/deleteProductById/:id', deleteProductById);


export default router;