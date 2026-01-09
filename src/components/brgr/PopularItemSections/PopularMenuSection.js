import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, Container ,useMediaQuery} from "@mui/material";
import ItemCard from "./ItemCard";
import ItemDetailModal from "../categories/ItemDetailModal";
import { useTheme } from '@mui/material/styles';
import { getFontSize, getScreenSizeCategory } from "../../../utils/fontsize";

export default function PopularMenuSection({ prop, actions, styles, states, themeColors, globalComponentStyles }) {
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
    <Container style={{ marginTop: "30px" }}>
      <Box mb={4} mt={4}>
        <Typography
          variant="h4"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontWeight:
              styles?.PopularMenuSectionHeadingTextWeight?.value != ""
                ? styles?.PopularMenuSectionHeadingTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                  ? globalComponentStyles?.Text?.fontWeight?.value :
                  themeColors?.PopularMenuSectionHeadingTextWeight?.value,
            color: styles?.PopularMenuSectionHeadingTextColor?.value != ""
              ? styles?.PopularMenuSectionHeadingTextColor?.value
              : globalComponentStyles?.Text?.color?.value != ""
                ? globalComponentStyles?.Text?.color?.value :
                themeColors?.PopularMenuSectionHeadingTextColor?.value,

            fontSize: styles?.PopularMenuSectionHeadingTextSize?.value[getScreenSizeCategory()] != 0
              ? styles?.PopularMenuSectionHeadingTextSize?.value[getScreenSizeCategory()]
              :  globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] !=0
                ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] :
                themeColors?.PopularMenuSectionHeadingTextSize?.value[getScreenSizeCategory()],

            fontFamily: styles?.PopularMenuSectionHeadingTextFont?.value != ""
              ? styles?.PopularMenuSectionHeadingTextFont?.value
              : globalComponentStyles?.Text?.fontFamily?.value != ""
                ? globalComponentStyles?.Text?.fontFamily?.value :
                themeColors?.PopularMenuSectionHeadingTextFont?.value,

            fontStyle: styles?.PopularMenuSectionHeadingTextStyle?.value != ""
              ? styles?.PopularMenuSectionHeadingTextStyle?.value
              : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value :
                themeColors?.PopularMenuSectionHeadingTextStyle?.value,
            backgroundImage: prop?.editable?.backgroundImage?.value.length > 0 ? `url(${prop?.editable?.backgroundImage?.value[0]})` : "none",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {prop?.editable?.title?.value}
        </Typography>
        <Typography variant="subtitle1" style={{
          fontWeight:
            styles?.PopularMenuSectionDescriptionTextWeight?.value != ""
              ? styles?.PopularMenuSectionDescriptionTextWeight?.value
              : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value :
                themeColors?.PopularMenuSectionDescriptionTextWeight?.value,

          color: styles?.PopularMenuSectionDescriptionTextColor?.value != ""
            ? styles?.PopularMenuSectionDescriptionTextColor?.value
            : globalComponentStyles?.Text?.color?.value != ""
              ? globalComponentStyles?.Text?.color?.value :
              themeColors?.PopularMenuSectionDescriptionTextColor?.value,

          fontSize: styles?.PopularMenuSectionDescriptionTextSize?.value[getScreenSizeCategory()] != 0
            ? styles?.PopularMenuSectionDescriptionTextSize?.value[getScreenSizeCategory()]
            : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
              ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] :
              themeColors?.PopularMenuSectionDescriptionTextSize?.value[getScreenSizeCategory()],

          fontFamily: styles?.PopularMenuSectionDescriptionTextFont?.value != ""
            ? styles?.PopularMenuSectionDescriptionTextFont?.value
            : globalComponentStyles?.Text?.fontFamily?.value != ""
              ? globalComponentStyles?.Text?.fontFamily?.value :
              themeColors?.PopularMenuSectionDescriptionTextFont?.value,

          fontStyle: styles?.PopularMenuSectionDescriptionTextStyle?.value != ""
            ? styles?.PopularMenuSectionDescriptionTextStyle?.value
            : globalComponentStyles?.Text?.fontWeight?.value != ""
              ? globalComponentStyles?.Text?.fontWeight?.value :
              themeColors?.PopularMenuSectionDescriptionTextStyle?.value,

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
              styles?.PopularMenuSectionDescriptionTextWeight?.value != ""
                ? styles?.PopularMenuSectionDescriptionTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                  ? globalComponentStyles?.Text?.fontWeight?.value :
                  themeColors?.PopularMenuSectionDescriptionTextWeight?.value,

            color: styles?.PopularMenuSectionDescriptionTextColor?.value != ""
              ? styles?.PopularMenuSectionDescriptionTextColor?.value
              : globalComponentStyles?.Text?.color?.value != ""
                ? globalComponentStyles?.Text?.color?.value :
                themeColors?.PopularMenuSectionDescriptionTextColor?.value,

            fontSize: styles?.PopularMenuSectionDescriptionTextSize?.value[getScreenSizeCategory()] != 0
              ? styles?.PopularMenuSectionDescriptionTextSize?.value[getScreenSizeCategory()]
              : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] :
                themeColors?.PopularMenuSectionDescriptionTextSize?.value[getScreenSizeCategory()],

            fontFamily: styles?.PopularMenuSectionDescriptionTextFont?.value != ""
              ? styles?.PopularMenuSectionDescriptionTextFont?.value
              : globalComponentStyles?.Text?.fontFamily?.value != ""
                ? globalComponentStyles?.Text?.fontFamily?.value :
                themeColors?.PopularMenuSectionDescriptionTextFont?.value,

            fontStyle: styles?.PopularMenuSectionDescriptionTextStyle?.value != ""
              ? styles?.PopularMenuSectionDescriptionTextStyle?.value
              : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value :
                themeColors?.PopularMenuSectionDescriptionTextStyle?.value,
          }}
        >
          No items found.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {products.map((item, index) => (
            <Grid key={index} item xs={6} sm={6} md={3} lg={3}>
              <ItemCard key={index} item={item} actions={actions} styles={styles} states={states} globalComponentStyles={globalComponentStyles} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
