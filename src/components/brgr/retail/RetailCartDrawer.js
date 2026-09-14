/* eslint-disable react/prop-types */
import React from "react";
import { Close, DeleteOutline, ShoppingBagOutlined } from "@mui/icons-material";
import { Box, Button, Divider, Drawer, IconButton, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getItemQuantity, getItemTotal, getProduct, getRetailOrderSummary, money, resolveComponentStyles, styleLength, styleValue } from "./retailShared";

export default function RetailCartDrawer({
  states, actions, styles: componentStyles, themeColors, isEditorPreview = false, previewMode = false,
}) {
  const editorPreview = isEditorPreview || previewMode;
  const theme = useTheme();
  const styles = resolveComponentStyles(componentStyles, themeColors);
  const items = states?.cardItems?.items || [];
  const { subTotal, total } = getRetailOrderSummary(states);
  const count = items.reduce((sum, item) => sum + getItemQuantity(item), 0);
  const color = (key, fallback) => styleValue(styles, `RetailCartDrawer${key}`, fallback);
  const iconSx = { color: color("IconColor", "text.primary"), "& .MuiSvgIcon-root": { fontSize: styleLength(styles, "RetailCartDrawerIconSize", 24) } };
  const radius = styleLength(styles, "RetailCartDrawerButtonBorderRadius", theme.shape.borderRadius);
  const close = () => { if (!editorPreview) actions?.handleOpenCart?.(); };
  const navigate = (action) => { if (!editorPreview) action?.(); };
  const content = (
    <Box component="aside" sx={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0, p: { xs: 2, sm: 3 }, bgcolor: color("BackgroundColor", "background.paper"), color: color("TextColor", "text.primary") }}>
      <Stack direction="row" spacing={1} alignItems="flex-start" justifyContent="space-between" sx={{ mb: 3 }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="overline" sx={{ color: color("MutedTextColor", "text.secondary") }}>Your bag</Typography>
          <Typography variant="h5" component="h2" sx={{ color: color("HeadingColor", "text.primary") }}>Shopping cart ({count})</Typography>
        </Box>
        <IconButton aria-label="Close cart" onClick={close} sx={iconSx}><Close /></IconButton>
      </Stack>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>{subTotal >= 1999 ? "You unlocked free delivery" : `${money(1999 - subTotal)} away from free delivery`}</Typography>
        <LinearProgress variant="determinate" value={Math.min(100, Math.max(0, (subTotal / 1999) * 100))} sx={{ borderRadius: 1, bgcolor: "action.hover", "& .MuiLinearProgress-bar": { bgcolor: color("ProgressColor", "primary.main") } }} />
      </Box>
      {items.length ? (
        <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
          {items.map((raw, index) => {
            const item = getProduct(raw, states?.storeImagesBaseUrl || "");
            return (
              <Stack key={raw.cartItemId || `${item.id || item.name}-${index}`} direction="row" spacing={1.5} alignItems="center" sx={{ py: 2, borderBottom: 1, borderColor: color("DividerColor", "divider") }}>
                <Box sx={{ width: 64, height: 72, flexShrink: 0, borderRadius: 1, overflow: "hidden", bgcolor: "action.hover", display: "grid", placeItems: "center" }}>
                  {item.image ? <Box component="img" src={item.image} alt={item.name} sx={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }} /> : <ShoppingBagOutlined color="disabled" />}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="subtitle2" component="h3" sx={{ color: color("HeadingColor", "text.primary"), overflowWrap: "anywhere" }}>{item.name}</Typography>
                  <Typography variant="body2" sx={{ color: color("MutedTextColor", "text.secondary"), my: 0.5 }}>Quantity: {getItemQuantity(raw)}</Typography>
                  <Typography variant="subtitle2" sx={{ color: color("PriceColor", "text.primary") }}>{money(getItemTotal(raw))}</Typography>
                </Box>
                <IconButton aria-label={`Remove ${item.name}`} onClick={() => { if (!editorPreview) actions?.handleRemoveFromCart?.(raw); }} sx={iconSx}><DeleteOutline /></IconButton>
              </Stack>
            );
          })}
        </Box>
      ) : (
        <Stack spacing={1} alignItems="center" justifyContent="center" sx={{ flex: 1, minHeight: 240, py: 4, textAlign: "center" }}>
          <ShoppingBagOutlined sx={{ fontSize: 48, color: color("IconColor", "text.secondary"), mb: 1 }} />
          <Typography variant="h6" component="h3" sx={{ color: color("HeadingColor", "text.primary") }}>Your cart is empty</Typography>
          <Typography variant="body2" sx={{ color: color("MutedTextColor", "text.secondary") }}>Add a product to begin your order.</Typography>
        </Stack>
      )}
      <Stack spacing={2} sx={{ pt: 3, mt: "auto", flexShrink: 0 }}>
        <Divider sx={{ borderColor: color("DividerColor", "divider") }} />
        <Stack direction="row" justifyContent="space-between"><Typography>Subtotal</Typography><Typography variant="subtitle1" sx={{ color: color("PriceColor", "text.primary") }}>{money(subTotal)}</Typography></Stack>
        {actions?.naviagateCart && <Button fullWidth variant="outlined" onClick={() => navigate(actions.naviagateCart)} sx={{ borderRadius: radius, color: color("TextColor", "text.primary"), borderColor: color("DividerColor", "divider") }}>View bag</Button>}
        <Button fullWidth variant="contained" disabled={!items.length} onClick={() => navigate(actions?.naviagateCheckout)} sx={{ py: 1.5, borderRadius: radius, bgcolor: color("ButtonBackgroundColor", "primary.main"), color: color("ButtonTextColor", "primary.contrastText"), "&:hover": { bgcolor: color("ButtonBackgroundColor", "primary.dark") } }}>Checkout · {money(total)}</Button>
      </Stack>
    </Box>
  );

  // A temporary Drawer would portal over the editor and trap its keyboard focus.
  if (editorPreview) return <Paper variant="outlined" sx={{ width: "100%", maxWidth: 460, mx: "auto", height: 640, maxHeight: "100%", overflow: "hidden" }}>{content}</Paper>;

  return <Drawer anchor="right" open={states?.openCart ?? true} onClose={close}
    PaperProps={{ role: "dialog", "aria-modal": true, "aria-label": "Shopping cart", sx: { width: { xs: "100%", sm: 460 }, maxWidth: "100%", height: "100%" } }}>
    {content}
  </Drawer>;
}
