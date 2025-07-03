import mongoose, { mongo } from "mongoose";



const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },

    productDesctription: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    ram : {
        type: String
    },
    rom : {
        type: String
    },
    stock: {
        type: Number,
        deafult: 0
    },
    imageUrl: {
        type: String
    },
    featured: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        deafult: true
    },
    rating:{
        type: Number,
        defaul: 0
    }
},{
    timestamps: true

});

const Product = mongoose.model("Product",productSchema)

export default Product;