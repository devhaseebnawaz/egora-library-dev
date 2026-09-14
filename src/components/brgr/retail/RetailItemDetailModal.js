/* eslint-disable react/prop-types */
import React from "react";
import { Close, ExpandMore } from "@mui/icons-material";
import {
  Accordion, AccordionDetails, AccordionSummary, Box, Dialog, IconButton, Paper, Stack, Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getProduct, resolveComponentStyles, styleLength, styleValue } from "./retailShared";
import RetailProductPurchasePanel from "./RetailProductPurchasePanel";

export default function RetailItemDetailModal({
  states, actions, styles: componentStyles, themeColors, isEditorPreview = false, previewMode = false,
}) {
  const editorPreview = isEditorPreview || previewMode;
  const theme = useTheme();
  const styles = resolveComponentStyles(componentStyles, themeColors);
  const rawProduct = states?.itemForDetailedModal || {};
  const product = getProduct(rawProduct, states?.storeImagesBaseUrl || "");
  const choiceGroups = states?.choiceGroups?.length
    ? states.choiceGroups
    : states?.allChoiceGroups || [];
  const open = states?.openCard ?? true;

  const close = () => { if (!editorPreview) actions?.handleOpenCard?.(); };
  const color = (key, fallback) => styleValue(styles, `RetailItemDetail${key}`, fallback);

  const handleAddToCart = async (cartItem, selectedGroups, quantity) => {
    if (!actions?.handleAddToCart) return false;
    return actions.handleAddToCart(cartItem, selectedGroups, quantity, "");
  };

  const content = (
    <Box component="section" sx={{
      position: "relative", display: "grid", gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(0, 1fr) minmax(0, 1fr)" },
      gap: { xs: 3, md: 4 }, p: { xs: 2, sm: 4 }, minWidth: 0,
      color: color("TextColor", "text.primary"), bgcolor: color("BackgroundColor", "background.paper"),
    }}>
      <IconButton aria-label="Close product" onClick={close} sx={{
        position: "absolute", top: 8, right: 8, zIndex: 1,
        color: color("CloseIconColor", "text.primary"),
        bgcolor: color("BackgroundColor", "background.paper"),
      }}>
        <Close sx={{ fontSize: styleLength(styles, "RetailItemDetailCloseIconSize", 24) }} />
      </IconButton>
      <Box sx={{ minWidth: 0, minHeight: { xs: 240, md: 400 }, display: "grid", placeItems: "center", overflow: "hidden", borderRadius: 1, bgcolor: color("ImageBackgroundColor", "action.hover") }}>
        {product.image ? <Box component="img" src={product.image} alt={product.name} sx={{ display: "block", width: "100%", height: "100%", maxHeight: 520, objectFit: "contain" }} /> : <Typography color="text.secondary">No product image</Typography>}
      </Box>
      <Stack spacing={2} sx={{ minWidth: 0, pt: { xs: 0, md: 2 } }}>
        <Typography variant="overline" sx={{ color: color("MutedTextColor", "text.secondary") }}>Delivery product</Typography>
        <Typography component="h1" variant="h4" sx={{ color: color("HeadingColor", "text.primary"), overflowWrap: "anywhere" }}>{product.name}</Typography>
        <Typography variant="body2" sx={{ color: color("MutedTextColor", "text.secondary") }}>Tax included</Typography>
        <RetailProductPurchasePanel
          rawProduct={rawProduct}
          choiceGroups={choiceGroups}
          detailStyles={styles}
          disabled={editorPreview}
          onAddToCart={handleAddToCart}
        />
      </Stack>
      {product.description && <Accordion disableGutters elevation={0} sx={{ gridColumn: "1 / -1", bgcolor: "transparent", color: "inherit", "&:before": { display: "none" } }}>
        <AccordionSummary expandIcon={<ExpandMore />}><Typography variant="subtitle1">Description</Typography></AccordionSummary>
        <AccordionDetails><Typography sx={{ color: color("MutedTextColor", "text.secondary"), whiteSpace: "pre-line", overflowWrap: "anywhere" }}>{product.description}</Typography></AccordionDetails>
      </Accordion>}
    </Box>
  );

  if (editorPreview) return <Paper variant="outlined" sx={{ width: "100%", maxWidth: 980, mx: "auto", overflow: "hidden" }}>{content}</Paper>;

  return <Dialog open={open} onClose={close} fullWidth maxWidth="md" aria-label={product.name}
    BackdropProps={{ sx: { bgcolor: color("OverlayColor", undefined) } }}
    PaperProps={{ sx: { m: { xs: 1, sm: 4 }, width: { xs: "calc(100% - 16px)", sm: "calc(100% - 64px)" }, maxHeight: "calc(100% - 32px)" } }}>
    {content}
  </Dialog>;
}
