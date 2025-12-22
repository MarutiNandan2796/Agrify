import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const HelpSupport = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const faqCategories = [
    {
      id: 1,
      title: 'Getting Started',
      icon: '🚀',
      color: 'from-blue-400 to-blue-600',
      faqs: [
        {
          question: 'How do I create my first soil test?',
          answer: 'Navigate to the "New Test" page from the menu or dashboard, fill in your soil parameters (pH, nitrogen, phosphorus, potassium), and submit. Our AI will generate personalized recommendations.'
        },
        {
          question: 'What information do I need for a soil test?',
          answer: 'You\'ll need basic soil parameters like pH level, nitrogen (N), phosphorus (P), potassium (K) levels, moisture content, crop type, and your farm location.'
        }
      ]
    },
    {
      id: 2,
      title: 'Soil Testing',
      icon: '🔬',
      color: 'from-green-400 to-green-600',
      faqs: [
        {
          question: 'How accurate are the AI recommendations?',
          answer: 'Our AI uses Google Gemini technology and agricultural best practices to provide highly accurate recommendations. Results are based on scientific data and regional farming patterns.'
        },
        {
          question: 'Can I edit a submitted test?',
          answer: 'Once submitted, tests cannot be edited to maintain data integrity. However, you can always create a new test with updated information.'
        }
      ]
    },
    {
      id: 3,
      title: 'Account & Settings',
      icon: '⚙️',
      color: 'from-purple-400 to-purple-600',
      faqs: [
        {
          question: 'How do I update my profile information?',
          answer: 'Go to "My Profile" from the menu, update your information in the form, and click "Save Changes". Your email address cannot be modified for security reasons.'
        },
        {
          question: 'How do I change my password?',
          answer: 'Visit Settings > Change Password, enter your current password and new password, then submit. Your password must be at least 6 characters long.'
        }
      ]
    },
    {
      id: 4,
      title: 'Technical Issues',
      icon: '🔧',
      color: 'from-orange-400 to-orange-600',
      faqs: [
        {
          question: 'What should I do if I encounter an error?',
          answer: 'Try refreshing the page first. If the issue persists, clear your browser cache, or contact our support team with details about the error message.'
        },
        {
          question: 'Is my data secure?',
          answer: 'Yes! We use industry-standard encryption and security practices. Your data is stored securely in MongoDB Atlas with proper authentication and authorization.'
        }
      ]
    }
  ];

  const quickLinks = [
    { title: 'Dashboard', path: '/dashboard', icon: '📊', color: 'bg-blue-500' },
    { title: 'New Test', path: '/soil-test', icon: '➕', color: 'bg-green-500' },
    { title: 'Test History', path: '/history', icon: '📋', color: 'bg-purple-500' },
    { title: 'My Profile', path: '/profile', icon: '👤', color: 'bg-orange-500' }
  ];

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Support request submitted! We\'ll get back to you soon.');
      setContactForm({ subject: '', message: '' });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-3">
            <span className="mr-3 text-6xl">❓</span>
            Help & Support
          </h1>
          <p className="text-xl text-gray-600">We're here to help you succeed with your farming!</p>
        </div>

        {/* Quick Links */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">⚡</span>
            Quick Links
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${link.color} hover:opacity-90 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center`}
              >
                <div className="text-4xl mb-2">{link.icon}</div>
                <div className="font-bold">{link.title}</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Categories */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">📚</span>
              Frequently Asked Questions
            </h2>
            
            {faqCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <button
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                  className={`w-full p-6 flex items-center justify-between bg-gradient-to-r ${category.color} text-white hover:opacity-90 transition-opacity`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{category.icon}</span>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>
                  <svg
                    className={`w-6 h-6 transform transition-transform ${selectedCategory === category.id ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {selectedCategory === category.id && (
                  <div className="p-6 space-y-4">
                    {category.faqs.map((faq, index) => (
                      <div key={index} className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-bold text-gray-900 mb-2">{faq.question}</h4>
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">💬</span>
                Contact Support
              </h2>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    placeholder="Brief description"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    rows="6"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all resize-none"
                    placeholder="Describe your issue or question..."
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-bold text-gray-900 mb-3">Other Ways to Reach Us</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-700">
                    <span className="text-2xl">📧</span>
                    <span className="text-sm">support@soiltest.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <span className="text-2xl">📞</span>
                    <span className="text-sm">1-800-SOIL-TEST</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <span className="text-2xl">⏰</span>
                    <span className="text-sm">Mon-Fri, 9AM-6PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
