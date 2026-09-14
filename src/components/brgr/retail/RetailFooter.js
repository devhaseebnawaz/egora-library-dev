/* eslint-disable react/prop-types */
import React from "react";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getRetailProductGridCategories, propValue, resolveComponentStyles, styleValue } from "./retailShared";

export default function RetailFooter({ actions, layout, prop, styles: componentStyles, themeColors }) {
  const theme = useTheme();
  const styles = resolveComponentStyles(componentStyles, themeColors);
  const categories = getRetailProductGridCategories(layout);
  const links = propValue(prop, "links", []);
  const linkItems = Array.isArray(links) ? links : [];
  const color = styleValue(styles, "FooterTextColor", theme.palette.text.primary);
  const linkColor = styleValue(styles, "FooterLinkColor", color);
  const chooseCategory = (category) => {
    actions?.handleCategoryClick?.(category);
    document.getElementById("retail-products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const menu = categories.length ? categories : ["Categories", "Azadi Bundles", "Hair", "Face", "Beard", "Build Your Own Bundle", "Fragrance", "Best Sellers", "All Products", "Deals", "Gifts", "Blog", "Loyalty Rewards", "Order Tracker"];
  return (
    <Box component="footer" sx={{ px: { xs: 3, md: 7 }, pt: 7, pb: 2.5, color, background: styleValue(styles, "FooterBackgroundColor", theme.palette.background.paper) }}>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0, 1fr)", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" }, gap: 4.5 }}>
        <Stack alignItems="flex-start" spacing={0.5}>
          <Typography component="h3" variant="subtitle2" sx={{ mb: 1.5, textTransform: "uppercase" }}>Menu</Typography>
          {menu.map((category, index) => <Button key={category?.id || category?._id || `${category?.name || category}-${index}`} onClick={() => chooseCategory(typeof category === "string" ? { name: category } : category)} sx={{ color: linkColor, p: 0.5, textTransform: "none", justifyContent: "flex-start" }}>{category?.name || category?.title || category}</Button>)}
        </Stack>
        <Stack alignItems="flex-start" spacing={1}>
          <Typography component="h3" variant="subtitle2" sx={{ mb: 0.5, textTransform: "uppercase" }}>Menu</Typography>
          {(linkItems.length ? linkItems : ["Track Your Order", "Search", "About us", "Be Our Distributor", "FAQ", "Careers", "Contact Us", "Privacy Policy", "Refund Policy", "Terms of Service", "Other Stores"].map((label) => ({ label, url: "#top" }))).map((link, index) => <Link key={`${link?.label || link?.name}-${index}`} href={link?.url || "#top"} variant="body2" sx={{ color: linkColor }}>{link?.label || link?.name}</Link>)}
        </Stack>
        <Stack spacing={1.5}>
          <Typography component="h3" variant="subtitle2" sx={{ textTransform: "uppercase" }}>Mini Bio</Typography>
          <Typography variant="body2">Egora POS is a simple solution for sales, inventory and customer management. We help growing businesses spend less time on admin and more time serving customers.</Typography>
          <Typography variant="subtitle2">Store locations:</Typography>
        </Stack>
        <Stack alignItems="flex-start" spacing={1}>
          <Typography component="h3" variant="subtitle2" sx={{ mb: 0.5, textTransform: "uppercase" }}>Contact</Typography>
          <Link href="mailto:support@egora.com" variant="body2" sx={{ color: linkColor, overflowWrap: "anywhere" }}>support@egora.com</Link>
          <Link href="tel:+923000000000" variant="body2" sx={{ color: linkColor }}>+92 300 0000000</Link>
          <Typography variant="body2">◉　◎　♪　▶</Typography>
        </Stack>
      </Box>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={1} sx={{ mt: 4.5, pt: 2, borderTop: 1, borderColor: "divider" }}>
        <Typography variant="caption">Managed By Zain</Typography>
        <Typography variant="caption">© {new Date().getFullYear()} Egora</Typography>
      </Stack>
    </Box>
  );
}
