/**
 * Fertilizer Recommendation Engine
 * Rule-based system for generating fertilizer recommendations based on soil parameters
 */

/**
 * Calculate soil health score based on multiple parameters
 */
function calculateSoilHealthScore(soilData) {
  const { pH, nitrogen, phosphorus, potassium, moisture } = soilData;
  
  let score = 0;
  
  // pH Score (25 points) - Optimal range: 6.0-7.5
  if (pH >= 6.0 && pH <= 7.5) {
    score += 25;
  } else if (pH >= 5.5 && pH < 6.0 || pH > 7.5 && pH <= 8.0) {
    score += 18;
  } else if (pH >= 5.0 && pH < 5.5 || pH > 8.0 && pH <= 8.5) {
    score += 10;
  } else {
    score += 5;
  }
  
  // Nitrogen Score (25 points) - Optimal: 200-300 kg/ha
  if (nitrogen >= 200 && nitrogen <= 300) {
    score += 25;
  } else if (nitrogen >= 150 && nitrogen < 200 || nitrogen > 300 && nitrogen <= 350) {
    score += 18;
  } else if (nitrogen >= 100 && nitrogen < 150 || nitrogen > 350 && nitrogen <= 400) {
    score += 10;
  } else {
    score += 5;
  }
  
  // Phosphorus Score (25 points) - Optimal: 20-40 kg/ha
  if (phosphorus >= 20 && phosphorus <= 40) {
    score += 25;
  } else if (phosphorus >= 15 && phosphorus < 20 || phosphorus > 40 && phosphorus <= 50) {
    score += 18;
  } else if (phosphorus >= 10 && phosphorus < 15 || phosphorus > 50 && phosphorus <= 60) {
    score += 10;
  } else {
    score += 5;
  }
  
  // Potassium Score (15 points) - Optimal: 150-250 kg/ha
  if (potassium >= 150 && potassium <= 250) {
    score += 15;
  } else if (potassium >= 100 && potassium < 150 || potassium > 250 && potassium <= 300) {
    score += 10;
  } else {
    score += 5;
  }
  
  // Moisture Score (10 points) - Optimal: 40-70%
  if (moisture >= 40 && moisture <= 70) {
    score += 10;
  } else if (moisture >= 30 && moisture < 40 || moisture > 70 && moisture <= 80) {
    score += 7;
  } else {
    score += 3;
  }
  
  return Math.min(score, 100);
}

/**
 * Determine health status from score
 */
function getHealthStatus(score) {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Poor';
}

/**
 * Identify deficient nutrients
 */
function identifyDeficientNutrients(soilData) {
  const { nitrogen, phosphorus, potassium, pH } = soilData;
  const deficient = [];
  
  // Nitrogen deficiency
  if (nitrogen < 150) {
    deficient.push({
      nutrient: 'Nitrogen (N)',
      severity: nitrogen < 100 ? 'High' : nitrogen < 150 ? 'Medium' : 'Low'
    });
  }
  
  // Phosphorus deficiency
  if (phosphorus < 15) {
    deficient.push({
      nutrient: 'Phosphorus (P)',
      severity: phosphorus < 10 ? 'High' : phosphorus < 15 ? 'Medium' : 'Low'
    });
  }
  
  // Potassium deficiency
  if (potassium < 100) {
    deficient.push({
      nutrient: 'Potassium (K)',
      severity: potassium < 75 ? 'High' : potassium < 100 ? 'Medium' : 'Low'
    });
  }
  
  return deficient;
}

/**
 * Identify excess nutrients
 */
function identifyExcessNutrients(soilData) {
  const { nitrogen, phosphorus, potassium } = soilData;
  const excess = [];
  
  if (nitrogen > 350) {
    excess.push({
      nutrient: 'Nitrogen (N)',
      level: nitrogen > 450 ? 'Very High' : 'High'
    });
  }
  
  if (phosphorus > 50) {
    excess.push({
      nutrient: 'Phosphorus (P)',
      level: phosphorus > 70 ? 'Very High' : 'High'
    });
  }
  
  if (potassium > 300) {
    excess.push({
      nutrient: 'Potassium (K)',
      level: potassium > 400 ? 'Very High' : 'High'
    });
  }
  
  return excess;
}

/**
 * Recommend primary fertilizer based on soil analysis
 */
