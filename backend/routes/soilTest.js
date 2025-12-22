const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { authenticate } = require('../middleware/auth');
const SoilTest = require('../models/SoilTest');
const Recommendation = require('../models/Recommendation');
const { generateAIRecommendation } = require('../utils/aiRecommendationEngine');

/**
 * @route   POST /api/soil-test
 * @desc    Submit new soil test data
 * @access  Private
 */
router.post('/', authenticate, [
  body('farmerName').trim().notEmpty().withMessage('Farmer name is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('pH').isFloat({ min: 0, max: 14 }).withMessage('pH must be between 0 and 14'),
  body('nitrogen').isFloat({ min: 0 }).withMessage('Nitrogen level must be a positive number'),
  body('phosphorus').isFloat({ min: 0 }).withMessage('Phosphorus level must be a positive number'),
  body('potassium').isFloat({ min: 0 }).withMessage('Potassium level must be a positive number'),
  body('moisture').isFloat({ min: 0, max: 100 }).withMessage('Moisture must be between 0 and 100'),
  body('soilType').isIn(['Clay', 'Sandy', 'Loamy', 'Silty', 'Peaty', 'Chalky', 'Red', 'Black']).withMessage('Invalid soil type'),
  body('cropType').notEmpty().withMessage('Crop type is required')
], async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const {
      farmerName,
      location,
      pH,
      nitrogen,
      phosphorus,
      potassium,
      moisture,
      soilType,
      cropType,
      season,
      notes
    } = req.body;

    // Create soil test record
    const soilTest = new SoilTest({
      userId: req.userId,
      farmerName,
      location,
      pH,
      nitrogen,
      phosphorus,
      potassium,
      moisture,
      soilType,
      cropType,
      season,
      notes,
      status: 'pending'
    });

    await soilTest.save();

    // Generate AI-powered recommendation
    const recommendationData = await generateAIRecommendation({
      farmerName,
      farmerLocation: location,
      pH,
      nitrogen,
      phosphorus,
      potassium,
      moisture,
      cropType,
      previousCrop: req.body.previousCrop,
      notes
    });

    // Save recommendation
    const recommendation = new Recommendation({
      soilTestId: soilTest._id,
      userId: req.userId,
      ...recommendationData
    });

    await recommendation.save();

    // Update soil test status
    soilTest.status = 'analyzed';
    await soilTest.save();

    res.status(201).json({
      success: true,
      message: 'Soil test submitted and analyzed successfully',
      soilTest,
      recommendation
    });
  } catch (error) {
    console.error('Soil test submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting soil test',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/soil-test
 * @desc    Get all soil tests for logged-in user
 * @access  Private
 */
router.get('/', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const query = { userId: req.userId };
    if (status) {
      query.status = status;
    }

    const soilTests = await SoilTest.find(query)
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
 * @route   GET /api/soil-test/:id
 * @desc    Get specific soil test by ID
 * @access  Private
 */
router.get('/:id', authenticate, async (req, res) => {
  try {
    const soilTest = await SoilTest.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!soilTest) {
      return res.status(404).json({
        success: false,
        message: 'Soil test not found'
      });
    }

    // Get recommendation for this test
    const recommendation = await Recommendation.findOne({
      soilTestId: soilTest._id
    });

    res.status(200).json({
      success: true,
      soilTest,
      recommendation
    });
  } catch (error) {
    console.error('Fetch soil test error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching soil test',
      error: error.message
    });
  }
});

/**
 * @route   DELETE /api/soil-test/:id
 * @desc    Delete soil test record
 * @access  Private
 */
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const soilTest = await SoilTest.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!soilTest) {
      return res.status(404).json({
        success: false,
        message: 'Soil test not found'
      });
    }

    // Delete associated recommendation
    await Recommendation.deleteOne({ soilTestId: soilTest._id });

    res.status(200).json({
      success: true,
      message: 'Soil test deleted successfully'
    });
  } catch (error) {
    console.error('Delete soil test error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting soil test',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/soil-test/stats/summary
 * @desc    Get statistics summary for user's soil tests
 * @access  Private
 */
router.get('/stats/summary', authenticate, async (req, res) => {
  try {
    const totalTests = await SoilTest.countDocuments({ userId: req.userId });
    const recentTests = await SoilTest.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('cropType soilType pH testDate status');

    // Calculate average soil health
    const recommendations = await Recommendation.find({ userId: req.userId });
    const avgHealthScore = recommendations.length > 0
      ? recommendations.reduce((sum, rec) => sum + rec.soilHealthScore, 0) / recommendations.length
      : 0;

    res.status(200).json({
      success: true,
      stats: {
        totalTests,
        averageHealthScore: Math.round(avgHealthScore),
        recentTests
      }
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
});

module.exports = router;
