import mongoose from "mongoose"
import { adminSeeder } from "../seeders/adminSeeder.js";
import constant from "./constant.js";


const connectDb = async ()=>{

    try {
        
        await mongoose.connect(constant.MONGO_URI)  //so yesma constant.MONGO_URI ma hami ko database ko uri huncha constant ma hami le define gareko huncha
        console.log("db connected successfully")
        adminSeeder()

    } catch (error) {
        console.log(error.message)
    }
}


export default connectDb;