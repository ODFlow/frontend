// Test Scenarios for City Matching
import { z } from 'zod';

// Validation schemas
export const PreferenceSchema = z.object({
  priority: z.number().min(1).max(10).optional(),
  weight: z.number().min(0).max(1).optional(),
  required: z.boolean().optional(),
});

export const SafetyPreferenceSchema = PreferenceSchema.extend({
  minScore: z.number().min(0).max(100),
  nearbyHospital: z.boolean().optional(),
  nearbyPolice: z.boolean().optional(),
  lowCrime: z.boolean().optional(),
});

export const EmploymentPreferenceSchema = PreferenceSchema.extend({
  sectors: z.array(z.string()).optional(),
  minSalary: z.number().optional(),
  opportunities: z.enum(['Low', 'Moderate', 'High', 'Very High']).optional(),
  remote: z.boolean().optional(),
});

export const HousingPreferenceSchema = PreferenceSchema.extend({
  maxRent: z.number().optional(),
  maxPurchasePrice: z.number().optional(),
  type: z.enum(['Studio', '1-bedroom', '2-bedroom', 'Family house', 'Any']).optional(),
  nearbyAmenities: z.array(z.string()).optional(),
  studentHousing: z.boolean().optional(),
});

export const TestScenarioSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  preferences: z.object({
    safety: SafetyPreferenceSchema.optional(),
    employment: EmploymentPreferenceSchema.optional(),
    housing: HousingPreferenceSchema.optional(),
    // Add more preference schemas as needed
  }),
  expectedTopCities: z.array(z.string()),
  minimumMatchScore: z.number().min(0).max(100),
});

// Test Scenarios
export const TEST_SCENARIOS = [
  {
    id: 16,
    name: "Tech Startup Team",
    description: "A small tech startup looking for an affordable city with good tech infrastructure",
    preferences: {
      employment: {
        priority: 9,
        sectors: ["Technology", "Startups"],
        opportunities: "High",
        remote: true,
        weight: 0.9
      },
      housing: {
        priority: 8,
        maxRent: 2000,
        type: "2-bedroom",
        nearbyAmenities: ["Coworking spaces", "Cafes"],
        weight: 0.8
      },
      safety: {
        priority: 7,
        minScore: 75,
        weight: 0.7
      }
    },
    expectedTopCities: ["Helsinki", "Espoo", "Tampere", "Oulu"],
    minimumMatchScore: 80
  },
  {
    id: 17,
    name: "Medical Specialist",
    description: "A medical specialist seeking employment in a major hospital",
    preferences: {
      employment: {
        priority: 10,
        sectors: ["Healthcare", "Research"],
        minSalary: 65000,
        opportunities: "High",
        weight: 1.0
      },
      housing: {
        priority: 8,
        maxPurchasePrice: 500000,
        type: "Family house",
        nearbyAmenities: ["Hospital", "Schools"],
        weight: 0.8
      },
      safety: {
        priority: 9,
        minScore: 85,
        nearbyHospital: true,
        weight: 0.9
      }
    },
    expectedTopCities: ["Helsinki", "Tampere", "Turku", "Oulu"],
    minimumMatchScore: 85
  },
  // Add more scenarios here...
];

// Scoring Functions
export const calculateSafetyScore = (preferences, cityData) => {
  if (!preferences || !cityData) return { score: 0, maxScore: 0, details: {} };
  
  let score = 0;
  let maxScore = 0;
  const details = {};

  if (preferences.minScore) {
    maxScore += 100;
    score += cityData.safety.score >= preferences.minScore ? 100 : 
             (cityData.safety.score / preferences.minScore) * 100;
    details.safetyScore = score;
  }

  if (preferences.nearbyHospital) {
    maxScore += 100;
    score += cityData.amenities.healthcare.hospitals > 0 ? 100 : 0;
    details.hasHospital = cityData.amenities.healthcare.hospitals > 0;
  }

  return {
    score: score / (maxScore || 1),
    maxScore: maxScore || 100,
    details
  };
};

export const calculateEmploymentScore = (preferences, cityData) => {
  if (!preferences || !cityData) return { score: 0, maxScore: 0, details: {} };
  
  let score = 0;
  let maxScore = 0;
  const details = {};

  if (preferences.sectors) {
    maxScore += 100;
    const matchingSectors = preferences.sectors.filter(
      sector => cityData.employment.sectors.includes(sector)
    );
    score += (matchingSectors.length / preferences.sectors.length) * 100;
    details.sectorMatch = matchingSectors;
  }

  if (preferences.opportunities) {
    maxScore += 100;
    const opportunityScores = {
      'Very High': 100,
      'High': 75,
      'Moderate': 50,
      'Low': 25
    };
    score += opportunityScores[cityData.employment.opportunities] || 0;
    details.opportunityLevel = cityData.employment.opportunities;
  }

  return {
    score: score / (maxScore || 1),
    maxScore: maxScore || 100,
    details
  };
};

// Main test execution function
export const executeTestScenario = (scenario, cityData) => {
  try {
    // Validate scenario against schema
    TestScenarioSchema.parse(scenario);
    
    const results = {};
    let totalScore = 0;
    let totalWeight = 0;

    // Calculate scores for each preference category
    if (scenario.preferences.safety) {
      const safetyResult = calculateSafetyScore(scenario.preferences.safety, cityData);
      results.safety = safetyResult;
      totalScore += safetyResult.score * (scenario.preferences.safety.weight || 1);
      totalWeight += (scenario.preferences.safety.weight || 1);
    }

    if (scenario.preferences.employment) {
      const employmentResult = calculateEmploymentScore(scenario.preferences.employment, cityData);
      results.employment = employmentResult;
      totalScore += employmentResult.score * (scenario.preferences.employment.weight || 1);
      totalWeight += (scenario.preferences.employment.weight || 1);
    }

    // Calculate final weighted score
    const finalScore = totalScore / totalWeight;

    return {
      passed: finalScore >= scenario.minimumMatchScore,
      score: finalScore,
      details: results,
      expectedCity: scenario.expectedTopCities.includes(cityData.name),
      scenarioName: scenario.name
    };
  } catch (error) {
    throw new Error(`Test scenario validation failed: ${error.message}`);
  }
}; 