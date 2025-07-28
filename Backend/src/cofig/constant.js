import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI=process.env.MONGO_URI;
const JWT_SECRET=process.env.JWT_SECRET;
const EMAIL_USER=process.env.EMAIL_USER;
const EMAIL_PASS=process.env.EMAIL_PASS;
const PORT=process.env.PORT || 4000;
const CLOUDINARY_CLOUD_NAME=process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY=process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET=process.env.CLOUDINARY_API_SECRET;


export default {MONGO_URI, JWT_SECRET, EMAIL_USER, EMAIL_PASS, PORT, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET};


