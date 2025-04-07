import { TEST_SCENARIOS } from './testScenarios';
import { ADDITIONAL_TEST_SCENARIOS } from './additionalScenarios';
import { FINAL_TEST_SCENARIOS } from './finalScenarios';

// Combine all test scenarios
export const ALL_TEST_SCENARIOS = [
  ...TEST_SCENARIOS,
  ...ADDITIONAL_TEST_SCENARIOS,
  ...FINAL_TEST_SCENARIOS
];

// Utility function to validate city data structure
export const validateCityDataStructure = (cityData) => {
  const requiredFields = {
    name: 'string',
    safety: {
      score: 'number',
      details: {
        crimeRate: 'string',
        trafficAccidents: 'string',
        emergencyServices: {
          hospitals: 'number',
          clinics: 'number',
          responseTime: 'string'
        }
      }
    },
    amenities: {
      transportation: {
        railwayStation: 'number',
        airports: 'number',
        busStops: 'string',
        cyclingInfrastructure: 'string'
      },
      healthcare: {
        hospitals: 'number',
        clinics: 'number'
      },
      culture: {
        museums: 'boolean',
        theaters: 'boolean',
        pubs: 'boolean'
      }
    },
    housing: {
      averagePrice: {
        rent: 'string',
        purchase: 'string'
      },
      availability: 'string'
    },
    education: {
      facilities: {
        schools: 'number',
        universities: 'number',
        kindergartens: 'number'
      },
      quality: 'string'
    },
    employment: {
      opportunities: 'string',
      sectors: 'array',
      unemploymentRate: 'number'
    },
    environment: {
      parks: 'number',
      greenSpaces: 'string',
      airQuality: 'string'
    }
  };

  const validateStructure = (data, structure, path = '') => {
    const errors = [];

    for (const [key, expectedType] of Object.entries(structure)) {
      const currentPath = path ? `${path}.${key}` : key;
      const value = data[key];

      if (value === undefined) {
        errors.push(`Missing required field: ${currentPath}`);
        continue;
      }

      if (typeof expectedType === 'object') {
        errors.push(...validateStructure(value, expectedType, currentPath));
      } else {
        const actualType = Array.isArray(value) ? 'array' : typeof value;
        if (actualType !== expectedType) {
          errors.push(`Invalid type for ${currentPath}: expected ${expectedType}, got ${actualType}`);
        }
      }
    }

    return errors;
  };

  const errors = validateStructure(cityData, requiredFields);
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Utility function to generate test report
export const generateTestReport = (results) => {
  const report = {
    summary: {
      total: results.length,
      passed: results.filter(r => r.passed).length,
      failed: results.filter(r => !r.passed).length,
      averageScore: results.reduce((acc, r) => acc + r.score, 0) / results.length
    },
    byCategory: {},
    failedTests: [],
    recommendations: []
  };

  // Group results by category
  results.forEach(result => {
    const scenario = ALL_TEST_SCENARIOS.find(s => s.name === result.scenarioName);
    if (!scenario) return;

    Object.keys(scenario.preferences).forEach(category => {
      if (!report.byCategory[category]) {
        report.byCategory[category] = {
          total: 0,
          passed: 0,
          failed: 0
        };
      }

      report.byCategory[category].total++;
      if (result.details[category] && result.details[category].score >= 70) {
        report.byCategory[category].passed++;
      } else {
        report.byCategory[category].failed++;
      }
    });

    if (!result.passed) {
      report.failedTests.push({
        scenario: result.scenarioName,
        score: result.score,
        details: result.details
      });
    }
  });

  // Generate recommendations
  Object.entries(report.byCategory).forEach(([category, stats]) => {
    if (stats.failed / stats.total > 0.3) {
      report.recommendations.push({
        category,
        message: `Consider improving ${category} aspects. ${stats.failed} out of ${stats.total} tests failed in this category.`
      });
    }
  });

  return report;
};

// Utility function to compare cities
export const compareCities = (cityA, cityB, preferences) => {
  const scores = {};
  let totalWeightA = 0;
  let totalWeightB = 0;
  let totalScoreA = 0;
  let totalScoreB = 0;

  // Calculate scores for each preference category
  Object.entries(preferences).forEach(([category, prefs]) => {
    const weight = prefs.weight || 1;
    const categoryScores = {
      [cityA.name]: calculateCategoryScore(category, prefs, cityA),
      [cityB.name]: calculateCategoryScore(category, prefs, cityB)
    };

    scores[category] = categoryScores;
    
    totalScoreA += categoryScores[cityA.name].score * weight;
    totalScoreB += categoryScores[cityB.name].score * weight;
    totalWeightA += weight;
    totalWeightB += weight;
  });

  return {
    comparison: {
      [cityA.name]: totalScoreA / totalWeightA,
      [cityB.name]: totalScoreB / totalWeightB
    },
    details: scores,
    winner: totalScoreA > totalScoreB ? cityA.name : cityB.name,
    difference: Math.abs(totalScoreA - totalScoreB)
  };
};

// Helper function to calculate category score
const calculateCategoryScore = (category, preferences, cityData) => {
  switch (category) {
    case 'safety':
      return calculateSafetyScore(preferences, cityData);
    case 'employment':
      return calculateEmploymentScore(preferences, cityData);
    case 'housing':
      return calculateHousingScore(preferences, cityData);
    case 'education':
      return calculateEducationScore(preferences, cityData);
    case 'environment':
      return calculateEnvironmentScore(preferences, cityData);
    case 'lifestyle':
      return calculateLifestyleScore(preferences, cityData);
    case 'accessibility':
      return calculateAccessibilityScore(preferences, cityData);
    case 'family':
      return calculateFamilyScore(preferences, cityData);
    default:
      return { score: 0, maxScore: 0, details: {} };
  }
}; 