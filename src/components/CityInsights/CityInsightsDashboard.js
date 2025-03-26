"use client";

import { useState } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  CircularProgress,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';

const StyledCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
  backgroundColor: theme.palette.mode === 'dark' ? '#1E1E1E' : '#FFFFFF',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

// Sample city data
const cities = [
  {
    id: 'oulu',
    name: 'Oulu',
    population: '331k',
    safetyRating: '72%',
    description: 'Oulu is a vibrant city in northern Finland, known for its technology industry and innovation.'
  },
  {
    id: 'helsinki',
    name: 'Helsinki',
    population: '1.3M',
    safetyRating: '85%',
    description: 'Helsinki is the capital of Finland and a vibrant coastal city known for design and technology.'
  },
  {
    id: 'tampere',
    name: 'Tampere',
    population: '252k',
    safetyRating: '80%',
    description: 'Tampere is the third-largest city in Finland, known for its industrial heritage and universities.'
  }
];

export default function CityInsightsDashboard() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        City Insights
      </Typography>
      
      <Grid container spacing={3}>
        {cities.map((city) => (
          <Grid item xs={12} md={4} key={city.id}>
            <StyledCard>
              <Typography variant="h5" component="h2" gutterBottom>
                {city.name}
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Population: {city.population}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Safety Rating: {city.safetyRating}
                </Typography>
              </Box>
              
              <Typography variant="body2" sx={{ mb: 2 }}>
                {city.description}
              </Typography>
              
              <Box sx={{ mt: 'auto', pt: 2 }}>
                <Link 
                  href={`/city/${city.id}`} 
                  style={{ 
                    color: '#6D28D9',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '0.875rem'
                  }}
                >
                  View details ➔
                </Link>
              </Box>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
} 