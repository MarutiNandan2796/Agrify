const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const soilTestRoutes = require('./routes/soilTest');
const recommendationRoutes = require('./routes/recommendation');
const adminRoutes = require('./routes/admin');

// Initialize express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection with retry logic
const connectDB = async () => {
  const maxRetries = 5;
  let currentRetry = 0;

  while (currentRetry < maxRetries) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      console.log('✅ MongoDB Connected Successfully');
      break;
    } catch (err) {
      currentRetry++;
      console.error(`❌ MongoDB Connection Error (Attempt ${currentRetry}/${maxRetries}):`, err.message);
      
      if (currentRetry >= maxRetries) {
        console.error('❌ Failed to connect to MongoDB after multiple attempts');
        console.error('⚠️  Please check:');
        console.error('   1. Your internet connection');
        console.error('   2. MongoDB Atlas cluster is running');
        console.error('   3. Your IP address is whitelisted in MongoDB Atlas');
        console.error('   4. The connection string is correct');
        console.error('\n💡 The server will continue running, but database operations will fail.');
      } else {
        console.log(`⏳ Retrying in ${currentRetry * 2} seconds...`);
        await new Promise(resolve => setTimeout(resolve, currentRetry * 2000));
      }
    }
  }
};

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/soil-test', soilTestRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Soil Testing API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API: http://localhost:${PORT}/api`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;

