import Product from '../models/Product.js';
const createProduct = async (data) => {
    return await Product.create(data);
};

const getAllProducts = async () => {
    return await Product.find();
};

const getProductById = async (id) => {
    return await Product.findById(id);
};

const deleteProductById = async (id) => {
    return await Product.findByIdAndDelete(id);
};


export default {createProduct, getAllProducts, getProductById, deleteProductById};