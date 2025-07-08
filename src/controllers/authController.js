import authService from "../services/authService.js";

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
        res.status(200).json({
            message: "Login Successful",
            data
    })
    } catch (error) {
        console.log(error.message)
        res.status(400).send(error.message)
    }

}
export {register,login}