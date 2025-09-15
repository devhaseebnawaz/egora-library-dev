import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, Container, useMediaQuery } from "@mui/material";
import ItemCardV2 from "./ItemCardV2";
import ItemDetailModal from "../categories/ItemDetailModal";
import { useTheme } from '@mui/material/styles';
import { getFontSize, getScreenSizeCategory } from "../../../utils/fontsize";

export default function PopularMenuSectionV2({ prop, actions, styles, states, themeColors, globalComponentStyles }) {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const displayItems = prop?.static?.displayitems || [];
  const [products, setProducts] = useState(displayItems);
  const { query } = states ?? {};

  useEffect(() => {
    if (query && query.trim() !== "") {
      const filtered = displayItems.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(filtered);
    } else {
      setProducts(displayItems);
    }
  }, [query, displayItems]);

  return (
    <Container 
    style={{
       padding: "10px",
       marginTop: "30px", 
       backgroundColor:
       styles?.PopularMenuSectionBackgroundColorV2?.value != ""
         ? styles?.PopularMenuSectionBackgroundColorV2?.value
         : globalComponentStyles?.Background?.color?.value != ""
           ? globalComponentStyles?.Background?.color?.value
           : themeColors?.PopularMenuSectionBackgroundColorV2?.value,
     }}>
      <Box mb={4} mt={4}>
        <Typography
          variant="h4"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontWeight:
              styles?.PopularMenuSectionHeadingTextWeightV2?.value != ""
                ? styles?.PopularMenuSectionHeadingTextWeightV2?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                  ? globalComponentStyles?.Text?.fontWeight?.value :
                  themeColors?.PopularMenuSectionHeadingTextWeightV2?.value,
            color: styles?.PopularMenuSectionHeadingTextColorV2?.value != ""
              ? styles?.PopularMenuSectionHeadingTextColorV2?.value
              : globalComponentStyles?.Text?.color?.value != ""
                ? globalComponentStyles?.Text?.color?.value :
                themeColors?.PopularMenuSectionHeadingTextColorV2?.value,

            fontSize: styles?.PopularMenuSectionHeadingTextSizeV2?.value[getScreenSizeCategory()] != 0
              ? styles?.PopularMenuSectionHeadingTextSizeV2?.value[getScreenSizeCategory()]
              : globalComponentStyles?.Text?.size?.value != [getScreenSizeCategory()]
                ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] :
                themeColors?.PopularMenuSectionHeadingTextSizeV2?.value[getScreenSizeCategory()],

            fontFamily: styles?.PopularMenuSectionHeadingTextFontV2?.value != ""
              ? styles?.PopularMenuSectionHeadingTextFontV2?.value
              : globalComponentStyles?.Text?.fontFamily?.value != ""
                ? globalComponentStyles?.Text?.fontFamily?.value :
                themeColors?.PopularMenuSectionHeadingTextFontV2?.value,

            fontStyle: styles?.PopularMenuSectionHeadingTextStyleV2?.value != ""
              ? styles?.PopularMenuSectionHeadingTextStyleV2?.value
              : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value :
                themeColors?.PopularMenuSectionHeadingTextStyleV2?.value,

          }}
        >
          {prop?.editable?.title?.value}
        </Typography>
        <Typography variant="subtitle1" style={{
          fontWeight:
            styles?.PopularMenuSectionDescriptionTextWeightV2?.value != ""
              ? styles?.PopularMenuSectionDescriptionTextWeightV2?.value
              : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value :
                themeColors?.PopularMenuSectionDescriptionTextWeightV2?.value,

          color: styles?.PopularMenuSectionDescriptionTextColorV2?.value != ""
            ? styles?.PopularMenuSectionDescriptionTextColorV2?.value
            : globalComponentStyles?.Text?.color?.value != ""
              ? globalComponentStyles?.Text?.color?.value :
              themeColors?.PopularMenuSectionDescriptionTextColorV2?.value,

          fontSize: styles?.PopularMenuSectionDescriptionTextSizeV2?.value[getScreenSizeCategory()] != 0
            ? styles?.PopularMenuSectionDescriptionTextSizeV2?.value[getScreenSizeCategory()]
            : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
              ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] :
              themeColors?.PopularMenuSectionDescriptionTextSizeV2?.value[getScreenSizeCategory()],

          fontFamily: styles?.PopularMenuSectionDescriptionTextFontV2?.value != ""
            ? styles?.PopularMenuSectionDescriptionTextFontV2?.value
            : globalComponentStyles?.Text?.fontFamily?.value != ""
              ? globalComponentStyles?.Text?.fontFamily?.value :
              themeColors?.PopularMenuSectionDescriptionTextFontV2?.value,

          fontStyle: styles?.PopularMenuSectionDescriptionTextStyleV2?.value != ""
            ? styles?.PopularMenuSectionDescriptionTextStyleV2?.value
            : globalComponentStyles?.Text?.fontWeight?.value != ""
              ? globalComponentStyles?.Text?.fontWeight?.value :
              themeColors?.PopularMenuSectionDescriptionTextStyleV2?.value,

        }}>
          {prop?.editable?.description?.value}
        </Typography>
      </Box>

      {products.length === 0 ? (
        <Typography
          variant="body1"
          style={{
            textAlign: "center", marginTop: 40,
            fontWeight:
              styles?.PopularMenuSectionDescriptionTextWeightV2?.value != ""
                ? styles?.PopularMenuSectionDescriptionTextWeightV2?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                  ? globalComponentStyles?.Text?.fontWeight?.value :
                  themeColors?.PopularMenuSectionDescriptionTextWeightV2?.value,

            color: styles?.PopularMenuSectionDescriptionTextColorV2?.value != ""
              ? styles?.PopularMenuSectionDescriptionTextColorV2?.value
              : globalComponentStyles?.Text?.color?.value != ""
                ? globalComponentStyles?.Text?.color?.value :
                themeColors?.PopularMenuSectionDescriptionTextColorV2?.value,

            fontSize: styles?.PopularMenuSectionDescriptionTextSizeV2?.value[getScreenSizeCategory()] != 0
              ? styles?.PopularMenuSectionDescriptionTextSizeV2?.value[getScreenSizeCategory()]
              : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] :
                themeColors?.PopularMenuSectionDescriptionTextSizeV2?.value[getScreenSizeCategory()],

            fontFamily: styles?.PopularMenuSectionDescriptionTextFontV2?.value != ""
              ? styles?.PopularMenuSectionDescriptionTextFontV2?.value
              : globalComponentStyles?.Text?.fontFamily?.value != ""
                ? globalComponentStyles?.Text?.fontFamily?.value :
                themeColors?.PopularMenuSectionDescriptionTextFontV2?.value,

            fontStyle: styles?.PopularMenuSectionDescriptionTextStyleV2?.value != ""
              ? styles?.PopularMenuSectionDescriptionTextStyleV2?.value
              : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value :
                themeColors?.PopularMenuSectionDescriptionTextStyleV2?.value,
          }}
        >
          No items found.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {products?.map((item, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={6}
              md={4}
            >
              <ItemCardV2
                key={index}
                item={item}
                actions={actions}
                styles={styles}
                states={states}
                globalComponentStyles={globalComponentStyles}
                themeColors={themeColors}  
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
