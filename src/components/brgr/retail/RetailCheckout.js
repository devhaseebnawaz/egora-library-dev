/* eslint-disable react/prop-types */
import React from "react";
import { AccountCircle } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Link,
  MenuItem,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
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

export default function RetailCheckout({
  states,
  actions,
  styles,
  PaymentComponent,
}) {
  const items = states?.cardItems?.items || [];
  const payment = states?.paymentMethod || "cash";
  const summary = getRetailOrderSummary(states, payment);
  const setPayment = (value) => actions?.handleSetPaymentMethod?.(value);
  const submit = (event) => {
    event.preventDefault();
    const order = {
      ...summary.orderPayload,
      paymentMethod: payment,
      paymentType: payment,
    };
    return payment === "card"
      ? actions?.handlePlaceOrderFromCard?.(order)
      : actions?.handlePlaceOrder?.(order);
  };
  const theme = useTheme();
  const color = (key, fallback) =>
    styleValue(styles, `RetailCheckout${key}`, fallback);
  const headingSx = {
    color: color("HeadingColor", theme.palette.text.primary),
    mt: 2,
  };
  const description = color("DescriptionColor", theme.palette.text.secondary);
  const inputSx = {
    "& .MuiOutlinedInput-root": {
      bgcolor: color("InputBackgroundColor", theme.palette.background.paper),
      color: color("InputTextColor", theme.palette.text.primary),
      borderRadius: styleLength(
        styles,
        "RetailCheckoutInputBorderRadius",
        `${theme.shape.borderRadius}px`
      ),
      "& fieldset": {
        borderColor: color("InputBorderColor", theme.palette.divider),
      },
    },
    "& .MuiInputLabel-root": {
      color: color("InputTextColor", theme.palette.text.secondary),
    },
  };
  const buttonSx = {
    py: 1.75,
    bgcolor: color("ButtonBackgroundColor", theme.palette.primary.main),
    color: color("ButtonTextColor", theme.palette.primary.contrastText),
    borderRadius: styleLength(
      styles,
      "RetailCheckoutButtonBorderRadius",
      `${theme.shape.borderRadius}px`
    ),
    "&:hover": {
      bgcolor: color("ButtonBackgroundColor", theme.palette.primary.dark),
      filter: "brightness(0.95)",
    },
  };
  const choiceSx = {
    mx: 0,
    mb: 1,
    px: 1,
    py: 0.5,
    border: 1,
    bgcolor: color("InputBackgroundColor", theme.palette.background.paper),
    color: color("InputTextColor", theme.palette.text.primary),
    borderColor: color("InputBorderColor", theme.palette.divider),
    borderRadius: styleLength(
      styles,
      "RetailCheckoutInputBorderRadius",
      `${theme.shape.borderRadius}px`
    ),
  };

  return (
    <Box
      component="section"
      sx={{
        minHeight: "100%",
        bgcolor: color("BackgroundColor", theme.palette.background.default),
        color: color("TextColor", theme.palette.text.primary),
      }}
    >
      <Stack
        component="header"
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          minHeight: 70,
          px: { xs: 2, md: "7%" },
          bgcolor: color("HeaderBackgroundColor", theme.palette.primary.main),
          color: color("HeaderTextColor", theme.palette.primary.contrastText),
        }}
      >
        <Typography variant="h5" component="span">
          EGORA
        </Typography>
        <Typography variant="caption" sx={{ flexGrow: 1 }}>
          POS
        </Typography>
        <AccountCircle />
      </Stack>
      <Box
        component="main"
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            md: "minmax(0, 1fr) minmax(280px, 400px)",
          },
          gap: { xs: 3, md: 6 },
          maxWidth: 1100,
          mx: "auto",
          px: { xs: 2, sm: 3 },
          py: { xs: 3, md: 6 },
        }}
      >
        <Stack
          component="form"
          onSubmit={submit}
          spacing={2}
          sx={{ minWidth: 0 }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="h5" component="h2" sx={headingSx}>
              Contact
            </Typography>
            <Link href="#account">Sign in</Link>
          </Stack>
          <TextField
            required
            label="Email or mobile phone number"
            autoComplete="email"
            sx={inputSx}
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Email me with updates and offers"
          />
          <Typography variant="h5" component="h2" sx={headingSx}>
            Delivery
          </Typography>
          <TextField
            select
            label="Country / Region"
            defaultValue="Pakistan"
            sx={inputSx}
          >
            <MenuItem value="Pakistan">Pakistan</MenuItem>
          </TextField>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              required
              label="First name"
              autoComplete="given-name"
              sx={inputSx}
            />
            <TextField
              fullWidth
              required
              label="Last name"
              autoComplete="family-name"
              sx={inputSx}
            />
          </Box>
          <TextField
            required
            label="Address"
            autoComplete="street-address"
            sx={inputSx}
          />
          <TextField label="Apartment, suite, etc. (optional)" sx={inputSx} />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              required
              label="City"
              autoComplete="address-level2"
              sx={inputSx}
            />
            <TextField
              fullWidth
              label="Postal code (optional)"
              autoComplete="postal-code"
              sx={inputSx}
            />
          </Box>
          <TextField
            required
            label="Phone"
            type="tel"
            autoComplete="tel"
            sx={inputSx}
          />
          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              sx={{ ...headingSx, typography: "h5", mb: 1 }}
            >
              Payment
            </FormLabel>
            <Typography variant="body2" sx={{ color: description, mb: 2 }}>
              All transactions are secure and encrypted.
            </Typography>
            <RadioGroup
              name="retail-payment-method"
              value={payment}
              onChange={(event) => setPayment(event.target.value)}
            >
              <FormControlLabel
                value="cash"
                control={<Radio />}
                label="Cash on Delivery (COD)"
                sx={choiceSx}
              />
              <FormControlLabel
                value="card"
                control={<Radio />}
                label="Card payment"
                sx={choiceSx}
              />
            </RadioGroup>
          </FormControl>
          {payment === "card" && PaymentComponent && (
            <PaymentComponent
              actions={actions}
              prop={{}}
              styles={styles}
              states={states}
            />
          )}
          {payment !== "card" && (
            <Button variant="contained" type="submit" sx={buttonSx}>
              Complete order
            </Button>
          )}
        </Stack>
        <Paper
          component="aside"
          elevation={0}
          sx={{
            alignSelf: "start",
            minWidth: 0,
            p: { xs: 2, sm: 3 },
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
            <Stack spacing={2}>
              {items.map((raw, index) => {
                const item = getProduct(raw, states?.storeImagesBaseUrl);
                return (
                  <Box
                    key={raw?.cartItemId || item.id || `${item.name}-${index}`}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "56px minmax(0, 1fr) auto",
                      gap: 1.25,
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 68,
                        overflow: "hidden",
                        borderRadius: 1,
                        bgcolor: "action.hover",
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
                    <Stack spacing={0.5} sx={{ minWidth: 0 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ overflowWrap: "anywhere" }}
                      >
                        {item.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: description }}>
                        Qty {getItemQuantity(raw)}
                      </Typography>
                    </Stack>
                    <Typography
                      variant="body2"
                      fontWeight={700}
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      {money(getItemTotal(raw))}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
            <TextField label="Discount code" sx={inputSx} />
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Typography>Subtotal</Typography>
              <Typography fontWeight={700}>{money(summary.total)}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Typography>Shipping</Typography>
              <Typography fontWeight={700}>{"FREE"}</Typography>
            </Stack>
            <Divider
              sx={{
                borderColor: color("InputBorderColor", theme.palette.divider),
              }}
            />
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">{money(summary.total)}</Typography>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}
