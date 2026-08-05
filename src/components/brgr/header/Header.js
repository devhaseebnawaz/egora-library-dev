import React from 'react';
import { AppBar, Toolbar, Box, Button, IconButton, useMediaQuery } from '@mui/material';
import { Icon } from "@iconify/react";
import locationIcon from "@iconify-icons/mdi/map-marker";
import phoneIcon from "@iconify-icons/mdi/phone";
import cartIcon from "@iconify-icons/mdi/cart";
import CartDrawer from "./CartDrawer";
import LocationModal from "../categories/locationModal";
import UniversalImage from "../../../UniversalImage";
import { getIconWidthHeight, getScreenSizeCategory } from "../../../utils/fontsize";
import { getPhotoURL } from "../../../utils/photoURL";

export default function CustomNavbar({
  themeColors,
  actions,
  prop,
  styles,
  states,
  globalComponentStyles,
  layout,
  previewMode = false,
}) {
  const isMobile = useMediaQuery('(max-width:600px)');
  const truncateLength = isMobile ? 10 : 25;
  const isBelow850 = useMediaQuery('(max-width:850px)');
  const { selectedVenue, selectedRegion, currentLocation, orderType, selectedOutlet } =
    states ?? {};
  const { venueAddressOne, venueAddressTwo } = selectedVenue ?? {};
  const cartItemCount = states?.cardItems?.items?.length ?? 0;

  const venueAddress = `${venueAddressOne ?? ''} ${venueAddressTwo ?? ''}`.trim();
  const orderTypeLabel = orderType === 'storePickUp' ? 'PICK UP' : 'DELIVERY';
  const addressMap = {
    storeDelivery: currentLocation ? currentLocation : selectedRegion ? selectedRegion?.name : '',
    storePickUp: venueAddress,
  };

  const addressText = actions?.handleTruncateText(
    orderType === 'storePickUp' && selectedOutlet
      ? addressMap[orderType] ?? 'Address'
      : orderType === 'storeDelivery' && currentLocation
        ? addressMap[orderType] ?? 'Address'
        : orderType === 'storeDelivery' && selectedRegion
          ? addressMap[orderType] ?? 'Region'
          : '',
    truncateLength
  );

  return (
    <>
      <AppBar
        position="static"
        style={{
          backgroundColor:
            styles?.AppBarBackgroundColor?.value != ''
              ? styles?.AppBarBackgroundColor?.value
              : globalComponentStyles?.Background?.color?.value != ''
                ? globalComponentStyles?.Background?.color?.value
                : themeColors?.AppBarBackgroundColor?.value,
          boxShadow: 'none',
          position: 'relative',
          zIndex: 10,
          paddingLeft: isBelow850 ? '10px' : '14px',
          paddingRight: isBelow850 ? '10px' : '14px',
          paddingTop: '4px',
          paddingBottom: '4px',
        }}
      >
        <Toolbar
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: isBelow850 && 0,
          }}
        >
          <Box
            style={{
              display: isMobile ? 'flex' : isBelow850 ? 'block' : 'flex',
              alignItems: 'center',
              gap: isMobile ? '6px' : '12px',
            }}
          >
            <Button
              type="button"
              aria-label="Choose delivery location"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? 0 : '8px',
                flexShrink: 0,
                justifyContent: 'flex-start',
                minWidth: isMobile ? 'auto' : undefined,
                padding: isMobile ? '4px' : isBelow850 ? '6px 10px' : '10px 18px',
                backgroundColor: styles?.AppBarButtonsBackgroundColor?.value != ''
                  ? styles?.AppBarButtonsBackgroundColor?.value
                  : globalComponentStyles?.Icon?.color?.value != ''
                    ? globalComponentStyles?.Icon?.color?.value
                    : themeColors?.AppBarButtonsBackgroundColor?.value,
                borderRadius: '999px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
                textTransform: 'none',
                overflow: 'hidden',
              }}
              onClick={() => {
                if (!previewMode) {
                  actions.handleOpenLocationModalOnClick(true);
                }
              }}
            >
              <Box
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  padding: '5px',
                  lineHeight: 0,
                  backgroundColor: styles?.AppBarIconBackgroundColor?.value != ''
                    ? styles?.AppBarIconBackgroundColor?.value
                    : globalComponentStyles?.Icon?.color?.value != ''
                      ? globalComponentStyles?.Icon?.color?.value
                      : themeColors?.AppBarIconBackgroundColor?.value,
                  borderRadius: '50%',
                }}
              >
                <Icon
                  icon={locationIcon}
                  width={getIconWidthHeight(
                    styles?.AppBarLocationIconHeightWidth?.value != ''
                      ? styles?.AppBarLocationIconHeightWidth?.value
                      : globalComponentStyles?.Icon?.size?.value != ''
                        ? globalComponentStyles?.Icon?.size?.value
                        : themeColors?.AppBarLocationIconHeightWidth?.value,
                    isBelow850,
                    18
                  )}
                  height={getIconWidthHeight(
                    styles?.AppBarLocationIconHeightWidth?.value != ''
                      ? styles?.AppBarLocationIconHeightWidth?.value
                      : globalComponentStyles?.Icon?.size?.value != ''
                        ? globalComponentStyles?.Icon?.size?.value
                        : themeColors?.AppBarLocationIconHeightWidth?.value,
                    isBelow850,
                    18
                  )}
                  color={
                    styles?.AppBarLocationIconColor?.value != ''
                      ? styles?.AppBarLocationIconColor?.value
                      : globalComponentStyles?.Icon?.color?.value != ''
                        ? globalComponentStyles?.Icon?.color?.value
                        : themeColors?.AppBarLocationIconColor?.value
                  }
                />
              </Box>
              <Box
                style={{
                  display: isMobile ? 'none' : 'block',
                  minWidth: 0,
                  textAlign: 'left',
                  lineHeight: 1.1,
                }}
              >
                <Box
                  component="span"
                  style={{
                    display: 'block',
                    color:
                      styles?.AppBarChangeLocationColor?.value != ''
                        ? styles?.AppBarChangeLocationColor?.value
                        : globalComponentStyles?.Text?.color?.value != ''
                          ? globalComponentStyles?.Text?.color?.value
                          : themeColors?.AppBarChangeLocationColor?.value,
                    fontWeight:
                      styles?.AppBarChangeLocationTextWeight?.value != ''
                        ? styles?.AppBarChangeLocationTextWeight?.value
                        : globalComponentStyles?.Text?.fontWeight?.value != ''
                          ? globalComponentStyles?.Text?.fontWeight?.value
                          : themeColors?.AppBarChangeLocationTextWeight?.value,

                    fontSize: isBelow850 ? '9px' : '10px',

                    fontFamily:
                      styles?.AppBarChangeLocationTextFont?.value != ''
                        ? styles?.AppBarChangeLocationTextFont?.value
                        : globalComponentStyles?.Text?.fontFamily?.value != ''
                          ? globalComponentStyles?.Text?.fontFamily?.value
                          : themeColors?.AppBarChangeLocationTextFont?.value,

                    fontStyle:
                      styles?.AppBarChangeLocationTextStyle?.value != ''
                        ? styles?.AppBarChangeLocationTextStyle?.value
                        : globalComponentStyles?.Text?.fontStyle?.value != ''
                          ? globalComponentStyles?.Text?.fontStyle?.value
                          : themeColors?.AppBarChangeLocationTextStyle?.value,
                  }}
                >
                  {orderTypeLabel}
                </Box>
                <Box
                  component="span"
                  style={{
                    display: 'block',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    color:
                      styles?.AppBarAddressColor?.value != ''
                        ? styles?.AppBarAddressColor?.value
                        : globalComponentStyles?.Text?.color?.value != ''
                          ? globalComponentStyles?.Text?.color?.value
                          : themeColors?.AppBarAddressColor?.value,

                    fontSize:
                      styles?.AppBarAddressTextSize?.value[getScreenSizeCategory()] != 0
                        ? styles?.AppBarAddressTextSize?.value[getScreenSizeCategory()]
                        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                          : themeColors?.AppBarAddressTextSize?.value[getScreenSizeCategory()],

                    fontWeight:
                      styles?.AppBarAddressTextWeight?.value != ''
                        ? styles?.AppBarAddressTextWeight?.value
                        : globalComponentStyles?.Text?.fontWeight?.value != ''
                          ? globalComponentStyles?.Text?.fontWeight?.value
                          : themeColors?.AppBarAddressTextWeight?.value,

                    fontFamily:
                      styles?.AppBarAddressTextFont?.value != ''
                        ? styles?.AppBarAddressTextFont?.value
                        : globalComponentStyles?.Text?.fontFamily?.value != ''
                          ? globalComponentStyles?.Text?.fontFamily?.value
                          : themeColors?.AppBarAddressTextFont?.value,

                    fontStyle:
                      styles?.AppBarAddressTextStyle?.value != ''
                        ? styles?.AppBarAddressTextStyle?.value
                        : globalComponentStyles?.Text?.fontStyle?.value != ''
                          ? globalComponentStyles?.Text?.fontStyle?.value
                          : themeColors?.AppBarAddressTextStyle?.value,
                  }}
                >
                  {addressText}
                </Box>
              </Box>
            </Button>

            <Button
              type="button"
              component="a"
              aria-label="Call venue"
              href={
                states?.selectedVenue?.venuePhoneNumber
                  ? `tel:${states.selectedVenue.venuePhoneNumber}`
                  : undefined
              }
              style={{
                marginTop: isBelow850 && !isMobile ? '4px' : 0,
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? 0 : '8px',
                flexShrink: 0,
                justifyContent: 'flex-start',
                minWidth: isMobile ? 'auto' : undefined,
                padding: isMobile ? '4px' : isBelow850 ? '6px 10px' : '10px 18px',
                backgroundColor: styles?.AppBarButtonsBackgroundColor?.value != ''
                  ? styles?.AppBarButtonsBackgroundColor?.value
                  : globalComponentStyles?.Icon?.color?.value != ''
                    ? globalComponentStyles?.Icon?.color?.value
                    : themeColors?.AppBarButtonsBackgroundColor?.value,
                borderRadius: '999px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
                textTransform: 'none',
              }}
            >
              <Box
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  padding: '5px',
                  lineHeight: 0,
                  backgroundColor: styles?.AppBarIconBackgroundColor?.value != ''
                    ? styles?.AppBarIconBackgroundColor?.value
                    : globalComponentStyles?.Icon?.color?.value != ''
                      ? globalComponentStyles?.Icon?.color?.value
                      : themeColors?.AppBarIconBackgroundColor?.value,
                  borderRadius: '50%',
                }}
              >
                <Icon
                  icon={phoneIcon}
                  width={getIconWidthHeight(
                    styles?.AppBarPhoneIconHeightWidth?.value != ''
                      ? styles?.AppBarPhoneIconHeightWidth?.value
                      : globalComponentStyles?.Icon?.size?.value != ''
                        ? globalComponentStyles?.Icon?.size?.value
                        : themeColors?.AppBarPhoneIconHeightWidth?.value,
                    isBelow850,
                    18
                  )}
                  height={getIconWidthHeight(
                    styles?.AppBarPhoneIconHeightWidth?.value != ''
                      ? styles?.AppBarPhoneIconHeightWidth?.value
                      : globalComponentStyles?.Icon?.size?.value != ''
                        ? globalComponentStyles?.Icon?.size?.value
                        : themeColors?.AppBarPhoneIconHeightWidth?.value,
                    isBelow850,
                    18
                  )}
                  color={
                    styles?.AppBarPhoneIconColor?.value != ''
                      ? styles?.AppBarPhoneIconColor?.value
                      : globalComponentStyles?.Icon?.color?.value != ''
                        ? globalComponentStyles?.Icon?.color?.value
                        : themeColors?.AppBarPhoneIconColor?.value
                  }
                />
              </Box>
              <Box
                component="span"
                style={{
                  display: isMobile ? 'none' : 'inline',
                  fontWeight:
                    styles?.AppBarPhoneTextWeight?.value != ''
                      ? styles?.AppBarPhoneTextWeight?.value
                      : globalComponentStyles?.Text?.fontWeight?.value != ''
                        ? globalComponentStyles?.Text?.fontStyle?.value
                        : themeColors?.AppBarPhoneTextWeight?.value,
                  color:
                    styles?.AppBarPhoneColor?.value != ''
                      ? styles?.AppBarPhoneColor?.value
                      : globalComponentStyles?.Text?.color?.value != ''
                        ? globalComponentStyles?.Text?.color?.value
                        : themeColors?.AppBarPhoneColor?.value,

                  fontSize:
                    styles?.AppBarPhoneTextSize?.value[getScreenSizeCategory()] != 0
                      ? styles?.AppBarPhoneTextSize?.value[getScreenSizeCategory()]
                      : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                        ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                        : themeColors?.AppBarPhoneTextSize?.value[getScreenSizeCategory()],

                  fontFamily:
                    styles?.AppBarPhoneTextFont?.value != ''
                      ? styles?.AppBarPhoneTextFont?.value
                      : globalComponentStyles?.Text?.fontFamily?.value != ''
                        ? globalComponentStyles?.Text?.fontFamily?.value
                        : themeColors?.AppBarPhoneTextFont?.value,

                  fontStyle:
                    styles?.AppBarPhoneTextStyle?.value != ''
                      ? styles?.AppBarPhoneTextStyle?.value
                      : globalComponentStyles?.Text?.fontStyle?.value != ''
                        ? globalComponentStyles?.Text?.fontStyle?.value
                        : themeColors?.AppBarPhoneTextStyle?.value,
                }}
              >
                {states?.selectedVenue?.venuePhoneNumber
                  ? states?.selectedVenue?.venuePhoneNumber
                  : '03XX-XXXXXXX'}
              </Box>
            </Button>
          </Box>

          <Box style={{ position: 'relative' }}>
            <IconButton
              type="button"
              aria-label="Open cart"
              style={{
                // padding: isBelow850 ? '8px' : '12px',
                backgroundColor: styles?.AppBarButtonsBackgroundColor?.value != ''
                  ? styles?.AppBarButtonsBackgroundColor?.value
                  : globalComponentStyles?.Icon?.color?.value != ''
                    ? globalComponentStyles?.Icon?.color?.value
                    : themeColors?.AppBarButtonsBackgroundColor?.value,
                borderRadius: '50%',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
              }}
              onClick={() => {
                if (!previewMode) {
                  actions.handleOpenCart();
                }
              }}
            >
              <Icon
                icon={cartIcon}
                width={
                  styles?.AppBarCartIconHeightWidth?.value != ''
                    ? styles?.AppBarCartIconHeightWidth?.value
                    : globalComponentStyles?.Icon?.size?.value != ''
                      ? globalComponentStyles?.Icon?.size?.value
                      : themeColors?.AppBarCartIconHeightWidth?.value
                }
                height={
                  styles?.AppBarCartIconHeightWidth?.value != ''
                    ? styles?.AppBarCartIconHeightWidth?.value
                    : globalComponentStyles?.Icon?.size?.value != ''
                      ? globalComponentStyles?.Icon?.size?.value
                      : themeColors?.AppBarCartIconHeightWidth?.value
                }
                color={
                  styles?.AppBarCartIconColor?.value != ''
                    ? styles?.AppBarCartIconColor?.value
                    : globalComponentStyles?.Icon?.color?.value != ''
                      ? globalComponentStyles?.Icon?.color?.value
                      : themeColors?.AppBarCartIconColor?.value
                }
              />
            </IconButton>

            <CartDrawer
              open={states.openCart}
              onClose={actions.handleOpenCart}
              themeColors={themeColors}
              actions={actions}
              prop={prop}
              styles={styles}
              states={states}
              layout={layout}
              globalComponentStyles={globalComponentStyles}
              previewMode={false}
            />
            {cartItemCount > 0 && (
              <Box
                style={{
                  position: 'absolute',
                  top: 2,
                  right: 2,
                  width:
                    styles?.AppBarCartQtyIconHeightWidth?.value != ''
                      ? styles?.AppBarCartQtyIconHeightWidth?.value
                      : globalComponentStyles?.Icon?.size?.value != ''
                        ? globalComponentStyles?.Icon?.size?.value
                        : themeColors?.AppBarCartQtyIconHeightWidth?.value,
                  height:
                    styles?.AppBarCartQtyIconHeightWidth?.value != ''
                      ? styles?.AppBarCartQtyIconHeightWidth?.value
                      : globalComponentStyles?.Icon?.size?.value != ''
                        ? globalComponentStyles?.Icon?.size?.value
                        : themeColors?.AppBarCartQtyIconHeightWidth?.value,
                  color:
                    styles?.AppBarCartQtyIconColor?.value != ''
                      ? styles?.AppBarCartQtyIconColor?.value
                      : globalComponentStyles?.Icon?.color?.value != ''
                        ? globalComponentStyles?.Icon?.color?.value
                        : themeColors?.AppBarCartQtyIconColor?.value,
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  backgroundColor:
                    styles?.AppBarCartQtyIconBackgroundColor?.value != ''
                      ? styles?.AppBarCartQtyIconBackgroundColor?.value
                      : globalComponentStyles?.Icon?.color?.value != ''
                        ? globalComponentStyles?.Icon?.color?.value
                        : themeColors?.AppBarCartQtyIconBackgroundColor?.value,
                  borderRadius:
                    styles?.AppBarCartQtyIconBorderRadius?.value != ''
                      ? `${styles?.AppBarCartQtyIconBorderRadius?.value}px`
                      : `${themeColors?.AppBarCartQtyIconBorderRadius?.value}px`,

                  border: `2px solid ${styles?.AppBarCartQtyIconBorderColor?.value != ''
                    ? styles?.AppBarCartQtyIconBorderColor?.value
                    : themeColors?.AppBarCartQtyIconBorderColor?.value
                    }`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={() => {
                  if (!previewMode) {
                    actions.handleOpenCart();
                  }
                }}
              >
                {cartItemCount}
              </Box>
            )}
          </Box>
        </Toolbar>

        <Box
          style={{
            position: 'absolute',
            top: isBelow850 ? '60%' : "85%",
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isBelow850
              ? 70
              : styles?.AppBarImageHeightWidth?.value != ''
                ? styles?.AppBarImageHeightWidth?.value
                : globalComponentStyles?.LogoImage?.size?.value != ''
                  ? globalComponentStyles?.LogoImage?.size?.value
                  : themeColors?.AppBarImageHeightWidth?.value,
            height: isBelow850
              ? 70
              : styles?.AppBarImageHeightWidth?.value != ''
                ? styles?.AppBarImageHeightWidth?.value
                : globalComponentStyles?.LogoImage?.size?.value != ''
                  ? globalComponentStyles?.LogoImage?.size?.value
                  : themeColors?.AppBarImageHeightWidth?.value,
            backgroundColor:
              styles?.AppBarImageBackgroundColor?.value != ''
                ? styles?.AppBarImageBackgroundColor?.value
                : globalComponentStyles?.LogoImage?.backgroundColor?.value != ''
                  ? globalComponentStyles?.LogoImage?.backgroundColor?.value
                  : themeColors?.AppBarImageBackgroundColor?.value,
            borderRadius:
              styles?.AppBarImageBorderRadius?.value != ''
                ? `${styles?.AppBarImageBorderRadius?.value}px`
                : globalComponentStyles?.LogoImage?.borderRadius?.value != ''
                  ? `${globalComponentStyles?.LogoImage?.borderRadius?.value}px`
                  : `${themeColors?.AppBarImageBorderRadius?.value}px`,
            overflow: 'hidden',
          }}
        >
          {prop?.editable?.logoImage ? (
            <UniversalImage
              src={getPhotoURL(prop?.editable?.logoImage?.value)}
              alt="Logo"
              layout="fill"
              objectFit="contain"
              onError={() => console.log('Image failed to load')}
              width="100%"
              height="100%"
            />
          ) : (
            <div>No logo found</div>
          )}
        </Box>
      </AppBar>
      <LocationModal
        layout={layout}
        open={states.locationModalOpen}
        handleClose={actions.handleOpenLocationModal}
        themeColors={themeColors}
        actions={actions}
        prop={prop}
        styles={styles}
        states={states}
        isGoogleMapsLoaded={states?.isGoogleMapsLoaded}
      />

    </>
  );
}
