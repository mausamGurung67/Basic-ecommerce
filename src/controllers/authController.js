import { createToken } from "../helper/token.js";
import authService from "../services/authService.js";
import jwt from "jsonwebtoken";

const register = async (req,res)=>{

    try {
    const {email,phone,password,confirmPassword,userName} = req.body;

    if(!password || !email || !phone || !confirmPassword || !userName ){

        return res.status(400).json({message: "All fields are required"});
    }

    if(password !== confirmPassword){
        return res.status(400).json({message: "password did not match"})
    }
    const data = await authService.register({
        email,
        phone,
        password,
        userName
    })

    res.status(200).json({
        message: "User registered successfully",
        data
    })
        
    } catch (error) {
        console.log(error.message);
        res.send(500).json({
            message: "Internal server error", error: error.message
        })
    }
}


const login = async (req,res) => {
    try {
        //login function
        const {email,password} = req.body

        if(!email || !password){throw new Error("Missing user credential")}

        const data = await authService.login({email,password})
        const payload = {
        id:data._id,
        userName:data.userName,
        role:data.role,
        phone:data.phone,
        email:data.email
   }

    const token = createToken(payload);
    res.cookie('authToken',token)
    res.status(200).json({
        message: "Login Successful",
        data,
        token
})
    } catch (error) {
        console.log(error.message)
        res.status(400).send(error.message)
    }

}


const forgotPassword = async (req,res) => {
    
    try {
        const {email} = req.body
        if(!email) {throw new Error("Email is required")}
        const data = await authService.forgotPassword({email})
    
        res.status(200).json({message:"opt sent successfully"}) 
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message});
    }
}
export {register,login,forgotPassword}