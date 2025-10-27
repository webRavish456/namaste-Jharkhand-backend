import mongoose from 'mongoose';

const exploreJharkhandSchema = new mongoose.Schema({
  exploreImage: {
    type: String,
  },
  title: {
    type: String,
    required: true
  },
  description: {
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

const ExploreJharkhand = mongoose.model('ExploreJharkhand', exploreJharkhandSchema);

export default ExploreJharkhand;

