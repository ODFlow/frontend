"use client";

import { useQuery } from '@apollo/client';
import {
  GET_DEPENDENCY_RATIO,
  GET_POPULATION_INCREASE,
  GET_FOREIGN_BACKGROUND,
} from '../queries';

export const useDependencyRatio = (area) => {
  const result = useQuery(GET_DEPENDENCY_RATIO, {
    variables: { area },
    skip: !area,
  });
  
  return result;
};

export const usePopulationIncrease = (area) => {
  const result = useQuery(GET_POPULATION_INCREASE, {
    variables: { area },
    skip: !area,
  });
  
  return result;
};

export const useForeignBackground = (area) => {
  const result = useQuery(GET_FOREIGN_BACKGROUND, {
    variables: { area },
    skip: !area,
  });
  
  return result;
}; 