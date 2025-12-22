const axios = require('axios');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GOOGLE_API_KEY}`;

async function generateAIRecommendation(soilData) {
  try {
    const { farmerName, farmerLocation, pH, nitrogen, phosphorus, potassium, moisture, cropType, previousCrop, notes } = soilData;
    
    const prompt = `You are an expert agricultural consultant. Analyze this soil test data and provide comprehensive recommendations.

Farm Details:
- Farmer: ${farmerName}
- Location: ${farmerLocation}
- Crop Type: ${cropType || 'Not specified'}
- Previous Crop: ${previousCrop || 'Not specified'}
${notes ? `- Notes: ${notes}` : ''}

Soil Test Results:
- pH Level: ${pH}
- Nitrogen (N): ${nitrogen} kg/ha
- Phosphorus (P): ${phosphorus} kg/ha
- Potassium (K): ${potassium} kg/ha
- Moisture: ${moisture}%

Provide detailed analysis and recommendations for soil health, NPK status, pH analysis, fertilizer recommendations, application guidelines, crop-specific advice, and long-term soil management.`;

    const response = await axios.post(GEMINI_API_URL, {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 2048, topP: 0.95, topK: 40 }
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    const aiRecommendation = response.data.candidates[0].content.parts[0].text;
    const soilHealthScore = calculateBasicSoilHealthScore({ pH, nitrogen, phosphorus, potassium, moisture });
    const nitrogenStatus = getNutrientStatus(nitrogen, 200, 300);
    const phosphorusStatus = getNutrientStatus(phosphorus, 20, 40);
    const potassiumStatus = getNutrientStatus(potassium, 150, 250);

    return {
      soilHealthScore,
      nitrogenLevel: nitrogenStatus,
      phosphorusLevel: phosphorusStatus,
      potassiumLevel: potassiumStatus,
      aiRecommendation,
      recommendations: [{ category: 'AI-Generated Analysis', items: [aiRecommendation] }],
      warnings: generateWarnings({ pH, nitrogen, phosphorus, potassium, moisture }),
      generatedAt: new Date(),
      generatedBy: 'Google Gemini AI'
    };
  } catch (error) {
    console.error('Google Gemini AI Error:', error.response?.data || error.message);
    
    // Re-extract soilData variables for fallback
    const { pH, nitrogen, phosphorus, potassium, moisture, cropType } = soilData;
    
    // Generate fallback recommendations based on soil data
    const soilHealthScore = calculateBasicSoilHealthScore({ pH, nitrogen, phosphorus, potassium, moisture });
    const nitrogenStatus = getNutrientStatus(nitrogen, 200, 300);
    const phosphorusStatus = getNutrientStatus(phosphorus, 20, 40);
    const potassiumStatus = getNutrientStatus(potassium, 150, 250);
    
    return {
      soilHealthScore,
      nitrogenLevel: nitrogenStatus,
      phosphorusLevel: phosphorusStatus,
      potassiumLevel: potassiumStatus,
      aiRecommendation: generateFallbackRecommendation({ pH, nitrogen, phosphorus, potassium, moisture, cropType }),
      recommendations: generateDetailedRecommendations({ pH, nitrogen, phosphorus, potassium, moisture, cropType }),
      warnings: generateWarnings({ pH, nitrogen, phosphorus, potassium, moisture }),
      generatedAt: new Date(),
      generatedBy: 'Expert System (AI temporarily unavailable)'
    };
  }
}

function calculateBasicSoilHealthScore(soilData) {
  const { pH, nitrogen, phosphorus, potassium, moisture } = soilData;
  let score = 0;
  if (pH >= 6.0 && pH <= 7.5) score += 25;
  else if ((pH >= 5.5 && pH < 6.0) || (pH > 7.5 && pH <= 8.0)) score += 18;
  else if ((pH >= 5.0 && pH < 5.5) || (pH > 8.0 && pH <= 8.5)) score += 10;
  else score += 5;
  if (nitrogen >= 200 && nitrogen <= 300) score += 25;
  else if ((nitrogen >= 150 && nitrogen < 200) || (nitrogen > 300 && nitrogen <= 350)) score += 18;
  else if ((nitrogen >= 100 && nitrogen < 150) || (nitrogen > 350 && nitrogen <= 400)) score += 10;
  else score += 5;
  if (phosphorus >= 20 && phosphorus <= 40) score += 25;
  else if ((phosphorus >= 15 && phosphorus < 20) || (phosphorus > 40 && phosphorus <= 50)) score += 18;
  else if ((phosphorus >= 10 && phosphorus < 15) || (phosphorus > 50 && phosphorus <= 60)) score += 10;
  else score += 5;
  if (potassium >= 150 && potassium <= 250) score += 15;
  else if ((potassium >= 100 && potassium < 150) || (potassium > 250 && potassium <= 300)) score += 10;
  else score += 5;
  if (moisture >= 40 && moisture <= 60) score += 10;
  else if ((moisture >= 30 && moisture < 40) || (moisture > 60 && moisture <= 70)) score += 7;
  else score += 3;
  return score;
}

function getNutrientStatus(value, optimalMin, optimalMax) {
  if (value < optimalMin) return 'Deficit';
  if (value > optimalMax) return 'Excess';
  return 'Optimal';
}

function generateWarnings(soilData) {
  const warnings = [];
  const { pH, nitrogen, phosphorus, potassium, moisture } = soilData;
  if (pH < 5.0 || pH > 8.5) warnings.push('Critical pH level - immediate correction required');
  if (nitrogen < 100) warnings.push('Severe nitrogen deficiency detected');
  if (phosphorus < 10) warnings.push('Critical phosphorus deficiency');
  if (potassium < 100) warnings.push('Low potassium levels detected');
  if (moisture < 20) warnings.push('Very low soil moisture - irrigation recommended');
  else if (moisture > 80) warnings.push('Excessive moisture - drainage issues possible');
  return warnings;
}

function generateFallbackRecommendation(soilData) {
  const { pH, nitrogen, phosphorus, potassium, moisture, cropType } = soilData;
  let recommendation = `Comprehensive Soil Analysis for ${cropType || 'your crop'}:\n\n`;
  
  // pH Analysis
  if (pH < 6.0) {
    recommendation += `🔴 pH Level (${pH}): Your soil is acidic. Apply agricultural lime at 2-3 tons/ha to raise pH. Test again after 3 months.\n\n`;
  } else if (pH > 7.5) {
    recommendation += `🔴 pH Level (${pH}): Your soil is alkaline. Apply elemental sulfur or organic matter to lower pH gradually.\n\n`;
  } else {
    recommendation += `🟢 pH Level (${pH}): Optimal range for most crops. Maintain with balanced fertilization.\n\n`;
  }
  
  // Nitrogen Analysis
  if (nitrogen < 150) {
    recommendation += `🔴 Nitrogen (${nitrogen} kg/ha): LOW - Apply urea at 150-200 kg/ha or use organic compost (5-7 tons/ha).\n\n`;
  } else if (nitrogen > 350) {
    recommendation += `🟡 Nitrogen (${nitrogen} kg/ha): HIGH - Reduce nitrogen fertilizers to prevent crop lodging and pollution.\n\n`;
  } else {
    recommendation += `🟢 Nitrogen (${nitrogen} kg/ha): Good levels. Maintain with split application of 100 kg/ha urea.\n\n`;
  }
  
  // Phosphorus Analysis
  if (phosphorus < 15) {
    recommendation += `🔴 Phosphorus (${phosphorus} kg/ha): LOW - Apply DAP or SSP at 200-250 kg/ha before sowing.\n\n`;
  } else if (phosphorus > 50) {
    recommendation += `🟡 Phosphorus (${phosphorus} kg/ha): HIGH - Skip P fertilizers this season to avoid buildup.\n\n`;
  } else {
    recommendation += `🟢 Phosphorus (${phosphorus} kg/ha): Adequate. Maintenance dose of 50-75 kg/ha DAP recommended.\n\n`;
  }
  
  // Potassium Analysis
  if (potassium < 120) {
    recommendation += `🔴 Potassium (${potassium} kg/ha): LOW - Apply MOP (Muriate of Potash) at 80-100 kg/ha.\n\n`;
  } else if (potassium > 300) {
    recommendation += `🟡 Potassium (${potassium} kg/ha): HIGH - No additional K fertilizer needed this season.\n\n`;
  } else {
    recommendation += `🟢 Potassium (${potassium} kg/ha): Good levels. Maintenance application of 40-50 kg/ha MOP.\n\n`;
  }
  
  // Moisture Guidance
  if (moisture < 30) {
    recommendation += `💧 Moisture (${moisture}%): Schedule irrigation immediately. Use drip or sprinkler for efficiency.\n\n`;
  } else if (moisture > 70) {
    recommendation += `💧 Moisture (${moisture}%): Excess water. Improve drainage and delay irrigation.\n\n`;
  } else {
    recommendation += `💧 Moisture (${moisture}%): Optimal. Monitor regularly and irrigate based on crop stage.\n\n`;
  }
  
  recommendation += `📋 General Recommendations:\n`;
  recommendation += `• Apply organic manure (FYM) at 10-15 tons/ha annually\n`;
  recommendation += `• Maintain soil cover with mulch to conserve moisture\n`;
  recommendation += `• Practice crop rotation with legumes to improve soil health\n`;
  recommendation += `• Get soil tested every 6 months for best results\n`;
  recommendation += `• Apply fertilizers in 2-3 splits for better efficiency\n`;
  
  return recommendation;
}

function generateDetailedRecommendations(soilData) {
  const { pH, nitrogen, phosphorus, potassium, moisture, cropType } = soilData;
  const recommendations = [];
  
  // pH Recommendations
  const phRecommendations = [];
  if (pH < 5.5) {
    phRecommendations.push('Apply agricultural lime (CaCO3) at 3-4 tons/ha');
    phRecommendations.push('Incorporate dolomitic limestone for calcium and magnesium');
    phRecommendations.push('Avoid ammoniacal fertilizers that increase acidity');
  } else if (pH > 8.0) {
    phRecommendations.push('Apply elemental sulfur at 500-800 kg/ha');
    phRecommendations.push('Use acidifying fertilizers like ammonium sulfate');
    phRecommendations.push('Add organic matter (compost) to buffer pH');
  } else {
    phRecommendations.push('pH is optimal - maintain with balanced fertilization');
    phRecommendations.push('Monitor pH levels every 6 months');
  }
  recommendations.push({ category: '🔬 pH Management', items: phRecommendations });
  
  // Nitrogen Recommendations
  const nRecommendations = [];
  if (nitrogen < 150) {
    nRecommendations.push('Apply Urea (46-0-0) at 150-200 kg/ha in split doses');
    nRecommendations.push('Use FYM or vermicompost at 7-10 tons/ha');
    nRecommendations.push('Consider growing green manure crops (legumes)');
    nRecommendations.push('Apply 50% N at sowing, 25% at tillering, 25% at flowering');
  } else if (nitrogen > 350) {
    nRecommendations.push('Reduce nitrogen fertilizer application this season');
    nRecommendations.push('Plant nitrogen-fixing cover crops');
  } else {
    nRecommendations.push('Maintain current levels with 100-120 kg/ha urea');
    nRecommendations.push('Split application: 40% basal + 30% tillering + 30% flowering');
  }
  recommendations.push({ category: '🌱 Nitrogen (N) Management', items: nRecommendations });
  
  // Phosphorus Recommendations
  const pRecommendations = [];
  if (phosphorus < 15) {
    pRecommendations.push('Apply DAP (18-46-0) at 200-250 kg/ha');
    pRecommendations.push('Alternatively use SSP (Single Super Phosphate) at 300-350 kg/ha');
    pRecommendations.push('Apply rock phosphate for long-term availability');
  } else if (phosphorus > 50) {
    pRecommendations.push('Skip phosphate fertilizers this season');
  } else {
    pRecommendations.push('Apply maintenance dose of 50-75 kg/ha DAP');
    pRecommendations.push('Band placement near seeds for better efficiency');
  }
  recommendations.push({ category: '🌾 Phosphorus (P) Management', items: pRecommendations });
  
  // Potassium Recommendations
  const kRecommendations = [];
  if (potassium < 120) {
    kRecommendations.push('Apply MOP (Muriate of Potash) at 80-100 kg/ha');
    kRecommendations.push('Use SOP (Sulphate of Potash) for sensitive crops');
    kRecommendations.push('Apply potash at pre-sowing or first irrigation');
  } else if (potassium > 300) {
    kRecommendations.push('No additional potassium fertilizer needed');
  } else {
    kRecommendations.push('Maintenance dose of 40-50 kg/ha MOP');
  }
  recommendations.push({ category: '💎 Potassium (K) Management', items: kRecommendations });
  
  // Irrigation Recommendations
  const waterRecommendations = [];
  if (moisture < 30) {
    waterRecommendations.push('Irrigate immediately - soil moisture critical');
    waterRecommendations.push('Use drip irrigation for water efficiency (30-40% savings)');
    waterRecommendations.push('Apply mulch to reduce evaporation');
  } else if (moisture > 70) {
    waterRecommendations.push('Hold irrigation - excess moisture present');
    waterRecommendations.push('Improve drainage to prevent waterlogging');
    waterRecommendations.push('Create channels for water runoff');
  } else {
    waterRecommendations.push('Maintain current irrigation schedule');
    waterRecommendations.push('Irrigate based on critical crop growth stages');
  }
  recommendations.push({ category: '💧 Irrigation Management', items: waterRecommendations });
  
  // Crop-Specific Advice
  const cropAdvice = [];
  if (cropType) {
    cropAdvice.push(`Optimized recommendations for ${cropType} cultivation`);
    cropAdvice.push('Follow recommended spacing and seed rate');
    cropAdvice.push('Apply fertilizers at critical growth stages');
    cropAdvice.push('Monitor for pests and diseases regularly');
  }
  cropAdvice.push('Practice crop rotation to improve soil health');
  cropAdvice.push('Use integrated pest management (IPM) practices');
  cropAdvice.push('Maintain field records for better tracking');
  recommendations.push({ category: '🌿 Crop-Specific Advice', items: cropAdvice });
  
  return recommendations;
}

function generateWarnings(soilData) {
  const warnings = [];
  const { pH, nitrogen, phosphorus, potassium, moisture } = soilData;
  if (pH < 5.0 || pH > 8.5) warnings.push('🔴 Critical pH level - immediate correction required');
  if (nitrogen < 100) warnings.push('🔴 Severe nitrogen deficiency detected');
  if (phosphorus < 10) warnings.push('🔴 Critical phosphorus deficiency');
  if (potassium < 100) warnings.push('🔴 Low potassium levels detected');
  if (moisture < 20) warnings.push('💧 Very low soil moisture - irrigation recommended');
  else if (moisture > 80) warnings.push('💧 Excessive moisture - drainage issues possible');
  if (warnings.length === 0) warnings.push('✅ No critical warnings - soil health is good');
  return warnings;
}

module.exports = { generateAIRecommendation };


