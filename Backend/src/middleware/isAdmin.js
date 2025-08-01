
const isAdmin = (req,res,next) =>{

    try {
        const user = req.user
        if(user.role !== 'ADMIN'){
            throw new Error("User is not an Admin")
        }
        next()
    } catch (error) {
        res.status(403).json({
            message: "Access denied",
            error: error.message
        })
    }
}

export {isAdmin}