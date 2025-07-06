import mongoose from "mongoose"


const connectDb = async ()=>{

    try {
        
        await mongoose.connect(process.env.MONGO_URI)  //so yesma process.env.MONGO_URI ma hami ko database ko uri huncha process.env ma hami le define gareko huncha
        console.log("db connected successfully")

    } catch (error) {
        console.log(error.message)
    }
}


export default connectDb;