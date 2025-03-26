import { gql } from '@apollo/client';

export const GET_DEMOGRAPHICS = gql`
  query GetDemographics($area: String!) {
    demographics(area: $area) {
      description
      area
      value
    }
  }
`;

export const GET_UNEMPLOYMENT_RATE = gql`
  query GetUnemploymentRate($area: String!) {
    unemployment_rate(area: $area) {
      description
      area
      timeframe
      value
    }
  }
`;

export const GET_TRAFFIC_ACCIDENTS = gql`
  query GetTrafficAccidents($area: String!) {
    traffic_accidents(area: $area) {
      description
      area
      year
      value
    }
  }
`;

export const GET_TRAFFIC_ACCIDENTS_SUM = gql`
  query GetTrafficAccidentsSum($area: String!) {
    traffic_accidents_sum(area: $area) {
      description
      area
      year
      value
    }
  }
`;

export const GET_EDUCATION = gql`
  query GetEducation($area: String!) {
    education(area: $area) {
      description
      age
      area
      value
    }
  }
`;

export const GET_INCOME = gql`
  query GetIncome($area: String!) {
    income(area: $area) {
      description
      value
      area
    }
  }
`;

// New queries for population data
export const GET_DEPENDENCY_RATIO = gql`
  query GetDependencyRatio($area: String!) {
    dependency_ratio(area: $area) {
      year
      youngDependencyRatio
      oldDependencyRatio
      total
      area
    }
  }
`;

export const GET_POPULATION_INCREASE = gql`
  query GetPopulationIncrease($area: String!) {
    population_increase(area: $area) {
      year
      naturalIncrease
      netMigration
      totalIncrease
      area
    }
  }
`;

export const GET_FOREIGN_BACKGROUND = gql`
  query GetForeignBackground($area: String!) {
    foreign_background(area: $area) {
      nativeFinnish
      foreignBackground
      area
      year
    }
  }
`; 