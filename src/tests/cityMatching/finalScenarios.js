import { TestScenarioSchema } from './testScenarios';

export const FINAL_TEST_SCENARIOS = [
  {
    id: 23,
    name: "Remote Tech Worker",
    description: "Tech professional working remotely seeking high quality of life",
    preferences: {
      internet: {
        priority: 10,
        speed: "High-speed fiber",
        reliability: true,
        weight: 1.0
      },
      lifestyle: {
        priority: 9,
        workLifeBalance: true,
        outdoorActivities: true,
        weight: 0.9
      },
      housing: {
        priority: 8,
        homeOffice: true,
        quietArea: true,
        weight: 0.8
      }
    },
    expectedTopCities: ["Espoo", "Tampere", "Oulu", "Jyväskylä"],
    minimumMatchScore: 75
  },
  {
    id: 24,
    name: "Sustainable Living Enthusiast",
    description: "Individual focused on eco-friendly lifestyle and sustainability",
    preferences: {
      environment: {
        priority: 10,
        greenInitiatives: true,
        recyclingPrograms: true,
        weight: 1.0
      },
      transport: {
        priority: 9,
        cycling: true,
        publicTransport: true,
        weight: 0.9
      },
      lifestyle: {
        priority: 8,
        organicFood: true,
        communityGardens: true,
        weight: 0.8
      }
    },
    expectedTopCities: ["Helsinki", "Tampere", "Turku", "Jyväskylä"],
    minimumMatchScore: 80
  },
  {
    id: 25,
    name: "Senior Healthcare Professional",
    description: "Experienced healthcare worker seeking leadership opportunities",
    preferences: {
      employment: {
        priority: 10,
        sector: "Healthcare",
        seniorPositions: true,
        weight: 1.0
      },
      facilities: {
        priority: 9,
        hospitals: true,
        researchCenters: true,
        weight: 0.9
      },
      housing: {
        priority: 7,
        upscale: true,
        nearHospital: true,
        weight: 0.7
      }
    },
    expectedTopCities: ["Helsinki", "Tampere", "Turku", "Oulu"],
    minimumMatchScore: 85
  },
  {
    id: 26,
    name: "International Business Executive",
    description: "Business professional needing international connectivity",
    preferences: {
      transport: {
        priority: 10,
        internationalAirport: true,
        businessDistrict: true,
        weight: 1.0
      },
      business: {
        priority: 9,
        internationalCompanies: true,
        networkingEvents: true,
        weight: 0.9
      },
      lifestyle: {
        priority: 8,
        luxuryAmenities: true,
        culturalEvents: true,
        weight: 0.8
      }
    },
    expectedTopCities: ["Helsinki", "Espoo", "Vantaa", "Tampere"],
    minimumMatchScore: 80
  },
  {
    id: 27,
    name: "Digital Creative",
    description: "Digital artist/designer seeking creative community",
    preferences: {
      community: {
        priority: 9,
        creativeHub: true,
        coworkingSpaces: true,
        weight: 0.9
      },
      culture: {
        priority: 8,
        artGalleries: true,
        designStudios: true,
        weight: 0.8
      },
      lifestyle: {
        priority: 7,
        cafeScene: true,
        nightlife: true,
        weight: 0.7
      }
    },
    expectedTopCities: ["Helsinki", "Tampere", "Turku", "Jyväskylä"],
    minimumMatchScore: 75
  },
  {
    id: 28,
    name: "Family with Special Needs Child",
    description: "Family seeking comprehensive support and healthcare",
    preferences: {
      healthcare: {
        priority: 10,
        specializedCare: true,
        therapyServices: true,
        weight: 1.0
      },
      education: {
        priority: 9,
        specialEducation: true,
        supportServices: true,
        weight: 0.9
      },
      accessibility: {
        priority: 8,
        adaptedFacilities: true,
        transportAccess: true,
        weight: 0.8
      }
    },
    expectedTopCities: ["Helsinki", "Espoo", "Tampere", "Turku"],
    minimumMatchScore: 90
  },
  {
    id: 29,
    name: "Retired Academic",
    description: "Retired professor seeking intellectual and cultural engagement",
    preferences: {
      culture: {
        priority: 9,
        libraries: true,
        lectures: true,
        weight: 0.9
      },
      lifestyle: {
        priority: 8,
        quietNeighborhood: true,
        culturalEvents: true,
        weight: 0.8
      },
      healthcare: {
        priority: 10,
        qualityCare: true,
        specialistAccess: true,
        weight: 1.0
      }
    },
    expectedTopCities: ["Helsinki", "Espoo", "Tampere", "Turku"],
    minimumMatchScore: 80
  },
  {
    id: 30,
    name: "Young Family with Remote Work",
    description: "Young parents working remotely with small children",
    preferences: {
      family: {
        priority: 10,
        childcare: true,
        familyActivities: true,
        weight: 1.0
      },
      safety: {
        priority: 9,
        lowCrime: true,
        childFriendly: true,
        weight: 0.9
      },
      lifestyle: {
        priority: 8,
        outdoorSpaces: true,
        communityEvents: true,
        weight: 0.8
      }
    },
    expectedTopCities: ["Espoo", "Tampere", "Jyväskylä", "Oulu"],
    minimumMatchScore: 85
  }
];

// Additional scoring functions for new criteria
export const calculateLifestyleScore = (preferences, cityData) => {
  if (!preferences || !cityData) return { score: 0, maxScore: 0, details: {} };
  
  let score = 0;
  let maxScore = 0;
  const details = {};

  if (preferences.workLifeBalance) {
    maxScore += 100;
    score += cityData.lifestyle.workLifeBalance ? 100 : 0;
    details.hasWorkLifeBalance = cityData.lifestyle.workLifeBalance;
  }

  if (preferences.outdoorActivities) {
    maxScore += 100;
    score += cityData.lifestyle.outdoorActivities ? 100 : 0;
    details.hasOutdoorActivities = cityData.lifestyle.outdoorActivities;
  }

  return {
    score: score / (maxScore || 1),
    maxScore: maxScore || 100,
    details
  };
};

export const calculateAccessibilityScore = (preferences, cityData) => {
  if (!preferences || !cityData) return { score: 0, maxScore: 0, details: {} };
  
  let score = 0;
  let maxScore = 0;
  const details = {};

  if (preferences.adaptedFacilities) {
    maxScore += 100;
    score += cityData.accessibility.adaptedFacilities ? 100 : 0;
    details.hasAdaptedFacilities = cityData.accessibility.adaptedFacilities;
  }

  if (preferences.transportAccess) {
    maxScore += 100;
    score += cityData.accessibility.transportAccess ? 100 : 0;
    details.hasTransportAccess = cityData.accessibility.transportAccess;
  }

  return {
    score: score / (maxScore || 1),
    maxScore: maxScore || 100,
    details
  };
};

export const calculateFamilyScore = (preferences, cityData) => {
  if (!preferences || !cityData) return { score: 0, maxScore: 0, details: {} };
  
  let score = 0;
  let maxScore = 0;
  const details = {};

  if (preferences.childcare) {
    maxScore += 100;
    score += cityData.family.childcare ? 100 : 0;
    details.hasChildcare = cityData.family.childcare;
  }

  if (preferences.familyActivities) {
    maxScore += 100;
    score += cityData.family.activities ? 100 : 0;
    details.hasFamilyActivities = cityData.family.activities;
  }

  return {
    score: score / (maxScore || 1),
    maxScore: maxScore || 100,
    details
  };
}; 