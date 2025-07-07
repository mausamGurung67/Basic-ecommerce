import mongoose from "mongoose"
import User from "../models/User.js"


const adminSeeder = async()=>{
    try{
        const adminFound = await mongoose.connect(process.env.MONGO_URI)
        console.log("db is connected succefully")
        
        if(!adminFound){
            User.create({
                userName : "admin",
                password: "admin",
                email: "admin@gmail.com",
                phone: 9807373362,
                role: "ADMIN"
            })
        console.log("Admin is sedded. ")
    }
    else{
        console.log("Admin already exists")
    }

    }catch(error){
        console.log(error.message)
    }
}

export {adminSeeder}