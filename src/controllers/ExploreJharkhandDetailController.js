import ExploreJharkhandDetail from '../models/ExploreJharkhandDetail.js';

// Get all Explore Jharkhand Details by exploreJharkhandId
export const getExploreJharkhandDetailsByExploreId = async (req, res) => {
  try {
    const { exploreJharkhandId } = req.params;
    
    const details = await ExploreJharkhandDetail.find({ 
      exploreJharkhandId 
    }).populate('exploreJharkhandId');
    
    return res.status(200).json({
      status: 'success',
      message: 'Explore Jharkhand details retrieved successfully',
      data: details
    });
  } catch (error) {
    console.error('Error fetching explore jharkhand details:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error fetching explore jharkhand details',
      error: error.message
    });
  }
};

// Get single Explore Jharkhand Detail by ID
export const getExploreJharkhandDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const detail = await ExploreJharkhandDetail.findById(id).populate('exploreJharkhandId');
    
    if (!detail) {
      return res.status(404).json({
        status: 'error',
        message: 'Explore Jharkhand detail not found'
      });
    }
    
    return res.status(200).json({
      status: 'success',
      message: 'Explore Jharkhand detail retrieved successfully',
      data: detail
    });
  } catch (error) {
    console.error('Error fetching explore jharkhand detail:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error fetching explore jharkhand detail',
      error: error.message
    });
  }
};

// Create new Explore Jharkhand Detail
export const createExploreJharkhandDetail = async (req, res) => {
  try {
    const { 
      exploreJharkhandId, 
      introductionDescription, 
      detailDescription, 
      status 
    } = req.body;
    
    const bannerImage = req.imageUrls?.bannerImage || null;
    const introductionImage = req.imageUrls?.introductionImage || null;
    const viewMoreImages = req.imageUrls?.viewMoreImages || [];
    
    const newDetail = new ExploreJharkhandDetail({
      exploreJharkhandId,
      bannerImage,
      introductionDescription,
      introductionImage,
      detailDescription,
      viewMoreImages,
      status: status || 'active'
    });
    
    await newDetail.save();
    
    return res.status(201).json({
      status: 'success',
      message: 'Explore Jharkhand detail created successfully',
      data: newDetail
    });
  } catch (error) {
    console.error('Error creating explore jharkhand detail:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error creating explore jharkhand detail',
      error: error.message
    });
  }
};

// Update Explore Jharkhand Detail
export const updateExploreJharkhandDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { introductionDescription, detailDescription, status } = req.body;
    
    const detail = await ExploreJharkhandDetail.findById(id);
    
    if (!detail) {
      return res.status(404).json({
        status: 'error',
        message: 'Explore Jharkhand detail not found'
      });
    }
    
    // Update fields
    if (introductionDescription) detail.introductionDescription = introductionDescription;
    if (detailDescription) detail.detailDescription = detailDescription;
    if (status) detail.status = status;
    
    // Update images if provided
    if (req.imageUrls?.bannerImage) detail.bannerImage = req.imageUrls.bannerImage;
    if (req.imageUrls?.introductionImage) detail.introductionImage = req.imageUrls.introductionImage;
    if (req.imageUrls?.viewMoreImages) detail.viewMoreImages = req.imageUrls.viewMoreImages;
    
    await detail.save();
    
    return res.status(200).json({
      status: 'success',
      message: 'Explore Jharkhand detail updated successfully',
      data: detail
    });
  } catch (error) {
    console.error('Error updating explore jharkhand detail:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error updating explore jharkhand detail',
      error: error.message
    });
  }
};

// Delete Explore Jharkhand Detail
export const deleteExploreJharkhandDetail = async (req, res) => {
  try {
    const { id } = req.params;
    
    const detail = await ExploreJharkhandDetail.findByIdAndDelete(id);
    
    if (!detail) {
      return res.status(404).json({
        status: 'error',
        message: 'Explore Jharkhand detail not found'
      });
    }
    
    return res.status(200).json({
      status: 'success',
      message: 'Explore Jharkhand detail deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting explore jharkhand detail:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error deleting explore jharkhand detail',
      error: error.message
    });
  }
};

