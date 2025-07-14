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
        const {email, password} = req.body

        if(!email || !password){
            throw new Error("Email and password required");
        }

        const doesUserExist = await User.findOne({email});

        if(!doesUserExist){
            throw new Error("User not registered")
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const data = await User.findOneAndUpdate({email}, {password: hashedPassword}, {new:true})
        
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