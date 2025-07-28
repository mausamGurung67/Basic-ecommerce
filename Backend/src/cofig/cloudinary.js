import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configuration
cloudinary.config({
  cloud_name: "dronpb7f1",
  api_key: "638227534456343",
  api_secret: "oX00jYEFqQIZFMN4Ix_S3W1aCD8", // Click 'View API Keys' above to copy your API secret
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'image',
  },
});

const upload = multer({ storage: storage });


export { cloudinary, upload };
