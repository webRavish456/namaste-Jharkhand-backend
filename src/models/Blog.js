import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  blogImage: {
    type: String,
  },
  blogHeading: {
    type: String,
    required: true
  },
  blogTitle: {
    type: String,
    required: true
  },
  blogDate: {
    type: String,
    required: true
  },
  blogCreatedBy: {
    type: String,
    required: true
  },
  blogDescription: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;

