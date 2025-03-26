"use client";

import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme
} from '@mui/material';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';
import { styled } from '@mui/material/styles';
import { useDependencyRatio, usePopulationIncrease, useForeignBackground } from '../../../lib/hooks/usePopulationData';

// Fallback sample data if API isn't ready
const sampleDependencyRatioData = [
  { year: '2010', youngDependencyRatio: 25.5, oldDependencyRatio: 27.8, total: 53.3 },
  { year: '2011', youngDependencyRatio: 25.2, oldDependencyRatio: 28.5, total: 53.7 },
  { year: '2012', youngDependencyRatio: 24.9, oldDependencyRatio: 29.2, total: 54.1 },
  { year: '2013', youngDependencyRatio: 24.7, oldDependencyRatio: 30.0, total: 54.7 },
  { year: '2014', youngDependencyRatio: 24.5, oldDependencyRatio: 30.8, total: 55.3 },
  { year: '2015', youngDependencyRatio: 24.3, oldDependencyRatio: 31.6, total: 55.9 },
  { year: '2016', youngDependencyRatio: 24.1, oldDependencyRatio: 32.4, total: 56.5 },
  { year: '2017', youngDependencyRatio: 23.9, oldDependencyRatio: 33.1, total: 57.0 },
  { year: '2018', youngDependencyRatio: 23.6, oldDependencyRatio: 33.9, total: 57.5 },
  { year: '2019', youngDependencyRatio: 23.3, oldDependencyRatio: 34.7, total: 58.0 },
];

const samplePopulationIncreaseData = [
  { year: '2010', naturalIncrease: 1200, netMigration: 800, totalIncrease: 2000 },
  { year: '2011', naturalIncrease: 1150, netMigration: 950, totalIncrease: 2100 },
  { year: '2012', naturalIncrease: 1100, netMigration: 1100, totalIncrease: 2200 },
  { year: '2013', naturalIncrease: 1050, netMigration: 1250, totalIncrease: 2300 },
  { year: '2014', naturalIncrease: 1000, netMigration: 1400, totalIncrease: 2400 },
  { year: '2015', naturalIncrease: 950, netMigration: 1550, totalIncrease: 2500 },
  { year: '2016', naturalIncrease: 900, netMigration: 1700, totalIncrease: 2600 },
  { year: '2017', naturalIncrease: 850, netMigration: 1850, totalIncrease: 2700 },
  { year: '2018', naturalIncrease: 800, netMigration: 2000, totalIncrease: 2800 },
  { year: '2019', naturalIncrease: 750, netMigration: 2150, totalIncrease: 2900 },
];

const sampleForeignBackgroundData = {
  nativeFinnish: 85,
  foreignBackground: 15
};

const cities = ['Helsinki', 'Espoo', 'Vantaa', 'Oulu', 'Tampere'];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
  backgroundColor: theme.palette.mode === 'dark' ? '#1E1E1E' : '#FFFFFF',
  height: '100%',
}));

