import { useQuery } from '@apollo/client';
import {
  GET_DEMOGRAPHICS,
  GET_UNEMPLOYMENT_RATE,
  GET_TRAFFIC_ACCIDENTS,
  GET_TRAFFIC_ACCIDENTS_SUM,
  GET_EDUCATION,
  GET_INCOME,
} from '../queries';

export const useDemographics = (area) => {
  return useQuery(GET_DEMOGRAPHICS, {
    variables: { area },
    skip: !area,
  });
};

export const useUnemploymentRate = (area) => {
  return useQuery(GET_UNEMPLOYMENT_RATE, {
    variables: { area },
    skip: !area,
  });
};

export const useTrafficAccidents = (area) => {
  return useQuery(GET_TRAFFIC_ACCIDENTS, {
    variables: { area },
    skip: !area,
  });
};

export const useTrafficAccidentsSum = (area) => {
  return useQuery(GET_TRAFFIC_ACCIDENTS_SUM, {
    variables: { area },
    skip: !area,
  });
};

export const useEducation = (area) => {
  return useQuery(GET_EDUCATION, {
    variables: { area },
    skip: !area,
  });
};

export const useIncome = (area) => {
  return useQuery(GET_INCOME, {
    variables: { area },
    skip: !area,
  });
};

export const useSafetyRating = (area) => {
  return useQuery(GET_SAFETY_RATING, {
    variables: { area },
    skip: !area,
  });
};