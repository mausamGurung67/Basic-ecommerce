import express from 'express'
import { register, login, forgotPassword, verifyOtp } from '../controllers/authController.js'
import { generateOTP } from '../utils/generateOTP.js'
import Otp from '../models/Otp.js'
import { sendMail } from '../utils/sendMail.js'
import User from '../models/User.js'
import bcrypt from "bcrypt"

const router = express.Router()

router.post ('/register',register)
router.post ('/login',login)
// router.post ('/forgotPassword', forgotPassword)
router.post ('/forgotPassword', forgotPassword)
router.post("/verify-otp", verifyOtp)
router.post("/reset-password", async(req,res) => {
    try{
        const {password} = req.body
        const email = req.cookies.userEmail;

        if(!email || !password){
            throw new Error("Email and password required");
        }

        const doesUserExist = await User.findOne({email});

        if(!doesUserExist){
            throw new Error("User not registered")
        }

        if(!doesUserExist.canChangePassword){
            throw new Error("Please verify OTP first")
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const data = await User.findOneAndUpdate(
            {email}, 
            {password: hashedPassword, canChangePassword: false }, 
            {new:true});

            res.clearCookie("userEmail");
        
        res.status(200).json({
            message:"Password changed successfully",
            data,
        });

    } catch (error){
        console.log(error.message) 
        res.send(error.message)
    }
})


export default router