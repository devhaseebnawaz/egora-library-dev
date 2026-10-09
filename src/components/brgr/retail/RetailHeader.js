/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Badge, Box, Button, ButtonBase, IconButton, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AccountCircle, Menu, Search, ShoppingBagOutlined } from "@mui/icons-material";
import { getRetailProductGridCategories, propValue, resolveComponentStyles, resolveRetailImage, styleLength, styleValue } from "./retailShared";

export default function RetailHeader({ actions, layout, prop, states, styles: componentStyles, themeColors }) {
  const theme = useTheme();
  const styles = resolveComponentStyles(componentStyles, themeColors);
  const [menuOpen, setMenuOpen] = useState(false);
  const selectedCategories = getRetailProductGridCategories(layout);
  const categories = selectedCategories.length ? selectedCategories : [{ name: "Categories" }];
  const logoImage = resolveRetailImage(propValue(prop, "logoImage", ""), states?.storeImagesBaseUrl);
  const count = Array.isArray(states?.cardItems)
    ? 0
    : states?.cardItems?.items?.length ?? 0;
  const actionColor = styleValue(styles, "RetailHeaderActionIconColor", theme.palette.text.primary);
  const actionSize = styleLength(styles, "RetailHeaderActionIconSize", 24);

  const chooseCategory = (category) => {
    actions?.handleCategoryClick?.(category);
    setMenuOpen(false);
    document.getElementById("retail-products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Box component="header" sx={{ px: { xs: 2, md: 5 }, py: 2, background: styleValue(styles, "RetailHeaderBackgroundColor", theme.palette.background.paper) }}>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "auto minmax(0, 1fr) auto", md: "1fr auto 1fr" }, alignItems: "center", gap: 1, minHeight: 64 }}>
        <Box>
          <IconButton aria-label="Toggle categories" aria-expanded={menuOpen} onClick={() => setMenuOpen((current) => !current)} sx={{ display: { xs: "inline-flex", md: "none" }, color: actionColor }}>
            <Menu sx={{ fontSize: actionSize }} />
          </IconButton>
        </Box>
        <ButtonBase aria-label="Store home" onClick={() => actions?.navigateToHome?.()} sx={{ justifySelf: "center", minWidth: 0, borderRadius: 1, px: 1, py: 0.5 }}>
          {logoImage ? (
            <Box component="img" src={logoImage} alt="Store logo" sx={{ maxWidth: { xs: 110, sm: 160 }, width: "100%", height: 58, objectFit: "contain" }} />
          ) : (
            <Stack alignItems="center" sx={{ color: styleValue(styles, "RetailHeaderBrandColor", theme.palette.text.primary) }}>
              <Typography component="span" sx={{ fontSize: styleLength(styles, "RetailHeaderBrandTextSize", 39), fontWeight: 700, lineHeight: 1 }}>EGORA</Typography>
              <Typography component="span" variant="caption" sx={{ letterSpacing: "0.3em", fontWeight: 700, color: styleValue(styles, "RetailHeaderBrandAccentColor", theme.palette.primary.main) }}>POS</Typography>
            </Stack>
          )}
        </ButtonBase>
        <Stack direction="row" justifyContent="flex-end" spacing={{ xs: 0, sm: 0.5 }} sx={{ color: actionColor, "& .MuiIconButton-root": { color: "inherit" }, "& .MuiSvgIcon-root": { fontSize: actionSize } }}>
          <IconButton component="a" href="#account" aria-label="Account"><AccountCircle /></IconButton>
          <IconButton aria-label="Search" onClick={() => window.dispatchEvent(new Event("retail:open-search"))}><Search /></IconButton>
          <IconButton aria-label={`Cart, ${count} items`} onClick={() => actions?.handleOpenCart?.()}>
            <Badge badgeContent={count} showZero sx={{ "& .MuiBadge-badge": {
              background: styleValue(styles, "RetailHeaderCartBadgeBackgroundColor", theme.palette.primary.main),
              color: styleValue(styles, "RetailHeaderCartBadgeTextColor", theme.palette.primary.contrastText),
              minWidth: styleLength(styles, "RetailHeaderCartBadgeSize", 17),
              height: styleLength(styles, "RetailHeaderCartBadgeSize", 17),
              fontSize: theme.typography.pxToRem(10),
            } }}><ShoppingBagOutlined /></Badge>
          </IconButton>
        </Stack>
      </Box>
      {categories.length > 0 && (
        <Box component="nav" aria-label="Store categories" sx={{ display: { xs: menuOpen ? "flex" : "none", md: "flex" }, flexWrap: "wrap", justifyContent: "center", gap: styleLength(styles, "RetailHeaderNavGap", 22), mt: 1.5 }}>
          {categories.map((category, index) => {
            const name = category?.name || category?.title;
            return <Button key={category?.id || category?._id || `${name}-${index}`} onClick={() => chooseCategory(category)} sx={{ minWidth: 0, textTransform: "none", color: styleValue(styles, "RetailHeaderNavTextColor", theme.palette.text.primary), fontSize: styleLength(styles, "RetailHeaderNavTextSize", theme.typography.body2.fontSize) }}>{name}</Button>;
          })}
        </Box>
      )}
    </Box>
  );
}
