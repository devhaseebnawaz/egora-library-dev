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

  const getItemDescriptionStyles = {
    color:
      styles?.PopularMenuSectionItemDescriptionTextColorV2?.value !== ""
        ? styles?.PopularMenuSectionItemDescriptionTextColorV2?.value
        : globalComponentStyles?.Text?.color?.value !== ""
          ? globalComponentStyles?.Text?.color?.value
          : themeColors?.PopularMenuSectionItemDescriptionTextColorV2?.value,
    fontWeight:
      styles?.PopularMenuSectionItemDescriptionTextWeightV2?.value != ""
        ? styles?.PopularMenuSectionItemDescriptionTextWeightV2?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value :
          themeColors?.PopularMenuSectionItemDescriptionTextWeightV2?.value,
    fontSize:
      styles?.PopularMenuSectionItemDescriptionTextSizeV2?.value[getScreenSizeCategory()] != 0
        ? styles?.PopularMenuSectionItemDescriptionTextSizeV2?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.PopularMenuSectionItemDescriptionTextSizeV2?.value[getScreenSizeCategory()],

    fontFamily:
      styles?.PopularMenuSectionItemDescriptionTextFontV2?.value !== ""
        ? styles?.PopularMenuSectionItemDescriptionTextFontV2?.value
        : globalComponentStyles?.Text?.fontFamily?.value !== ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.PopularMenuSectionItemDescriptionTextFontV2?.value,

    fontStyle:
      styles?.PopularMenuSectionItemDescriptionTextStyleV2?.value !== ""
        ? styles?.PopularMenuSectionItemDescriptionTextStyleV2?.value
        : globalComponentStyles?.Text?.fontWeight?.value !== ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.PopularMenuSectionItemDescriptionTextStyleV2?.value,
  };


  console.log("getItemNameStyles getItemNameStyles", themeColors)
  const getPriceTagStyles = {
    color:
      styles?.PopularMenuSectionPriceTagTextColorV2?.value !== ""
        ? styles?.PopularMenuSectionPriceTagTextColorV2?.value
        : globalComponentStyles?.Text?.color?.value !== ""
          ? globalComponentStyles?.Text?.color?.value
          : themeColors?.PopularMenuSectionPriceTagTextColorV2?.value,
    fontWeight:
      styles?.PopularMenuSectionPriceTagTextWeightV2?.value != ""
        ? styles?.PopularMenuSectionPriceTagTextWeightV2?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value :
          themeColors?.PopularMenuSectionPriceTagTextWeightV2?.value,
    fontSize:
      styles?.PopularMenuSectionPriceTagTextSizeV2?.value[getScreenSizeCategory()] != 0
        ? styles?.PopularMenuSectionPriceTagTextSizeV2?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.PopularMenuSectionPriceTagTextSizeV2?.value[getScreenSizeCategory()],

    fontFamily:
      styles?.PopularMenuSectionPriceTagTextFontV2?.value !== ""
        ? styles?.PopularMenuSectionPriceTagTextFontV2?.value
        : globalComponentStyles?.Text?.fontFamily?.value !== ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.PopularMenuSectionPriceTagTextFontV2?.value,

    fontStyle:
      styles?.PopularMenuSectionPriceTagTextStyleV2?.value !== ""
        ? styles?.PopularMenuSectionPriceTagTextStyleV2?.value
        : globalComponentStyles?.Text?.fontWeight?.value !== ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.PopularMenuSectionPriceTagTextStyleV2?.value
  };



  const getAddToCartButtontyles = {
    backgroundColor:
      styles?.PopularMenuSectionCartAddBackgroundcolorV2?.value !== ""
        ? styles?.PopularMenuSectionCartAddBackgroundcolorV2?.value
        : globalComponentStyles?.Button?.color?.value !== ""
          ? globalComponentStyles?.Button?.color?.value
          : themeColors?.PopularMenuSectionCartAddBackgroundcolorV2?.value,
    borderRadius:
      styles?.PopularMenuSectionCartAddBorderRadiusV2?.value !== ""
        ? `${styles?.PopularMenuSectionCartAddBorderRadiusV2?.value}%`
        : `${themeColors?.PopularMenuSectionCartAddBorderRadiusV2?.value}%`,
    color:
      styles?.PopularMenuSectionCartAddTextColorV2?.value !== ""
        ? styles?.PopularMenuSectionCartAddTextColorV2?.value
        : globalComponentStyles?.Text?.color?.value !== ""
          ? globalComponentStyles?.Text?.color?.value
          : themeColors?.PopularMenuSectionCartAddTextColorV2?.value,
    fontWeight:
      styles?.PopularMenuSectionCartAddTextWeightV2?.value != ""
        ? styles?.PopularMenuSectionCartAddTextWeightV2?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value :
          themeColors?.PopularMenuSectionCartAddTextWeightV2?.value,
    fontSize:
      styles?.PopularMenuSectionCartAddTextSizeV2?.value[getScreenSizeCategory()] != 0
        ? styles?.PopularMenuSectionCartAddTextSizeV2?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.PopularMenuSectionCartAddTextSizeV2?.value[getScreenSizeCategory()],

    fontFamily:
      styles?.PopularMenuSectionCartAddTextFontV2?.value !== ""
        ? styles?.PopularMenuSectionCartAddTextFontV2?.value
        : globalComponentStyles?.Text?.fontFamily?.value !== ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.PopularMenuSectionCartAddTextFontV2?.value,

    fontStyle:
      styles?.PopularMenuSectionCartAddTagTextStyleV2?.value !== ""
        ? styles?.PopularMenuSectionCartAddTagTextStyleV2?.value
        : globalComponentStyles?.Text?.fontWeight?.value !== ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.PopularMenuSectionCartAddTagTextStyleV2?.value,
  };

  const getCardStyles = {
    backgroundColor:
      styles?.PopularMenuSectionItemCardBackgroundColorV2?.value !== ""
        ? styles?.PopularMenuSectionItemCardBackgroundColorV2?.value
        : globalComponentStyles?.Button?.color?.value !== ""
          ? globalComponentStyles?.Button?.color?.value
          : themeColors?.PopularMenuSectionItemCardBackgroundColorV2?.value,
    borderRadius:
      styles?.PopularMenuSectionItemCardBorderRadiusV2?.value !== ""
        ? `${styles?.PopularMenuSectionItemCardBorderRadiusV2?.value}%`
        : `${themeColors?.PopularMenuSectionItemCardBorderRadiusV2?.value}%`,
   
  };

  return (
    <Card
      sx={{
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-start",
        width: "100%",
        maxWidth: 400,
        ...getCardStyles
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
          
          objectFit: "cover",
          m: 1,
          width: 
            styles?.PopularMenuSectionImageHeightV2?.value != ""
              ? styles?.PopularMenuSectionImageHeightV2?.value
              : globalComponentStyles?.LogoImage?.size?.value != ""
                ? globalComponentStyles?.LogoImage?.size?.value
                : themeColors?.PopularMenuSectionImageHeightV2?.value,
          height: 
            styles?.PopularMenuSectionImageHeightV2?.value != ""
              ? styles?.PopularMenuSectionImageHeightV2?.value
              : globalComponentStyles?.LogoImage?.size?.value != ""
                ? globalComponentStyles?.LogoImage?.size?.value
                : themeColors?.PopularMenuSectionImageHeightV2?.value,
          borderRadius:
            styles?.PopularMenuSectionImageBorderRadiusV2?.value != ""
              ? styles?.PopularMenuSectionImageBorderRadiusV2?.value
                : themeColors?.PopularMenuSectionImageBorderRadiusV2?.value,
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
            mb: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            ...getItemDescriptionStyles
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
              textTransform: "none",
              "&:hover": { backgroundColor: styles?.PopularMenuSectionCartAddHovercolorV2?.value },
              ...getAddToCartButtontyles
            }}
          >
            Add To Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
