
import nodemailer from 'nodemailer'
import constant from '../cofig/constant.js';
const sendMail = async (email,otp) =>{

const transporter = nodemailer.createTransport({
service: 'gmail',
    auth: {
    user: constant.EMAIL_USER,
    pass: constant.EMAIL_PASS,
  },
});

const info = await transporter.sendMail({
  from: `"Maddison Foo Koch" <${constant.EMAIL_USER}>`,
  to: email,
  subject: "Your OTP Code for Verification",
  text: `Your OTP code is: ${otp}`, // plain-text fallback
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #ddd; padding: 20px;">
      <h2 style="text-align: center; color: #333;">Your OTP Code</h2>
      <p>Hello,</p>
      <p>Use the following OTP to complete your verification process. This code is valid for 10 minutes.</p>
      <div style="font-size: 24px; font-weight: bold; text-align: center; margin: 20px 0;">
        ${otp}
      </div>
      <p>If you did not request this, please ignore this email.</p>
      <p>Thank you,<br>The Team</p>
    </div>
  `,
});

//so yo html create garesi auto otp generate garne kunai library install handa hunxa junai vayeni tara hami npm i otp-generator user garxum

  console.log(info)
}

export {sendMail}