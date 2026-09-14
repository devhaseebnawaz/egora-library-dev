/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Add, Close, ExpandMore, Remove } from "@mui/icons-material";
import {
  Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button,
  CircularProgress, Dialog, Divider, IconButton, Paper, Stack, Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getProduct, money, resolveComponentStyles, styleLength, styleValue } from "./retailShared";

export default function RetailItemDetailModal({
  states, actions, styles: componentStyles, themeColors, isEditorPreview = false, previewMode = false,
}) {
  const editorPreview = isEditorPreview || previewMode;
  const theme = useTheme();
  const styles = resolveComponentStyles(componentStyles, themeColors);
  const product = getProduct(states?.itemForDetailedModal || {}, states?.storeImagesBaseUrl || "");
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [error, setError] = useState("");
  const open = states?.openCard ?? true;

  useEffect(() => {
    setQuantity(1);
    setError("");
  }, [product.id, open]);

  const addToCart = async () => {
    if (editorPreview || isAddingToCart || !actions?.handleAddToCart) return false;
    setIsAddingToCart(true);
    setError("");
    try {
      await actions.handleAddToCart(product, states?.choiceGroups || states?.allChoiceGroups || [], quantity, "");
      return true;
    } catch (err) {
      setError("Unable to add this product. Please try again.");
      return false;
    } finally {
      setIsAddingToCart(false);
    }
  };
  const close = () => { if (!editorPreview) actions?.handleOpenCard?.(); };
  const color = (key, fallback) => styleValue(styles, `RetailItemDetail${key}`, fallback);
  const radius = styleLength(styles, "RetailItemDetailButtonBorderRadius", theme.shape.borderRadius);
  const quantitySx = {
    border: 1,
    borderColor: color("QuantityButtonBorderColor", "divider"),
    bgcolor: color("QuantityButtonBackgroundColor", "background.paper"),
    color: color("QuantityIconColor", "text.primary"),
    borderRadius: radius,
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
        <Typography variant="overline" sx={{ color: color("MutedTextColor", "text.secondary") }}>EGORA POS INVENTORY</Typography>
        <Typography component="h1" variant="h4" sx={{ color: color("HeadingColor", "text.primary"), overflowWrap: "anywhere" }}>{product.name}</Typography>
        <Divider sx={{ borderColor: color("DividerColor", "divider") }} />
        <Typography variant="h5" sx={{ color: color("PriceColor", "text.primary") }}>{money(product.price)}</Typography>
        <Typography variant="body2" sx={{ color: color("MutedTextColor", "text.secondary") }}>Tax included</Typography>
        <Stack spacing={0.5} sx={{ p: 2, borderRadius: 1, bgcolor: color("InstallmentBackgroundColor", "action.hover") }}><Typography variant="subtitle2">Egora Pay</Typography><Typography variant="body2">Flexible payments for your business</Typography></Stack>
        <Typography variant="subtitle2">Quantity</Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton aria-label="Decrease quantity" disabled={quantity <= 1 || isAddingToCart} onClick={() => setQuantity((value) => Math.max(1, value - 1))} sx={quantitySx}><Remove /></IconButton>
          <Typography component="output" aria-label="Quantity" aria-live="polite" sx={{ minWidth: 24, textAlign: "center" }}>{quantity}</Typography>
          <IconButton aria-label="Increase quantity" disabled={isAddingToCart} onClick={() => setQuantity((value) => value + 1)} sx={quantitySx}><Add /></IconButton>
        </Stack>
        {error && <Alert severity="error">{error}</Alert>}
        <Button variant="contained" fullWidth onClick={addToCart} disabled={isAddingToCart} aria-busy={isAddingToCart}
          startIcon={isAddingToCart ? <CircularProgress size={18} color="inherit" /> : undefined}
          sx={{ py: 1.5, borderRadius: radius, bgcolor: color("AddButtonBackgroundColor", "primary.main"), color: color("AddButtonTextColor", "primary.contrastText"), "&:hover": { bgcolor: color("AddButtonBackgroundColor", "primary.dark") } }}>
          {isAddingToCart ? "Adding to cart..." : `Add to cart · ${money(product.price * quantity)}`}
        </Button>
        <Button variant="contained" fullWidth disabled={isAddingToCart} onClick={async () => { if (await addToCart()) actions?.naviagateCheckout?.(); }} sx={{ py: 1.5, borderRadius: radius, bgcolor: color("BuyButtonBackgroundColor", "primary.main"), color: color("BuyButtonTextColor", "primary.contrastText"), "&:hover": { bgcolor: color("BuyButtonBackgroundColor", "primary.dark") } }}>Buy it now</Button>
      </Stack>
      {product.description && <Accordion disableGutters elevation={0} sx={{ gridColumn: "1 / -1", bgcolor: "transparent", color: "inherit", "&:before": { display: "none" } }}>
        <AccordionSummary expandIcon={<ExpandMore />}><Typography variant="subtitle1">Description</Typography></AccordionSummary>
        <AccordionDetails><Typography sx={{ color: color("MutedTextColor", "text.secondary"), whiteSpace: "pre-line", overflowWrap: "anywhere" }}>{product.description}</Typography></AccordionDetails>
      </Accordion>}
    </Box>
  );

  // Keep the editor canvas and its edit toolbar in the normal document flow.
  if (editorPreview) return <Paper variant="outlined" sx={{ width: "100%", maxWidth: 980, mx: "auto", overflow: "hidden" }}>{content}</Paper>;

  return <Dialog open={open} onClose={close} fullWidth maxWidth="md" aria-label={product.name}
    BackdropProps={{ sx: { bgcolor: color("OverlayColor", undefined) } }}
    PaperProps={{ sx: { m: { xs: 1, sm: 4 }, width: { xs: "calc(100% - 16px)", sm: "calc(100% - 64px)" }, maxHeight: "calc(100% - 32px)" } }}>
    {content}
  </Dialog>;
}
