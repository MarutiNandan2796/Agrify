const mongoose = require('mongoose');

const soilTestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  farmerName: {
    type: String,
    required: [true, 'Farmer name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  // Soil Parameters
  pH: {
    type: Number,
    required: [true, 'pH value is required'],
    min: [0, 'pH must be between 0 and 14'],
    max: [14, 'pH must be between 0 and 14']
  },
  nitrogen: {
    type: Number,
    required: [true, 'Nitrogen level is required'],
    min: [0, 'Nitrogen cannot be negative']
  },
  phosphorus: {
    type: Number,
    required: [true, 'Phosphorus level is required'],
    min: [0, 'Phosphorus cannot be negative']
  },
  potassium: {
    type: Number,
    required: [true, 'Potassium level is required'],
    min: [0, 'Potassium cannot be negative']
  },
  moisture: {
    type: Number,
    required: [true, 'Moisture level is required'],
    min: [0, 'Moisture must be between 0 and 100'],
    max: [100, 'Moisture must be between 0 and 100']
  },
  soilType: {
    type: String,
    required: [true, 'Soil type is required'],
    enum: ['Clay', 'Sandy', 'Loamy', 'Silty', 'Peaty', 'Chalky', 'Red', 'Black'],
    trim: true
  },
  cropType: {
    type: String,
    required: [true, 'Crop type is required'],
    enum: [
      'Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane',
      'Potato', 'Tomato', 'Onion', 'Soybean', 'Pulses',
      'Vegetables', 'Fruits', 'Tea', 'Coffee', 'Other'
    ],
    trim: true
  },
  // Additional Information
  testDate: {
    type: Date,
    default: Date.now
  },
  season: {
    type: String,
    enum: ['Kharif', 'Rabi', 'Zaid', 'Year-round'],
    default: 'Kharif'
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  // Status tracking
  status: {
    type: String,
    enum: ['pending', 'analyzed', 'completed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Index for faster queries
soilTestSchema.index({ userId: 1, testDate: -1 });
soilTestSchema.index({ status: 1 });

module.exports = mongoose.model('SoilTest', soilTestSchema);
