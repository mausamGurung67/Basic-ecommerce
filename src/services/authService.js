import bcrypt from 'bcrypt';
import user from '../models/User.js'; // Import the User model
import User from '../models/User.js';
import { hashPassword } from '../utils/utility.js';
import { generateOTP } from '../utils/generateOTP.js';
import { sendMail } from '../utils/sendMail.js';
import Otp from '../models/Otp.js';


const register = async (data) => {

const hashedPassword = hashPassword(data.password);
//const hash = '$2b$10$F2TTuPYiISZ58tWnjJdCqOYiOfUtsWFi9RCqm4TNboOTBJEHX371e' yo chai hashed password yesari store hunca vanera dekhako


const email = data.email
const userExist = await user.find({email})

if(userExist){
    new Error("User already exists")
}

return await User.create({
    email : data.email,
    password : hashedPassword,
    userName : data.userName,
    phone : data.phone,
})

}


const login = async (data)=>{

    const doEmailExist = await User.find({
        email:data.email
    })

    console.log("email donot exist")
        if(!doEmailExist.length>0){
            throw new Error("Invalid User")
        }
        console.log(doEmailExist)
    const dbPassword = doEmailExist[0].password
    const isPasswordMatched = bcrypt.compareSync(data.password,dbPassword)

    if(isPasswordMatched){
        return doEmailExist[0];
    }else {
        throw new Error("Invalid login")
    }
}


const forgotPassword = async(data)=>{
   const userRegistered= await user.findOne({email:data.email})
//so mail ma pathauna lai otp nodemailer install garne tespaxi sendmail utility ma code lekhne
    if(!userRegistered){throw new Error("Invalid Request")}

    const otp = generateOTP()

    const newOtp = await Otp.create({
        email: data.email,
        otp: otp,
    })

    sendMail(data.email,otp)

    res.send(newOtp)
}
export default {
    register, login, forgotPassword}
