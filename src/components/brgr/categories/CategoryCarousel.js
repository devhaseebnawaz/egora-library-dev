import React, { useEffect } from "react";
import { Box, IconButton, Button, Container, useMediaQuery } from "@mui/material";
import { Icon } from "@iconify/react";
import arrowLeft from "@iconify-icons/mdi/chevron-left";
import arrowRight from "@iconify-icons/mdi/chevron-right";
import { useTheme } from '@mui/material/styles';
import { getScreenSizeCategory } from "../../../utils/fontsize";

export default function CategoryCarousel({ themeColors, actions, prop, styles, states, globalComponentStyles }) {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down("sm")); 
    // useEffect(() => {
    //     if (states.selectedCategoryItem && states.scrollRef?.current) {
    //         const buttons = states.scrollRef.current.querySelectorAll("button");
    //         const activeButton = Array.from(buttons).find(
    //             (btn) => btn.textContent === states.selectedCategoryItem
    //         );
    //         if (activeButton) {
    //             activeButton.scrollIntoView({
    //                 behavior: "smooth",
    //                 inline: "nearest",
    //                 block: "nearest"
    //             });
    //         }
    //     }
    // }, [states.selectedCategoryItem]);


      useEffect(() => {
      if (states.selectedCategoryItem && states.scrollRef?.current) {
          const buttons = states.scrollRef.current.querySelectorAll("button");
          const activeButtonIndex = Array.from(buttons).findIndex(
              (btn) => btn.textContent === states.selectedCategoryItem
          );
          const activeButton = buttons[activeButtonIndex];

          if (activeButton) {
              if (activeButtonIndex === 0) {
                  states.scrollRef.current.scrollTo({
                      left: 0,
                      behavior: "smooth",
                  });
              } else {
                  activeButton.scrollIntoView({
                      behavior: "smooth",
                      inline: "nearest",
                      block: "nearest"
                  });
              }
              setTimeout(() => actions.updateArrows(), 300); 
          }
      }
  }, [states.selectedCategoryItem]);

    const handleCategoryClick = (category) => {
        actions.handleCategoryClick(category);
    }

     useEffect(() => {
  const scrollElement = states.scrollRef?.current;
  if (!scrollElement) return;

  actions.updateArrows(states.scrollRef, actions.setShowLeft, actions.setShowRight);

  const handleScrollEvent = () => {
    actions.updateArrows(states.scrollRef, actions.setShowLeft, actions.setShowRight);
  };
  scrollElement.addEventListener("scroll", handleScrollEvent, { passive: true });

  const handleResize = () => {
    actions.updateArrows(states.scrollRef, actions.setShowLeft, actions.setShowRight);
  };
  window.addEventListener("resize", handleResize);

  return () => {
    scrollElement.removeEventListener("scroll", handleScrollEvent);
    window.removeEventListener("resize", handleResize);
  };
}, [states.scrollRef]);
    
    return (
        <Box
            style={{
                position: "sticky",
                top: 0,
                zIndex: 1100,
                backgroundColor: styles?.CategoryCarouselBackgroundColor?.value != ""
                    ? styles?.CategoryCarouselBackgroundColor?.value
                    : themeColors?.CategoryCarouselBackgroundColor?.value,

                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
        >
            <Container
                maxWidth="lg"
                style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "8px 16px",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {states.showLeft && (
                    <IconButton
                        onClick={() => actions.handleScroll("left")}
                        style={{
                            position: "absolute",
                            left: smDown ? 8 : 16,
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 2,
                            backgroundColor:
                                styles?.CategoryCarouselGoPrevIconBackgroundColor?.value != ""
                                    ? styles?.CategoryCarouselGoPrevIconBackgroundColor?.value
                                    : themeColors?.CategoryCarouselGoPrevIconBackgroundColor?.value,

                            color:
                                styles?.CategoryCarouselGoPrevIconColor?.value != ""
                                    ? styles?.CategoryCarouselGoPrevIconColor?.value
                                    : globalComponentStyles?.Icon?.color?.value != ""
                                        ? globalComponentStyles?.Icon?.color?.value
                                        : themeColors?.CategoryCarouselGoPrevIconColor?.value
                            ,
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.7)"}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles?.CategoryCarouselGoPrevIconBackgroundColor?.value != ""
                            ? styles?.CategoryCarouselGoPrevIconBackgroundColor?.value
                            : themeColors?.CategoryCarouselGoPrevIconBackgroundColor?.value}
                    >
                        <Icon icon={arrowLeft}
                            width={
                                styles?.CategoryCarouselGoPrevIconHeightWidth?.value != ""
                                    ? styles?.CategoryCarouselGoPrevIconHeightWidth?.value
                                    : globalComponentStyles?.Icon?.size?.value != ""
                                        ? globalComponentStyles?.Icon?.size?.value
                                        : themeColors?.CategoryCarouselGoPrevIconHeightWidth?.value
                            }
                            height={
                                styles?.CategoryCarouselGoPrevIconHeightWidth?.value != ""
                                    ? styles?.CategoryCarouselGoPrevIconHeightWidth?.value
                                    : globalComponentStyles?.Icon?.size?.value != ""
                                        ? globalComponentStyles?.Icon?.size?.value
                                        : themeColors?.CategoryCarouselGoPrevIconHeightWidth?.value
                            }
                        />
                    </IconButton>
                )}

              <Box
                  ref={states.scrollRef}
                  style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  overflowX: "auto",
                  gap: smDown ? "0px" : "8px",
                  padding: smDown ? "0 48px" : "0 64px",
                  width: "100%",
                  scrollbarWidth: "none",
                  }}
                > 

                    <style>{`
            ::-webkit-scrollbar {
              display: none;
            }
          `}</style>

                    {states?.categoryCarousel?.map((cat, idx) => (
                        <Button
                            disableRipple
                            disableElevation
                            key={idx}
                            style={{
                                flex: "0 0 auto",
                                whiteSpace: "nowrap",
                                fontWeight:
                                    styles?.CategoryCarouselTextWeight?.value != ""
                                        ? styles?.CategoryCarouselTextWeight?.value
                                        : globalComponentStyles?.Text?.fontWeight?.value != ""
                                            ? globalComponentStyles?.Text?.fontWeight?.value :
                                            themeColors?.CategoryCarouselTextWeight?.value,
                                color: states.selectedCategoryItem === cat
                                    ? (styles?.CategoryCarouselTextHoverColor?.value !== ""
                                        ? styles?.CategoryCarouselTextHoverColor?.value
                                        : globalComponentStyles?.Text?.color?.value !== ""
                                            ? globalComponentStyles?.Text?.color?.value
                                            : themeColors?.CategoryCarouselTextHoverColor?.value)
                                    : (styles?.CategoryCarouselTextColor?.value !== ""
                                        ? styles?.CategoryCarouselTextColor?.value
                                        : globalComponentStyles?.Text?.color?.value !== ""
                                            ? globalComponentStyles?.Text?.color?.value
                                            : themeColors?.CategoryCarouselTextColor?.value),

                                fontSize: styles?.CategoryCarouselTextSize?.value[getScreenSizeCategory()] != 0
                                    ? styles?.CategoryCarouselTextSize?.value[getScreenSizeCategory()]
                                    : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                                        ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] :
                                        themeColors?.CategoryCarouselTextSize?.value[getScreenSizeCategory()],

                                fontFamily: styles?.CategoryCarouselTextFont?.value != ""
                                    ? styles?.CategoryCarouselTextFont?.value
                                    : globalComponentStyles?.Text?.fontFamily?.value != ""
                                        ? globalComponentStyles?.Text?.fontFamily?.value :
                                        themeColors?.CategoryCarouselTextFont?.value,

                                fontStyle: styles?.CategoryCarouselTextStyle?.value != ""
                                    ? styles?.CategoryCarouselTextStyle?.value
                                    : globalComponentStyles?.Text?.fontStyle?.value != ""
                                        ? globalComponentStyles?.Text?.fontStyle?.value :
                                        themeColors?.CategoryCarouselTextStyle?.value,

                                padding: smDown ? "6px 10px" : "8px 12px",
                                // minWidth: "120px",
                                // maxWidth: "160px",
                                borderRadius: "8px",
                                textTransform: "none",
                                transition: "box-shadow 0.2s ease, transform 0.2s ease, background-color 0.2s ease",
                                boxShadow: states.selectedCategoryItem === cat
                                    ? "0 4px 12px rgba(0, 0, 0, 0.22)"
                                    : "none",
                                backgroundColor: states.selectedCategoryItem === cat ?
                                    styles?.CategoryCarouselHoverColor?.value != ""
                                        ? styles?.CategoryCarouselHoverColor?.value
                                        : themeColors?.CategoryCarouselHoverColor?.value : "transparent",
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.22)";
                                e.currentTarget.style.transform = "translateY(-1px)";

                                if (states.selectedCategoryItem !== cat) {
                                    const bgColor = styles?.CategoryCarouselHoverColor?.value !== ""
                                        ? styles.CategoryCarouselHoverColor.value
                                        : themeColors?.CategoryCarouselHoverColor?.value || "transparent";
                                    const color =  styles?.CategoryCarouselTextHoverColor?.value != ""
                                        ? styles?.CategoryCarouselTextHoverColor?.value
                                        : globalComponentStyles?.Text?.color?.value != ""
                                            ? globalComponentStyles?.Text?.color?.value :
                                            themeColors?.CategoryCarouselTextHoverColor?.value;
                                    e.currentTarget.style.backgroundColor = bgColor;
                                    e.currentTarget.style.color = color;
                                }
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.boxShadow = states.selectedCategoryItem === cat
                                    ? "0 4px 12px rgba(0, 0, 0, 0.22)"
                                    : "none";
                                e.currentTarget.style.transform = "translateY(0)";

                                if (states.selectedCategoryItem !== cat) {
                                    e.currentTarget.style.backgroundColor = "transparent";
                                    e.currentTarget.style.color = styles?.CategoryCarouselTextColor?.value ||
                                        globalComponentStyles?.Text?.color?.value ||
                                        themeColors?.CategoryCarouselTextColor?.value;
                                }
                            }}
                            onClick={() => handleCategoryClick(cat)}
                        >
                            {cat}
                        </Button>
                    ))}
                </Box>

                {states.showRight && (
                    <IconButton
                        onClick={() => actions.handleScroll("right")}
                        style={{
                            position: "absolute",
                            right: smDown ? 8 : 16,
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 2,
                            backgroundColor:
                                styles?.CategoryCarouselGoNextIconBackgroundColor?.value != ""
                                    ? styles?.CategoryCarouselGoNextIconBackgroundColor?.value
                                    : themeColors?.CategoryCarouselGoNextIconBackgroundColor?.value,
                            color:
                                styles?.CategoryCarouselGoNextIconColor?.value != ""
                                    ? styles?.CategoryCarouselGoNextIconColor?.value
                                    : globalComponentStyles?.Icon?.color?.value != ""
                                        ? globalComponentStyles?.Icon?.color?.value
                                        : themeColors?.CategoryCarouselGoNextIconColor?.value,
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.7)"}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor =
                            styles?.CategoryCarouselGoNextIconBackgroundColor?.value != ""
                                ? styles?.CategoryCarouselGoNextIconBackgroundColor?.value
                                : themeColors?.CategoryCarouselGoNextIconBackgroundColor?.value}
                    >
                        <Icon icon={arrowRight}
                            width={
                                styles?.CategoryCarouselGoNextIconHeightWidth?.value != ""
                                    ? styles?.CategoryCarouselGoNextIconHeightWidth?.value
                                    : globalComponentStyles?.Icon?.size?.value != ""
                                        ? globalComponentStyles?.Icon?.size?.value
                                        : themeColors?.CategoryCarouselGoNextIconHeightWidth?.value
                            }
                            height={
                                styles?.CategoryCarouselGoNextIconHeightWidth?.value != ""
                                    ? styles?.CategoryCarouselGoNextIconHeightWidth?.value
                                    : globalComponentStyles?.Icon?.size?.value != ""
                                        ? globalComponentStyles?.Icon?.size?.value
                                        : themeColors?.CategoryCarouselGoNextIconHeightWidth?.value
                            }
                        />
                    </IconButton>
                )}
            </Container>
        </Box>
    );
}
