/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Check,
  CreditCardOutlined,
  PaymentsOutlined,
  ShoppingBagOutlined,
} from '@mui/icons-material';
import { Box, Button, ButtonBase, Divider, Link, Paper, Stack, Typography } from '@mui/material';
import {
  getItemQuantity,
  getItemTotal,
  getProduct,
  getRetailPrice,
  money,
  propValue,
  resolveComponentStyles,
  resolveRetailImage,
  styleValue,
} from './retailShared';

const ink = '#202223';
const muted = '#6d7175';
const border = '#dedede';
const summaryBackground = '#f7f7f7';

function Detail({ title, children }) {
  return (
    <Stack spacing={0.75} sx={{ minWidth: 0, overflowWrap: 'anywhere' }}>
      <Typography component="h3" variant="subtitle2" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Box sx={{ fontSize: 14, lineHeight: 1.65 }}>{children}</Box>
    </Stack>
  );
}

function PriceRow({ label, children, total = false }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={2}>
      <Typography sx={{ fontSize: total ? 20 : 14, fontWeight: total ? 600 : 400 }}>
        {label}
      </Typography>
      <Typography
        component="div"
        sx={{ fontSize: total ? 23 : 14, fontWeight: total ? 700 : 500, textAlign: 'right' }}
      >
        {children}
      </Typography>
    </Stack>
  );
}

