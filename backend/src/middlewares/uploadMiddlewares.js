import multer from "multer";

// We use memory storage → upload to Cloudinary from buffer
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
