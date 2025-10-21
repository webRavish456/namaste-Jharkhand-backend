import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: "dywpuv3jk",
  api_key: "843216346619295",
  api_secret: "_pM6huf17wznJnFn0VY-Khgph3w",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'editor-images',
      resource_type: 'image',
      allowedFormats: [
        'jpeg', 'jpg', 'png', 'gif', 'svg', 'webp', 'bmp', 'tiff', 'jfif'
      ],
      public_id: `editor-${Date.now()}-${file.originalname}`,
    };
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit for editor images
}).single('image'); // Single image upload

const uploadEditorImage = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err);
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ 
          status: 'error', 
          message: 'File size too large. Max size is 5MB.' 
        });
      }
      return res.status(500).json({ 
        status: 'error', 
        message: err.message 
      });
    }

    if (!req.file) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'No image file provided' 
      });
    }

    // Return the uploaded image URL
    return res.status(200).json({
      status: 'success',
      message: 'Image uploaded successfully',
      data: {
        imageUrl: req.file.path,
        publicId: req.file.filename
      }
    });
  });
};

export default uploadEditorImage;

