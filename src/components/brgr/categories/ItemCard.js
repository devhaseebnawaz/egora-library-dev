"use state";
import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  useMediaQuery
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { getFontSize, getScreenSizeCategory } from "../../../utils/fontsize";



export default function ItemCard({
  item,
  actions,
  states,
  styles,
  themeColors,
  globalComponentStyles,
}) {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const getItemNameStyles = {
    color:
      styles?.AllCategoriesItemNameTextColor?.value !== ""
        ? styles?.AllCategoriesItemNameTextColor?.value
        : globalComponentStyles?.Text?.color?.value !== ""
          ? globalComponentStyles?.Text?.color?.value
          : themeColors?.AllCategoriesItemNameTextColor?.value,
    fontWeight:
      styles?.AllCategoriesItemNameTextWeight?.value != ""
        ? styles?.AllCategoriesItemNameTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value :
          themeColors?.AllCategoriesItemNameTextWeight?.value,
    fontSize:
      styles?.AllCategoriesItemNameTextSize?.value[getScreenSizeCategory()] != 0
        ? styles?.AllCategoriesItemNameTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.AllCategoriesItemNameTextSize?.value[getScreenSizeCategory()],

    fontFamily:
      styles?.AllCategoriesItemNameTextFont?.value !== ""
        ? styles?.AllCategoriesItemNameTextFont?.value
        : globalComponentStyles?.Text?.fontFamily?.value !== ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.AllCategoriesItemNameTextFont?.value,

    fontStyle:
      styles?.AllCategoriesItemNameTextStyle?.value !== ""
        ? styles?.AllCategoriesItemNameTextStyle?.value
        : globalComponentStyles?.Text?.fontStyle?.value !== ""
          ? globalComponentStyles?.Text?.fontStyle?.value
          : themeColors?.AllCategoriesItemNameTextStyle?.value,
  };

  const getPriceTagStyles = {
    color:
      styles?.AllCategoriesPriceTagTextColor?.value !== ""
        ? styles?.AllCategoriesPriceTagTextColor?.value
        : globalComponentStyles?.Text?.color?.value !== ""
          ? globalComponentStyles?.Text?.color?.value
          : themeColors?.AllCategoriesPriceTagTextColor?.value,
    fontWeight:
      styles?.AllCategoriesPriceTagTextWeight?.value != ""
        ? styles?.AllCategoriesPriceTagTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value :
          themeColors?.AllCategoriesPriceTagTextWeight?.value,
    fontSize:
      styles?.AllCategoriesPriceTagTextSize?.value[getScreenSizeCategory()] != 0
        ? styles?.AllCategoriesPriceTagTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.AllCategoriesPriceTagTextSize?.value[getScreenSizeCategory()],
    fontFamily:
      styles?.AllCategoriesPriceTagTextFont?.value !== ""
        ? styles?.AllCategoriesPriceTagTextFont?.value
        : globalComponentStyles?.Text?.fontFamily?.value !== ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.AllCategoriesPriceTagTextFont?.value,

    fontStyle:
      styles?.AllCategoriesPriceTagTextStyle?.value !== ""
        ? styles?.AllCategoriesPriceTagTextStyle?.value
        : globalComponentStyles?.Text?.fontStyle?.value !== ""
          ? globalComponentStyles?.Text?.fontStyle?.value
          : themeColors?.AllCategoriesPriceTagTextStyle?.value,

    borderRadius: styles?.AllCategoriesPriceTagBorderRadius?.value !== ""
      ? `${styles?.AllCategoriesPriceTagBorderRadius?.value}px`
      : `${themeColors?.AllCategoriesPriceTagBorderRadius?.value}px`,

    backgroundColor: styles?.AllCategoriesPriceTagTextBackgroundcolor?.value !== ""
      ? styles?.AllCategoriesPriceTagTextBackgroundcolor?.value
      : globalComponentStyles?.Text?.backgroundColor?.value !== ""
        ? globalComponentStyles?.Text?.backgroundColor?.value
        : themeColors?.AllCategoriesPriceTagTextBackgroundcolor?.value,
  };


  const getCartAddButtonStyles = {
    color:
      styles?.AllCategoriesCartAddTextColor?.value !== ""
        ? styles?.AllCategoriesCartAddTextColor?.value
        : globalComponentStyles?.Button?.color?.value !== ""
          ? globalComponentStyles?.Button?.color?.value
          : themeColors?.AllCategoriesCartAddTextColor?.value,
    fontWeight:
      styles?.AllCategoriesCartAddTextWeight?.value != ""
        ? styles?.AllCategoriesCartAddTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value :
          themeColors?.AllCategoriesCartAddTextWeight?.value,
    fontSize:
      styles?.AllCategoriesCartAddTextSize?.value[getScreenSizeCategory()] != 0
        ? styles?.AllCategoriesCartAddTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Button?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Button?.size?.value[getScreenSizeCategory()]
          : themeColors?.AllCategoriesPriceTagTextSize?.value[getScreenSizeCategory()],

    fontFamily:
      styles?.AllCategoriesCartAddTextFont?.value !== ""
        ? styles?.AllCategoriesCartAddTextFont?.value
        : globalComponentStyles?.Button?.fontFamily?.value !== ""
          ? globalComponentStyles?.Button?.fontFamily?.value
          : themeColors?.AllCategoriesCartAddTextFont?.value,

    fontStyle:
      styles?.AllCategoriesCartAddTagTextStyle?.value !== ""
        ? styles?.AllCategoriesCartAddTagTextStyle?.value
        : globalComponentStyles?.Button?.fontStyle?.value !== ""
          ? globalComponentStyles?.Button?.fontStyle?.value
          : themeColors?.AllCategoriesCartAddTagTextStyle?.value,

    borderRadius: styles?.AllCategoriesCartAddBorderRadius?.value !== ""
      ? `${styles?.AllCategoriesCartAddBorderRadius?.value}px`
      : `${themeColors?.AllCategoriesCartAddBorderRadius?.value}px`,

    backgroundColor: styles?.AllCategoriesCartAddBackgroundcolor?.value !== ""
      ? styles?.AllCategoriesCartAddBackgroundcolor?.value
      : globalComponentStyles?.Button?.backgroundColor?.value !== ""
        ? globalComponentStyles?.Button?.backgroundColor?.value
        : themeColors?.AllCategoriesCartAddBackgroundcolor?.value,
  };
  return (
    <>
      <Card
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          padding: 0,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.03)",
            boxShadow: "0 12px 32px rgba(0, 0, 0, 0.2)",
          },
        }}
        onClick={() => {
          actions.handleOpenCard();
          states.setItemForDetailedModal(item);
        }}
      >
        <CardMedia
          component="img"
          image={
            item?.photoURL
              ? `${states.storeImagesBaseUrl}/${item.photoURL}`
              : "/assets/placeholder.png"
          }
          alt={item.name}
          style={{ height: smDown ? "150px" : "250px", objectFit: smDown ? "cover" : "fill" }}
        />

        <CardContent
          sx={{
            textAlign: "center",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding:smDown ? '12px':'24px',
            paddingBottom: smDown ? '12px !important':'24px !important', 
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                display: "-webkit-box",
                WebkitLineClamp: 2,   // max 2 lines
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                minHeight: smDown ? "2em" :  "3em",    // ensure height same even if text short
                ...getItemNameStyles
              }}
            >
              {item.name}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#555",
                marginBottom: "16px",
                display: "-webkit-box",
                WebkitLineClamp: 2,   // max 2 lines for description also
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                minHeight: smDown ? "2em" :  "3em",     // fix height for uniformity
              }}
            >
              {item.description}
            </Typography>
          </Box>

          <Box>
            <Box sx={{ marginBottom: "16px" }}>
              <Button
                disableRipple
                sx={{
                  padding: "4px 16px",
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": {
                    ...getPriceTagStyles,
                    boxShadow: "none"
                  },
                  ...getPriceTagStyles,
                }}
              >
                Rs. {item.price}
              </Button>
            </Box>

            <Button
              disableRipple
              disableElevation
              variant="contained"
              sx={{
                padding: "8px 32px",
                fontWeight: "bold",
                textTransform: "none",
                ...getCartAddButtonStyles,
                "&:hover": {
                  boxShadow: "none",
                  ...getCartAddButtonStyles,
                },
              }}
            >
              Add
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* <ItemDetailModal
        key={`categoryItem${item}`}
        open={states.openCard}
        onClose={actions.handleOpenCard}
        item={item}
        selectedQty={selectedQty}
        setSelectedQty={setSelectedQty}
        instructions={instructions}
        setInstructions={setInstructions}
        actions={actions}
        states={states}
      /> */}
    </>
  );
}
