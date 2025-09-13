import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { getScreenSizeCategory } from "src/components/brgr/utils/fontsize";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function ItemCardV2({ item, themeColors, styles, actions, states, globalComponentStyles }) {
  const theme = useTheme();
  const getItemNameStyles = {
    backgroundColor:
      styles?.PopularMenuSectionItemNameTextBackgroundColorV2?.value !== ""
        ? styles?.PopularMenuSectionItemNameTextBackgroundColorV2?.value
        : globalComponentStyles?.Text?.color?.value !== ""
          ? globalComponentStyles?.Text?.color?.value
          : themeColors?.PopularMenuSectionItemNameTextBackgroundColorV2?.value,
    borderRadius:
      styles?.PopularMenuSectionItemNameBorderRadiusV2?.value !== ""
        ? `${styles?.PopularMenuSectionItemNameBorderRadiusV2?.value}%`
        : `${themeColors?.PopularMenuSectionItemNameBorderRadiusV2?.value}%`,
    color:
      styles?.PopularMenuSectionItemNameTextColorV2?.value !== ""
        ? styles?.PopularMenuSectionItemNameTextColorV2?.value
        : globalComponentStyles?.Text?.color?.value !== ""
          ? globalComponentStyles?.Text?.color?.value
          : themeColors?.PopularMenuSectionItemNameTextColorV2?.value,
    fontWeight:
      styles?.PopularMenuSectionItemNameTextWeightV2?.value != ""
        ? styles?.PopularMenuSectionItemNameTextWeightV2?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value :
          themeColors?.PopularMenuSectionItemNameTextWeightV2?.value,
    fontSize:
      styles?.PopularMenuSectionItemNameTextSizeV2?.value[getScreenSizeCategory()] != 0
        ? styles?.PopularMenuSectionItemNameTextSizeV2?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.PopularMenuSectionItemNameTextSizeV2?.value[getScreenSizeCategory()],

    fontFamily:
      styles?.PopularMenuSectionItemNameTextFontV2?.value !== ""
        ? styles?.PopularMenuSectionItemNameTextFontV2?.value
        : globalComponentStyles?.Text?.fontFamily?.value !== ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.PopularMenuSectionItemNameTextFontV2?.value,

    fontStyle:
      styles?.PopularMenuSectionItemNameTextStyleV2?.value !== ""
        ? styles?.PopularMenuSectionItemNameTextStyleV2?.value
        : globalComponentStyles?.Text?.fontWeight?.value !== ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.PopularMenuSectionItemNameTextStyleV2?.value,
  };

  console.log("getItemNameStyles getItemNameStyles", themeColors)
  const getPriceTagStyles = {
    color:
      styles?.PopularMenuSectionPriceTextColorV2?.value !== ""
        ? styles?.PopularMenuSectionPriceTextColorV2?.value
        : globalComponentStyles?.Text?.color?.value !== ""
          ? globalComponentStyles?.Text?.color?.value
          : themeColors?.PopularMenuSectionPriceTextColorV2?.value,
    fontWeight:
      styles?.PopularMenuSectionPriceTextWeightV2?.value != ""
        ? styles?.PopularMenuSectionPriceTextWeightV2?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value :
          themeColors?.PopularMenuSectionPriceTextWeightV2?.value,
    fontSize:
      styles?.PopularMenuSectionPriceTextSizeV2?.value[getScreenSizeCategory()] != 0
        ? styles?.PopularMenuSectionPriceTextSizeV2?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.PopularMenuSectionPriceTextSizeV2?.value[getScreenSizeCategory()],

    fontFamily:
      styles?.PopularMenuSectionPriceTextFontV2?.value !== ""
        ? styles?.PopularMenuSectionPriceTextFontV2?.value
        : globalComponentStyles?.Text?.fontFamily?.value !== ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.PopularMenuSectionPriceTextFontV2?.value,

    fontStyle:
      styles?.PopularMenuSectionPriceTextStyleV2?.value !== ""
        ? styles?.PopularMenuSectionPriceTextStyleV2?.value
        : globalComponentStyles?.Text?.fontWeight?.value !== ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.PopularMenuSectionPriceTextStyleV2?.value,

    borderRadius: styles?.PopularMenuSectionPriceBorderRadiusV2?.value !== ""
      ? styles?.PopularMenuSectionPriceBorderRadiusV2?.value
      : themeColors?.PopularMenuSectionPriceBorderRadiusV2?.value,

    backgroundColor: styles?.PopularMenuSectionPriceBackgroundcolorV2?.value !== ""
      ? styles?.PopularMenuSectionPriceBackgroundcolorV2?.value
      : globalComponentStyles?.Text?.backgroundColor?.value !== ""
        ? globalComponentStyles?.Text?.backgroundColor?.value
        : themeColors?.PopularMenuSectionPriceBackgroundcolorV2?.value,
  };

  return (
    <Card
      sx={{
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-start",
        width: "100%",
        maxWidth: 400,
      }}
    >
      <CardMedia
        component="img"
        // image="/assets/placeholder.png"
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
          width: 150,
          height: 150,
          objectFit: "cover",
          borderRadius: "8px",
          m: 1,
        }}
      />

      <CardContent sx={{ flex: 1, pl: 1, pr: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 0.5,
            ...getItemNameStyles,
          }}
        >
          {item?.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minHeight: "40px",
          }}
        >
          {item?.description || ""}
        </Typography>

        <Box sx={{ mb: 1 }}>
          <Typography
            variant="body2"
            sx={{
              px: 1,
              py: 0.3,
              display: "inline-block",
              ...getPriceTagStyles
            }}
          >
            Rs. {item?.price}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Button
            variant="contained"
            disableElevation
            sx={{
              backgroundColor: "#ffcc00",
              color: "black",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": { backgroundColor: "#e6b800" },
            }}
          >
            Add To Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
