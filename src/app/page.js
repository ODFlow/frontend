"use client";

import CityInsightsDashboard from '../components/CityInsights/CityInsightsDashboard';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';

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
        <Link href="/population" style={{ 
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
        }}>
          <Typography variant="body1">
            View detailed statistics ➔
          </Typography>
        </Link>
      </Box>
    </main>
  );
}