function recommendPrimaryFertilizer(soilData, cropType) {
  const { nitrogen, phosphorus, potassium } = soilData;
  const deficientNutrients = identifyDeficientNutrients(soilData);
  
  // If multiple deficiencies, recommend NPK complex
  if (deficientNutrients.length >= 2) {
    return {
      name: 'NPK Complex (20-20-20)',
      quantity: '150-200 kg per acre',
      applicationMethod: 'Split application: 50% at sowing, 25% at vegetative stage, 25% at flowering/fruiting'
    };
  }
  
  // Single nutrient deficiency
  if (nitrogen < 150) {
    return {
      name: 'Urea (46% N)',
      quantity: '100-150 kg per acre',
      applicationMethod: 'Split application: 50% at sowing, 50% after 30-45 days'
    };
  }
  
  if (phosphorus < 15) {
    return {
      name: 'Single Super Phosphate (SSP)',
      quantity: '75-100 kg per acre',
      applicationMethod: 'Apply as basal dose at the time of sowing'
    };
  }
  
  if (potassium < 100) {
    return {
      name: 'Muriate of Potash (MOP)',
      quantity: '50-75 kg per acre',
      applicationMethod: 'Apply before sowing or as top dressing'
    };
  }
  
  // Balanced maintenance
  return {
    name: 'Balanced NPK (12-32-16)',
    quantity: '100-125 kg per acre',
    applicationMethod: 'Apply at sowing for balanced nutrition'
  };
}

/**
 * Recommend secondary fertilizers
 */
function recommendSecondaryFertilizers(soilData) {
  const secondary = [];
  const { nitrogen, phosphorus, potassium } = soilData;
  
  // Micronutrient recommendations
  secondary.push({
    name: 'Zinc Sulfate',
    quantity: '10-15 kg per acre',
    applicationMethod: 'Soil application or foliar spray (0.5%)'
  });
  
  if (nitrogen < 200) {
    secondary.push({
      name: 'Ammonium Sulfate',
      quantity: '50 kg per acre',
      applicationMethod: 'Top dressing at vegetative stage'
    });
  }
  
  if (phosphorus < 20) {
    secondary.push({
      name: 'Diammonium Phosphate (DAP)',
      quantity: '40-50 kg per acre',
      applicationMethod: 'Basal application at sowing'
    });
  }
  
  return secondary;
}

/**
 * Recommend organic alternatives
 */
function recommendOrganicOptions(soilData, cropType) {
  return [
    {
      name: 'Well-decomposed Farm Yard Manure (FYM)',
      quantity: '5-8 tons per acre',
      benefits: 'Improves soil structure, water retention, and provides slow-release nutrients'
    },
    {
      name: 'Vermicompost',
      quantity: '1-2 tons per acre',
      benefits: 'Rich in nutrients, beneficial microorganisms, and improves soil health'
    },
    {
      name: 'Neem Cake',
      quantity: '200-300 kg per acre',
      benefits: 'Natural nitrogen source, pest repellent, and soil conditioner'
    },
    {
      name: 'Green Manure (Legume crops)',
      quantity: 'Incorporate before flowering',
      benefits: 'Fixes atmospheric nitrogen, adds organic matter, prevents soil erosion'
    }
  ];
}

/**
 * pH adjustment recommendations
 */
function recommendpHAdjustment(pH) {
  if (pH < 5.5) {
    return {
      needed: true,
      recommendation: 'Apply Agricultural Lime (CaCO3) at 500-1000 kg per acre to raise pH',
      targetpH: 6.5
    };
  }
  
  if (pH > 8.0) {
    return {
      needed: true,
      recommendation: 'Apply Gypsum (CaSO4) at 400-600 kg per acre or Sulfur at 50-100 kg per acre to lower pH',
      targetpH: 7.0
    };
  }
  
  return {
    needed: false,
    recommendation: 'pH is within acceptable range. No adjustment needed.',
    targetpH: pH
  };
}

/**
 * Crop suitability analysis
 */
function analyzeCropSuitability(soilData) {
  const { pH, soilType } = soilData;
  
  const suitable = [];
  const notSuitable = [];
  
  // pH-based recommendations
  if (pH >= 5.5 && pH <= 7.5) {
    suitable.push('Rice', 'Wheat', 'Maize', 'Cotton', 'Vegetables');
  } else if (pH > 7.5) {
    suitable.push('Wheat', 'Cotton', 'Mustard', 'Barley');
    notSuitable.push('Potato', 'Tea', 'Coffee');
  } else {
    suitable.push('Tea', 'Coffee', 'Potato');
    notSuitable.push('Wheat', 'Cotton');
  }
  
  // Soil type based
  if (soilType === 'Loamy') {
    suitable.push('Most crops (ideal soil)');
  } else if (soilType === 'Clay') {
    suitable.push('Rice', 'Wheat', 'Cotton');
    notSuitable.push('Root vegetables (poor drainage)');
  } else if (soilType === 'Sandy') {
    suitable.push('Groundnut', 'Millets', 'Watermelon');
    notSuitable.push('Rice (poor water retention)');
  }
  
  return {
    suitable: [...new Set(suitable)],
    notSuitable: [...new Set(notSuitable)]
  };
}

/**
 * Irrigation advice based on soil moisture
 */
function getIrrigationAdvice(moisture, soilType) {
  if (moisture < 30) {
    return `Low moisture detected. Increase irrigation frequency. ${soilType === 'Sandy' ? 'Sandy soil requires more frequent, light irrigation.' : 'Ensure deep watering to reach root zone.'}`;
  }
  
  if (moisture > 80) {
    return 'High moisture levels. Reduce irrigation to prevent waterlogging and root diseases. Ensure proper drainage.';
  }
  
  return `Moisture levels are adequate. Maintain current irrigation schedule. Monitor soil moisture regularly.`;
}

