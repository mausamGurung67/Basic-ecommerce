import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const orderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    orderNumber : {
        type : String,
        default : ()=>uuidv4()
    },
    cartItems :{
        type :[
            {
                product : {type : mongoose.Schema.Types.ObjectId,ref :'Product'},
                quantity : {type : Number, default : 1}


            }
        ]
    },
    location : {
        type : String,
        required : true
    },
    phone : {
        type : String
    },
    orderStatus :{
        type : String,
        enum : ['pending','confirmed','shipping','delivered','cancelled']
    },
    paymentStatus : {
        type : String,
        enum : ['paid','notPaid'],
        default : 'notPaid'
    },
    paymentMethod :{
        type : String,
        enum : ['cod','khalti']
    },
    totalAmount : {
        type : Number,
        required : true
    },
    pidx: {
    type: String,
},

})
const Order = mongoose.model ('Order',orderSchema)

export default Order;