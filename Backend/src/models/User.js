import mongoose from "mongoose";


const userSchema =  new mongoose.Schema({

    userName : {
        type : String,
        required: true
    },
    email : {
        type : String,
        unique : true,
        required :true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : Number
    },
    role : {
        type : String,
        enum : ['ADMIN', 'CUSTOMER'],
        default :"CUSTOMER"
    },
    otpExpiresAt:{
        type:Date, 
        default : null,
    }

},{
    timestamps:true
})



const User =  mongoose.model('User',userSchema);

export default User;