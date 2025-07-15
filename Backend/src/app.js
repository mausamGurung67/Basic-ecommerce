import { configDotenv } from 'dotenv';
import express from 'express';
import connectDb from './cofig/db.js';
import userRoute from './routes/userRoute.js';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


configDotenv();
const app =  express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
connectDb()

app.use(cors())
app.get('/',(req,res)=>{
    res.status(200).json({
        message : " get from app.js"
    })
})


app.use('/api/user',userRoute )
app.use("/api/product",productRoutes)
app.use("/api/auth",authRoutes)



const port = process.env.PORT;
app.listen(port,()=>{
    console.log("port started at 4000: ",port)
})