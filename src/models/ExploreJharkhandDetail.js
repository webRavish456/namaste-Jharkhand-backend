import mongoose from 'mongoose';

const exploreJharkhandDetailSchema = new mongoose.Schema({
  exploreJharkhandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExploreJharkhand',
    required: true
  },
  bannerImage: {
    type: String,
    required: true
  },
  introductionDescription: {
    type: String,
    required: true
  },
  introductionImage: {
    type: String,
    required: true
  },
  detailDescription: {
    type: String,
    required: true
  },
  viewMoreImages: [{
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

const ExploreJharkhandDetail = mongoose.model('ExploreJharkhandDetail', exploreJharkhandDetailSchema);

export default ExploreJharkhandDetail;