/**
 * Best practices recommendations
 */
function getBestPractices(soilData, cropType) {
  const practices = [
    'Conduct soil testing every 6 months for optimal management',
    'Practice crop rotation to maintain soil fertility',
    'Use mulching to conserve moisture and suppress weeds',
    'Implement drip irrigation for water efficiency',
    'Add organic matter regularly to improve soil structure'
  ];
  
  const { moisture } = soilData;
  
  if (moisture < 40) {
    practices.push('Install moisture sensors for precision irrigation');
  }
  
  practices.push('Use bio-fertilizers along with chemical fertilizers for better results');
  practices.push('Maintain proper spacing between plants for optimal nutrient uptake');
  
  return practices;
}

/**
 * Generate warnings based on soil conditions
 */
function generateWarnings(soilData) {
  const warnings = [];
  const { pH, moisture, nitrogen } = soilData;
  
  if (pH < 5.0 || pH > 8.5) {
    warnings.push('⚠️ Extreme pH levels detected. Immediate correction required to prevent crop failure.');
  }
  
  if (moisture < 20) {
    warnings.push('⚠️ Very low moisture. Risk of plant stress and reduced yield.');
  }
  
  if (moisture > 85) {
    warnings.push('⚠️ Excessive moisture may lead to root rot and fungal diseases.');
  }
  
  if (nitrogen > 400) {
    warnings.push('⚠️ Excess nitrogen can cause lodging in cereals and delayed maturity.');
  }
  
  const deficient = identifyDeficientNutrients(soilData);
  if (deficient.some(d => d.severity === 'High')) {
    warnings.push('⚠️ Severe nutrient deficiency detected. Immediate fertilizer application recommended.');
  }
  
  return warnings;
}

/**
 * Create application schedule
 */
function createApplicationSchedule(primaryFertilizer, cropType) {
  return [
    {
      stage: 'Pre-sowing / Land Preparation',
      timing: '15-20 days before sowing',
      fertilizer: 'Organic manure (FYM/Compost)',
      quantity: '5-8 tons per acre'
    },
    {
      stage: 'Basal Application',
      timing: 'At the time of sowing',
      fertilizer: primaryFertilizer.name,
      quantity: '50% of recommended dose'
    },
    {
      stage: 'First Top Dressing',
      timing: '30-35 days after sowing',
      fertilizer: 'Nitrogen fertilizer',
      quantity: '25% of recommended dose'
    },
    {
      stage: 'Second Top Dressing',
      timing: '50-60 days after sowing',
      fertilizer: 'NPK mixture',
      quantity: '25% of recommended dose'
    },
    {
      stage: 'Foliar Application',
      timing: 'At flowering/fruiting stage',
      fertilizer: 'Micronutrient spray',
      quantity: '2-3 sprays at 15-day intervals'
    }
  ];
}

/**
 * Main function to generate complete recommendation
 */
function generateRecommendation(soilData, cropType) {
  const healthScore = calculateSoilHealthScore(soilData);
  const healthStatus = getHealthStatus(healthScore);
  const deficientNutrients = identifyDeficientNutrients(soilData);
  const excessNutrients = identifyExcessNutrients(soilData);
  const primaryFertilizer = recommendPrimaryFertilizer(soilData, cropType);
  const secondaryFertilizers = recommendSecondaryFertilizers(soilData);
  const organicOptions = recommendOrganicOptions(soilData, cropType);
  const pHAdjustment = recommendpHAdjustment(soilData.pH);
  const cropSuitability = analyzeCropSuitability(soilData);
  const irrigationAdvice = getIrrigationAdvice(soilData.moisture, soilData.soilType);
  const bestPractices = getBestPractices(soilData, cropType);
  const warnings = generateWarnings(soilData);
  const applicationSchedule = createApplicationSchedule(primaryFertilizer, cropType);
  
  // Calculate estimated cost
  let estimatedCost = 2000; // Base cost
  if (deficientNutrients.length > 0) {
    estimatedCost += deficientNutrients.length * 800;
  }
  if (pHAdjustment.needed) {
    estimatedCost += 1500;
  }
  
  return {
    primaryFertilizer,
    secondaryFertilizers,
    organicOptions,
    soilHealthScore: healthScore,
    healthStatus,
    deficientNutrients,
    excessNutrients,
    pHAdjustment,
    irrigationAdvice,
    cropSuitability,
    bestPractices,
    warnings,
    expectedYieldImprovement: healthScore < 50 ? '30-50% improvement expected' : 
                               healthScore < 70 ? '15-30% improvement expected' : 
                               '5-15% improvement expected',
    estimatedCostPerAcre: estimatedCost,
    applicationSchedule,
    confidence: 85
  };
}

module.exports = {
  generateRecommendation,
  calculateSoilHealthScore,
  getHealthStatus
};
