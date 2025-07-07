import bcrypt from 'bcrypt';
import user from '../models/User.js'; // Import the User model
import User from '../models/User.js';
const register = async (data) => {

const hashedPassword = bcrypt.hashSync(data.password,10)
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

export default {
    register}
