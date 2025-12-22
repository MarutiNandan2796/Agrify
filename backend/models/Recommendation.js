const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  soilTestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SoilTest',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // AI-Generated Recommendation
  aiRecommendation: {
    type: String,
    required: false // Optional for backward compatibility
  },
  generatedBy: {
    type: String,
    default: 'Rule-based System'
  },
  // Soil Health Metrics
  soilHealthScore: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  nitrogenLevel: {
    type: String,
    enum: ['Deficit', 'Optimal', 'Excess', 'Unknown'],
    default: 'Unknown'
  },
  phosphorusLevel: {
    type: String,
    enum: ['Deficit', 'Optimal', 'Excess', 'Unknown'],
    default: 'Unknown'
  },
  potassiumLevel: {
    type: String,
    enum: ['Deficit', 'Optimal', 'Excess', 'Unknown'],
    default: 'Unknown'
  },
  // Fertilizer Recommendations
  primaryFertilizer: {
    name: {
      type: String,
      required: false
    },
    quantity: {
      type: String,
      required: false
    },
    applicationMethod: String
  },
  secondaryFertilizers: [{
    name: String,
    quantity: String,
    applicationMethod: String
  }],
  // Structured Recommendations
  recommendations: [{
    category: String,
    items: [String]
  }],
  // Organic Alternatives
  organicOptions: [{
    name: String,
    quantity: String,
    benefits: String
  }],
  // Soil Health Assessment
  healthStatus: {
    type: String,
    enum: ['Poor', 'Fair', 'Good', 'Excellent'],
    required: false
  },
  // Analysis and Recommendations
  deficientNutrients: [{
    nutrient: String,
    severity: {
      type: String,
      enum: ['Low', 'Medium', 'High']
    }
  }],
  excessNutrients: [{
    nutrient: String,
    level: String
  }],
  pHAdjustment: {
    needed: {
      type: Boolean,
      default: false
    },
    recommendation: String,
    targetpH: Number
  },
  // Additional Recommendations
  irrigationAdvice: String,
  cropSuitability: {
    suitable: [String],
    notSuitable: [String]
  },
  bestPractices: [String],
  warnings: [String],
  // Expected Outcomes
  expectedYieldImprovement: {
    type: String,
    default: 'Variable based on implementation'
  },
  estimatedCostPerAcre: {
    type: Number,
    min: 0
  },
  // Timeline
  applicationSchedule: [{
    stage: String,
    timing: String,
    fertilizer: String,
    quantity: String
  }],
  // Metadata
  generatedDate: {
    type: Date,
    default: Date.now
  },
  validUntil: {
    type: Date,
    default: function() {
      // Valid for 6 months
      return new Date(Date.now() + 180 * 24 * 60 * 60 * 1000);
    }
  },
  confidence: {
    type: Number,
    min: 0,
    max: 100,
    default: 85
  }
}, {
  timestamps: true
});

// Index for faster queries
recommendationSchema.index({ soilTestId: 1 });
recommendationSchema.index({ userId: 1, generatedDate: -1 });

module.exports = mongoose.model('Recommendation', recommendationSchema);
