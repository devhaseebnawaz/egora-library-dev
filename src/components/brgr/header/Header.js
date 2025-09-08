import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Box, Typography, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify-icons/mdi/map-marker";
import { useMediaQuery } from "@mui/material";
import phoneIcon from "@iconify-icons/mdi/phone";
import cartIcon from "@iconify-icons/mdi/cart";
import CartDrawer from "./CartDrawer";
import LocationModal from "../categories/locationModal";
import UniversalImage from "../../../UniversalImage";
import { getIconWidthHeight, getScreenSizeCategory } from "../../../utils/fontsize";

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
  const { selectedVenue, currentLocation, orderType,selectedOutlet } = states ?? {}
  const { venueAddressOne, venueAddressTwo } = selectedVenue ?? {}
    
  let showCurrentLocation 
  let showAddress 
  console.log("console added")
  if (selectedOutlet && selectedVenue && orderType==="storePickUp") {
    showCurrentLocation = false
    showAddress = true
  }
  else if (currentLocation && orderType==="storeDelivery") {
    showCurrentLocation = false
    showAddress = true
  }
  else {
    showCurrentLocation = true
    showAddress = false
  }
  
  showCurrentLocation = isBelow850 ? showCurrentLocation : true;
  showAddress = isBelow850 ? showAddress : true;

  const venueAddress = `${venueAddressOne ?? ""} ${venueAddressTwo ?? ""}`.trim();
  const addressMap = {
    storeDelivery: currentLocation ?? "",
    storePickUp: venueAddress,
  };

 const addressText = actions?.handleTruncateText(
  (orderType === "storePickUp" && selectedOutlet)
   ? (addressMap[orderType] ?? "Address") 
   :  (orderType === "storeDelivery" && currentLocation)
  ? (addressMap[orderType] ?? "Address") : "" ,truncateLength);

  return (
    <>
      <AppBar
        position="static"
        style={{
          backgroundColor:
            styles?.AppBarBackgroundColor?.value != ""
              ? styles?.AppBarBackgroundColor?.value
              : globalComponentStyles?.Background?.color?.value != ""
                ? globalComponentStyles?.Background?.color?.value
                : themeColors?.AppBarBackgroundColor?.value,
          boxShadow: "none",
          position: "relative",
          zIndex: 10,
          paddingLeft:  isBelow850 ? "10px" : "14px",
          paddingRight: isBelow850 ? "10px":"14px",
          paddingTop: "4px",
          paddingBottom: "4px",
        }}
      >
        <Toolbar
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            padding:isBelow850 && 0
          }}
        >
          <Box
            style={{
              display: isBelow850 ? "block" : "flex",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
              onClick={() => {
                if (!previewMode) {
                  actions.handleOpenLocationModalOnClick(true)
                }
              }
              }
            >
              <Icon
                icon={locationIcon}
                width={
                  getIconWidthHeight(styles?.AppBarLocationIconHeightWidth?.value != ""
                    ? styles?.AppBarLocationIconHeightWidth?.value
                    : globalComponentStyles?.Icon?.size?.value != ""
                      ? globalComponentStyles?.Icon?.size?.value
                      : themeColors?.AppBarLocationIconHeightWidth?.value,isBelow850,18)
                }
                height={
                  getIconWidthHeight(styles?.AppBarLocationIconHeightWidth?.value != ""
                    ? styles?.AppBarLocationIconHeightWidth?.value
                    : globalComponentStyles?.Icon?.size?.value != ""
                      ? globalComponentStyles?.Icon?.size?.value
                      : themeColors?.AppBarLocationIconHeightWidth?.value,isBelow850,18)
                }
                color={
                  styles?.AppBarLocationIconColor?.value != ""
                    ? styles?.AppBarLocationIconColor?.value
                    : globalComponentStyles?.Icon?.color?.value != ""
                      ? globalComponentStyles?.Icon?.color?.value
                      : themeColors?.AppBarLocationIconColor?.value
                }
              />
              <Box>
                <Typography
                  variant="body2"
                  style={{
                    display: showCurrentLocation ? 'block' : 'none',
                    color:
                      styles?.AppBarChangeLocationColor?.value != ""
                        ? styles?.AppBarChangeLocationColor?.value
                        : globalComponentStyles?.Text?.color?.value != ""
                          ? globalComponentStyles?.Text?.color?.value :
                          themeColors?.AppBarChangeLocationColor?.value,
                    fontWeight:
                      styles?.AppBarChangeLocationTextWeight?.value != ""
                        ? styles?.AppBarChangeLocationTextWeight?.value
                          : globalComponentStyles?.Text?.fontWeight?.value != ""
                            ? globalComponentStyles?.Text?.fontWeight?.value :
                             themeColors?.AppBarChangeLocationTextWeight?.value,

                    fontSize: styles?.AppBarChangeLocationTextSize?.value[getScreenSizeCategory()] != 0
                      ? styles?.AppBarChangeLocationTextSize?.value[getScreenSizeCategory()]
                      : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                        ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                        : themeColors?.AppBarChangeLocationTextSize?.value[getScreenSizeCategory()],

                    fontFamily: styles?.AppBarChangeLocationTextFont?.value != ""
                      ? styles?.AppBarChangeLocationTextFont?.value
                      : globalComponentStyles?.Text?.fontFamily?.value != ""
                        ? globalComponentStyles?.Text?.fontFamily?.value
                        : themeColors?.AppBarChangeLocationTextFont?.value,

                    fontStyle: styles?.AppBarChangeLocationTextStyle?.value != ""
                      ? styles?.AppBarChangeLocationTextStyle?.value
                      : globalComponentStyles?.Text?.fontStyle?.value != ""
                        ? globalComponentStyles?.Text?.fontStyle?.value
                        : themeColors?.AppBarChangeLocationTextStyle?.value,
                  }}
                >
                  Current {states.orderType === "storeDelivery" ? "Location" : "Branch"}

                </Typography>
                <Typography
                  variant="caption"
                  style={{
                    display: showAddress ? 'block' : 'none',
                    color:
                      styles?.AppBarAddressColor?.value != ""
                        ? styles?.AppBarAddressColor?.value
                        : globalComponentStyles?.Text?.color?.value != ""
                          ? globalComponentStyles?.Text?.color?.value :
                          themeColors?.AppBarAddressColor?.value,

                    fontSize: styles?.AppBarAddressTextSize?.value[getScreenSizeCategory()] != 0
                      ? styles?.AppBarAddressTextSize?.value[getScreenSizeCategory()]
                      : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                        ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                        : themeColors?.AppBarAddressTextSize?.value[getScreenSizeCategory()],

                    fontWeight:
                        styles?.AppBarAddressTextWeight?.value != ""
                          ? styles?.AppBarAddressTextWeight?.value
                            : globalComponentStyles?.Text?.fontWeight?.value != ""
                              ? globalComponentStyles?.Text?.fontWeight?.value :
                               themeColors?.AppBarAddressTextWeight?.value,

                    fontFamily: styles?.AppBarAddressTextFont?.value != ""
                      ? styles?.AppBarAddressTextFont?.value
                      : globalComponentStyles?.Text?.fontFamily?.value != ""
                        ? globalComponentStyles?.Text?.fontFamily?.value
                        : themeColors?.AppBarAddressTextFont?.value,

                    fontStyle: styles?.AppBarAddressTextStyle?.value != ""
                      ? styles?.AppBarAddressTextStyle?.value
                      : globalComponentStyles?.Text?.fontStyle?.value != ""
                        ? globalComponentStyles?.Text?.fontStyle?.value
                        : themeColors?.AppBarAddressTextStyle?.value,

                  }}
                >
                 {addressText}
                </Typography>
              </Box>
            </Box>

            <Box
              style={{
                marginTop: isBelow850 && '4px',
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Icon
                icon={phoneIcon}

                width={
                  getIconWidthHeight(styles?.AppBarPhoneIconHeightWidth?.value != ""
                    ? styles?.AppBarPhoneIconHeightWidth?.value
                    : globalComponentStyles?.Icon?.size?.value != ""
                      ? globalComponentStyles?.Icon?.size?.value
                      : themeColors?.AppBarPhoneIconHeightWidth?.value,isBelow850,18)
                }
                height={
                  getIconWidthHeight(styles?.AppBarPhoneIconHeightWidth?.value != ""
                    ? styles?.AppBarPhoneIconHeightWidth?.value
                    : globalComponentStyles?.Icon?.size?.value != ""
                      ? globalComponentStyles?.Icon?.size?.value
                      : themeColors?.AppBarPhoneIconHeightWidth?.value,isBelow850,18)
                }
                color={
                  styles?.AppBarPhoneIconColor?.value != ""
                    ? styles?.AppBarPhoneIconColor?.value
                    : globalComponentStyles?.Icon?.color?.value != ""
                      ? globalComponentStyles?.Icon?.color?.value
                      : themeColors?.AppBarPhoneIconColor?.value
                }
              />
              <Typography
                variant="body2"
                style={{
                  fontWeight:
                   styles?.AppBarPhoneTextWeight?.value != ""
                    ? styles?.AppBarPhoneTextWeight?.value
                    : globalComponentStyles?.Text?.fontWeight?.value != ""
                      ? globalComponentStyles?.Text?.fontStyle?.value :
                      themeColors?.AppBarPhoneTextWeight?.value,
                  color:
                    styles?.AppBarPhoneColor?.value != ""
                      ? styles?.AppBarPhoneColor?.value
                      : globalComponentStyles?.Text?.color?.value != ""
                        ? globalComponentStyles?.Text?.color?.value :
                        themeColors?.AppBarPhoneColor?.value,


                  fontSize: styles?.AppBarPhoneTextSize?.value[getScreenSizeCategory()] != 0
                    ? styles?.AppBarPhoneTextSize?.value[getScreenSizeCategory()]
                    : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                      ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                      : themeColors?.AppBarPhoneTextSize?.value[getScreenSizeCategory()],

                  fontFamily: styles?.AppBarPhoneTextFont?.value != ""
                    ? styles?.AppBarPhoneTextFont?.value
                    : globalComponentStyles?.Text?.fontFamily?.value != ""
                      ? globalComponentStyles?.Text?.fontFamily?.value
                      : themeColors?.AppBarPhoneTextFont?.value,

                  fontStyle: styles?.AppBarPhoneTextStyle?.value != ""
                    ? styles?.AppBarPhoneTextStyle?.value
                    : globalComponentStyles?.Text?.fontStyle?.value != ""
                      ? globalComponentStyles?.Text?.fontStyle?.value
                      : themeColors?.AppBarPhoneTextStyle?.value,

                }}
              >
                {states?.selectedVenue?.venuePhoneNumber
                  ? states?.selectedVenue?.venuePhoneNumber
                  : "03XX-XXXXXXX"}
              </Typography>
            </Box>
          </Box>

          <Box style={{ position: "relative" }}>
            <IconButton onClick={() => {
              if (!previewMode) {
                actions.handleOpenCart()
              }
            }
            }>
              <Icon
                icon={cartIcon}

                width={
                  styles?.AppBarCartIconHeightWidth?.value != ""
                    ? styles?.AppBarCartIconHeightWidth?.value
                    : globalComponentStyles?.Icon?.size?.value != ""
                      ? globalComponentStyles?.Icon?.size?.value
                      : themeColors?.AppBarCartIconHeightWidth?.value
                }
                height={
                  styles?.AppBarCartIconHeightWidth?.value != ""
                    ? styles?.AppBarCartIconHeightWidth?.value
                    : globalComponentStyles?.Icon?.size?.value != ""
                      ? globalComponentStyles?.Icon?.size?.value
                      : themeColors?.AppBarCartIconHeightWidth?.value
                }
                color={
                  styles?.AppBarCartIconColor?.value != ""
                    ? styles?.AppBarCartIconColor?.value
                    : globalComponentStyles?.Icon?.color?.value != ""
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
            <Box
              style={{
                position: "absolute",
                top: 2,
                right: 2,
                width:
                  styles?.AppBarCartQtyIconHeightWidth?.value != ""
                    ? styles?.AppBarCartQtyIconHeightWidth?.value
                    : globalComponentStyles?.Icon?.size?.value != ""
                      ? globalComponentStyles?.Icon?.size?.value
                      : themeColors?.AppBarCartQtyIconHeightWidth?.value
                ,
                height:
                  styles?.AppBarCartQtyIconHeightWidth?.value != ""
                    ? styles?.AppBarCartQtyIconHeightWidth?.value
                    : globalComponentStyles?.Icon?.size?.value != ""
                      ? globalComponentStyles?.Icon?.size?.value
                      : themeColors?.AppBarCartQtyIconHeightWidth?.value
                ,
                color:
                  styles?.AppBarCartQtyIconColor?.value != ""
                    ? styles?.AppBarCartQtyIconColor?.value
                    : globalComponentStyles?.Icon?.color?.value != ""
                      ? globalComponentStyles?.Icon?.color?.value
                      : themeColors?.AppBarCartQtyIconColor?.value
                ,

                fontSize: "0.8rem",
                fontWeight: "bold",
                backgroundColor:
                  styles?.AppBarCartQtyIconBackgroundColor?.value != ""
                    ? styles?.AppBarCartQtyIconBackgroundColor?.value
                    : globalComponentStyles?.Icon?.color?.value != ""
                      ? globalComponentStyles?.Icon?.color?.value
                      : themeColors?.AppBarCartQtyIconBackgroundColor?.value
                ,
                borderRadius:
                  styles?.AppBarCartQtyIconBorderRadius?.value != ""
                    ? styles?.AppBarCartQtyIconBorderRadius?.value
                    : themeColors?.AppBarCartQtyIconBorderRadius?.value,

                border: `2px solid ${styles?.AppBarCartQtyIconBorderColor?.value != ""
                  ? styles?.AppBarCartQtyIconBorderColor?.value
                  : themeColors?.AppBarCartQtyIconBorderColor?.value}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={()=> {
                if(!previewMode){
                  actions.handleOpenCart()
                }}}
            >
              {states?.cardItems?.items?.length || 0}
            </Box>
          </Box>
        </Toolbar>

        <Box
          style={{
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isBelow850 ? 70 :
              styles?.AppBarImageHeightWidth?.value != ""
                ? styles?.AppBarImageHeightWidth?.value
                : globalComponentStyles?.LogoImage?.size?.value != ""
                  ? globalComponentStyles?.LogoImage?.size?.value
                  : themeColors?.AppBarImageHeightWidth?.value,
            height: isBelow850 ? 70 :
              styles?.AppBarImageHeightWidth?.value != ""
                ? styles?.AppBarImageHeightWidth?.value
                : globalComponentStyles?.LogoImage?.size?.value != ""
                  ? globalComponentStyles?.LogoImage?.size?.value
                  : themeColors?.AppBarImageHeightWidth?.value,
            backgroundColor:
              styles?.AppBarImageBackgroundColor?.value != ""
                ? styles?.AppBarImageBackgroundColor?.value
                : globalComponentStyles?.LogoImage?.backgroundColor?.value != ""
                  ? globalComponentStyles?.LogoImage?.backgroundColor?.value
                  : themeColors?.AppBarImageBackgroundColor?.value
            ,
            borderRadius:
              styles?.AppBarImageBorderRadius?.value != ""
                ? styles?.AppBarImageBorderRadius?.value
                : globalComponentStyles?.LogoImage?.borderRadius?.value != ""
                  ? globalComponentStyles?.LogoImage?.borderRadius?.value
                  : themeColors?.AppBarImageBorderRadius?.value,
            overflow: "hidden",
          }}
        >
          {prop?.editable?.logoImage ? (
            <UniversalImage
              src={prop?.editable?.logoImage?.value}
              alt="BRGR Logo"
              layout="fill"
              objectFit="contain"
              onError={() => console.log("Image failed to load")}
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
