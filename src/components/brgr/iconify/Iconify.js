import React, { forwardRef } from 'react';
import { Icon } from '@iconify/react';
import { Box } from '@mui/material';

const Iconify = forwardRef(function Iconify(props, ref) {
  const { icon, width = 20, sx, ...other } = props;
  return (
    <Box
      ref={ref}
      component={Icon}
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  );
});

export default Iconify;
