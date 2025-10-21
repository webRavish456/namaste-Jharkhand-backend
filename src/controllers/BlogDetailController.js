import BlogDetail from '../models/BlogDetail.js';

// Get all blog details for a specific blog
export const getBlogDetailsByBlogId = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blogDetails = await BlogDetail.find({ blogId }).sort({ createdAt: -1 });
    
    res.status(200).json({
      status: 'success',
      message: 'Blog details fetched successfully',
      data: blogDetails
    });
  } catch (error) {
    console.error('Error fetching blog details:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch blog details',
      error: error.message
    });
  }
};

// Get single blog detail by ID
export const getBlogDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const blogDetail = await BlogDetail.findById(id).populate('blogId');

    if (!blogDetail) {
      return res.status(404).json({
        status: 'error',
        message: 'Blog detail not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Blog detail fetched successfully',
      data: blogDetail
    });
  } catch (error) {
    console.error('Error fetching blog detail:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch blog detail',
      error: error.message
    });
  }
};

// Create new blog detail
export const createBlogDetail = async (req, res) => {
  try {
    const { blogId, blogDetailDescription } = req.body;
    const imageUrls = req.imageUrls || {};

    if (!blogId || !imageUrls.blogDetailBanner || !blogDetailDescription) {
      return res.status(400).json({
        status: 'error',
        message: 'All fields are required'
      });
    }

    const newBlogDetail = new BlogDetail({
      blogId,
      blogDetailBanner: imageUrls.blogDetailBanner,
      blogDetailDescription,
    });

    await newBlogDetail.save();

    res.status(201).json({
      status: 'success',
      message: 'Blog detail created successfully',
      data: newBlogDetail
    });
  } catch (error) {
    console.error('Error creating blog detail:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create blog detail',
      error: error.message
    });
  }
};

// Update blog detail
export const updateBlogDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { blogDetailDescription, status } = req.body;
    const imageUrls = req.imageUrls || {};

    const updateData = {
      blogDetailDescription,
      status
    };

    // Update banner only if new image is uploaded
    if (imageUrls.blogDetailBanner) {
      updateData.blogDetailBanner = imageUrls.blogDetailBanner;
    }

    const updatedBlogDetail = await BlogDetail.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBlogDetail) {
      return res.status(404).json({
        status: 'error',
        message: 'Blog detail not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Blog detail updated successfully',
      data: updatedBlogDetail
    });
  } catch (error) {
    console.error('Error updating blog detail:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update blog detail',
      error: error.message
    });
  }
};

// Delete blog detail
export const deleteBlogDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlogDetail = await BlogDetail.findByIdAndDelete(id);

    if (!deletedBlogDetail) {
      return res.status(404).json({
        status: 'error',
        message: 'Blog detail not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Blog detail deleted successfully',
      data: deletedBlogDetail
    });
  } catch (error) {
    console.error('Error deleting blog detail:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete blog detail',
      error: error.message
    });
  }
};

