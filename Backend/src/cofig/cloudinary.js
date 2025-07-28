import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import constant from "./constant.js";

// Configuration
cloudinary.config({
  cloud_name: constant.CLOUDINARY_CLOUD_NAME, // Click 'View API Keys' above to copy your cloud name
  api_key: constant.CLOUDINARY_API_KEY, // Click 'View API Keys' above
  api_secret: constant.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'image',
  },
});

const upload = multer({ storage: storage });


export { cloudinary, upload };
