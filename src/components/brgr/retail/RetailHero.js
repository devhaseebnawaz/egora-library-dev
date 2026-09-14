/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { propValue, resolveComponentStyles, resolveRetailImage, styleLength, styleValue } from "./retailShared";

export default function RetailHero({ prop, states, styles: componentStyles, themeColors }) {
  const theme = useTheme();
  const styles = resolveComponentStyles(componentStyles, themeColors);
  const images = propValue(prop, "carouselImages", []);
  const uploadedImages = (Array.isArray(images) ? images : [])
    .map((entry) => (typeof entry === "object" ? entry?.url || entry?.src || entry?.image : entry))
    .map((entry) => resolveRetailImage(entry, states?.storeImagesBaseUrl))
    .filter(Boolean);
  const fallbackImage = resolveRetailImage(
    propValue(prop, "backgroundImage", "") || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=85",
    states?.storeImagesBaseUrl
  );
  const slides = uploadedImages.length ? uploadedImages : [fallbackImage];
  const slidesKey = slides.join("|");
  const configuredInterval = Number(propValue(prop, "carouselSlideInterval", 5));
  const slideInterval = Number.isFinite(configuredInterval) && configuredInterval > 0
    ? configuredInterval
    : 5;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setCurrentSlide(0);
  }, [slidesKey]);

  useEffect(() => {
    if (slides.length < 2) return undefined;

    const timer = setInterval(() => {
      setCurrentSlide((slide) => (slide + 1) % slides.length);
    }, slideInterval * 1000);

    return () => clearInterval(timer);
  }, [slides.length, slideInterval, slidesKey]);

  return (
    <Box component="section" sx={{
      display: "block", width: "100%", overflow: "hidden",
      color: "text.primary", background: styleValue(styles, "HeroCarouselDisplayedImageBackgroundColor", theme.palette.background.default),
      borderRadius: styleLength(styles, "HeroCarouselImageBorderRadius", 0),
    }}>
      <Box sx={{
        position: "relative", width: "100%", minHeight: styleLength(styles, "HeroCarouselDisplayedImageHeight", { xs: 330, md: 475 }), overflow: "hidden", background: styleValue(styles, "HeroCarouselDisplayedImageBackgroundColor", theme.palette.background.default),
      }}>
        <Box
          data-testid="retail-hero-image-track"
          aria-hidden="true"
          sx={{ position: "absolute", inset: 0, display: "flex", width: "100%", transition: "transform 0.8s ease-in-out" }}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <Box component="img" key={`${slide}-${index}`} src={slide} alt="" sx={{ width: "100%", height: "100%", flex: "0 0 100%", objectFit: "contain", objectPosition: "center" }} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
