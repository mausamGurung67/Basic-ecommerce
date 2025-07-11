import otpGenerator from 'otp-generator'

const generateOTP = () =>{
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    console.log(otp)
    return otp;
}

export {generateOTP}
