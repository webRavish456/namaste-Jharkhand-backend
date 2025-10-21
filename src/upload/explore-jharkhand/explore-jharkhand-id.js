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
      folder: 'explore-jharkhand-details',
      resource_type: 'auto',
      allowedFormats: [
        'jpeg', 'jpg', 'png', 'gif', 'svg', 'webp', 'bmp', 'tiff', 'jfif'
      ],
      public_id: `explore-detail-${Date.now()}-${file.originalname}`,
    };
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).fields([
  { name: 'bannerImage', maxCount: 1 },
  { name: 'introductionImage', maxCount: 1 },
  { name: 'viewMoreImages', maxCount: 10 }
]);

const uploadExploreJharkhandId = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err);
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ 
          status: 'error', 
          message: 'File size too large. Max size is 10MB.' 
        });
      }
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({ 
          status: 'error', 
          message: `Unexpected field: ${err.field}. Expected: bannerImage, introductionImage, or viewMoreImages` 
        });
      }
      return res.status(500).json({ 
        status: 'error', 
        message: err.message 
      });
    }

    const files = req.files || {};
    const imageUrls = {};

    if (files['bannerImage']?.[0]) {
      imageUrls.bannerImage = files['bannerImage'][0].path;
    }

    if (files['introductionImage']?.[0]) {
      imageUrls.introductionImage = files['introductionImage'][0].path;
    }

    if (files['viewMoreImages']?.length > 0) {
      imageUrls.viewMoreImages = files['viewMoreImages'].map(file => file.path);
    }

    if (Object.keys(imageUrls).length > 0) {
      req.imageUrls = imageUrls;
    }

    next();
  });
};

export default uploadExploreJharkhandId;