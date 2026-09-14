/* eslint-disable react/prop-types */
import React from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
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
    <Box component="section" aria-label="Shop by category" sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "stretch", md: "center" }, gap: 3, px: { xs: 2, md: 5 }, py: 3, color, background: styleValue(styles, "RetailCategoryCarouselBackgroundColor", theme.palette.background.paper), borderBottom: 1, borderColor: styleValue(styles, "RetailCategoryCarouselBorderColor", theme.palette.divider) }}>
      <Typography variant="overline" sx={{ flexShrink: 0, fontSize: styleLength(styles, "RetailCategoryCarouselLabelSize", theme.typography.overline.fontSize) }}>Shop by category</Typography>
      <Box sx={{ display: "flex", flex: 1, minWidth: 0, overflowX: "auto", gap: styleLength(styles, "RetailCategoryCarouselItemGap", 28), py: 0.5 }}>
        {categories.map((category, index) => {
          const name = category?.name || category?.title || category;
          return (
            <Button key={category?.id || category?._id || `${name}-${index}`} onClick={() => actions?.handleCategoryClick?.(category)} sx={{ color, gap: 1, flexShrink: 0, whiteSpace: "nowrap", textTransform: "none", fontSize: styleLength(styles, "RetailCategoryCarouselTextSize", theme.typography.body2.fontSize), "&:hover": { color: styleValue(styles, "RetailCategoryCarouselHoverColor", theme.palette.primary.main) } }}>
              <Avatar aria-hidden="true" sx={{ width: styleLength(styles, "RetailCategoryCarouselIconSize", 30), height: styleLength(styles, "RetailCategoryCarouselIconSize", 30), background: styleValue(styles, "RetailCategoryCarouselIconBackgroundColor", theme.palette.action.selected), color: styleValue(styles, "RetailCategoryCarouselIconColor", theme.palette.primary.main), fontSize: theme.typography.h6.fontSize }}>{["✦", "⌁", "⌁", "◌", "◉"][index % 5]}</Avatar>
              {name}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
