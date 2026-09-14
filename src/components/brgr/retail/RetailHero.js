/* eslint-disable react/prop-types */
import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { propValue, resolveComponentStyles, resolveRetailImage, styleLength, styleValue } from "./retailShared";

export default function RetailHero({ prop, states, styles: componentStyles, themeColors }) {
  const theme = useTheme();
  const styles = resolveComponentStyles(componentStyles, themeColors);
  const images = propValue(prop, "carouselImages", []);
  const sourceImage = propValue(prop, "backgroundImage", "") || images?.[0]?.url || images?.[0] || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=85";
  const image = resolveRetailImage(sourceImage, states?.storeImagesBaseUrl);

  return (
    <Box component="section" sx={{
      display: "grid", gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(0, 43fr) minmax(0, 57fr)" }, overflow: "hidden",
      color: "text.primary", background: styleValue(styles, "HeroCarouselDisplayedImageBackgroundColor", theme.palette.background.default),
      borderRadius: styleLength(styles, "HeroCarouselImageBorderRadius", 0),
    }}>
      <Stack justifyContent="center" alignItems="flex-start" spacing={2.5} sx={{ px: { xs: 3, md: 6, lg: 8 }, py: { xs: 6, md: 7 } }}>
        <Typography variant="overline">EGORA POS PLATFORM</Typography>
        <Typography variant="h2" component="h1" sx={{ fontSize: { xs: theme.typography.h3.fontSize, lg: theme.typography.h2.fontSize }, overflowWrap: "anywhere" }}>A smarter way<br />to run your business</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 390 }}>Simple sales, inventory and business tools built for growing teams.</Typography>
        <Button variant="contained" size="large" onClick={() => document.getElementById("retail-products")?.scrollIntoView({ behavior: "smooth" })}>Shop now</Button>
      </Stack>
      <Box sx={{
        position: "relative", minHeight: styleLength(styles, "HeroCarouselDisplayedImageHeight", { xs: 330, md: 475 }), overflow: "hidden", backgroundPosition: "center", backgroundSize: "cover",
        backgroundImage: `linear-gradient(90deg, ${alpha(theme.palette.background.default, 0.18)}, ${alpha(theme.palette.background.default, 0.68)}), url("${image}")`,
      }}>
        <Box aria-hidden="true" sx={{ position: "absolute", top: "13%", left: "35%", width: { xs: 190, md: 255 }, aspectRatio: "1", borderRadius: "50%", bgcolor: "secondary.light" }} />
        {[{ brand: "EGORA", caption: "ESSENTIALS", left: "20%", rotate: "-12deg", background: "primary.light", color: "primary.contrastText" }, { brand: "POS", caption: "MADE SIMPLE", left: "52%", rotate: "12deg", background: "secondary.light", color: "secondary.contrastText" }].map((item) => (
          <Stack aria-hidden="true" key={item.brand} justifyContent="center" alignItems="center" sx={{ position: "absolute", bottom: "8%", left: item.left, width: { xs: 110, md: 150 }, height: { xs: 210, md: 270 }, transform: `rotate(${item.rotate})`, borderRadius: 3, boxShadow: 5, bgcolor: item.background, color: item.color }}>
            <Typography variant="h5">{item.brand}</Typography>
            <Typography variant="caption" sx={{ fontSize: theme.typography.pxToRem(9), letterSpacing: "0.1em" }}>{item.caption}</Typography>
          </Stack>
        ))}
      </Box>
    </Box>
  );
}
