"use client";

import CityInsightsDashboard from '../components/CityInsights/CityInsightsDashboard';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Create a styled Link component
const StyledLink = styled(Link)(({ theme }) => ({
  color: '#6D28D9', 
  textDecoration: 'none', 
  display: 'flex', 
  alignItems: 'center',
  fontWeight: 500,
  padding: '8px 16px',
  borderRadius: '4px',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: 'rgba(109, 40, 217, 0.1)',
  }
}));

export default function Home() {
  return (
    <main>
      <CityInsightsDashboard />
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        mt: 3, 
        mb: 5 
      }}>
        <StyledLink href="/population">
          View detailed statistics ➔
        </StyledLink>
      </Box>
    </main>
  );
}
