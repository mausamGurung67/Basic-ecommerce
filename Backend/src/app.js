import express from 'express';
import connectDb from './cofig/db.js';
import userRoute from './routes/userRoute.js';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import constant from './cofig/constant.js';
import orderRoutes from './routes/orderRoute.js';

const app =  express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
connectDb()

app.use(
cors({
    origin:"http:/localhost:5173",
    credentials: true
}))
app.get('/',(req,res)=>{
    res.status(200).json({
        message : " get from app.js"
    })
})

app.get("/test", (req, res) => {
  res.cookie("name", "name", {
    maxAge: 10 * 60 * 1000,
    httpOnly: true,
  });
  res
    .status(200)
    .send(
      "<b><a style='color: white; background: black; padding: 2px'>Hello</a>, Welcome to my app!</b>"
    );
});

app.get("/api/clear-cookie", (req, res ) => {
    res.clearCookie("name", {
        maxAge: 10 * 60 * 1000, // 10 minutes
        httpOnly: true,
    });
    res.status(200).json({ message: "Cookie cleared" });
});


app.use('/api/user',userRoute )
app.use("/api/product",productRoutes)
app.use("/api/auth",authRoutes)
app.use('/api/order',orderRoutes)



const port = constant.PORT;
app.listen(port,()=>{
    console.log("port started at 4000: ",port)
})