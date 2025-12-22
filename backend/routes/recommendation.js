const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const Recommendation = require('../models/Recommendation');
const SoilTest = require('../models/SoilTest');

/**
 * @route   GET /api/recommendations
 * @desc    Get all recommendations for logged-in user
 * @access  Private
 */
router.get('/', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const recommendations = await Recommendation.find({ userId: req.userId })
      .populate('soilTestId', 'cropType soilType pH testDate')
      .sort({ generatedDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Recommendation.countDocuments({ userId: req.userId });

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
 * @route   GET /api/recommendations/:id
 * @desc    Get specific recommendation by ID
 * @access  Private
 */
router.get('/:id', authenticate, async (req, res) => {
  try {
    const recommendation = await Recommendation.findOne({
      _id: req.params.id,
      userId: req.userId
    }).populate('soilTestId');

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: 'Recommendation not found'
      });
    }

    res.status(200).json({
      success: true,
      recommendation
    });
  } catch (error) {
    console.error('Fetch recommendation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recommendation',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/recommendations/soil-test/:soilTestId
 * @desc    Get recommendation by soil test ID
 * @access  Private
 */
router.get('/soil-test/:soilTestId', authenticate, async (req, res) => {
  try {
    const recommendation = await Recommendation.findOne({
      soilTestId: req.params.soilTestId,
      userId: req.userId
    }).populate('soilTestId');

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: 'Recommendation not found for this soil test'
      });
    }

    res.status(200).json({
      success: true,
      recommendation
    });
  } catch (error) {
    console.error('Fetch recommendation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recommendation',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/recommendations/stats/overview
 * @desc    Get overview statistics of recommendations
 * @access  Private
 */
router.get('/stats/overview', authenticate, async (req, res) => {
  try {
    const recommendations = await Recommendation.find({ userId: req.userId });

    if (recommendations.length === 0) {
      return res.status(200).json({
        success: true,
        stats: {
          totalRecommendations: 0,
          averageHealthScore: 0,
          healthDistribution: {},
          commonDeficiencies: []
        }
      });
    }

    // Calculate average health score
    const avgHealthScore = recommendations.reduce((sum, rec) => sum + rec.soilHealthScore, 0) / recommendations.length;

    // Health status distribution
    const healthDistribution = recommendations.reduce((acc, rec) => {
      acc[rec.healthStatus] = (acc[rec.healthStatus] || 0) + 1;
      return acc;
    }, {});

    // Common deficiencies
    const deficiencyMap = {};
    recommendations.forEach(rec => {
      rec.deficientNutrients.forEach(def => {
        deficiencyMap[def.nutrient] = (deficiencyMap[def.nutrient] || 0) + 1;
      });
    });

    const commonDeficiencies = Object.entries(deficiencyMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([nutrient, count]) => ({ nutrient, count }));

    res.status(200).json({
      success: true,
      stats: {
        totalRecommendations: recommendations.length,
        averageHealthScore: Math.round(avgHealthScore),
        healthDistribution,
        commonDeficiencies,
        averageCostPerAcre: Math.round(
          recommendations.reduce((sum, rec) => sum + (rec.estimatedCostPerAcre || 0), 0) / recommendations.length
        )
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
