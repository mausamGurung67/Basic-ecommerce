import { cloudinary } from '../cofig/cloudinary.js';
import Product from '../models/Product.js'; //filter haruko kam vaneko maximum sabai services ma use garna 
const createProduct = async (data) => {
    return await Product.create(data);
}; 

//map ko kam vaneko array lai arko array ma convert garne ho

const getAllProducts = async (query = {}) => {

    const filters = {}
    if(query.brands) {filters.brand = {$in :query.brands.split(',')} }
    if(query.ram) {filters.ram = {$in :query.ram.split(',').map(n=>parseInt(n))} } //so yo chai one line wala ho parse gareko  
    if(query.rom) {filters.rom = {$in :query.rom.split(',').map(n=>parseInt(r))} }
    if(query.gen) {filters.gen = {$in :query.gen.split(',').map(n=>parseInt(g))} }
    if(query.product) {filters.productName = {$regex: query.product, $options: 'i'} } //i vaneko case insensitive ho
   
    console.log(filters)

    const sort = 
    console.log(query.brands.split(','))
    console.log(query.ram.split(',').map(n=>parseInt(n)))
    return filters

    return await Product.find(filters);
};

const getProductById = async (id) => {
    return await Product.findById(id);
};

const deleteProductById = async (id) => {
    const product = await Product.findOne({_id: id});
    const imageName = product.imageName;
    console.log(imageName);

    const deletedImage = await cloudinary.uploader.destroy(imageName)
    console.log(deletedImage);
    return product;

    return await Product.deleteOne({_id: id});
};

const updateProductById = async (data,id) => {
    const product = await Product.findById(id);

    if (data.imageName){
        const oldImageName = product.imageName;
        await cloudinary.uploader.destroy(oldImageName);
    }

    return await Product.findByIdAndUpdate(id, data, { new: true});
}

export default {
    createProduct, 
    getAllProducts, 
    getProductById, 
    deleteProductById,
    updateProductById};