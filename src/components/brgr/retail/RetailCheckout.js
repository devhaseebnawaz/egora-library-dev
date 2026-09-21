/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Alert,
  Box,
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
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { AccountCircle, LocationOn } from '@mui/icons-material';
import {
  getItemQuantity,
  getItemTotal,
  getProduct,
  getRetailOrderSummary,
  money,
  propValue,
  resolveRetailImage,
  styleValue,
  styleLength,
} from './retailShared';

const emptyForm = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  address: '',
  addressDetails: '',
  city: '',
};

export default function RetailCheckout({ states, actions, styles, layout, PaymentComponent }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [locating, setLocating] = useState(false);
  const items = states?.cardItems?.items || [];
  const paymentMethod = states?.paymentMethod || 'cash';
  const summary = getRetailOrderSummary(states, paymentMethod);
  const configurations = states?.franchise?.configurations || {};
  const cardAvailable =
    configurations?.isCardAvailableOnStore !== false &&
    configurations?.isCardAvailableOnDelivery !== false;
  const locationRequired =
    states?.franchise?.configurations?.isEnabledDeliveryLocation === true ||
    states?.franchise?.configurations?.isEnabledDeliveryLocation === 'true';
  const hasCapturedLocation = Boolean(states?.latLongForDelivery);
  let locationButtonLabel = 'Use my current location';
  if (locating) locationButtonLabel = 'Getting location...';
  else if (hasCapturedLocation) locationButtonLabel = 'Update current location';
  const theme = useTheme();
  const headerBlock = layout?.defaultLayout?.header?.find(
    (block) => block?.component === 'RetailHeader'
  );
  const logoImage = resolveRetailImage(
    propValue(headerBlock?.props, 'logoImage', '') || states?.franchise?.imageURL,
    states?.storeImagesBaseUrl
  );
  const storeName = states?.franchise?.name || 'EGORA';
  const color = (key, fallback) => styleValue(styles, `RetailCheckout${key}`, fallback);
  const headingSx = { color: color('HeadingColor', theme.palette.text.primary), mt: 2 };
  const description = color('DescriptionColor', theme.palette.text.secondary);
  const inputSx = {
    '& .MuiOutlinedInput-root': {
      bgcolor: color('InputBackgroundColor', theme.palette.background.paper),
      color: color('InputTextColor', theme.palette.text.primary),
      borderRadius: styleLength(
        styles,
        'RetailCheckoutInputBorderRadius',
        `${theme.shape.borderRadius}px`
      ),
      '& fieldset': { borderColor: color('InputBorderColor', theme.palette.divider) },
    },
    '& .MuiInputLabel-root': { color: color('InputTextColor', theme.palette.text.secondary) },
  };
  const buttonSx = {
    py: 1.75,
    bgcolor: color('ButtonBackgroundColor', theme.palette.primary.main),
    color: color('ButtonTextColor', theme.palette.primary.contrastText),
    borderRadius: styleLength(
      styles,
      'RetailCheckoutButtonBorderRadius',
      `${theme.shape.borderRadius}px`
    ),
    '&:hover': {
      bgcolor: color('ButtonBackgroundColor', theme.palette.primary.dark),
      filter: 'brightness(0.95)',
    },
  };
  const choiceSx = {
    mx: 0,
    mb: 1,
    px: 1,
    py: 0.5,
    border: 1,
    bgcolor: color('InputBackgroundColor', theme.palette.background.paper),
    color: color('InputTextColor', theme.palette.text.primary),
    borderColor: color('InputBorderColor', theme.palette.divider),
    borderRadius: styleLength(
      styles,
      'RetailCheckoutInputBorderRadius',
      `${theme.shape.borderRadius}px`
    ),
  };

  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const locate = async () => {
    setError('');
    setLocating(true);

    try {
      const location = await actions?.handleLocateMe?.();
      if (!location?.latLong && !states?.latLongForDelivery) {
        throw new Error('We could not confirm your current location. Please try again.');
      }
      if (location?.address) {
        setForm((current) => ({ ...current, address: location.address }));
      }
    } catch (locationError) {
      setError(locationError?.message || 'We could not get your current location.');
    } finally {
      setLocating(false);
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    setError('');

    if (!items.length) {
      setError('Your cart is empty.');
      return;
    }

    if (locationRequired && !hasCapturedLocation) {
      setError('Use your current location before placing a delivery order.');
      return;
    }

    setSubmitting(true);
    const customer = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      address: {
        street: (locationRequired ? form.addressDetails : form.address).trim(),
        area: locationRequired ? form.address.trim() : '',
        city: form.city.trim(),
      },
    };

    try {
      const orderPayload = {
        ...summary.orderPayload,
        customer,
      };
      if (paymentMethod === 'card') {
        await actions?.handlePlaceOrderFromCard?.(orderPayload);
        return;
      }
      const response = await actions?.handlePlaceOrder?.(orderPayload);
      const orderId = response?.data?.id || response?.data?._id;

      if (orderId) {
        actions?.naviagateOrderSuccess?.(orderId);
      } else {
        setError(states?.errorForPlaceOrder || 'We could not place your order. Please try again.');
      }
    } catch (submitError) {
      setError(submitError?.message || 'We could not place your order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      component="section"
      sx={{
        minHeight: '100%',
        bgcolor: color('BackgroundColor', theme.palette.background.default),
        color: color('TextColor', theme.palette.text.primary),
      }}
    >
      <Stack
        component="header"
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          minHeight: 70,
          px: { xs: 2, md: '7%' },
          bgcolor: color('HeaderBackgroundColor', theme.palette.primary.main),
          color: color('HeaderTextColor', theme.palette.primary.contrastText),
        }}
      >
        <Button
          aria-label={`${storeName} home`}
          onClick={() => actions?.navigateToHome?.()}
          sx={{ p: 0, minWidth: 0, flexGrow: 1, justifyContent: 'flex-start' }}
        >
          {logoImage ? (
            <Box
              component="img"
              src={logoImage}
              alt={`${storeName} logo`}
              sx={{
                width: 'auto',
                maxWidth: { xs: 130, sm: 180 },
                height: 48,
                objectFit: 'contain',
              }}
            />
          ) : (
            <Stack direction="row" spacing={1} alignItems="baseline">
              <Typography variant="h5" component="span" color="inherit">
                {storeName}
              </Typography>
              <Typography variant="caption" color="inherit">
                POS
              </Typography>
            </Stack>
          )}
        </Button>
        <AccountCircle />
      </Stack>
      <Box
        component="main"
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1fr) minmax(280px, 400px)' },
          gap: { xs: 3, md: 6 },
          maxWidth: 1100,
          mx: 'auto',
          px: { xs: 2, sm: 3 },
          py: { xs: 3, md: 6 },
        }}
      >
        <Stack component="form" onSubmit={submit} spacing={2} sx={{ minWidth: 0 }}>
          <Typography variant="overline" sx={{ color: description }}>
            Delivery checkout
          </Typography>
          <Typography variant="h5" component="h2" sx={headingSx}>
            Contact details
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <TextField
              fullWidth
              required
              name="firstName"
              value={form.firstName}
              onChange={update}
              label="First name"
              autoComplete="given-name"
              sx={inputSx}
            />
            <TextField
              fullWidth
              required
              name="lastName"
              value={form.lastName}
              onChange={update}
              label="Last name"
              autoComplete="family-name"
              sx={inputSx}
            />
          </Box>
          <TextField
            required
            name="phone"
            value={form.phone}
            onChange={update}
            label="Phone number"
            type="tel"
            autoComplete="tel"
            sx={inputSx}
          />
          <TextField
            name="email"
            value={form.email}
            onChange={update}
            label="Email (optional)"
            type="email"
            autoComplete="email"
            sx={inputSx}
          />
          <Typography variant="h5" component="h2" sx={headingSx}>
            Delivery address
          </Typography>
          {locationRequired && (
            <>
              <Button
                variant="outlined"
                startIcon={<LocationOn />}
                onClick={locate}
                disabled={locating}
                sx={{ alignSelf: 'start' }}
              >
                {locationButtonLabel}
              </Button>
              <Typography variant="body2" sx={{ color: hasCapturedLocation ? 'success.main' : description }}>
                {hasCapturedLocation
                  ? 'Current location captured. Add your house, street, or apartment details below.'
                  : 'Your current location is required for delivery from this store.'}
              </Typography>
              {hasCapturedLocation && (
                <TextField
                  fullWidth
                  disabled
                  label="Current location"
                  value={form.address || states?.currentLocation || states?.latLongForDelivery || ''}
                  sx={inputSx}
                />
              )}
              <TextField
                required
                name="addressDetails"
                value={form.addressDetails}
                onChange={update}
                label="House, street, or apartment details"
                autoComplete="street-address"
                sx={inputSx}
              />
            </>
          )}
          {!locationRequired && (
            <TextField
              required
              name="address"
              value={form.address}
              onChange={update}
              label="Delivery address"
              autoComplete="street-address"
              sx={inputSx}
            />
          )}
          <TextField
            required
            name="city"
            value={form.city}
            onChange={update}
            label="City"
            autoComplete="address-level2"
            sx={inputSx}
          />
          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ ...headingSx, typography: 'h5', mb: 2 }}>
              Payment
            </FormLabel>
            <RadioGroup
              name="retail-payment-method"
              value={paymentMethod}
              onChange={(event) => actions?.handleSetPaymentMethod?.(event.target.value)}
            >
              <FormControlLabel
                value="cash"
                control={<Radio />}
                label="Cash on delivery"
                sx={choiceSx}
              />
              {cardAvailable && (
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label="Credit / Debit Card"
                  sx={choiceSx}
                />
              )}
            </RadioGroup>
          </FormControl>
          {paymentMethod === 'card' && PaymentComponent && (
            <PaymentComponent actions={actions} prop={{}} styles={styles} states={states} />
          )}
          {summary.deliveryMessage && (
            <Typography variant="body2" sx={{ color: description }}>
              {summary.deliveryMessage}
            </Typography>
          )}
          {paymentMethod !== 'card' && (error || states?.errorForPlaceOrder) && (
            <Alert severity="error">{error || states?.errorForPlaceOrder}</Alert>
          )}
          {paymentMethod !== 'card' && (
            <Button
              variant="contained"
              type="submit"
              disabled={submitting || !items.length}
              sx={buttonSx}
            >
              {submitting ? 'Placing order...' : `Place delivery order · ${money(summary.total)}`}
            </Button>
          )}
        </Stack>
        <Paper
          component="aside"
          elevation={0}
          sx={{
            alignSelf: 'start',
            minWidth: 0,
            p: { xs: 2, sm: 3 },
            bgcolor: color('SummaryBackgroundColor', theme.palette.background.paper),
            color: color('SummaryTextColor', theme.palette.text.primary),
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
                      display: 'grid',
                      gridTemplateColumns: '56px minmax(0, 1fr) auto',
                      gap: 1.25,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 68,
                        overflow: 'hidden',
                        borderRadius: 1,
                        bgcolor: 'action.hover',
                      }}
                    >
                      {item.image && (
                        <Box
                          component="img"
                          src={item.image}
                          alt={item.name}
                          sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      )}
                    </Box>
                    <Stack spacing={0.5} sx={{ minWidth: 0 }}>
                      <Typography variant="subtitle2" sx={{ overflowWrap: 'anywhere' }}>
                        {item.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: description }}>
                        Qty {getItemQuantity(raw)}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" fontWeight={700} sx={{ whiteSpace: 'nowrap' }}>
                      {money(getItemTotal(raw))}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Typography>Subtotal</Typography>
              <Typography fontWeight={700}>{money(summary.subTotal)}</Typography>
            </Stack>
            {summary.discount > 0 && (
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                <Typography>Discount</Typography>
                <Typography fontWeight={700}>{`-${money(summary.discount)}`}</Typography>
              </Stack>
            )}
            {summary.promotion > 0 && (
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                <Typography>Promotion</Typography>
                <Typography fontWeight={700}>{`-${money(summary.promotion)}`}</Typography>
              </Stack>
            )}
            {summary.serviceFees > 0 && (
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                <Typography>Service fee</Typography>
                <Typography fontWeight={700}>{money(summary.serviceFees)}</Typography>
              </Stack>
            )}
            {summary.platformFees > 0 && (
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                <Typography>Platform fee</Typography>
                <Typography fontWeight={700}>{money(summary.platformFees)}</Typography>
              </Stack>
            )}
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Typography>Delivery</Typography>
              <Typography fontWeight={700}>{money(summary.deliveryFees)}</Typography>
            </Stack>
            {summary.tax > 0 && (
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                <Typography>Tax</Typography>
                <Typography fontWeight={700}>{money(summary.tax)}</Typography>
              </Stack>
            )}
            <Divider sx={{ borderColor: color('InputBorderColor', theme.palette.divider) }} />
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
