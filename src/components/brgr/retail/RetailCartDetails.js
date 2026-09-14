/* eslint-disable react/prop-types */
import React from "react";
import { Add, DeleteOutline, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  getItemQuantity,
  getItemTotal,
  getProduct,
  getRetailOrderSummary,
  money,
  styleLength,
  styleValue,
} from "./retailShared";

export default function RetailCartDetails({ states, actions, styles }) {
  const theme = useTheme();
  const items = states?.cardItems?.items || [];
  const summary = getRetailOrderSummary(states);
  const { subTotal } = summary;
  const color = (key, fallback) =>
    styleValue(styles, `RetailCartDetails${key}`, fallback);
  const heading = color("HeadingColor", theme.palette.text.primary);
  const muted = color("MutedTextColor", theme.palette.text.secondary);
  const divider = color("DividerColor", theme.palette.divider);
  const buttonSx = {
    bgcolor: color("ButtonBackgroundColor", theme.palette.primary.main),
    color: color("ButtonTextColor", theme.palette.primary.contrastText),
    borderRadius: styleLength(
      styles,
      "RetailCartDetailsButtonBorderRadius",
      `${theme.shape.borderRadius}px`
    ),
    py: 1.5,
    "&:hover": {
      bgcolor: color("ButtonBackgroundColor", theme.palette.primary.dark),
      filter: "brightness(0.95)",
    },
  };
  const quantitySx = {
    color: color("QuantityIconColor", theme.palette.text.primary),
    bgcolor: color(
      "QuantityButtonBackgroundColor",
      theme.palette.background.paper
    ),
    borderRadius: "inherit",
  };
  const decrement = (item) => {
    if (getItemQuantity(item) <= 1) actions?.handleRemoveFromCart?.(item);
    else actions?.updateItemFromCardDecByOne?.(item);
  };

  return (
    <Box
      component="section"
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "minmax(0, 1fr)",
          md: "minmax(0, 1fr) minmax(280px, 360px)",
        },
        gap: { xs: 3, md: 5 },
        p: { xs: 2, sm: 3, md: 6 },
        bgcolor: color("BackgroundColor", theme.palette.background.default),
        color: color("TextColor", theme.palette.text.primary),
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="overline" sx={{ color: muted }}>
          Your bag
        </Typography>
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="baseline"
          flexWrap="wrap"
          useFlexGap
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{ color: heading, fontSize: { xs: "1.75rem", md: "2.375rem" } }}
          >
            Shopping cart
          </Typography>
          <Typography variant="body2" sx={{ color: muted }}>
            ({items.reduce((count, item) => count + getItemQuantity(item), 0)}{" "}
            items)
          </Typography>
        </Stack>
        <Divider
          sx={{
            width: 56,
            borderBottomWidth: 3,
            borderColor: divider,
            my: 2.5,
          }}
        />
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Typography variant="body2">
            {subTotal >= 1999
              ? "Congratulations! You get free shipping."
              : `Add ${money(1999 - subTotal)} for free shipping.`}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={Math.min(100, (subTotal / 1999) * 100)}
            sx={{
              height: 4,
              borderRadius: 1,
              bgcolor: "action.hover",
              "& .MuiLinearProgress-bar": {
                bgcolor: color("ProgressColor", theme.palette.primary.main),
              },
            }}
          />
        </Stack>
        {items.length ? (
          items.map((raw, index) => {
            const item = getProduct(raw, states?.storeImagesBaseUrl);
            return (
              <Box
                key={raw?.cartItemId || item.id || `${item.name}-${index}`}
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "56px minmax(0, 1fr) auto",
                    sm: "72px minmax(0, 1fr) auto auto",
                  },
                  alignItems: "center",
                  gap: { xs: 1.5, sm: 2 },
                  py: 2.5,
                  borderBottom: 1,
                  borderColor: divider,
                }}
              >
                <Box
                  sx={{
                    width: { xs: 56, sm: 72 },
                    height: { xs: 70, sm: 88 },
                    bgcolor: "action.hover",
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  {item.image && (
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  )}
                </Box>
                <Stack spacing={0.75} sx={{ minWidth: 0 }}>
                  <Typography
                    variant="subtitle1"
                    component="h2"
                    sx={{ color: heading, overflowWrap: "anywhere" }}
                  >
                    {item.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: muted }}>
                    {money(item.price)}
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{
                      width: "fit-content",
                      border: 1,
                      borderColor: color(
                        "QuantityButtonBorderColor",
                        theme.palette.divider
                      ),
                      borderRadius: 1,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => decrement(raw)}
                      aria-label={`Decrease ${item.name}`}
                      sx={quantitySx}
                    >
                      <Remove fontSize="small" />
                    </IconButton>
                    <Typography
                      variant="body2"
                      sx={{ minWidth: 32, textAlign: "center" }}
                    >
                      {getItemQuantity(raw)}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => actions?.updateItemFromCardAddByOne?.(raw)}
                      aria-label={`Increase ${item.name}`}
                      sx={quantitySx}
                    >
                      <Add fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>
                <Typography
                  fontWeight={700}
                  sx={{
                    whiteSpace: "nowrap",
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  }}
                >
                  {money(getItemTotal(raw))}
                </Typography>
                <IconButton
                  onClick={() => actions?.handleRemoveFromCart?.(raw)}
                  aria-label={`Remove ${item.name}`}
                  sx={{
                    color: muted,
                    gridColumn: { xs: 3, sm: "auto" },
                    justifySelf: "end",
                  }}
                >
                  <DeleteOutline />
                </IconButton>
              </Box>
            );
          })
        ) : (
          <Stack
            spacing={1.5}
            alignItems="center"
            sx={{ py: 6, textAlign: "center" }}
          >
            <Typography variant="h5" component="h2" sx={{ color: heading }}>
              Your cart is empty
            </Typography>
            <Button onClick={() => actions?.navigateToHome?.()}>
              Continue shopping
            </Button>
          </Stack>
        )}
      </Box>
      <Paper
        component="aside"
        elevation={0}
        sx={{
          alignSelf: "start",
          minWidth: 0,
          p: 3,
          bgcolor: color(
            "SummaryBackgroundColor",
            theme.palette.background.paper
          ),
          color: color("SummaryTextColor", theme.palette.text.primary),
        }}
      >
        <Stack spacing={2.5}>
          <Typography variant="h5" component="h2">
            Order summary
          </Typography>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography>Subtotal</Typography>
            <Typography fontWeight={700}>{money(summary.subTotal)}</Typography>
          </Stack>

          <Typography variant="body2" sx={{ color: muted }}>
            Delivery charges and tax are calculated at checkout.
          </Typography>
          <Button
            variant="contained"
            fullWidth
            disabled={!items.length}
            onClick={() => actions?.naviagateCheckout?.()}
            sx={buttonSx}
          >
            Continue to checkout
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
