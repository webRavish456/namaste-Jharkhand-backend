import Blog from '../models/Blog.js';

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      status: 'success',
      message: 'Blogs fetched successfully',
      data: blogs
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch blogs',
      error: error.message
    });
  }
};

// Get single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        status: 'error',
        message: 'Blog not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Blog fetched successfully',
      data: blog
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch blog',
      error: error.message
    });
  }
};

// Create new blog
export const createBlog = async (req, res) => {
  try {
    const { 
      blogHeading, 
      blogTitle, 
      blogDate, 
      blogCreatedBy, 
      blogDescription, 
      status 
    } = req.body;
    
    const blogImage = req.imageUrls?.blogImage || null;

    const newBlog = new Blog({
      blogImage,
      blogHeading,
      blogTitle,
      blogDate,
      blogCreatedBy,
      blogDescription,
      status: status || 'active'
    });

    await newBlog.save();

    res.status(201).json({
      status: 'success',
      message: 'Blog created successfully',
      data: newBlog
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create blog',
      error: error.message
    });
  }
};

// Update blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      blogHeading, 
      blogTitle, 
      blogDate, 
      blogCreatedBy, 
      blogDescription, 
      status 
    } = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        status: 'error',
        message: 'Blog not found'
      });
    }

    // Update fields if provided
    if (blogHeading) blog.blogHeading = blogHeading;
    if (blogTitle) blog.blogTitle = blogTitle;
    if (blogDate) blog.blogDate = blogDate;
    if (blogCreatedBy) blog.blogCreatedBy = blogCreatedBy;
    if (blogDescription) blog.blogDescription = blogDescription;
    if (status) blog.status = status;
    if (req.imageUrls?.blogImage) blog.blogImage = req.imageUrls.blogImage;

    await blog.save();

    res.status(200).json({
      status: 'success',
      message: 'Blog updated successfully',
      data: blog
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update blog',
      error: error.message
    });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({
        status: 'error',
        message: 'Blog not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Blog deleted successfully',
      data: deletedBlog
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete blog',
      error: error.message
    });
  }
};

