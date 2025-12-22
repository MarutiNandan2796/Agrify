import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';

const TestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [soilTest, setSoilTest] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestDetails();
  }, [id]);

  const fetchTestDetails = async () => {
    try {
      const response = await api.get(`/soil-test/${id}`);
      setSoilTest(response.data.soilTest);
      setRecommendation(response.data.recommendation);
    } catch (error) {
      toast.error('Error fetching test details');
      console.error(error);
      navigate('/history');
    } finally {
      setLoading(false);
    }
  };

  const getHealthColor = (status) => {
    switch (status) {
      case 'Excellent':
        return 'text-green-600 bg-green-100';
      case 'Good':
        return 'text-blue-600 bg-blue-100';
      case 'Fair':
        return 'text-yellow-600 bg-yellow-100';
      case 'Poor':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!soilTest) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/history')}
          className="text-primary-600 hover:text-primary-700 mb-4"
        >
          ← Back to History
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Soil Test Report</h1>
        <p className="mt-2 text-gray-600">
          Test Date: {new Date(soilTest.testDate).toLocaleDateString()}
        </p>
      </div>

      {/* Soil Test Information */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500">Farmer Name</p>
            <p className="text-base font-medium text-gray-900">{soilTest.farmerName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="text-base font-medium text-gray-900">{soilTest.location}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Crop Type</p>
            <p className="text-base font-medium text-gray-900">{soilTest.cropType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Soil Type</p>
            <p className="text-base font-medium text-gray-900">{soilTest.soilType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Season</p>
            <p className="text-base font-medium text-gray-900">{soilTest.season}</p>
          </div>
        </div>
      </div>

      {/* Soil Parameters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Soil Parameters</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 rounded-lg p-4 mb-2">
              <p className="text-2xl font-bold text-blue-600">{soilTest.pH.toFixed(1)}</p>
            </div>
            <p className="text-sm text-gray-600">pH Level</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-lg p-4 mb-2">
              <p className="text-2xl font-bold text-green-600">{soilTest.nitrogen}</p>
            </div>
            <p className="text-sm text-gray-600">Nitrogen (kg/ha)</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-lg p-4 mb-2">
              <p className="text-2xl font-bold text-purple-600">{soilTest.phosphorus}</p>
            </div>
            <p className="text-sm text-gray-600">Phosphorus (kg/ha)</p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-100 rounded-lg p-4 mb-2">
              <p className="text-2xl font-bold text-yellow-600">{soilTest.potassium}</p>
            </div>
            <p className="text-sm text-gray-600">Potassium (kg/ha)</p>
          </div>
          <div className="text-center">
            <div className="bg-cyan-100 rounded-lg p-4 mb-2">
              <p className="text-2xl font-bold text-cyan-600">{soilTest.moisture}%</p>
            </div>
            <p className="text-sm text-gray-600">Moisture</p>
          </div>
        </div>
      </div>

      {recommendation && (
        <>
          {/* AI-Generated Recommendation */}
          {recommendation.aiRecommendation && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-lg p-6 mb-6 border-2 border-blue-200">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-4 py-2 text-sm font-semibold">
                  🤖 AI-Powered Analysis
                </div>
                <span className="ml-3 text-sm text-gray-600">
                  Generated by {recommendation.generatedBy || 'OpenAI GPT-4'}
                </span>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-inner">
                <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed font-sans">
                  {recommendation.aiRecommendation}
                </pre>
              </div>
            </div>
          )}

          {/* NPK Status */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Nutrient Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Nitrogen (N)</p>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  recommendation.nitrogenLevel === 'Optimal' ? 'bg-green-200 text-green-800' :
                  recommendation.nitrogenLevel === 'Deficit' ? 'bg-red-200 text-red-800' :
                  recommendation.nitrogenLevel === 'Excess' ? 'bg-orange-200 text-orange-800' :
                  'bg-gray-200 text-gray-800'
                }`}>
                  {recommendation.nitrogenLevel || 'Unknown'}
                </span>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Phosphorus (P)</p>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  recommendation.phosphorusLevel === 'Optimal' ? 'bg-green-200 text-green-800' :
                  recommendation.phosphorusLevel === 'Deficit' ? 'bg-red-200 text-red-800' :
                  recommendation.phosphorusLevel === 'Excess' ? 'bg-orange-200 text-orange-800' :
                  'bg-gray-200 text-gray-800'
                }`}>
                  {recommendation.phosphorusLevel || 'Unknown'}
                </span>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Potassium (K)</p>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  recommendation.potassiumLevel === 'Optimal' ? 'bg-green-200 text-green-800' :
                  recommendation.potassiumLevel === 'Deficit' ? 'bg-red-200 text-red-800' :
                  recommendation.potassiumLevel === 'Excess' ? 'bg-orange-200 text-orange-800' :
                  'bg-gray-200 text-gray-800'
                }`}>
                  {recommendation.potassiumLevel || 'Unknown'}
                </span>
              </div>
            </div>
          </div>

          {/* Soil Health Score */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Soil Health Assessment</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-5xl font-bold text-gray-900">
                  {recommendation.soilHealthScore}
                  <span className="text-2xl text-gray-500">/100</span>
                </p>
                <p className="mt-2 text-gray-600">Overall Health Score</p>
              </div>
              <div>
                <span
                  className={`px-6 py-3 text-xl font-semibold rounded-lg ${getHealthColor(
                    recommendation.healthStatus
                  )}`}
                >
                  {recommendation.healthStatus}
                </span>
              </div>
            </div>

            {/* Warnings */}
            {recommendation.warnings && recommendation.warnings.length > 0 && (
              <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4">
                <h3 className="text-red-800 font-semibold mb-2">⚠️ Warnings</h3>
                <ul className="list-disc list-inside text-red-700 space-y-1">
                  {recommendation.warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Nutrient Analysis */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Deficient Nutrients */}
            {recommendation.deficientNutrients && recommendation.deficientNutrients.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Deficient Nutrients
                </h3>
                <div className="space-y-3">
                  {recommendation.deficientNutrients.map((nutrient, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-700">{nutrient.nutrient}</span>
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded ${
                          nutrient.severity === 'High'
                            ? 'bg-red-100 text-red-800'
                            : nutrient.severity === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {nutrient.severity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Excess Nutrients */}
            {recommendation.excessNutrients && recommendation.excessNutrients.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Excess Nutrients</h3>
                <div className="space-y-3">
                  {recommendation.excessNutrients.map((nutrient, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-700">{nutrient.nutrient}</span>
                      <span className="px-3 py-1 text-sm font-medium rounded bg-orange-100 text-orange-800">
                        {nutrient.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Primary Fertilizer Recommendation */}
          {recommendation.primaryFertilizer && recommendation.primaryFertilizer.name && (
            <div className="bg-gradient-to-r from-primary-50 to-green-50 rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                🌟 Primary Fertilizer Recommendation
              </h2>
              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-bold text-primary-700 mb-2">
                  {recommendation.primaryFertilizer.name}
                </h3>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Quantity:</span>{' '}
                  {recommendation.primaryFertilizer.quantity}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Application Method:</span>{' '}
                  {recommendation.primaryFertilizer.applicationMethod}
                </p>
              </div>
            </div>
          )}

          {/* Secondary Fertilizers */}
          {recommendation.secondaryFertilizers &&
            recommendation.secondaryFertilizers.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Secondary Fertilizers
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {recommendation.secondaryFertilizers.map((fertilizer, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{fertilizer.name}</h3>
                      <p className="text-sm text-gray-700 mb-1">
                        <span className="font-medium">Quantity:</span> {fertilizer.quantity}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Method:</span>{' '}
                        {fertilizer.applicationMethod}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Organic Options */}
          {recommendation.organicOptions && recommendation.organicOptions.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                🌿 Organic Alternatives
              </h2>
              <div className="space-y-4">
                {recommendation.organicOptions.map((option, index) => (
                  <div key={index} className="border-l-4 border-green-500 bg-green-50 p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{option.name}</h3>
                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-medium">Quantity:</span> {option.quantity}
                    </p>
                    <p className="text-sm text-gray-600">{option.benefits}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* pH Adjustment */}
          {recommendation.pHAdjustment && recommendation.pHAdjustment.needed && (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">pH Adjustment Needed</h2>
              <p className="text-gray-700 mb-2">{recommendation.pHAdjustment.recommendation}</p>
              <p className="text-gray-600">
                <span className="font-medium">Target pH:</span>{' '}
                {recommendation.pHAdjustment.targetpH}
              </p>
            </div>
          )}

          {/* Application Schedule */}
          {recommendation.applicationSchedule && recommendation.applicationSchedule.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Application Schedule
              </h2>
              <div className="space-y-3">
                {recommendation.applicationSchedule.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex items-start border-l-4 border-primary-500 bg-gray-50 p-4"
                  >
                    <div className="flex-shrink-0 bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{schedule.stage}</h3>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Timing:</span> {schedule.timing}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Fertilizer:</span> {schedule.fertilizer}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Quantity:</span> {schedule.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Best Practices */}
          {recommendation.bestPractices && recommendation.bestPractices.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                💡 Best Practices & Tips
              </h2>
              <ul className="space-y-2">
                {recommendation.bestPractices.map((practice, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">{practice}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Additional Information */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Expected Yield Improvement</h3>
              <p className="text-gray-700">{recommendation.expectedYieldImprovement}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Estimated Cost</h3>
              <p className="text-2xl font-bold text-primary-600">
                ₹{recommendation.estimatedCostPerAcre}
              </p>
              <p className="text-sm text-gray-600">per acre</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Recommendation Valid Until</h3>
              <p className="text-gray-700">
                {new Date(recommendation.validUntil).toLocaleDateString()}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TestDetails;
