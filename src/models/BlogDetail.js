import mongoose from 'mongoose';

const blogDetailSchema = new mongoose.Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true
  },
  blogDetailBanner: {
    type: String,
  },
  blogDetailDescription: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

const BlogDetail = mongoose.model('BlogDetail', blogDetailSchema);

export default BlogDetail;

