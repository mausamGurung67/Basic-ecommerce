

const hashPassword = (password) =>{
   return bcrypt.hashSync(data.password,10)
}

export {hashPassword}