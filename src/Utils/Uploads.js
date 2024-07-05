import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (filePath) => {
  try {
    console.log(`Verifying file existence: ${filePath}`);
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    console.log(`Attempting to upload file: ${filePath}`);
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "product_images",
      transformation: [
        { width: 300, height: 200, crop: "limit" }]
    });
    console.log(`Upload successful: ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error(`Upload failed for file ${filePath}: ${error.message}`);
    throw error;
  }
};

export { cloudinary, uploadToCloudinary };
