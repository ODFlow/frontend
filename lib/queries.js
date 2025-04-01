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