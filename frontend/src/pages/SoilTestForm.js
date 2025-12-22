import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const SoilTestForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    farmerName: user?.name || '',
    location: user?.location || '',
    pH: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    moisture: '',
    soilType: '',
    cropType: '',
    season: 'Kharif',
    notes: '',
  });

  const soilTypes = ['Clay', 'Sandy', 'Loamy', 'Silty', 'Peaty', 'Chalky', 'Red', 'Black'];
  const cropTypes = [
    'Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane',
    'Potato', 'Tomato', 'Onion', 'Soybean', 'Pulses',
    'Vegetables', 'Fruits', 'Tea', 'Coffee', 'Other'
  ];
  const seasons = ['Kharif', 'Rabi', 'Zaid', 'Year-round'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/soil-test', {
        ...formData,
        pH: parseFloat(formData.pH),
        nitrogen: parseFloat(formData.nitrogen),
        phosphorus: parseFloat(formData.phosphorus),
        potassium: parseFloat(formData.potassium),
        moisture: parseFloat(formData.moisture),
      });

      toast.success('Soil test submitted successfully!');
      navigate(`/test/${response.data.soilTest._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error submitting soil test');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Animated Background with Farm Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 via-emerald-100/50 to-blue-100/50"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2310b981' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}></div>
        {/* Floating Farm Icons */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">🌾</div>
        <div className="absolute top-40 right-20 text-5xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🚜</div>
        <div className="absolute bottom-40 left-1/4 text-7xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>🌱</div>
        <div className="absolute top-60 right-1/3 text-6xl opacity-20 animate-float" style={{ animationDelay: '3s' }}>🌻</div>
        <div className="absolute bottom-20 right-10 text-5xl opacity-20 animate-float" style={{ animationDelay: '4s' }}>🌿</div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border-t-4 border-green-500 animate-fade-in">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <div className="inline-block mb-4">
              <span className="text-7xl animate-float">🧪</span>
            </div>
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              New Soil Test
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enter your soil parameters to get personalized fertilizer recommendations
            </p>
            <div className="mt-4 inline-flex items-center bg-gradient-to-r from-green-100 to-blue-100 px-6 py-2 rounded-full">
              <span className="mr-2 text-xl">⚡</span>
              <span className="text-sm font-semibold text-gray-700">Instant AI-Powered Analysis</span>
            </div>
          </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Farmer Information */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-3 text-3xl">👨‍🌾</span>
              Farmer Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                  <span className="mr-2">👤</span>
                  Farmer Name *
                </label>
                <input
                  type="text"
                  name="farmerName"
                  required
                  value={formData.farmerName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all group-hover:border-green-400 bg-white shadow-sm"
                />
              </div>
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                  <span className="mr-2">📍</span>
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, State"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all group-hover:border-green-400 bg-white shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Soil Parameters */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-3 text-3xl">🧪</span>
              Soil Parameters
              <span className="ml-3 text-sm font-normal bg-blue-100 text-blue-700 px-3 py-1 rounded-full">Critical Data</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                  <span className="mr-2">⚗️</span>
                  pH Level * (0-14)
                </label>
                <input
                  type="number"
                  name="pH"
                  required
                  min="0"
                  max="14"
                  step="0.1"
                  value={formData.pH}
                  onChange={handleChange}
                  placeholder="e.g., 6.5"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-blue-400 bg-white shadow-sm"
                />
                <p className="text-xs text-green-600 font-semibold mt-2 flex items-center">
                  <span className="mr-1">✓</span>
                  Optimal: 6.0-7.5
                </p>
              </div>

              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                  <span className="mr-2">🔬</span>
                  Nitrogen (N) * (kg/ha)
                </label>
                <input
                  type="number"
                  name="nitrogen"
                  required
                  min="0"
                  step="0.1"
                  value={formData.nitrogen}
                  onChange={handleChange}
                  placeholder="e.g., 250"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-blue-400 bg-white shadow-sm"
                />
                <p className="text-xs text-green-600 font-semibold mt-2 flex items-center">
                  <span className="mr-1">✓</span>
                  Optimal: 200-300 kg/ha
                </p>
              </div>

              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                  <span className="mr-2">💧</span>
                  Phosphorus (P) * (kg/ha)
                </label>
                <input
                  type="number"
                  name="phosphorus"
                  required
                  min="0"
                  step="0.1"
                  value={formData.phosphorus}
                  onChange={handleChange}
                  placeholder="e.g., 30"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-blue-400 bg-white shadow-sm"
                />
                <p className="text-xs text-green-600 font-semibold mt-2 flex items-center">
                  <span className="mr-1">✓</span>
                  Optimal: 20-40 kg/ha
                </p>
              </div>

              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                  <span className="mr-2">⚡</span>
                  Potassium (K) * (kg/ha)
                </label>
                <input
                  type="number"
                  name="potassium"
                  required
                  min="0"
                  step="0.1"
                  value={formData.potassium}
                  onChange={handleChange}
                  placeholder="e.g., 200"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-blue-400 bg-white shadow-sm"
                />
                <p className="text-xs text-green-600 font-semibold mt-2 flex items-center">
                  <span className="mr-1">✓</span>
                  Optimal: 150-250 kg/ha
                </p>
              </div>

              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                  <span className="mr-2">💦</span>
                  Moisture * (%)
                </label>
                <input
                  type="number"
                  name="moisture"
                  required
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.moisture}
                  onChange={handleChange}
                  placeholder="e.g., 55"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-blue-400 bg-white shadow-sm"
                />
                <p className="text-xs text-green-600 font-semibold mt-2 flex items-center">
                  <span className="mr-1">✓</span>
                  Optimal: 40-70%
                </p>
              </div>
            </div>
          </div>

          {/* Crop Information */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-3 text-3xl">🌾</span>
              Crop Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                  <span className="mr-2">🏞️</span>
                  Soil Type *
                </label>
                <select
                  name="soilType"
                  required
                  value={formData.soilType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all group-hover:border-purple-400 bg-white shadow-sm cursor-pointer"
                >
                  <option value="">Select Soil Type</option>
                  {soilTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                  <span className="mr-2">🌱</span>
                  Crop Type *
                </label>
                <select
                  name="cropType"
                  required
                  value={formData.cropType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all group-hover:border-purple-400 bg-white shadow-sm cursor-pointer"
                >
                  <option value="">Select Crop Type</option>
                  {cropTypes.map((crop) => (
                    <option key={crop} value={crop}>
                      {crop}
                    </option>
                  ))}
                </select>
              </div>

              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                  <span className="mr-2">🌞</span>
                  Season
                </label>
                <select
                  name="season"
                  value={formData.season}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all group-hover:border-purple-400 bg-white shadow-sm cursor-pointer"
                >
                  {seasons.map((season) => (
                    <option key={season} value={season}>
                      {season}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
              <span className="mr-2 text-2xl">📝</span>
              Additional Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              maxLength="500"
              placeholder="Any additional information about your soil or crop..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all hover:border-orange-400 bg-white shadow-sm resize-none"
            />
            <div className="mt-2 flex justify-between items-center">
              <p className="text-xs text-gray-600 font-medium">
                {formData.notes.length}/500 characters
              </p>
              <div className="flex items-center text-xs text-orange-600 font-semibold">
                <span className="mr-1">💡</span>
                Tip: Include soil texture or previous crop details
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              disabled={loading}
              className="group flex-1 relative bg-gradient-to-r from-green-500 via-emerald-600 to-blue-600 hover:from-green-600 hover:via-emerald-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-green-500/50 overflow-hidden"
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
              <span className="relative z-10 flex items-center justify-center text-lg">
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <div className="flex flex-col items-center">
                      <span>Analyzing with AI...</span>
                      <span className="text-sm opacity-90">This may take 10-30 seconds</span>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="mr-3 text-2xl">🤖</span>
                    Submit & Get AI Recommendations
                    <svg className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="group px-8 py-4 border-2 border-gray-300 rounded-2xl text-gray-700 font-bold hover:bg-gray-100 hover:border-gray-400 transition-all transform hover:scale-105 shadow-lg flex items-center"
            >
              <span className="mr-2 text-xl">←</span>
              Cancel
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default SoilTestForm;
