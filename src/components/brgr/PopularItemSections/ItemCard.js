import React, { useState } from "react";
import { Card, Typography, Box ,useMediaQuery} from "@mui/material";
import ItemDetailModal from "../categories/ItemDetailModal";
import { useTheme } from '@mui/material/styles';
import { getScreenSizeCategory } from "../../../utils/fontsize";

export default function ItemCard ({ item, themeColors, styles, actions, states, globalComponentStyles }) {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm")); 
  const getItemNameStyles = {
    backgroundColor:
      styles?.PopularMenuSectionItemNameTextBackgroundColor?.value !== ""
        ? styles?.PopularMenuSectionItemNameTextBackgroundColor?.value
        : globalComponentStyles?.Text?.color?.value !== ""
          ? globalComponentStyles?.Text?.color?.value
          : themeColors?.PopularMenuSectionItemNameTextBackgroundColor?.value,
    borderRadius:
      styles?.PopularMenuSectionItemNameBorderRadius?.value !== ""
        ? `${styles?.PopularMenuSectionItemNameBorderRadius?.value}%`
        : `${themeColors?.PopularMenuSectionItemNameBorderRadius?.value}%`,
    color:
      styles?.PopularMenuSectionItemNameTextColor?.value !== ""
        ? styles?.PopularMenuSectionItemNameTextColor?.value
        : globalComponentStyles?.Text?.color?.value !== ""
          ? globalComponentStyles?.Text?.color?.value
          : themeColors?.PopularMenuSectionItemNameTextColor?.value,
    fontWeight:
      styles?.PopularMenuSectionItemNameTextWeight?.value != ""
        ? styles?.PopularMenuSectionItemNameTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value :
          themeColors?.PopularMenuSectionItemNameTextWeight?.value,
    fontSize:
      styles?.PopularMenuSectionItemNameTextSize?.value[getScreenSizeCategory()] != 0
        ? styles?.PopularMenuSectionItemNameTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.PopularMenuSectionItemNameTextSize?.value[getScreenSizeCategory()],

    fontFamily:
      styles?.PopularMenuSectionItemNameTextFont?.value !== ""
        ? styles?.PopularMenuSectionItemNameTextFont?.value
        : globalComponentStyles?.Text?.fontFamily?.value !== ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.PopularMenuSectionItemNameTextFont?.value,

    fontStyle:
      styles?.PopularMenuSectionItemNameTextStyle?.value !== ""
        ? styles?.PopularMenuSectionItemNameTextStyle?.value
        : globalComponentStyles?.Text?.fontWeight?.value !== ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.PopularMenuSectionItemNameTextStyle?.value,
  };

  const getPriceTagStyles = {
    color:
      styles?.PopularMenuSectionPriceTextColor?.value !== ""
        ? styles?.PopularMenuSectionPriceTextColor?.value
        : globalComponentStyles?.Text?.color?.value !== ""
          ? globalComponentStyles?.Text?.color?.value
          : themeColors?.PopularMenuSectionPriceTextColor?.value,
    fontWeight:
      styles?.PopularMenuSectionPriceTextWeight?.value != ""
        ? styles?.PopularMenuSectionPriceTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value :
          themeColors?.PopularMenuSectionPriceTextWeight?.value,
    fontSize:
      styles?.PopularMenuSectionPriceTextSize?.value[getScreenSizeCategory()] != 0
        ? styles?.PopularMenuSectionPriceTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.PopularMenuSectionPriceTextSize?.value[getScreenSizeCategory()],

    fontFamily:
      styles?.PopularMenuSectionPriceTextFont?.value !== ""
        ? styles?.PopularMenuSectionPriceTextFont?.value
        : globalComponentStyles?.Text?.fontFamily?.value !== ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.PopularMenuSectionPriceTextFont?.value,

    fontStyle:
      styles?.PopularMenuSectionPriceTextStyle?.value !== ""
        ? styles?.PopularMenuSectionPriceTextStyle?.value
        : globalComponentStyles?.Text?.fontWeight?.value !== ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.PopularMenuSectionPriceTextStyle?.value,

    borderRadius: styles?.PopularMenuSectionPriceBorderRadius?.value !== ""
      ? styles?.PopularMenuSectionPriceBorderRadius?.value
      : themeColors?.PopularMenuSectionPriceBorderRadius?.value,

    backgroundColor: styles?.PopularMenuSectionPriceBackgroundcolor?.value !== ""
      ? styles?.PopularMenuSectionPriceBackgroundcolor?.value
      : globalComponentStyles?.Text?.backgroundColor?.value !== ""
        ? globalComponentStyles?.Text?.backgroundColor?.value
        : themeColors?.PopularMenuSectionPriceBackgroundcolor?.value,
  };

  return (
    <>
      <Card
        sx={{
          position: "relative",
          borderRadius: 3,
          overflow: "hidden",
          textAlign: "center",
          boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 8px",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.03)",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
          },
        }}
        onClick={() => {
          actions.handleOpenCard();
          states.setItemForDetailedModal(item);
        }}
      >
        <Box
          component="img"
          src={
            item?.photoURL
              ? `${states.storeImagesBaseUrl}/${item.photoURL}`
              : '/assets/placeholder.png'
          }
          alt={item?.name || "Menu Item"}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/assets/placeholder.png'
          }}
          sx={{
            width: "100%",
            objectFit: "cover",
            aspectRatio: "1 / 1",
            height: {
              sm:"270px",
            },
          }}
        />

        <Typography
          variant="subtitle1"
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            zIndex: 2,
            // fontWeight: "bold",
            // color: themeColors?.ItemCardItemNameColor ? themeColors?.ItemCardItemNameColor : styles?.ItemCardItemNameColor != "" ? styles?.ItemCardItemNameColor : "#fff",
            textShadow: "0 1px 3px rgba(0,0,0,0.6)",
            ...getItemNameStyles,
            padding: "2px 9px",
          }}
        >
          {item?.name}
        </Typography>

        <Box
          style={{
            position: "absolute",
            bottom: 12,
            right: 12,
            // backgroundColor: themeColors?.ItemCardItemPriceBackgroundColor ? themeColors?.ItemCardItemPriceBackgroundColor : styles?.ItemCardItemPriceBackgroundColor != "" ? styles?.ItemCardItemPriceBackgroundColor : "#fff",
            padding: "4px 12px",
            // borderRadius: 20,
            // fontWeight: 600,
            // fontSize: 14,
            boxShadow: "rgba(0, 0, 0, 0.14) 0px 1px 4px",
            ...getPriceTagStyles
          }}
        >
          Rs. {item?.price}
        </Box>
      </Card>
    </>
  );
};
