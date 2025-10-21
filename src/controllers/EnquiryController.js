import Enquiry from '../models/Enquiry.js';

// Get all enquiries
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      status: 'success',
      message: 'Enquiries fetched successfully',
      data: enquiries
    });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch enquiries',
      error: error.message
    });
  }
};

// Get single enquiry by ID
export const getEnquiryById = async (req, res) => {
  try {
    const { id } = req.params;
    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      return res.status(404).json({
        status: 'error',
        message: 'Enquiry not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Enquiry fetched successfully',
      data: enquiry
    });
  } catch (error) {
    console.error('Error fetching enquiry:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch enquiry',
      error: error.message
    });
  }
};

// Create new enquiry (from contact form)
export const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        status: 'error',
        message: 'All fields are required'
      });
    }

    const newEnquiry = new Enquiry({
      name,
      email,
      phone,
      message
    });

    await newEnquiry.save();

    res.status(201).json({
      status: 'success',
      message: 'Enquiry submitted successfully',
      data: newEnquiry
    });
  } catch (error) {
    console.error('Error creating enquiry:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to submit enquiry',
      error: error.message
    });
  }
};

// Update enquiry status
export const updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid status. Must be pending, read, or replied'
      });
    }

    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedEnquiry) {
      return res.status(404).json({
        status: 'error',
        message: 'Enquiry not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Enquiry status updated successfully',
      data: updatedEnquiry
    });
  } catch (error) {
    console.error('Error updating enquiry:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update enquiry',
      error: error.message
    });
  }
};

// Delete enquiry
export const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);

    if (!deletedEnquiry) {
      return res.status(404).json({
        status: 'error',
        message: 'Enquiry not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Enquiry deleted successfully',
      data: deletedEnquiry
    });
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete enquiry',
      error: error.message
    });
  }
};

