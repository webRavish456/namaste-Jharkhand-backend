import express from 'express';
import uploadEditorImage from '../upload/editor-image.js';
import uploadBlog from '../upload/blog/blog.js';
import uploadBlogId from '../upload/blog/blog-id.js';
import uploadExploreJharkhand from '../upload/explore-jharkhand/explore-jharkhand.js';
import uploadExploreJharkhandId from '../upload/explore-jharkhand/explore-jharkhand-id.js';

// Middleware
import { verifyToken } from '../middleware/verifyToken.js';

// Controllers
import { 
  getAllBlogs, 
  getBlogById, 
  createBlog, 
  updateBlog, 
  deleteBlog,
  getBlogStats
} from '../controllers/BlogController.js';

import { 
  getBlogDetailsByBlogId, 
  getBlogDetailById, 
  createBlogDetail, 
  updateBlogDetail, 
  deleteBlogDetail 
} from '../controllers/BlogDetailController.js';

import { 
  getAllExploreJharkhand, 
  getExploreJharkhandById, 
  createExploreJharkhand, 
  updateExploreJharkhand, 
  deleteExploreJharkhand,
  getExploreJharkhandStats
} from '../controllers/ExploreJharkhandController.js';

import { 
  getExploreJharkhandDetailsByExploreId, 
  getExploreJharkhandDetailById, 
  createExploreJharkhandDetail, 
  updateExploreJharkhandDetail, 
  deleteExploreJharkhandDetail 
} from '../controllers/ExploreJharkhandDetailController.js';

import { 
  getAllEnquiries, 
  getEnquiryById, 
  createEnquiry, 
  updateEnquiryStatus, 
  deleteEnquiry,
  getEnquiryAnalytics,
  getDashboardStats
} from '../controllers/EnquiryController.js';

import { 
  loginAdmin
} from '../controllers/authControllers.js';

export const router = express.Router();

// =====================
// UPLOAD ROUTES
// =====================
router.route('/upload-editor-image')
  .post(verifyToken, uploadEditorImage);

// =====================
// BLOG ROUTES
// =====================
router.route('/blogs')
  .get(getAllBlogs)
  .post(verifyToken, uploadBlog, createBlog);

router.route('/blogs/stats')
  .get(verifyToken, getBlogStats);

router.route('/blogs/:id')
  .get(getBlogById)
  .put(verifyToken, uploadBlog, updateBlog)
  .delete(verifyToken, deleteBlog);

// =====================
// BLOG DETAIL ROUTES
// =====================
router.route('/blog-details/blog/:blogId')
  .get(getBlogDetailsByBlogId);

router.route('/blog-details')
  .post(verifyToken, uploadBlogId, createBlogDetail);

router.route('/blog-details/:id')
  .get(getBlogDetailById)
  .put(verifyToken, uploadBlogId, updateBlogDetail)
  .delete(verifyToken, deleteBlogDetail);

// =====================
// EXPLORE JHARKHAND ROUTES
// =====================
router.route('/explore-jharkhand')
  .get(getAllExploreJharkhand)
  .post(verifyToken, uploadExploreJharkhand, createExploreJharkhand);

router.route('/explore-jharkhand/stats')
  .get(verifyToken, getExploreJharkhandStats);

router.route('/explore-jharkhand/:id')
  .get(getExploreJharkhandById)
  .put(verifyToken, uploadExploreJharkhand, updateExploreJharkhand)
  .delete(verifyToken, deleteExploreJharkhand);

// =====================
// EXPLORE JHARKHAND DETAIL ROUTES
// =====================
router.route('/explore-jharkhand-details/explore/:exploreJharkhandId')
  .get(getExploreJharkhandDetailsByExploreId);

router.route('/explore-jharkhand-details')
  .post(verifyToken, uploadExploreJharkhandId, createExploreJharkhandDetail);

router.route('/explore-jharkhand-details/:id')
  .get(getExploreJharkhandDetailById)
  .put(verifyToken, uploadExploreJharkhandId, updateExploreJharkhandDetail)
  .delete(verifyToken, deleteExploreJharkhandDetail);

// =====================
// ENQUIRY ROUTES
// =====================
router.route('/enquiries')
  .get(verifyToken, getAllEnquiries)
  .post(createEnquiry);

router.route('/enquiries/analytics')
  .get(verifyToken, getEnquiryAnalytics);

router.route('/dashboard/stats')
  .get(verifyToken, getDashboardStats);

router.route('/enquiries/:id')
  .get(verifyToken, getEnquiryById)
  .delete(verifyToken, deleteEnquiry);

router.route('/enquiries/:id/status')
  .patch(verifyToken, updateEnquiryStatus);

// =====================
// ADMIN ROUTES
// =====================
router.route('/admin/login')
  .post(loginAdmin);