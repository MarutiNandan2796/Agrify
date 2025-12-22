import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentTests, setRecentTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch stats
      const statsRes = await api.get('/soil-test/stats/summary');
      setStats(statsRes.data.stats || { totalTests: 0, averageHealthScore: 0 });
      
      // Fetch recent tests
      const testsRes = await api.get('/soil-test?limit=5');
      setRecentTests(testsRes.data.soilTests || []);
      
    } catch (error) {
      console.error('Dashboard fetch error:', error);
      
      // Detailed error logging
      if (error.response) {
        console.error('Response error:', error.response.data);
        console.error('Status:', error.response.status);
        const errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
        toast.error(errorMessage);
      } else if (error.request) {
        console.error('Request error:', error.request);
        toast.error('Cannot connect to server. Please check if backend is running.');
      } else {
        console.error('Error:', error.message);
        toast.error(error.message);
      }
      
      // Set empty data on error
      setStats({ totalTests: 0, averageHealthScore: 0 });
      setRecentTests([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
      case 'analyzed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="animate-spin rounded-full h-24 w-24 border-8 border-green-200"></div>
            <div className="animate-spin rounded-full h-24 w-24 border-8 border-t-green-600 border-r-blue-600 absolute top-0 left-0"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl animate-pulse">🌱</span>
            </div>
          </div>
          <p className="mt-6 text-xl font-bold text-gray-700 animate-pulse">Loading your farm data...</p>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Animation */}
        <div className="mb-8 animate-fade-in">
          <div className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 rounded-2xl shadow-2xl p-8 text-white overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
            
            <div className="relative z-10">
              <h1 className="text-5xl font-extrabold mb-3 flex items-center animate-slide-in">
                <span className="mr-4 text-6xl animate-float">🌱</span>
                <span>Welcome to Your Dashboard</span>
              </h1>
              <p className="text-xl text-green-100 mb-6">Track your soil health and boost your farm's productivity!</p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center bg-white/20 hover:bg-white/30 rounded-xl px-5 py-3 backdrop-blur-sm transition-all cursor-pointer transform hover:scale-105">
                  <span className="mr-2 text-2xl">📅</span>
                  <span className="text-sm font-semibold">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center bg-white/20 hover:bg-white/30 rounded-xl px-5 py-3 backdrop-blur-sm transition-all cursor-pointer transform hover:scale-105">
                  <span className="mr-2 text-2xl">🌤️</span>
                  <span className="text-sm font-semibold">Perfect day for farming!</span>
                </div>
                <div className="flex items-center bg-white/20 hover:bg-white/30 rounded-xl px-5 py-3 backdrop-blur-sm transition-all cursor-pointer transform hover:scale-105">
                  <span className="mr-2 text-2xl">🚜</span>
                  <span className="text-sm font-semibold">Ready to optimize?</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards with Hover Effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/history"
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 p-6 border-t-4 border-blue-500 group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <dt className="text-sm font-medium text-gray-500 mb-2">Total Tests</dt>
                <dd className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stats?.totalTests || 0}
                </dd>
                <p className="text-xs text-gray-500 mt-2">All time tests conducted</p>
                <p className="text-xs text-blue-600 font-semibold mt-3 flex items-center">
                  View All Tests
                  <svg className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </p>
              </div>
              <div className="flex-shrink-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-4 group-hover:scale-110 transition-transform">
                <span className="text-3xl">📊</span>
              </div>
            </div>
          </Link>

          <Link
            to="/history"
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 p-6 border-t-4 border-green-500 group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <dt className="text-sm font-medium text-gray-500 mb-2">Avg Health Score</dt>
                <dd className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {stats?.averageHealthScore || 0}
                </dd>
                <p className="text-xs text-gray-500 mt-2">Soil quality rating</p>
                <p className="text-xs text-green-600 font-semibold mt-3 flex items-center">
                  View Details
                  <svg className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </p>
              </div>
              <div className="flex-shrink-0 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-4 group-hover:scale-110 transition-transform">
                <span className="text-3xl">💚</span>
              </div>
            </div>
          </Link>

          <div 
            onClick={() => {
              const recentSection = document.getElementById('recent-tests-section');
              if (recentSection) {
                recentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 p-6 border-t-4 border-purple-500 group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <dt className="text-sm font-medium text-gray-500 mb-2">Recent Tests</dt>
                <dd className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {recentTests?.length || 0}
                </dd>
                <p className="text-xs text-gray-500 mt-2">Last 30 days</p>
                <p className="text-xs text-purple-600 font-semibold mt-3 flex items-center">
                  Scroll to Recent
                  <svg className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </p>
              </div>
              <div className="flex-shrink-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-4 group-hover:scale-110 transition-transform">
                <span className="text-3xl">📝</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions with Enhanced Design */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="mr-3 text-3xl">⚡</span>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/soil-test"
              className="group relative overflow-hidden flex items-center justify-center p-6 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <span className="text-3xl mr-3 group-hover:scale-125 transition-transform">➕</span>
              <div className="text-left">
                <span className="block font-bold text-lg text-white">New Soil Test</span>
                <span className="text-sm text-green-100">Submit a new analysis</span>
              </div>
            </Link>
            <Link
              to="/history"
              className="group relative overflow-hidden flex items-center justify-center p-6 bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <span className="text-3xl mr-3 group-hover:scale-125 transition-transform">📋</span>
              <div className="text-left">
                <span className="block font-bold text-lg text-white">View History</span>
                <span className="text-sm text-blue-100">Browse all tests</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Tests with Enhanced Design */}
        <div id="recent-tests-section" className="bg-white rounded-2xl shadow-xl overflow-hidden scroll-mt-24">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-5">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <span className="mr-3 text-3xl">🔬</span>
              Recent Soil Tests
            </h2>
          </div>
          <div className="overflow-x-auto">
            {recentTests.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      📅 Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      🌾 Crop Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      🏞️ Soil Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      ⚗️ pH
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      📊 Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      🔗 Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {recentTests.map((test, index) => (
                    <tr 
                      key={test._id} 
                      className="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-200 group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {new Date(test.testDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          {test.cropType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                          {test.soilType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-blue-100 text-blue-800">
                          {test.pH.toFixed(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full shadow-sm ${getStatusColor(
                            test.status
                          )}`}
                        >
                          {test.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Link
                          to={`/test/${test._id}`}
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium rounded-lg transition-all duration-200 transform group-hover:scale-105 shadow-md hover:shadow-lg"
                        >
                          <span>View Details</span>
                          <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-16">
              <div className="text-center mb-12">
                <div className="animate-bounce mb-6 inline-block">
                  <span className="text-9xl">📊</span>
                </div>
                <h3 className="text-4xl font-bold text-gray-800 mb-3">No soil tests yet</h3>
                <p className="text-xl text-gray-600 mb-8">Start your journey to better soil health!</p>
                <Link
                  to="/soil-test"
                  className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg font-bold rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-green-500/50"
                >
                  <span className="mr-2 text-2xl">🚀</span>
                  Create Your First Test
                  <svg className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>

              {/* Tips Section */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all border-l-4 border-green-500">
                  <div className="text-5xl mb-4">🌾</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">Test Your Soil</h4>
                  <p className="text-gray-600">Enter pH, NPK, and moisture levels to get instant recommendations for optimal crop growth.</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all border-l-4 border-blue-500">
                  <div className="text-5xl mb-4">💡</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">Get AI Insights</h4>
                  <p className="text-gray-600">Receive personalized fertilizer recommendations based on your soil type and crop choice.</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all border-l-4 border-purple-500">
                  <div className="text-5xl mb-4">📈</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">Track Progress</h4>
                  <p className="text-gray-600">Monitor soil health over time and watch your farm productivity improve with data.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
