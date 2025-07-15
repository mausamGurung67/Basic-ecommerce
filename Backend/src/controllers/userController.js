import userService from "../services/userService.js";


const createUser = async (req,res)=>{

    const {userName,password,phone,email,confirmPassword} = req.body

    try{
    if(!userName){
        return res.status   (400).json({message:"Please enter your name"})
    }
    if(!password){
        return res.status(400).json({message:"Please enter your password"})
    }
    if(password !== confirmPassword){
        return res.status(400).json({message:"Password and confirm password should be same"})
    }
    
    const data =  await  userService.createUser(req.body)
    
    res.send(data)}
        catch(error){
        console.log(error.message)
        res.status(400).json({
            message:"Error in creating user",
            error: error.message

        })
    }

}


export { createUser };