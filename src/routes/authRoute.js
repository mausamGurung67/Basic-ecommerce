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

        const doesExist = await Otp.findOne({email})
        
        let newOtp;

        if (!doesExist) {
            newOtp = await Otp.create({
            email: email,
            otp: otp
            });
        } else {

            newOtp = await Otp.findOneAndUpdate({email},{
            otp: otp,
            createdAt: new Date(),
            },
            {
                new: true
            })
        }

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

        const doesExist= await Otp.findOne({email:email});

        if(!doesExist){
            throw new Error("user does not exist");
        }
    
        if (doesExist.otp !== otp){
            throw new Error("Invalid Otp");
        } 
         
        await Otp.deleteOne({email});
       
        res.status(200).json({
            message:"otp verified successfully",
            data: doesExist,
        })

    }catch(error){
        console.log(error.message);
        res.send(error.message)
        
    }   
})


export default router