import { TEST_SCENARIOS } from './testScenarios';
import { ADDITIONAL_TEST_SCENARIOS } from './additionalScenarios';
import { validateCityData } from './additionalScenarios';

export class CityMatchingTestRunner {
  constructor(cityData) {
    this.cityData = cityData;
    this.results = {
      total: 0,
      passed: 0,
      failed: 0,
      details: []
    };
  }

  async runAllTests() {
    const allScenarios = [...TEST_SCENARIOS, ...ADDITIONAL_TEST_SCENARIOS];
    this.results.total = allScenarios.length;

    for (const scenario of allScenarios) {
      try {
        // Validate city data first
        validateCityData(this.cityData);

        // Execute the test scenario
        const result = await this.executeScenario(scenario);
        
        // Store results
        this.results.details.push({
          scenarioId: scenario.id,
          scenarioName: scenario.name,
          passed: result.passed,
          score: result.score,
          expectedCity: result.expectedCity,
          details: result.details
        });

        if (result.passed) {
          this.results.passed++;
        } else {
          this.results.failed++;
        }
      } catch (error) {
        this.results.failed++;
        this.results.details.push({
          scenarioId: scenario.id,
          scenarioName: scenario.name,
          error: error.message,
          passed: false
        });
      }
    }

    return this.results;
  }

  async executeScenario(scenario) {
    // Calculate scores for each preference category
    const results = {};
    let totalScore = 0;
    let totalWeight = 0;

    // Process each preference category
    for (const [category, prefs] of Object.entries(scenario.preferences)) {
      if (!prefs) continue;

      const weight = prefs.weight || 1;
      let categoryScore;

      switch (category) {
        case 'safety':
          categoryScore = this.calculateSafetyScore(prefs);
          break;
        case 'employment':
          categoryScore = this.calculateEmploymentScore(prefs);
          break;
        case 'housing':
          categoryScore = this.calculateHousingScore(prefs);
          break;
        case 'education':
          categoryScore = this.calculateEducationScore(prefs);
          break;
        case 'culture':
          categoryScore = this.calculateCultureScore(prefs);
          break;
        case 'environment':
          categoryScore = this.calculateEnvironmentScore(prefs);
          break;
        // Add more categories as needed
      }

      if (categoryScore) {
        results[category] = categoryScore;
        totalScore += categoryScore.score * weight;
        totalWeight += weight;
      }
    }

    const finalScore = totalWeight > 0 ? totalScore / totalWeight : 0;

    return {
      passed: finalScore >= scenario.minimumMatchScore,
      score: finalScore,
      details: results,
      expectedCity: scenario.expectedTopCities.includes(this.cityData.name)
    };
  }

  calculateSafetyScore(preferences) {
    const score = this.cityData.safety.score;
    const hasHospital = this.cityData.amenities.healthcare.hospitals > 0;
    
    let totalScore = 0;
    let maxScore = 0;
    const details = {};

    if (preferences.minScore) {
      maxScore += 100;
      totalScore += score >= preferences.minScore ? 100 : (score / preferences.minScore) * 100;
      details.safetyScore = score;
    }

    if (preferences.nearbyHospital) {
      maxScore += 100;
      totalScore += hasHospital ? 100 : 0;
      details.hasHospital = hasHospital;
    }

    return {
      score: maxScore > 0 ? totalScore / maxScore : 0,
      details
    };
  }

  calculateEmploymentScore(preferences) {
    const sectors = this.cityData.employment.sectors;
    const opportunities = this.cityData.employment.opportunities;
    
    let totalScore = 0;
    let maxScore = 0;
    const details = {};

    if (preferences.sectors) {
      maxScore += 100;
      const matchingSectors = preferences.sectors.filter(s => sectors.includes(s));
      totalScore += (matchingSectors.length / preferences.sectors.length) * 100;
      details.matchingSectors = matchingSectors;
    }

    if (preferences.opportunities) {
      maxScore += 100;
      const opportunityScores = {
        'Very High': 100,
        'High': 75,
        'Moderate': 50,
        'Low': 25
      };
      totalScore += opportunityScores[opportunities] || 0;
      details.opportunityLevel = opportunities;
    }

    return {
      score: maxScore > 0 ? totalScore / maxScore : 0,
      details
    };
  }

  calculateHousingScore(preferences) {
    const housing = this.cityData.housing;
    
    let totalScore = 0;
    let maxScore = 0;
    const details = {};

    if (preferences.maxRent) {
      maxScore += 100;
      const rent = parseInt(housing.averagePrice.rent);
      totalScore += rent <= preferences.maxRent ? 100 : 
                   (preferences.maxRent / rent) * 100;
      details.rentScore = totalScore;
    }

    if (preferences.type) {
      maxScore += 100;
      totalScore += housing.type === preferences.type ? 100 : 50;
      details.typeMatch = housing.type === preferences.type;
    }

    return {
      score: maxScore > 0 ? totalScore / maxScore : 0,
      details
    };
  }

  generateReport() {
    return {
      summary: {
        totalTests: this.results.total,
        passedTests: this.results.passed,
        failedTests: this.results.failed,
        successRate: `${((this.results.passed / this.results.total) * 100).toFixed(2)}%`
      },
      details: this.results.details.map(result => ({
        scenario: result.scenarioName,
        passed: result.passed,
        score: result.score ? result.score.toFixed(2) : 'N/A',
        expectedCity: result.expectedCity,
        details: result.details
      }))
    };
  }
}

// Example usage:
/*
const cityData = {
  name: "Helsinki",
  safety: { score: 85 },
  amenities: { healthcare: { hospitals: 4, clinics: 15 } },
  // ... other city data
};

const testRunner = new CityMatchingTestRunner(cityData);
const results = await testRunner.runAllTests();
const report = testRunner.generateReport();
console.log(report);
*/ 