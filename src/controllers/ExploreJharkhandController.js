import ExploreJharkhand from '../models/ExploreJharkhand.js';

// Get all explore jharkhand places
export const getAllExploreJharkhand = async (req, res) => {
  try {
    const places = await ExploreJharkhand.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      status: 'success',
      message: 'Explore Jharkhand places fetched successfully',
      data: places
    });
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch places',
      error: error.message
    });
  }
};

// Get single place by ID
export const getExploreJharkhandById = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await ExploreJharkhand.findById(id);

    if (!place) {
      return res.status(404).json({
        status: 'error',
        message: 'Place not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Place fetched successfully',
      data: place
    });
  } catch (error) {
    console.error('Error fetching place:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch place',
      error: error.message
    });
  }
};

// Create new explore jharkhand place
export const createExploreJharkhand = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const exploreImage = req.imageUrls?.exploreImage || null;

    const newPlace = new ExploreJharkhand({
      exploreImage,
      title,
      description,
      status: status || 'active'
    });

    await newPlace.save();

    res.status(201).json({
      status: 'success',
      message: 'Place created successfully',
      data: newPlace
    });
  } catch (error) {
    console.error('Error creating place:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create place',
      error: error.message
    });
  }
};

// Update explore jharkhand place
export const updateExploreJharkhand = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const place = await ExploreJharkhand.findById(id);

    if (!place) {
      return res.status(404).json({
        status: 'error',
        message: 'Place not found'
      });
    }

    if (title) place.title = title;
    if (description) place.description = description;
    if (status) place.status = status;
    if (req.imageUrls?.exploreImage) place.exploreImage = req.imageUrls.exploreImage;

    await place.save();

    res.status(200).json({
      status: 'success',
      message: 'Place updated successfully',
      data: place
    });
  } catch (error) {
    console.error('Error updating place:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update place',
      error: error.message
    });
  }
};

// Delete explore jharkhand place
export const deleteExploreJharkhand = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPlace = await ExploreJharkhand.findByIdAndDelete(id);

    if (!deletedPlace) {
      return res.status(404).json({
        status: 'error',
        message: 'Place not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Place deleted successfully',
      data: deletedPlace
    });
  } catch (error) {
    console.error('Error deleting place:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete place',
      error: error.message
    });
  }
};

