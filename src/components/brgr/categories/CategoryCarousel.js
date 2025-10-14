import React, { useEffect } from "react";
import { Box, IconButton, Button,useMediaQuery } from "@mui/material";
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
          const activeButton = Array.from(buttons).find(
              (btn) => btn.textContent === states.selectedCategoryItem
          );
          if (activeButton) {
              activeButton.scrollIntoView({
                  behavior: "smooth",
                  inline: "nearest",
                  block: "nearest"
              });
              setTimeout(() => actions.updateArrows(), 300); 
          }
      }
  }, [states.selectedCategoryItem, actions.updateArrows]);

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
            <Box
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
                            left: 0,
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
                  gap: smDown ? "0px" : "16px",   
                  padding: smDown ? "0 8px" : "0 40px", 
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

                                fontWeight: 600,
                                padding: "8px 16px",
                                // minWidth: "120px",
                                // maxWidth: "160px",
                                borderRadius: "8px",
                                textTransform: "none",
                                backgroundColor: states.selectedCategoryItem === cat ?
                                    styles?.CategoryCarouselHoverColor?.value != ""
                                        ? styles?.CategoryCarouselHoverColor?.value
                                        : themeColors?.CategoryCarouselHoverColor?.value : "transparent",
                            }}
                            onMouseOver={(e) => {
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
                            right: 0,
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
            </Box>
        </Box>
    );
}
