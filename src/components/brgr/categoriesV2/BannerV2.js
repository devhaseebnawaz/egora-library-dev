import React from 'react';
import { Box } from '@mui/material';

export default function BannerV2({ img, styles, themeColors }) {
  return (
    <Box
      sx={{
        width: '100%',
        height:
        styles?.AllCategoriesBannerImageHeightV2?.value != ""
        ? styles?.AllCategoriesBannerImageHeightV2?.value
          : themeColors?.AllCategoriesBannerImageHeightV2?.value,
        minHeight: { xs: 100, md: 200 }, 
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderRadius: styles?.AllCategoriesBannerImageBorderRadiusV2?.value !== ""
        ? `${styles?.AllCategoriesBannerImageBorderRadiusV2?.value}px`
        : `${themeColors?.AllCategoriesBannerImageBorderRadiusV2?.value}px`,
        margin: '20px 0',
      }}
    />
  );
}