import mongoose from "mongoose";
import {v4 as uuidv4} from 'uuid';
import Product from "./Product";



const orderSchema = new mongoose.Schema({

    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },

    oderNumber : {
        type: String,
        default: ()=>uuidv4()
    },

    cartItem : {
        type : [    
            {
                product : {type : mongoose.Schema.Types.ObjectId, ref : "Product", required: true},
                quantity : {type : Number, default: 1}
            }
        ]
    }, 

    location : {
        type : string,
        required : true
    },

    phone : {
        type : String, 
        required : true
    },

    orderStatus : {
        type : String,
        enum : ["pending", "confirmed", "delivering", "delivered", "cancelled"],
        default : "pending"
    },

    paymentStatus : {
        type : String,
        enum : ["pending", "paid", "failed"],
        default : "pending"
    },

    paymentMethod : {
        type : String,
        enum : ["cod", "online"],
        default : "cod"
    }
})
const Order = mongoose.model('order', orderSchema)

export default Order;