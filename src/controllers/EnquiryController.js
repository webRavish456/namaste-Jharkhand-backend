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

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    // Get total enquiries count
    const totalEnquiries = await Enquiry.countDocuments();
    
    // Get enquiries from last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentEnquiries = await Enquiry.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });
    
    // Calculate percentage change
    const previousPeriodStart = new Date();
    previousPeriodStart.setDate(previousPeriodStart.getDate() - 60);
    const previousPeriodEnd = new Date();
    previousPeriodEnd.setDate(previousPeriodEnd.getDate() - 30);
    
    const previousPeriodEnquiries = await Enquiry.countDocuments({
      createdAt: { 
        $gte: previousPeriodStart,
        $lte: previousPeriodEnd
      }
    });
    
    const enquiryChange = previousPeriodEnquiries > 0 
      ? Math.round(((recentEnquiries - previousPeriodEnquiries) / previousPeriodEnquiries) * 100)
      : recentEnquiries > 0 ? 100 : 0;
    
    res.status(200).json({
      status: 'success',
      message: 'Dashboard stats fetched successfully',
      data: {
        totalEnquiries,
        recentEnquiries,
        enquiryChange: enquiryChange >= 0 ? `+${enquiryChange}%` : `${enquiryChange}%`,
        changeType: enquiryChange >= 0 ? 'positive' : 'negative'
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch dashboard stats',
      error: error.message
    });
};
}
// Get enquiry analytics by date
export const getEnquiryAnalytics = async (req, res) => {
  try {
    const { days = 30 } = req.query; // Default to last 30 days
    
    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - parseInt(days));
    
    // Aggregate enquiries by date
    const analytics = await Enquiry.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" }
          },
          count: { $sum: 1 },
          date: { $first: "$createdAt" }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 }
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$date"
            }
          },
          count: 1
        }
      }
    ]);
    
    res.status(200).json({
      status: 'success',
      message: 'Enquiry analytics fetched successfully',
      data: analytics
    });
  } catch (error) {
    console.error('Error fetching enquiry analytics:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch enquiry analytics',
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

