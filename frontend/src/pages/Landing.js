import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 opacity-90"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b-4 border-green-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center group cursor-pointer">
            <span className="text-4xl group-hover:scale-110 transition-transform">🌱</span>
            <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              AgriFy
            </span>
          </div>
          <div className="space-x-4">
            <Link
              to="/login"
              className="text-green-600 hover:text-green-700 font-bold px-4 py-2 rounded-lg hover:bg-green-50 transition-all transform hover:scale-105"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg hover:shadow-2xl inline-flex items-center"
            >
              <span>Get Started</span>
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center animate-fade-in">
          <div className="mb-8 animate-float">
            <span className="text-9xl">🌾</span>
          </div>
          <h1 className="text-6xl font-extrabold text-white mb-6 drop-shadow-2xl">
            Optimize Your Crop Yield with
            <span className="block mt-2 bg-gradient-to-r from-yellow-300 via-green-200 to-blue-200 bg-clip-text text-transparent">
              Smart Soil Analysis
            </span>
          </h1>
          <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto drop-shadow-lg font-medium">
            Get accurate soil health assessments and personalized fertilizer recommendations
            to improve your farm's productivity and sustainability.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/register"
              className="group relative inline-flex items-center bg-white text-green-600 px-10 py-5 rounded-2xl text-xl font-bold transition-all transform hover:scale-110 shadow-2xl hover:shadow-green-500/50 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative z-10 group-hover:text-white transition-colors">Start Testing Now</span>
              <svg className="relative z-10 ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all transform hover:scale-110 shadow-2xl hover:bg-white/30 border-2 border-white/50"
            >
              <span>Watch Demo</span>
              <svg className="ml-2 w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-5xl font-bold text-center mb-4 text-white drop-shadow-lg">Key Features</h2>
        <p className="text-center text-white/80 text-xl mb-16">Everything you need for perfect soil health</p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl hover:shadow-green-500/50 transition-all transform hover:-translate-y-3 hover:scale-105 cursor-pointer border-t-4 border-green-500">
            <div className="text-6xl mb-6 group-hover:scale-125 transition-transform">🔬</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Comprehensive Analysis</h3>
            <p className="text-gray-600 text-lg">
              Analyze pH, nitrogen, phosphorus, potassium, and moisture levels
              for complete soil health assessment.
            </p>
            <div className="mt-6 inline-flex items-center text-green-600 font-bold group-hover:translate-x-2 transition-transform">
              Learn More
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          <div className="group bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:-translate-y-3 hover:scale-105 cursor-pointer border-t-4 border-blue-500">
            <div className="text-6xl mb-6 group-hover:scale-125 transition-transform">💡</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Smart Recommendations</h3>
            <p className="text-gray-600 text-lg">
              Get AI-powered fertilizer recommendations tailored to your soil
              type and crop requirements.
            </p>
            <div className="mt-6 inline-flex items-center text-blue-600 font-bold group-hover:translate-x-2 transition-transform">
              Learn More
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          <div className="group bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:-translate-y-3 hover:scale-105 cursor-pointer border-t-4 border-purple-500">
            <div className="text-6xl mb-6 group-hover:scale-125 transition-transform">📊</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Track Progress</h3>
            <p className="text-gray-600 text-lg">
              Monitor soil health over time with detailed reports and historical
              data analysis.
            </p>
            <div className="mt-6 inline-flex items-center text-purple-600 font-bold group-hover:translate-x-2 transition-transform">
              Learn More
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white/95 backdrop-blur-sm py-20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-center text-gray-600 text-xl mb-16">Simple steps to better farming</p>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group cursor-pointer">
              <div className="bg-gradient-to-br from-green-400 to-green-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-125 transition-transform group-hover:shadow-2xl">
                <span className="text-4xl font-bold text-white">1</span>
              </div>
              <div className="bg-green-50 p-6 rounded-xl group-hover:bg-green-100 transition-colors">
                <h3 className="font-bold text-xl mb-2 text-gray-800">Register</h3>
                <p className="text-gray-600">Create your farmer account in seconds</p>
              </div>
              <div className="mt-4 text-green-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                Click to Start →
              </div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-125 transition-transform group-hover:shadow-2xl">
                <span className="text-4xl font-bold text-white">2</span>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl group-hover:bg-blue-100 transition-colors">
                <h3 className="font-bold text-xl mb-2 text-gray-800">Submit Data</h3>
                <p className="text-gray-600">Enter your soil test parameters</p>
              </div>
              <div className="mt-4 text-blue-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                Quick & Easy →
              </div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-125 transition-transform group-hover:shadow-2xl">
                <span className="text-4xl font-bold text-white">3</span>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl group-hover:bg-purple-100 transition-colors">
                <h3 className="font-bold text-xl mb-2 text-gray-800">Get Analysis</h3>
                <p className="text-gray-600">Receive instant AI recommendations</p>
              </div>
              <div className="mt-4 text-purple-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                Instant Results →
              </div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-125 transition-transform group-hover:shadow-2xl">
                <span className="text-4xl font-bold text-white">4</span>
              </div>
              <div className="bg-orange-50 p-6 rounded-xl group-hover:bg-orange-100 transition-colors">
                <h3 className="font-bold text-xl mb-2 text-gray-800">Improve Yield</h3>
                <p className="text-gray-600">Apply recommendations & grow more</p>
              </div>
              <div className="mt-4 text-orange-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                Success! 🎉
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/95 backdrop-blur-sm text-white py-12 border-t-4 border-green-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <span className="text-5xl">🌱</span>
          </div>
          <p className="text-xl font-bold mb-2">© 2025 AgriTech. All rights reserved.</p>
          <p className="text-gray-400 mt-2 text-lg">Empowering farmers with data-driven decisions</p>
          <div className="mt-8 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors transform hover:scale-110">
              <span className="text-3xl">📱</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110">
              <span className="text-3xl">💬</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors transform hover:scale-110">
              <span className="text-3xl">📧</span>
            </a>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Landing;