function ProductImage({ src, name, quantity }) {
  const [failedImage, setFailedImage] = useState('');
  return (
    <Box sx={{ position: 'relative', width: 66, height: 76, flexShrink: 0 }}>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px solid ${border}`,
          borderRadius: '10px',
          bgcolor: '#fff',
          overflow: 'hidden',
        }}
      >
        {src && src !== failedImage ? (
          <Box
            component="img"
            src={src}
            alt={name}
            onError={() => setFailedImage(src)}
            sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        ) : (
          <ShoppingBagOutlined aria-label={name} sx={{ color: '#9a9a9a', fontSize: 27 }} />
        )}
      </Box>
      <Box
        component="span"
        aria-label={`Quantity: ${quantity}`}
        sx={{
          position: 'absolute',
          right: -9,
          top: -9,
          minWidth: 23,
          height: 23,
          px: 0.75,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#686868',
          color: '#fff',
          borderRadius: '20px',
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        {quantity}
      </Box>
    </Box>
  );
}

// Order amounts are snapshots from checkout, including complimentary items.
const itemTotal = (item) => (item?.isComplimentary ? 0 : getItemTotal(item));

export default function RetailOrderSuccess({ order, actions, layout, states }) {
  const [failedLogo, setFailedLogo] = useState('');
  const customer = order?.customer || {};
  const address = customer?.address || {};
  const franchise = states?.franchise || {};
  const orderId = order?.billNumber || order?.id || order?._id || '';
  const items = Array.isArray(order?.items) ? order.items.filter((item) => !item?.isVoidItem) : [];
  const header = layout?.defaultLayout?.header?.find(
    (block) => block?.component === 'RetailHeader'
  );
  const footer = layout?.defaultLayout?.footer?.find(
    (block) => block?.component === 'RetailFooter'
  );
  const checkout = layout?.cartCheckoutSummaryLayout?.body?.find(
    (block) => block?.component === 'RetailCheckout'
  );
  const selectedColor = layout?.selectedColor || layout?.defaultColor || 'Black';
  const styles = resolveComponentStyles(checkout?.styles, layout?.themeColors?.[selectedColor]);
  const accent = styleValue(styles, 'RetailCheckoutButtonBackgroundColor', '#202a35');
  const accentText = styleValue(styles, 'RetailCheckoutButtonTextColor', '#fff');
  const storeName = franchise?.name || order?.venueId?.name || 'Store';
  const logo = resolveRetailImage(
    propValue(header?.props, 'logoImage', '') || franchise?.imageURL,
    states?.storeImagesBaseUrl
  );
  const footerLinks = propValue(footer?.props, 'links', []);
  const links = (Array.isArray(footerLinks) ? footerLinks : []).filter(
    (link) => link?.url && /^(https?:\/\/|mailto:|tel:|\/)/i.test(link.url)
  );
  const contactLink = links.find((link) => /contact|support/i.test(link.label || link.name || ''));
  const supportUrl =
    contactLink?.url ||
    (order?.venueId?.venuePhoneNumber ? `tel:${order.venueId.venuePhoneNumber}` : '');
  const fullName = [customer.firstName, customer.lastName].filter(Boolean).join(' ');
  const addressLines = [
    address.street,
    address.area,
    [address.city, address.postalCode].filter(Boolean).join(', '),
    address.country,
  ].filter(Boolean);
  const isCash = order?.paymentType === 'cash';
  const isCard = order?.paymentType === 'card';
  const paymentLabel = isCash ? 'Cash on Delivery (COD)' : 'Card payment';
  const subtotal = order?.subTotal ?? items.reduce((sum, item) => sum + itemTotal(item), 0);
  const fees = [
    ['Tax', order?.tax],
    ['Service fee', order?.serviceFees],
    ['Platform fee', order?.platformFees],
    ['Tip', order?.tip],
  ].filter(([, value]) => getRetailPrice(value) > 0);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fff', color: ink }}>
      <Box component="header" sx={{ borderBottom: `1px solid ${border}` }}>
        <Box sx={{ maxWidth: 1150, mx: 'auto', px: { xs: 2.5, sm: 3 }, py: 2.5 }}>
          <ButtonBase
            aria-label={`${storeName} home`}
            onClick={() => actions?.navigateToHome?.()}
            sx={{
              borderRadius: 1,
              minHeight: 40,
              '&.Mui-focusVisible': { outline: '2px solid', outlineOffset: 4 },
            }}
          >
            {logo && logo !== failedLogo ? (
              <Box
                component="img"
                src={logo}
                alt={`${storeName} logo`}
                onError={() => setFailedLogo(logo)}
                sx={{
                  display: 'block',
                  width: 'auto',
                  maxWidth: 180,
                  height: 42,
                  objectFit: 'contain',
                }}
              />
            ) : (
              <Typography
                component="span"
                sx={{ fontSize: 25, fontWeight: 800, letterSpacing: '-0.04em' }}
              >
                {storeName}
              </Typography>
            )}
          </ButtonBase>
        </Box>
      </Box>
      <Box
        component="main"
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'minmax(0, 1fr)',
            md: 'minmax(24px, 1fr) minmax(0, 600px) minmax(0, 500px) minmax(24px, 1fr)',
          },
          minHeight: 'calc(100vh - 83px)',
          '&::after': {
            content: { md: '""' },
            gridColumn: 4,
            gridRow: 1,
            bgcolor: summaryBackground,
          },
        }}
      >
        <Stack
          component="section"
          aria-labelledby="order-confirmation-heading"
          spacing={3}
          sx={{
            gridColumn: { md: 2 },
            gridRow: { md: 1 },
            minWidth: 0,
            px: { xs: 2.5, sm: 3, md: 0 },
            pr: { md: 5 },
            py: { xs: 4, md: 5 },
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: { md: 1.5 } }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                border: '2px solid',
                borderColor: accent,
                color: accent,
                borderRadius: '50%',
                flexShrink: 0,
              }}
            >
              <Check sx={{ fontSize: 29 }} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: 13, color: muted, overflowWrap: 'anywhere', mb: 0.25 }}>
                Confirmation #{orderId}
              </Typography>
              <Typography
                id="order-confirmation-heading"
                variant="h4"
                component="h1"
                sx={{ fontSize: { xs: 23, sm: 26 }, fontWeight: 600, overflowWrap: 'anywhere' }}
              >
                Thank you{customer.firstName ? `, ${customer.firstName}` : ''}!
              </Typography>
            </Box>
          </Stack>
          <Paper
            variant="outlined"
            sx={{
              p: 2.25,
              borderRadius: '10px',
              borderColor: border,
              color: 'inherit',
              bgcolor: '#fff',
            }}
          >
            <Typography component="h2" sx={{ fontSize: 16, fontWeight: 600, mb: 1 }}>
              Your order is confirmed
            </Typography>
            <Typography sx={{ fontSize: 14, lineHeight: 1.6 }}>
              Your delivery order has been placed successfully.
            </Typography>
          </Paper>
          <Paper
            variant="outlined"
            sx={{
              p: 2.25,
              borderRadius: '10px',
              borderColor: border,
              color: 'inherit',
              bgcolor: '#fff',
            }}
          >
            <Typography component="h2" sx={{ fontSize: 16, fontWeight: 600, mb: 2 }}>
              Order details
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' },
                gap: 3,
              }}
            >
              <Stack spacing={2.5}>
                {(customer.email || customer.phone) && (
                  <Detail title="Contact information">
                    {customer.email && <Box>{customer.email}</Box>}
                    {customer.phone && <Box>{customer.phone}</Box>}
                  </Detail>
                )}
                {(fullName || addressLines.length > 0) && (
                  <Detail title="Shipping address">
                    {fullName && <Box>{fullName}</Box>}
                    {addressLines.map((line, index) => (
                      <Box key={`${line}-${index}`}>{line}</Box>
                    ))}
                  </Detail>
                )}
              </Stack>
              <Stack spacing={2.5}>
                {(isCash || isCard) && (
                  <Detail title="Payment method">
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                      {isCash ? (
                        <PaymentsOutlined sx={{ color: muted, fontSize: 23 }} />
                      ) : (
                        <CreditCardOutlined sx={{ color: muted, fontSize: 23 }} />
                      )}
                      <Box>{paymentLabel}</Box>
                    </Stack>
                    {order?.total != null && <Box>{money(order.total)}</Box>}
                  </Detail>
                )}
                <Detail title="Shipping method">Delivery</Detail>
              </Stack>
            </Box>
          </Paper>
          <Stack
            direction={{ xs: 'column-reverse', sm: 'row' }}
            spacing={2.5}
            alignItems={{ xs: 'stretch', sm: 'center' }}
            justifyContent={supportUrl ? 'space-between' : 'flex-end'}
            sx={{ pt: 0.5 }}
          >
            {supportUrl && (
              <Typography sx={{ fontSize: 14 }}>
                Need help?{' '}
                <Link href={supportUrl} sx={{ color: accent, textDecoration: 'underline' }}>
                  Contact us
                </Link>
              </Typography>
            )}
            <Button
              variant="contained"
              size="large"
              onClick={() => actions?.navigateToHome?.()}
              sx={{
                bgcolor: accent,
                color: accentText,
                borderRadius: '7px',
                py: 1.75,
                px: 2.5,
                fontSize: 14,
                boxShadow: 'none',
                '&:hover': { bgcolor: accent, filter: 'brightness(0.9)', boxShadow: 'none' },
              }}
            >
              Continue shopping
            </Button>
          </Stack>
          {links.length > 0 && (
            <Box component="footer" sx={{ mt: 'auto !important', pt: { xs: 3, md: 8 } }}>
              <Stack
                component="nav"
                aria-label="Store information"
                direction="row"
                flexWrap="wrap"
                gap={2}
              >
                {links.map((link, index) => (
                  <Link
                    key={`${link.url}-${index}`}
                    href={link.url}
                    sx={{ fontSize: 12, color: accent, textDecoration: 'underline' }}
                  >
                    {link.label || link.name || 'Store information'}
                  </Link>
                ))}
              </Stack>
            </Box>
          )}
        </Stack>
        <Box
          component="aside"
          aria-labelledby="order-summary-heading"
          sx={{
            gridColumn: { md: 3 },
            gridRow: { md: 1 },
            minWidth: 0,
            bgcolor: summaryBackground,
            borderLeft: { md: `1px solid ${border}` },
            borderTop: { xs: `1px solid ${border}`, md: 0 },
            px: { xs: 2.5, sm: 3, md: 5 },
            py: { xs: 3, md: 5 },
          }}
        >
          <Typography
            id="order-summary-heading"
            component="h2"
            sx={{ fontSize: 16, fontWeight: 600, mb: 3 }}
          >
            Order summary
          </Typography>
          <Stack component="ul" spacing={2.5} sx={{ listStyle: 'none', m: 0, p: 0 }}>
            {items.map((raw, index) => {
              const item = getProduct(raw, states?.storeImagesBaseUrl);
              const options = (Array.isArray(raw?.groups) ? raw.groups : [])
                .flatMap((group) =>
                  (Array.isArray(group?.items) ? group.items : []).map(
                    (option) => option?.item || option?.name
                  )
                )
                .filter(Boolean);
              const variant = raw?.selectedVariant?.name;
              return (
                <Stack
                  component="li"
                  key={raw?.cartItemId || `${item.id}-${index}`}
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >
                  <ProductImage src={item.image} name={item.name} quantity={getItemQuantity(raw)} />
                  <Box sx={{ flex: 1, minWidth: 0, overflowWrap: 'anywhere' }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 500 }}>{item.name}</Typography>
                    {variant && (
                      <Typography sx={{ fontSize: 12, color: muted, mt: 0.5 }}>
                        {variant}
                      </Typography>
                    )}
                    {options.length > 0 && (
                      <Typography sx={{ fontSize: 12, color: muted, mt: 0.5 }}>
                        {options.join(', ')}
                      </Typography>
                    )}
                  </Box>
                  <Typography sx={{ fontSize: 14, fontWeight: 500, flexShrink: 0 }}>
                    {money(itemTotal(raw))}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
          {!items.length && (
            <Typography sx={{ fontSize: 14, color: muted }}>
              Item details are unavailable.
            </Typography>
          )}
          <Divider sx={{ my: 3, borderColor: border }} />
          <Stack spacing={1.25}>
            <PriceRow label="Subtotal">{money(subtotal)}</PriceRow>
            {getRetailPrice(order?.discount) > 0 && (
              <PriceRow label="Discount">−{money(order.discount)}</PriceRow>
            )}
            {getRetailPrice(order?.promotion) > 0 && (
              <PriceRow label="Promotion">−{money(order.promotion)}</PriceRow>
            )}
            {order?.deliveryFees != null && (
              <PriceRow label="Shipping">
                {getRetailPrice(order.deliveryFees) === 0 ? 'Free' : money(order.deliveryFees)}
              </PriceRow>
            )}
            {fees.map(([label, value]) => (
              <PriceRow key={label} label={label}>
                {money(value)}
              </PriceRow>
            ))}
            {getRetailPrice(order?.rounding) !== 0 && (
              <PriceRow label="Rounding">{money(order.rounding)}</PriceRow>
            )}
          </Stack>
          <Divider sx={{ my: 2.5, borderColor: border }} />
          <PriceRow label="Total" total>
            <Box component="span" sx={{ color: muted, fontSize: 12, fontWeight: 400, mr: 1 }}>
              PKR
            </Box>
            {order?.total != null ? money(order.total) : '—'}
          </PriceRow>
        </Box>
      </Box>
    </Box>
  );
}
