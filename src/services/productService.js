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

const updateProductById = async (data,id) => {
    return await Product.findByIdAndUpdate(id, data);
}


export default {
    createProduct, 
    getAllProducts, 
    getProductById, 
    deleteProductById,
    updateProductById};