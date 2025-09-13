import React from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Button,
    Chip,
    IconButton,
    useMediaQuery
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { getScreenSizeCategory } from "src/components/brgr/utils/fontsize";


export default function ItemCardV2({
    key,
    globalComponentStyles,
    themeColors,
    styles,
    item,
    actions,
    states
}) {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down("sm"));
    const getItemNameStyles = {
        color:
            styles?.AllCategoriesItemNameTextColorV2?.value !== ""
                ? styles?.AllCategoriesItemNameTextColorV2?.value
                : globalComponentStyles?.Text?.color?.value !== ""
                    ? globalComponentStyles?.Text?.color?.value
                    : themeColors?.AllCategoriesItemNameTextColorV2?.value,
        fontWeight:
            styles?.AllCategoriesItemNameTextWeightV2?.value != ""
                ? styles?.AllCategoriesItemNameTextWeightV2?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value :
                    themeColors?.AllCategoriesItemNameTextWeightV2?.value,
        fontSize:
            styles?.AllCategoriesItemNameTextSizeV2?.value[getScreenSizeCategory()] != 0
                ? styles?.AllCategoriesItemNameTextSizeV2?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.AllCategoriesItemNameTextSizeV2?.value[getScreenSizeCategory()],

        fontFamily:
            styles?.AllCategoriesItemNameTextFontV2?.value !== ""
                ? styles?.AllCategoriesItemNameTextFontV2?.value
                : globalComponentStyles?.Text?.fontFamily?.value !== ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : themeColors?.AllCategoriesItemNameTextFontV2?.value,

        fontStyle:
            styles?.AllCategoriesItemNameTextStyleV2?.value !== ""
                ? styles?.AllCategoriesItemNameTextStyleV2?.value
                : globalComponentStyles?.Text?.fontStyle?.value !== ""
                    ? globalComponentStyles?.Text?.fontStyle?.value
                    : themeColors?.AllCategoriesItemNameTextStyleV2?.value,
    };

    const getPriceTagStyles = {
        color:
            styles?.AllCategoriesPriceTagTextColorV2?.value !== ""
                ? styles?.AllCategoriesPriceTagTextColorV2?.value
                : globalComponentStyles?.Text?.color?.value !== ""
                    ? globalComponentStyles?.Text?.color?.value
                    : themeColors?.AllCategoriesPriceTagTextColorV2?.value,
        fontWeight:
            styles?.AllCategoriesPriceTagTextWeightV2?.value != ""
                ? styles?.AllCategoriesPriceTagTextWeightV2?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value :
                    themeColors?.AllCategoriesPriceTagTextWeightV2?.value,
        fontSize:
            styles?.AllCategoriesPriceTagTextSizeV2?.value[getScreenSizeCategory()] != 0
                ? styles?.AllCategoriesPriceTagTextSizeV2?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.AllCategoriesPriceTagTextSizeV2?.value[getScreenSizeCategory()],
        fontFamily:
            styles?.AllCategoriesPriceTagTextFontV2?.value !== ""
                ? styles?.AllCategoriesPriceTagTextFontV2?.value
                : globalComponentStyles?.Text?.fontFamily?.value !== ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : themeColors?.AllCategoriesPriceTagTextFontV2?.value,

        fontStyle:
            styles?.AllCategoriesPriceTagTextStyleV2?.value !== ""
                ? styles?.AllCategoriesPriceTagTextStyleV2?.value
                : globalComponentStyles?.Text?.fontStyle?.value !== ""
                    ? globalComponentStyles?.Text?.fontStyle?.value
                    : themeColors?.AllCategoriesPriceTagTextStyleV2?.value,

        borderRadius: styles?.AllCategoriesPriceTagBorderRadiusV2?.value !== ""
            ? styles?.AllCategoriesPriceTagBorderRadiusV2?.value
            : themeColors?.AllCategoriesPriceTagBorderRadiusV2?.value,

        backgroundColor: styles?.AllCategoriesPriceTagTextBackgroundcolorV2?.value !== ""
            ? styles?.AllCategoriesPriceTagTextBackgroundcolorV2?.value
            : globalComponentStyles?.Text?.backgroundColor?.value !== ""
                ? globalComponentStyles?.Text?.backgroundColor?.value
                : themeColors?.AllCategoriesPriceTagTextBackgroundcolorV2?.value,
    };


    const getCartAddButtonStyles = {
        color:
            styles?.AllCategoriesCartAddTextColorV2?.value !== ""
                ? styles?.AllCategoriesCartAddTextColorV2?.value
                : globalComponentStyles?.Button?.color?.value !== ""
                    ? globalComponentStyles?.Button?.color?.value
                    : themeColors?.AllCategoriesCartAddTextColorV2?.value,
        fontWeight:
            styles?.AllCategoriesCartAddTextWeightV2?.value != ""
                ? styles?.AllCategoriesCartAddTextWeightV2?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value :
                    themeColors?.AllCategoriesCartAddTextWeightV2?.value,
        fontSize:
            styles?.AllCategoriesCartAddTextSizeV2?.value[getScreenSizeCategory()] != 0
                ? styles?.AllCategoriesCartAddTextSizeV2?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Button?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Button?.size?.value[getScreenSizeCategory()]
                    : themeColors?.AllCategoriesPriceTagTextSize?.value[getScreenSizeCategory()],

        fontFamily:
            styles?.AllCategoriesCartAddTextFontV2?.value !== ""
                ? styles?.AllCategoriesCartAddTextFontV2?.value
                : globalComponentStyles?.Button?.fontFamily?.value !== ""
                    ? globalComponentStyles?.Button?.fontFamily?.value
                    : themeColors?.AllCategoriesCartAddTextFontV2?.value,

        fontStyle:
            styles?.AllCategoriesCartAddTagTextStyleV2?.value !== ""
                ? styles?.AllCategoriesCartAddTagTextStyleV2?.value
                : globalComponentStyles?.Button?.fontStyle?.value !== ""
                    ? globalComponentStyles?.Button?.fontStyle?.value
                    : themeColors?.AllCategoriesCartAddTagTextStyleV2?.value,

        borderRadius: styles?.AllCategoriesCartAddBorderRadiusV2?.value !== ""
            ? styles?.AllCategoriesCartAddBorderRadiusV2?.value
            : themeColors?.AllCategoriesCartAddBorderRadiusV2?.value,

        backgroundColor: styles?.AllCategoriesCartAddBackgroundcolorV2?.value !== ""
            ? styles?.AllCategoriesCartAddBackgroundcolorV2?.value
            : globalComponentStyles?.Button?.backgroundColor?.value !== ""
                ? globalComponentStyles?.Button?.backgroundColor?.value
                : themeColors?.AllCategoriesCartAddBackgroundcolorV2?.value,
    };

    return (
        <Card
            sx={{
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
                display: "flex",
                alignItems: "flex-start",
                p: 1,
            }}
        >
           

            <CardMedia
                component="img"
                image={
                    item?.photoURL
                        ? `${states?.storeImagesBaseUrl}/${item?.photoURL}`
                        : "/assets/placeholder.png"
                }
                alt={item?.name}
                sx={{
                    width: 150,
                    height: 150,
                    borderRadius: "8px",
                    objectFit: "cover",
                    m: 1
                }}
            />

            <CardContent sx={{ flex: 1, pl: 2, pt: 0, pb: "0 !important" }}>
                <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 0.5 }}
                >
                    {item?.name}
                </Typography>
                {/* <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold",
                         mb: 0.5,
                        minHeight: smDown ? "2em" : "3em",    // ensure height same even if text short
                        ...getItemNameStyles
                    }}
                >
                    {item?.name?item?.name:"Dummay"}
                </Typography> */}
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

                {/* Price */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            backgroundColor: "green",
                            color: "white",
                            fontWeight: "bold",
                            borderRadius: "4px",
                            px: 1,
                            py: 0.3,
                            fontSize: "0.9rem",
                        }}
                    >
                         Rs. {item.price}
                    </Typography>
                </Box>

                {/* Add to cart + Favorite */}
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
};
