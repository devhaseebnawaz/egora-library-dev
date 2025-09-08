import React from 'react';
import { Box } from '@mui/material';

export default function CategoryLayout({ banner, children }) {
  return (
    <Box>
      {/* {banner} */}
      {children}
    </Box>
  );
}