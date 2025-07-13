import express from 'express'
import { register, login, forgotPassword } from '../controllers/authController.js'
import { generateOTP } from '../utils/generateOTP.js'
import Otp from '../models/Otp.js'
import { sendMail } from '../utils/sendMail.js'

const router = express.Router()

router.post ('/register',register)
router.post ('/login',login)
// router.post ('/forgotPassword', forgotPassword)
router.post ('/forgotPassword', async(req,res)=>{
    try{
        const { email } = req.body;
        console.log("email", email);
        if(!email){
            throw new Error("Email is required")
        }

        const otp = generateOTP();

        const newOtp = await Otp.create({
            email: email,
            otp: otp
        });

        sendMail(email, otp);
        res.send(newOtp);
    } catch (error){
        console.log(error.message);
        res.send(error.message);
    }
})


router.post("/verify-otp",async(req,res)=>{

    try{
        const {email,otp}=req.body;

        const doesExit= await Otp.findOne({email:email});

        if(!doesExit){
            throw new Error("user does not exist");
        }
    
        if (doesExit.otp !== otp){
            throw new Error("otp did not match");
        } 
       
        res.status(200).json({
            message:"otp verified successfully"
        })

    }catch(error){
        console.log(error.message);
        res.send(error.message)
        
    }   
})


export default router