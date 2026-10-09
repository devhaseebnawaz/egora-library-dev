/* eslint-disable react/prop-types */
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getRetailProductGridCategories, propItems, resolveComponentStyles, styleLength, styleValue } from "./retailShared";

export default function RetailCategoryCarousel({ prop, actions, layout, styles: componentStyles, themeColors }) {
  const theme = useTheme();
  const styles = resolveComponentStyles(componentStyles, themeColors);
  const layoutCategories = getRetailProductGridCategories(layout);
  const source = propItems(prop, "categories");
  const categories = source.length ? source : layoutCategories.length ? layoutCategories : [{ name: "Face" }, { name: "Hair" }, { name: "Beard" }, { name: "Body" }, { name: "Fragrance" }];
  const color = styleValue(styles, "RetailCategoryCarouselTextColor", theme.palette.text.secondary);

  if (!categories.length) return null;

  return (
    <Box component="section" aria-label="Shop by category" sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "stretch", md: "center" }, gap: { xs: 1, md: 2 }, px: { xs: 2, md: 5 }, py: { xs: 1, md: 1.5 }, color, background: styleValue(styles, "RetailCategoryCarouselBackgroundColor", theme.palette.background.paper), borderBottom: 1, borderColor: styleValue(styles, "RetailCategoryCarouselBorderColor", theme.palette.divider) }}>
      <Typography variant="overline" sx={{ flexShrink: 0, fontSize: styleLength(styles, "RetailCategoryCarouselLabelSize", theme.typography.overline.fontSize) }}>Shop by category</Typography>
      <Box sx={{ display: "flex", flex: 1, minWidth: 0, overflowX: "auto", gap: styleLength(styles, "RetailCategoryCarouselItemGap", 16), py: 0.25 }}>
        {categories.map((category, index) => {
          const name = category?.name || category?.title || category;
          return (
            <Button key={category?.id || category?._id || `${name}-${index}`} onClick={() => actions?.handleCategoryClick?.(category)} sx={{ color, minWidth: 0, px: 1, py: 0.5, flexShrink: 0, whiteSpace: "nowrap", textTransform: "none", fontSize: styleLength(styles, "RetailCategoryCarouselTextSize", theme.typography.body2.fontSize), "&:hover": { color: styleValue(styles, "RetailCategoryCarouselHoverColor", theme.palette.primary.main) } }}>
              {name}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
