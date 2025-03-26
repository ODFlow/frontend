"use client";

import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Create a styled Typography component instead of trying to style Link directly
const StyledLinkText = styled(Typography)(({ theme }) => ({
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

export default function ViewDetailedStatisticsButton({ href = "/population", text = "View detailed statistics", align = "center" }) {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: align === 'center' ? 'center' : align === 'left' ? 'flex-start' : 'flex-end', 
      mt: 2, 
      mb: 2 
    }}>
      <Link href={href} passHref>
        <StyledLinkText component="a">
          {text} <span>➔</span>
        </StyledLinkText>
      </Link>
    </Box>
  );
} 