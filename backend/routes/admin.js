const express = require('express');
const router = express.Router();
const { authenticate, isAdmin } = require('../middleware/auth');
const User = require('../models/User');
const SoilTest = require('../models/SoilTest');
const Recommendation = require('../models/Recommendation');

/**
 * @route   GET /api/admin/dashboard
 * @desc    Get admin dashboard statistics
 * @access  Private/Admin
 */
router.get('/dashboard', authenticate, isAdmin, async (req, res) => {
  try {
    // Get total counts
    const totalFarmers = await User.countDocuments({ role: 'farmer' });
    const totalTests = await SoilTest.countDocuments();
    const totalRecommendations = await Recommendation.countDocuments();

    // Recent tests
    const recentTests = await SoilTest.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(10);

    // Tests by status
    const testsByStatus = await SoilTest.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Most common soil types
    const soilTypeDistribution = await SoilTest.aggregate([
      {
        $group: {
          _id: '$soilType',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Most common crops
    const cropDistribution = await SoilTest.aggregate([
      {
        $group: {
          _id: '$cropType',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Average soil health
    const avgHealthData = await Recommendation.aggregate([
      {
        $group: {
          _id: null,
          avgScore: { $avg: '$soilHealthScore' }
        }
      }
    ]);

    const avgHealthScore = avgHealthData.length > 0 ? Math.round(avgHealthData[0].avgScore) : 0;

    // Health status distribution
    const healthDistribution = await Recommendation.aggregate([
      {
        $group: {
          _id: '$healthStatus',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      dashboard: {
        totalFarmers,
        totalTests,
        totalRecommendations,
        avgHealthScore,
        recentTests,
        testsByStatus,
        soilTypeDistribution,
        cropDistribution,
        healthDistribution
      }
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/admin/farmers
 * @desc    Get all farmers
 * @access  Private/Admin
 */
router.get('/farmers', authenticate, isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const farmers = await User.find({ role: 'farmer' })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-password');

    const count = await User.countDocuments({ role: 'farmer' });

    res.status(200).json({
      success: true,
      farmers,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalFarmers: count
    });
  } catch (error) {
    console.error('Fetch farmers error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching farmers',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/admin/soil-tests
 * @desc    Get all soil tests (admin view)
 * @access  Private/Admin
 */
router.get('/soil-tests', authenticate, isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, cropType } = req.query;

    const query = {};
    if (status) query.status = status;
    if (cropType) query.cropType = cropType;

    const soilTests = await SoilTest.find(query)
      .populate('userId', 'name email location')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await SoilTest.countDocuments(query);

    res.status(200).json({
      success: true,
      soilTests,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalTests: count
    });
  } catch (error) {
    console.error('Fetch soil tests error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching soil tests',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/admin/recommendations
 * @desc    Get all recommendations (admin view)
 * @access  Private/Admin
 */
router.get('/recommendations', authenticate, isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const recommendations = await Recommendation.find()
      .populate('userId', 'name email')
      .populate('soilTestId', 'cropType soilType testDate')
      .sort({ generatedDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Recommendation.countDocuments();

    res.status(200).json({
      success: true,
      recommendations,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalRecommendations: count
    });
  } catch (error) {
    console.error('Fetch recommendations error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recommendations',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/admin/user/:userId
 * @desc    Get specific user details with their tests
 * @access  Private/Admin
 */
router.get('/user/:userId', authenticate, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const soilTests = await SoilTest.find({ userId: user._id }).sort({ createdAt: -1 });
    const recommendations = await Recommendation.find({ userId: user._id }).sort({ generatedDate: -1 });

    res.status(200).json({
      success: true,
      user,
      soilTests,
      recommendations,
      stats: {
        totalTests: soilTests.length,
        totalRecommendations: recommendations.length
      }
    });
  } catch (error) {
    console.error('Fetch user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user details',
      error: error.message
    });
  }
});

/**
 * @route   DELETE /api/admin/user/:userId
 * @desc    Delete user and all associated data
 * @access  Private/Admin
 */
router.delete('/user/:userId', authenticate, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Delete user's soil tests and recommendations
    await SoilTest.deleteMany({ userId: user._id });
    await Recommendation.deleteMany({ userId: user._id });
    await User.findByIdAndDelete(user._id);

    res.status(200).json({
      success: true,
      message: 'User and associated data deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
});

module.exports = router;