export default function PopulationDetailedView() {
  const [selectedCity, setSelectedCity] = useState('Oulu');
  const theme = useTheme();

  // Fetch data using our hooks
  const { 
    data: dependencyRatioData, 
    loading: dependencyRatioLoading, 
    error: dependencyRatioError 
  } = useDependencyRatio(selectedCity);
  
  const { 
    data: populationIncreaseData, 
    loading: populationIncreaseLoading, 
    error: populationIncreaseError 
  } = usePopulationIncrease(selectedCity);
  
  const { 
    data: foreignBackgroundData, 
    loading: foreignBackgroundLoading, 
    error: foreignBackgroundError 
  } = useForeignBackground(selectedCity);

  const isLoading = dependencyRatioLoading || populationIncreaseLoading || foreignBackgroundLoading;
  const hasError = dependencyRatioError || populationIncreaseError || foreignBackgroundError;

  // Use either API data or fallback to sample data
  const dependencyRatio = dependencyRatioData?.dependency_ratio || sampleDependencyRatioData;
  const populationIncrease = populationIncreaseData?.population_increase || samplePopulationIncreaseData;
  const foreignBackground = foreignBackgroundData?.foreign_background || sampleForeignBackgroundData;

  // Color scheme to match Figma design - these are purple shades
  const purpleColors = ['#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6', '#4C1D95'];
  // Secondary colors for multiple data series
  const secondaryColors = ['#D8B4FE', '#A78BFA', '#818CF8', '#7DD3FC'];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Population statistics in {selectedCity}
        </Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Select City</InputLabel>
          <Select
            value={selectedCity}
            label="Select City"
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {isLoading && (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      )}

      {hasError && (
        <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
          Error loading data. Please try again later.
        </Alert>
      )}

      {!isLoading && !hasError && (
        <Grid container spacing={3}>
          {/* Demographic Dependency Ratio Chart */}
          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom>
                Demographic Dependency Ratio
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                The ratio of dependents (people younger than 15 or older than 64) to the working-age population.
              </Typography>
              <Box sx={{ height: 400, width: '100%' }}>
                <LineChart
                  series={[
                    {
                      data: dependencyRatio.map(d => d.youngDependencyRatio),
                      label: 'Young Dependency Ratio (0-14)',
                      color: purpleColors[0],
                      area: true,
                    },
                    {
                      data: dependencyRatio.map(d => d.oldDependencyRatio),
                      label: 'Old Dependency Ratio (65+)',
                      color: purpleColors[1],
                      area: true,
                    },
                    {
                      data: dependencyRatio.map(d => d.total),
                      label: 'Total Dependency Ratio',
                      color: purpleColors[2],
                      line: true,
                      area: false,
                    }
                  ]}
                  xAxis={[{
                    data: dependencyRatio.map(d => d.year),
                    scaleType: 'band',
                    tickLabelStyle: {
                      angle: 0,
                      textAnchor: 'middle',
                    },
                  }]}
                  yAxis={[{
                    label: 'Ratio (%)',
                  }]}
                  grid={{ vertical: true, horizontal: true }}
                  height={400}
                  margin={{ left: 70, right: 20, top: 20, bottom: 50 }}
                  tooltip={{ trigger: 'item' }}
                  slotProps={{
                    legend: {
                      direction: 'row',
                      position: { vertical: 'bottom', horizontal: 'middle' },
                      padding: 0,
                      labelStyle: {
                        fontSize: 12,
                      },
                    },
                  }}
                />
              </Box>
            </StyledPaper>
          </Grid>

          {/* Population Increase Chart */}
          <Grid item xs={12} md={6}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom>
                Increase of Population
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                The annual change in population size, broken down by natural increase and net migration.
              </Typography>
              <Box sx={{ height: 400, width: '100%' }}>
                <BarChart
                  series={[
                    {
                      data: populationIncrease.map(d => d.naturalIncrease),
                      label: 'Natural Increase',
                      stack: 'total',
                      color: purpleColors[0],
                    },
                    {
                      data: populationIncrease.map(d => d.netMigration),
                      label: 'Net Migration',
                      stack: 'total',
                      color: purpleColors[1],
                    },
                  ]}
                  xAxis={[{
                    data: populationIncrease.map(d => d.year),
                    scaleType: 'band',
                    tickLabelStyle: {
                      angle: 0,
                      textAnchor: 'middle',
                    },
                  }]}
                  yAxis={[{
                    label: 'Population Change',
                  }]}
                  height={400}
                  margin={{ left: 70, right: 20, top: 20, bottom: 50 }}
                  tooltip={{ trigger: 'item' }}
                  slotProps={{
                    legend: {
                      direction: 'row',
                      position: { vertical: 'bottom', horizontal: 'middle' },
                      padding: 0,
                      labelStyle: {
                        fontSize: 12,
                      },
                    },
                  }}
                />
              </Box>
            </StyledPaper>
          </Grid>

          {/* Foreign Background Chart */}
          <Grid item xs={12} md={6}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom>
                Share of Persons with Foreign Background
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                The proportion of the population with a foreign background compared to native Finns.
              </Typography>
              <Box sx={{ height: 400, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: foreignBackground.nativeFinnish, label: `Native Finnish - ${foreignBackground.nativeFinnish}%` },
                        { id: 1, value: foreignBackground.foreignBackground, label: `Foreign Background - ${foreignBackground.foreignBackground}%` },
                      ],
                      innerRadius: 80,
                      outerRadius: 140,
                      paddingAngle: 0,
                      cornerRadius: 0,
                      startAngle: 0,
                      endAngle: 360,
                      cx: 150,
                      cy: 150,
                    },
                  ]}
                  colors={[purpleColors[0], secondaryColors[0]]}
                  width={400}
                  height={400}
                  tooltip={{ trigger: 'item' }}
                  slotProps={{
                    legend: {
                      direction: 'column',
                      position: { vertical: 'middle', horizontal: 'right' },
                      padding: { left: 0, right: 0, top: 0, bottom: 0 },
                      labelStyle: {
                        fontSize: 12,
                      },
                    },
                  }}
                />
              </Box>
            </StyledPaper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
} 