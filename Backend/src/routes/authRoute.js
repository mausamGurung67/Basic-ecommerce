import express from 'express'
import { register, login, forgotPassword, verifyOtp } from '../controllers/authController.js'
import Otp from '../models/Otp.js'
import User from '../models/User.js'
import bcrypt from "bcrypt"
import { verifyToken } from '../helper/token.js'

const router = express.Router()

router.post ('/register',register)
router.post ('/login',login)
router.post ('/forgot-Password', forgotPassword)
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

        if(
            !doesUserExist.otpExpiresAt ||
            doesUserExist.otpExpiresAt < new Date() 
        ) {
            throw new Error("User cannot change password")
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const data = await User.findOneAndUpdate(
            {email}, 
            {password: hashedPassword, otpExpiresAt: null}, 
            {new:true});

            res.clearCookie("userEmail");
        
        res.status(200).json({
            message:"Password changed successfully",
            data,
        });

    } catch (error){
        console.log(error.message) 
        res.status(400).send(error.message)
    }
})

router.get("/get-all-otps", async (req, res) => {
  try {
    const data = await Otp.find();
    res.json({ message: "Otps fetched successfully", data });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

router.get("/verify/:step", async (req, res) => {
  try {
    const { step } = req.params;
    const userEmail = req.cookies.userEmail;
    const authToken = req.cookies.authToken;

    console.log("Step:", step);

    if (step === "1") {
      console.log(authToken);
      if (!authToken) {
        throw new Error("Authentication token is missing");
      }

      const isValid = verifyToken(authToken);
      if (!isValid) {
        res.clearCookie("authToken");
        throw new Error("Invalid authentication token");
      }
    } 

    if (step === "2") {
      if (!userEmail) {
        throw new Error("User email is missing");
      }

      const isUserValid = await User.findOne({ email: userEmail });

      if (!isUserValid) {
        res.clearCookie("userEmail");
        throw new Error("User not registered");
      }
    }

    if (step === "3") {
      const isOtpVerified = await User.findOne({ email: userEmail });

      if (new Date() > isOtpVerified.otpExpiresAt) {
        throw new Error("OTP expired");
      }
    }

    res.status(200).json({ message: `Verification step ${step} passed` });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});



export default router