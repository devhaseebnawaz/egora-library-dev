import React from 'react';
import { Box } from '@mui/material';

export default function Banner({ img }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto', 
        minHeight: { xs: 100, md: 200 }, 
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderRadius: '20px',
        margin: '20px 0',
      }}
    />
  );
}