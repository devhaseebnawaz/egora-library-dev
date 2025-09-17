
import React, { useState, useEffect, useRef } from "react";
import { Box, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import arrowLeft from "@iconify-icons/mdi/chevron-left";
import arrowRight from "@iconify-icons/mdi/chevron-right";
import { getScreenSizeCategory } from "../../../utils/fontsize";

export default function HeroCarousel({ prop, themeColors, styles, states, globalComponentStyles }) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const slideInterval = useRef(null);
  const isJumpingRef = useRef(false);
  const hasMountedRef = useRef(false);

  let { editable } = prop ?? {}
  let { carouselImages } = editable ?? {} 
  const totalSlides = carouselImages.value.length;
  const fullSlides = [carouselImages.value[totalSlides - 1], ...carouselImages.value, carouselImages.value[0]];

  const [imgHeight, setImgHeight] = useState("auto");

  const handleImageLoad = (e) => {
    const naturalHeight = e.target.naturalHeight;
    setImgHeight(naturalHeight > 800 ? 800 : "auto");
  };


  const goToIndex = (index) => {
    setCurrentIndex(index + 1);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const realIndex =
    currentIndex === 0
      ? totalSlides - 1
      : currentIndex === totalSlides + 1
        ? 0
        : currentIndex - 1;

  useEffect(() => {
    startSlide();
    return () => stopSlide();
  }, []);

  const startSlide = () => {
    stopSlide();
    slideInterval.current = setInterval(() => {
      if (!hasMountedRef.current) {
        hasMountedRef.current = true;
        return;
      }

      if (!isJumpingRef.current) {
        setCurrentIndex((prev) => prev - 1);
      }
    }, 5000);
  };

  const stopSlide = () => {
    clearInterval(slideInterval.current);
  };

  useEffect(() => {
    if (currentIndex === 0) {
      isJumpingRef.current = true;
      setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentIndex(totalSlides);
        isJumpingRef.current = false;
      }, 800);
    } else if (currentIndex === totalSlides + 1) {
      isJumpingRef.current = true;
      setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentIndex(1);
        isJumpingRef.current = false;
      }, 800);
    } else {
      setTransitionEnabled(true);
    }
  }, [currentIndex, totalSlides]);


  const getCarouselDotColor = (index) => {
    if (index === realIndex) {
      let color = styles?.HeroCarouselDisplayedImageDotColor?.value != ""
        ? styles?.HeroCarouselDisplayedImageDotColor?.value
        : themeColors?.HeroCarouselDisplayedImageDotColor?.value
      return color
    } else {
      let color = styles?.HeroCarouselHiddenImageDotColor?.value != ""
        ? styles?.HeroCarouselHiddenImageDotColor?.value
        : themeColors?.HeroCarouselHiddenImageDotColor?.value
      return color
    }
  };

  return (
    <Box
      onMouseEnter={stopSlide}
      onMouseLeave={startSlide}
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        style={{
          display: "flex",
          transition: transitionEnabled ? "transform 0.8s ease-in-out" : "none",
          transform: `translateX(-${currentIndex * 100}%)`,
          width: "100%",
          height:  
            styles?.HeroCarouselDisplayedImageHeight?.value[getScreenSizeCategory()] != 0
              ? styles?.HeroCarouselDisplayedImageHeight?.value[getScreenSizeCategory()]
              : themeColors?.HeroCarouselDisplayedImageHeight?.value[getScreenSizeCategory()],
        }}
      >
        {fullSlides.map((img, index) => (
          <Box
            key={index}
            component="img"
            src={img}
            alt={`slide-${index}`}
            onLoad={handleImageLoad}
            style={{
              width: "100%",
              maxHeight:imgHeight,
              objectFit: "fill",
              flexShrink: 0,
            }}
          />
        ))}
      </Box>

      <IconButton
        onClick={goToPrev}
        sx={{
          display: { xs: "none", md: "flex" },
          position: "absolute",
          top: "50%",
          left: "20px",
          transform: "translateY(-50%)",
          backgroundColor:
            styles?.HeroCarouselGoPrevIconBackgroundColor?.value != ""
              ? styles?.HeroCarouselGoPrevIconBackgroundColor?.value
              : themeColors?.HeroCarouselGoPrevIconBackgroundColor?.value,

          color:
            styles?.HeroCarouselGoPrevIconColor?.value != ""
              ? styles?.HeroCarouselGoPrevIconColor?.value
              : globalComponentStyles?.Icon?.color?.value != ""
                ? globalComponentStyles?.Icon?.color?.value
                : themeColors?.HeroCarouselGoPrevIconColor?.value
          ,
          zIndex: 2,
        }}
      >
        <Icon icon={arrowLeft}
          width={
            styles?.HeroCarouselGoPrevIconHeightWidth?.value != ""
              ? styles?.HeroCarouselGoPrevIconHeightWidth?.value
              : globalComponentStyles?.Icon?.size?.value != ""
                ? globalComponentStyles?.Icon?.size?.value
                : themeColors?.HeroCarouselGoPrevIconHeightWidth?.value
          }
          height={
            styles?.HeroCarouselGoPrevIconHeightWidth?.value != ""
              ? styles?.HeroCarouselGoPrevIconHeightWidth?.value
              : globalComponentStyles?.Icon?.size?.value != ""
                ? globalComponentStyles?.Icon?.size?.value
                : themeColors?.HeroCarouselGoPrevIconHeightWidth?.value
          } />
      </IconButton>

      <IconButton
        onClick={goToNext}
         sx={{
          display: { xs: "none", md: "flex" },
          position: "absolute",
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)",
          backgroundColor:
            styles?.HeroCarouselGoNextIconBackgroundColor?.value != ""
              ? styles?.HeroCarouselGoNextIconBackgroundColor?.value
              : themeColors?.HeroCarouselGoNextIconBackgroundColor?.value,

          color:
            styles?.HeroCarouselGoNextIconColor?.value != ""
              ? styles?.HeroCarouselGoNextIconColor?.value
              : globalComponentStyles?.Icon?.color?.value != ""
                ? globalComponentStyles?.Icon?.color?.value
                : themeColors?.HeroCarouselGoNextIconColor?.value
          ,
          zIndex: 2,
        }}
      >
        <Icon icon={arrowRight}
          width={
            styles?.HeroCarouselGoNextIconHeightWidth?.value != ""
              ? styles?.HeroCarouselGoNextIconHeightWidth?.value
              : globalComponentStyles?.Icon?.size?.value != ""
                ? globalComponentStyles?.Icon?.size?.value
                : themeColors?.HeroCarouselGoNextIconHeightWidth?.value
          }
          height={
            styles?.HeroCarouselGoNextIconHeightWidth?.value != ""
              ? styles?.HeroCarouselGoNextIconHeightWidth?.value
              : globalComponentStyles?.Icon?.size?.value != ""
                ? globalComponentStyles?.Icon?.size?.value
                : themeColors?.HeroCarouselGoNextIconHeightWidth?.value
          } />
      </IconButton>

      <Box
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
          zIndex: 2,
        }}
      >
        {carouselImages?.value?.map((_, index) => (
          <Box
            key={index}
            onClick={() => goToIndex(index)}
            style={{
              width:
                styles?.HeroCarouselDotHeightWidth?.value != ""
                  ? styles?.HeroCarouselDotHeightWidth?.value
                  : globalComponentStyles?.Icon?.size?.value != ""
                    ? globalComponentStyles?.Icon?.size?.value
                    : themeColors?.HeroCarouselDotHeightWidth?.value
              ,
              height:
                styles?.HeroCarouselDotHeightWidth?.value != ""
                  ? styles?.HeroCarouselDotHeightWidth?.value
                  : globalComponentStyles?.Icon?.size?.value != ""
                    ? globalComponentStyles?.Icon?.size?.value
                    : themeColors?.HeroCarouselDotHeightWidth?.value
              ,
              borderRadius: styles?.HeroCarouselDotBorderRadius?.value != ""
                ? `${styles?.HeroCarouselDotBorderRadius?.value}px`
                : `${themeColors?.HeroCarouselDotBorderRadius?.value}px`,
              backgroundColor: getCarouselDotColor(index),
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};