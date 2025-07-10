import mongoose from "mongoose"
import User from "../models/User.js"
import { hashPassword } from "../utils/utility.js"


const adminSeeder = async()=>{
    try{
        const adminFound = await User.findOne({email:'admin@gmail.com'});
        console.log("db is connected succefully")
        
        if(!adminFound){
            const password = hashPassword('admin')
            await  User.create({
                userName : "admin",
                password,
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