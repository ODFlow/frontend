import { TestScenarioSchema } from './testScenarios';

export const ADDITIONAL_TEST_SCENARIOS = [
  {
    id: 18,
    name: "International Researcher",
    description: "Academic researcher looking for research institutions and international environment",
    preferences: {
      education: {
        priority: 10,
        institutions: ["University", "Research Center"],
        international: true,
        weight: 1.0
      },
      housing: {
        priority: 7,
        maxRent: 1500,
        type: "1-bedroom",
        nearbyAmenities: ["Library", "University"],
        weight: 0.7
      },
      transport: {
        priority: 8,
        publicTransport: true,
        internationalAccess: true,
        weight: 0.8
      }
    },
    expectedTopCities: ["Helsinki", "Espoo", "Tampere", "Oulu"],
    minimumMatchScore: 75
  },
  {
    id: 19,
    name: "Creative Professional",
    description: "Artist/Designer seeking vibrant cultural scene and affordable studio space",
    preferences: {
      culture: {
        priority: 9,
        venues: ["Galleries", "Studios", "Theater"],
        events: true,
        weight: 0.9
      },
      housing: {
        priority: 8,
        maxRent: 1200,
        type: "2-bedroom",
        studioSpace: true,
        weight: 0.8
      },
      community: {
        priority: 7,
        artistCommunity: true,
        culturalEvents: true,
        weight: 0.7
      }
    },
    expectedTopCities: ["Helsinki", "Turku", "Tampere", "Jyväskylä"],
    minimumMatchScore: 70
  },
  {
    id: 20,
    name: "Healthcare Student",
    description: "Medical student looking for quality education and practical training opportunities",
    preferences: {
      education: {
        priority: 10,
        institutions: ["Medical School", "Teaching Hospital"],
        practicalTraining: true,
        weight: 1.0
      },
      housing: {
        priority: 7,
        maxRent: 800,
        type: "Studio",
        studentHousing: true,
        weight: 0.7
      },
      transport: {
        priority: 8,
        publicTransport: true,
        hospitalAccess: true,
        weight: 0.8
      }
    },
    expectedTopCities: ["Helsinki", "Turku", "Tampere", "Oulu"],
    minimumMatchScore: 80
  },
  {
    id: 21,
    name: "Environmental Scientist",
    description: "Environmental researcher focusing on climate and sustainability",
    preferences: {
      research: {
        priority: 9,
        fields: ["Environmental", "Climate"],
        facilities: true,
        weight: 0.9
      },
      environment: {
        priority: 8,
        sustainability: true,
        naturalAreas: true,
        weight: 0.8
      },
      transport: {
        priority: 7,
        sustainable: true,
        publicTransport: true,
        weight: 0.7
      }
    },
    expectedTopCities: ["Helsinki", "Espoo", "Oulu", "Jyväskylä"],
    minimumMatchScore: 75
  },
  {
    id: 22,
    name: "Sports Coach",
    description: "Professional sports coach seeking facilities and athlete community",
    preferences: {
      facilities: {
        priority: 10,
        types: ["Training Center", "Stadium", "Sports Complex"],
        quality: "High",
        weight: 1.0
      },
      community: {
        priority: 8,
        sportsClubs: true,
        athleteCommunity: true,
        weight: 0.8
      },
      climate: {
        priority: 7,
        indoorFacilities: true,
        yearRound: true,
        weight: 0.7
      }
    },
    expectedTopCities: ["Helsinki", "Espoo", "Lahti", "Jyväskylä"],
    minimumMatchScore: 80
  }
];

// Additional scoring functions for new criteria
export const calculateEducationScore = (preferences, cityData) => {
  if (!preferences || !cityData) return { score: 0, maxScore: 0, details: {} };
  
  let score = 0;
  let maxScore = 0;
  const details = {};

  if (preferences.institutions) {
    maxScore += 100;
    const hasAllInstitutions = preferences.institutions.every(
      inst => cityData.education.facilities[inst.toLowerCase()]
    );
    score += hasAllInstitutions ? 100 : 50;
    details.institutionsPresent = hasAllInstitutions;
  }

  if (preferences.international) {
    maxScore += 100;
    score += cityData.education.international ? 100 : 0;
    details.hasInternationalPrograms = cityData.education.international;
  }

  return {
    score: score / (maxScore || 1),
    maxScore: maxScore || 100,
    details
  };
};

export const calculateCultureScore = (preferences, cityData) => {
  if (!preferences || !cityData) return { score: 0, maxScore: 0, details: {} };
  
  let score = 0;
  let maxScore = 0;
  const details = {};

  if (preferences.venues) {
    maxScore += 100;
    const presentVenues = preferences.venues.filter(
      venue => cityData.culture.venues.includes(venue)
    );
    score += (presentVenues.length / preferences.venues.length) * 100;
    details.matchingVenues = presentVenues;
  }

  if (preferences.events) {
    maxScore += 100;
    score += cityData.culture.events ? 100 : 0;
    details.hasEvents = cityData.culture.events;
  }

  return {
    score: score / (maxScore || 1),
    maxScore: maxScore || 100,
    details
  };
};

export const calculateEnvironmentScore = (preferences, cityData) => {
  if (!preferences || !cityData) return { score: 0, maxScore: 0, details: {} };
  
  let score = 0;
  let maxScore = 0;
  const details = {};

  if (preferences.sustainability) {
    maxScore += 100;
    score += cityData.environment.sustainabilityScore || 0;
    details.sustainabilityScore = cityData.environment.sustainabilityScore;
  }

  if (preferences.naturalAreas) {
    maxScore += 100;
    score += (cityData.environment.parks / 10) * 100; // Normalize to 100
    details.parkCount = cityData.environment.parks;
  }

  return {
    score: score / (maxScore || 1),
    maxScore: maxScore || 100,
    details
  };
};

// Validation function for city data
export const validateCityData = (cityData) => {
  const requiredFields = [
    'name',
    'safety.score',
    'amenities.healthcare.hospitals',
    'amenities.healthcare.clinics',
    'education.facilities',
    'employment.sectors',
    'employment.opportunities',
    'environment.parks',
    'housing.averagePrice'
  ];

  const missingFields = requiredFields.filter(field => {
    const parts = field.split('.');
    let current = cityData;
    for (const part of parts) {
      if (current === undefined || current[part] === undefined) {
        return true;
      }
      current = current[part];
    }
    return false;
  });

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields in city data: ${missingFields.join(', ')}`);
  }

  return true;
}; 