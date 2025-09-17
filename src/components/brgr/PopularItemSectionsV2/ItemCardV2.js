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
import { getScreenSizeCategory } from "../../../utils/fontsize";

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
        ? `${styles?.PopularMenuSectionCartAddBorderRadiusV2?.value}px`
        : `${themeColors?.PopularMenuSectionCartAddBorderRadiusV2?.value}px`,
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
        ? `${styles?.PopularMenuSectionItemCardBorderRadiusV2?.value}px`
        : `${themeColors?.PopularMenuSectionItemCardBorderRadiusV2?.value}px`,
   
  };

  return (
    <Card
      sx={{
        borderRadius: "12px",
        boxShadow: '0 0 1.25rem .2rem rgb(0 0 0 / 5%)',
        cursor: "pointer",
        display: "flex",
        gap: '10px',
        p: 1.2,
        ...getCardStyles,
        height: 170,
      }}
      onClick={() => {
        actions.handleOpenCard();
        states.setItemForDetailedModal(item);
      }}
    >
      <CardMedia
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
          objectFit: "fill",
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
              ? `${styles?.PopularMenuSectionImageBorderRadiusV2?.value}px`
              : `${themeColors?.PopularMenuSectionImageBorderRadiusV2?.value}px`,
        }}
      />

      <CardContent sx={{ flex: 1, pl: 0, pt: 0, pr: 0, pb: "0 !important", display: "flex", flexDirection: "column" }}>
        <Typography
          variant="subtitle1"
          sx={{
            ...getItemNameStyles,
            mb: 0.2,
            display: "-webkit-box",
            margin: 0,
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: 'ellipsis',
          }}
        >
          {item?.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            ...getItemDescriptionStyles,
            mb: .2,
            display: "-webkit-box",
            margin: 0,
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item?.description || ""}
        </Typography>

        <Box
          sx={{
            mt: "auto",
            display: "flex",
            flexDirection: 'column',
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <Typography
            variant="subtitle"
            sx={{
              px: 1,
              py: 0.3,
              ...getPriceTagStyles
            }}
          >
            Rs. {item.price}
          </Typography>
          <Button
            variant="contained"
            disableElevation
            sx={{
              textTransform: "none",
              marginTop: '5px',
              "&:hover": { backgroundColor: styles?.PopularMenuSectionCartAddHovercolorV2?.value },
              ...getAddToCartButtontyles
            }}
            onClick={() => {
              actions.handleOpenCard();
              states.setItemForDetailedModal(item);
            }}
          >
            Add To Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
