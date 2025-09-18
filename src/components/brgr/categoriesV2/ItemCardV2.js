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
import { getScreenSizeCategory } from "../../../utils/fontsize";


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
    
    const getCardStyles = {
        backgroundColor:
          styles?.AllCategoriesItemCardBackgroundColorV2?.value !== ""
            ? styles?.AllCategoriesItemCardBackgroundColorV2?.value
            : globalComponentStyles?.Button?.color?.value !== ""
              ? globalComponentStyles?.Button?.color?.value
              : themeColors?.AllCategoriesItemCardBackgroundColorV2?.value,
        borderRadius:
          styles?.AllCategoriesItemCardBorderRadiusV2?.value !== ""
            ? `${styles?.AllCategoriesItemCardBorderRadiusV2?.value}px`
            : `${themeColors?.AllCategoriesItemCardBorderRadiusV2?.value}px`,
       
      };

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


    const getItemDescriptionStyles = {
        color:
            styles?.AllCategoriesItemDescriptionTextColorV2?.value !== ""
                ? styles?.AllCategoriesItemDescriptionTextColorV2?.value
                : globalComponentStyles?.Text?.color?.value !== ""
                    ? globalComponentStyles?.Text?.color?.value
                    : themeColors?.AllCategoriesItemDescriptionTextColorV2?.value,
        fontWeight:
            styles?.AllCategoriesItemDescriptionTextWeightV2?.value != ""
                ? styles?.AllCategoriesItemDescriptionTextWeightV2?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value :
                    themeColors?.AllCategoriesItemDescriptionTextWeightV2?.value,
        fontSize:
            styles?.AllCategoriesItemDescriptionTextSizeV2?.value[getScreenSizeCategory()] != 0
                ? styles?.AllCategoriesItemDescriptionTextSizeV2?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.AllCategoriesItemDescriptionTextSizeV2?.value[getScreenSizeCategory()],

        fontFamily:
            styles?.AllCategoriesItemDescriptionTextFontV2?.value !== ""
                ? styles?.AllCategoriesItemDescriptionTextFontV2?.value
                : globalComponentStyles?.Text?.fontFamily?.value !== ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : themeColors?.AllCategoriesItemDescriptionTextFontV2?.value,

        fontStyle:
            styles?.AllCategoriesItemDescriptionTextStyleV2?.value !== ""
                ? styles?.AllCategoriesItemDescriptionTextStyleV2?.value
                : globalComponentStyles?.Text?.fontStyle?.value !== ""
                    ? globalComponentStyles?.Text?.fontStyle?.value
                    : themeColors?.AllCategoriesItemDescriptionTextStyleV2?.value,
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
            ? `${styles?.AllCategoriesPriceTagBorderRadiusV2?.value}px`
            : `${themeColors?.AllCategoriesPriceTagBorderRadiusV2?.value}px`,

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
            ? `${styles?.AllCategoriesCartAddBorderRadiusV2?.value}px`
            : `${themeColors?.AllCategoriesCartAddBorderRadiusV2?.value}px`,

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
                image={item?.photoURL ? `${states?.storeImagesBaseUrl}/${item?.photoURL}` : "/assets/placeholder.png"}
                alt={item?.name}
                sx={{
                    objectFit: "fill",
                    width:
                        styles?.AllCategoriesItemImageHeightV2?.value != ""
                            ? styles?.AllCategoriesItemImageHeightV2?.value
                            : globalComponentStyles?.LogoImage?.size?.value != ""
                                ? globalComponentStyles?.LogoImage?.size?.value
                                : themeColors?.AllCategoriesItemImageHeightV2?.value,
                    height:
                        styles?.AllCategoriesItemImageHeightV2?.value != ""
                            ? styles?.AllCategoriesItemImageHeightV2?.value
                            : globalComponentStyles?.LogoImage?.size?.value != ""
                                ? globalComponentStyles?.LogoImage?.size?.value
                                : themeColors?.AllCategoriesItemImageHeightV2?.value,
                    borderRadius:
                        styles?.AllCategoriesItemImageBorderRadiusV2?.value != ""
                            ? `${styles?.AllCategoriesItemImageBorderRadiusV2?.value}px`
                            : `${themeColors?.AllCategoriesItemImageBorderRadiusV2?.value}px`,
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
                            "&:hover": { backgroundColor: styles?.AllCategoriesCartAddHoverColorV2?.value },
                            marginTop: '5px',
                            ...getCartAddButtonStyles
                        }}
                        // onClick={() => {
                        //     actions.handleOpenCard();
                        //     states.setItemForDetailedModal(item);
                        // }}
                    >
                        Add To Cart
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};
