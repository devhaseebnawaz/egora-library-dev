import React, {useEffect} from "react";
import {
    Modal,
    Box,
    Typography,
    Button,
    TextField,
    InputAdornment,
    Autocomplete,
    FormControl,
    MenuItem,
    InputLabel,
    Select
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchMenuList from "./SearchMenuList";
import UniversalImage from "../../../UniversalImage";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import RefineLocationModal from "./RefineLocationModal";
import { getIconWidthHeight, getScreenSizeCategory } from '../../../utils/fontsize';
import { useMediaQuery } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const modalStyle = (themeColors, layout) => {
    return {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "95%",
        maxWidth: 500,
        backgroundColor:
        layout?.locationLayout?.body[0].styles?.LocationModalBackgroundColor?.value != ""
        ? `${layout?.locationLayout?.body[0].styles?.LocationModalBackgroundColor?.value}`
        
        : `${themeColors?.LocationModalBackgroundColor?.value}`,
        borderRadius:
        layout?.locationLayout?.body[0].styles?.LocationModalBorderRadius?.value != 0
        ? `${layout?.locationLayout?.body[0].styles?.LocationModalBorderRadius?.value}px`
        : `${themeColors?.LocationModalBorderRadius?.value}px`,
        boxShadow: 24,
        padding: "32px 24px 24px",
        outline: "none"
    }
};

export default function LocationModal({ themeColors, actions, prop, styles, states, isGoogleMapsLoaded, previewMode = false, globalComponentStyles, layout }) {
    layout = layout?.json ? layout?.json : layout
    const isBelow850 = useMediaQuery('(max-width:850px)');
    const filteredOutlets = states.outlets?.filter((outlet) =>
        outlet.name.toLowerCase().includes(states.searchQuery.toLowerCase())
    ) || [];
    const branchRegions = states?.franchise?.branchRegions || {};
    const linkedVenue = states?.franchise?.venues || [];
    const venues = states?.outlets
    const filteredRegions = Object.keys(branchRegions)
        .filter((key) => linkedVenue.includes(key))
        .reduce((obj, key) => {
            const matchedVenue = venues.find(
                (venue) =>
                    venue.id === key && venue?.configurations?.isAvailableOnStore === true
            );
            if (matchedVenue) {
                obj[key] = branchRegions[key];
            }
            return obj;
        }, {});

    const allRegions = Object.entries(filteredRegions).flatMap(([branchId, regions]) =>
        regions.map(region => ({
            ...region,
            branchId,
        }))
    );
    const uniqueVenues = Array.from(
        new Map(
            allRegions.map(item => [item.name.toLowerCase(), item])
        ).values()
    );

    let openModal;

    if (states.locationModalOnClick) {
        openModal = true;
    } else {
        if (states.locationModalOpen) {
            if (states.selectedVenue) {
                openModal = false;
            } else {
                openModal = true;
            }
        }
    }

    const getOrderTypeSelectorSelectedButtonStyles = {
        fontSize:
            layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeSelectorTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeSelectorTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Button?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Button?.size?.value[getScreenSizeCategory()]
                    : themeColors?.LocationModalOrderTypeSelectorTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeSelectorTextWeight?.value != ""
                ? layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeSelectorTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.LocationModalOrderTypeSelectorTextWeight?.value,
        fontFamily:
            layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeSelectorTextFont?.value != ""
                ? layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeSelectorTextFont?.value
                : globalComponentStyles?.Button?.fontFamily?.value != ""
                    ? globalComponentStyles?.Button?.fontFamily?.value
                    : themeColors?.LocationModalOrderTypeSelectorTextFont?.value,
        fontStyle:
            layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeSelectorTextStyle?.value !== ""
                ? layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeSelectorTextStyle?.value
                : globalComponentStyles?.Button?.fontStyle?.value != ""
                    ? globalComponentStyles?.Button?.fontStyle?.value
                    : themeColors?.LocationModalOrderTypeSelectorTextStyle?.value,
    };

    const getOuletSelectTextStyles = {
        color:
            layout?.locationLayout?.body[0].styles?.LocationModalPickOutletTextColor?.value !== ""
                ? `${layout?.locationLayout?.body[0].styles?.LocationModalPickOutletTextColor?.value}`
                : globalComponentStyles?.Button?.color?.value != ""
                    ? globalComponentStyles?.Button?.color?.value
                    : `${themeColors?.LocationModalPickOutletTextColor?.value}`,
        fontSize:
            layout?.locationLayout?.body[0].styles?.LocationModalPickOutletTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.locationLayout?.body[0].styles?.LocationModalPickOutletTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Button?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Button?.size?.value[getScreenSizeCategory()]
                    : themeColors?.LocationModalPickOutletTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.locationLayout?.body[0].styles?.LocationModalPickOutletTextWeight?.value != ""
                ? layout?.locationLayout?.body[0].styles?.LocationModalPickOutletTextWeight?.value
                : globalComponentStyles?.Button?.fontWeight?.value != ""
                    ? globalComponentStyles?.Button?.fontWeight?.value
                    : themeColors?.LocationModalPickOutletTextWeight?.value,
        fontFamily:
            layout?.locationLayout?.body[0].styles?.LocationModalPickOutletTextFont?.value != ""
                ? layout?.locationLayout?.body[0].styles?.LocationModalPickOutletTextFont?.value
                : globalComponentStyles?.Button?.fontFamily?.value != ""
                    ? globalComponentStyles?.Button?.fontFamily?.value
                    : themeColors?.LocationModalPickOutletTextFont?.value,
        fontStyle:
            layout?.locationLayout?.body[0].styles?.LocationModalPickOutletTextStyle?.value !== ""
                ? layout?.locationLayout?.body[0].styles?.LocationModalPickOutletTextStyle?.value
                : globalComponentStyles?.Button?.fontStyle?.value != ""
                    ? globalComponentStyles?.Button?.fontStyle?.value
                    : themeColors?.LocationModalPickOutletTextStyle?.value,
    };

    const getSelectButtonStyles = {
        backgroundColor:
            layout?.locationLayout?.body[0].styles?.LocationModalConfirmSelectionBackgroundColor?.value != ""
                ? `${layout?.locationLayout?.body[0].styles?.LocationModalConfirmSelectionBackgroundColor?.value}`
                : globalComponentStyles?.Button?.backgroundColor?.value != ""
                    ? globalComponentStyles?.Button?.backgroundColor?.value
                    : `${themeColors?.LocationModalConfirmSelectionBackgroundColor?.value}`,
        color:
            layout?.locationLayout?.body[0].styles?.LocationModalOrderConfirmSelectionTextColor?.value !== ""
                ? `${layout?.locationLayout?.body[0].styles?.LocationModalOrderConfirmSelectionTextColor?.value}`
                : globalComponentStyles?.Button?.color?.value != ""
                    ? globalComponentStyles?.Button?.color?.value
                    : `${themeColors?.LocationModalOrderConfirmSelectionTextColor?.value}`,
        fontSize:
            layout?.locationLayout?.body[0].styles?.LocationModalConfirmSelectionTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.locationLayout?.body[0].styles?.LocationModalConfirmSelectionTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Button?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Button?.size?.value[getScreenSizeCategory()]
                    : themeColors?.LocationModalConfirmSelectionTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.locationLayout?.body[0].styles?.LocationModalConfirmSelectionTextWeight?.value != ""
                ? layout?.locationLayout?.body[0].styles?.LocationModalConfirmSelectionTextWeight?.value
                : globalComponentStyles?.Button?.fontWeight?.value != ""
                    ? globalComponentStyles?.Button?.fontWeight?.value
                    : themeColors?.LocationModalConfirmSelectionTextWeight?.value,
        fontFamily:
            layout?.locationLayout?.body[0].styles?.LocationModalConfirmSelectionTextFont?.value != ""
                ? layout?.locationLayout?.body[0].styles?.LocationModalConfirmSelectionTextFont?.value
                : globalComponentStyles?.Button?.fontFamily?.value != ""
                    ? globalComponentStyles?.Button?.fontFamily?.value
                    : themeColors?.LocationModalConfirmSelectionTextFont?.value,
        fontStyle:
            layout?.locationLayout?.body[0].styles?.LocationModalConfirmSelectionTextStyle?.value !== ""
                ? layout?.locationLayout?.body[0].styles?.LocationModalConfirmSelectionTextStyle?.value
                : globalComponentStyles?.Button?.fontStyle?.value != ""
                    ? globalComponentStyles?.Button?.fontStyle?.value
                    : themeColors?.LocationModalConfirmSelectionTextStyle?.value,
        borderRadius:
            layout?.locationLayout?.body[0].styles?.LocationModalConfirmSelectionBorderRadius?.value != 0
                ? `${layout?.locationLayout?.body[0].styles?.LocationModalConfirmSelectionBorderRadius?.value}px`
                : globalComponentStyles?.Button?.borderRadius?.value != 0
                    ? `${globalComponentStyles?.Button?.borderRadius?.value}px`
                    : `${themeColors?.LocationModalConfirmSelectionBorderRadius?.value}px`,
    };


    const getUseCurrentLocationStyles = {
        color:
            layout?.locationLayout?.body[0].styles?.LocationModalOrderTypUseCurrentLocationTextColor?.value !== ""
                ? `${layout?.locationLayout?.body[0].styles?.LocationModalOrderTypUseCurrentLocationTextColor?.value}`
                : globalComponentStyles?.Button?.color?.value != ""
                    ? globalComponentStyles?.Button?.color?.value
                    : `${themeColors?.LocationModalOrderTypUseCurrentLocationTextColor?.value}`,
        fontSize:
            layout?.locationLayout?.body[0].styles?.LocationModalUseCurrentLocationTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.locationLayout?.body[0].styles?.LocationModalUseCurrentLocationTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Button?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Button?.size?.value[getScreenSizeCategory()]
                    : themeColors?.LocationModalUseCurrentLocationTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.locationLayout?.body[0].styles?.LocationModalUseCurrentLocationTextWeight?.value != ""
                ? layout?.locationLayout?.body[0].styles?.LocationModalUseCurrentLocationTextWeight?.value
                : globalComponentStyles?.Button?.fontWeight?.value != ""
                    ? globalComponentStyles?.Button?.fontWeight?.value
                    : themeColors?.LocationModalUseCurrentLocationTextWeight?.value,
        fontFamily:
            layout?.locationLayout?.body[0].styles?.LocationModalUseCurrentLocationTextFont?.value != ""
                ? layout?.locationLayout?.body[0].styles?.LocationModalUseCurrentLocationTextFont?.value
                : globalComponentStyles?.Button?.fontFamily?.value != ""
                    ? globalComponentStyles?.Button?.fontFamily?.value
                    : themeColors?.LocationModalUseCurrentLocationTextFont?.value,
        fontStyle:
            layout?.locationLayout?.body[0].styles?.LocationModalUseCurrentLocationTextStyle?.value !== ""
                ? layout?.locationLayout?.body[0].styles?.LocationModalUseCurrentLocationTextStyle?.value
                : globalComponentStyles?.Button?.fontStyle?.value != ""
                    ? globalComponentStyles?.Button?.fontStyle?.value
                    : themeColors?.LocationModalUseCurrentLocationTextStyle?.value,
    };

    const getUseCurrentLocationIconStyles = {
        width: getIconWidthHeight(layout?.locationLayout?.body[0].styles?.LocationModalUseCurrentLocationIconHeightWidth?.value != ""
            ? layout?.locationLayout?.body[0].styles?.LocationModalUseCurrentLocationIconHeightWidth?.value
            : globalComponentStyles?.Icon?.size?.value != ""
                ? globalComponentStyles?.Icon?.size?.value
                : themeColors?.LocationModalUseCurrentLocationIconHeightWidth?.value, isBelow850, 18),

        height: getIconWidthHeight(layout?.locationLayout?.body[0].styles?.LocationModalUseCurrentLocationIconHeightWidth?.value != ""
            ? layout?.locationLayout?.body[0].styles?.LocationModalUseCurrentLocationIconHeightWidth?.value
            : globalComponentStyles?.Icon?.size?.value != ""
                ? globalComponentStyles?.Icon?.size?.value
                : themeColors?.LocationModalUseCurrentLocationIconHeightWidth?.value, isBelow850, 18),

        color: layout?.locationLayout?.body[0].styles?.LocationModalUseCurrentLocationIconColor?.value
            ? layout?.locationLayout?.body[0].styles?.LocationModalUseCurrentLocationIconColor?.value
            : globalComponentStyles?.Icon?.color?.value != ""
                ? globalComponentStyles?.Icon?.color?.value
                : themeColors?.LocationModalUseCurrentLocationIconColor?.value

    };


    const getSearchLocationIconStyles = {
        width: getIconWidthHeight(layout?.locationLayout?.body[0].styles?.LocationModalSearchLocationButtonIconHeightWidth?.value != ""
            ? layout?.locationLayout?.body[0].styles?.LocationModalSearchLocationButtonIconHeightWidth?.value
            : globalComponentStyles?.Icon?.size?.value != ""
                ? globalComponentStyles?.Icon?.size?.value
                : themeColors?.LocationModalSearchLocationButtonIconHeightWidth?.value, isBelow850, 18),

        height: getIconWidthHeight(layout?.locationLayout?.body[0].styles?.LocationModalSearchLocationButtonIconHeightWidth?.value != ""
            ? layout?.locationLayout?.body[0].styles?.LocationModalSearchLocationButtonIconHeightWidth?.value
            : globalComponentStyles?.Icon?.size?.value != ""
                ? globalComponentStyles?.Icon?.size?.value
                : themeColors?.LocationModalSearchLocationButtonIconHeightWidth?.value, isBelow850, 18),

        color: layout?.locationLayout?.body[0].styles?.LocationModalSearchLocationButtonIconColor?.value
            ? layout?.locationLayout?.body[0].styles?.LocationModalSearchLocationButtonIconColor?.value
            : globalComponentStyles?.Icon?.color?.value != ""
                ? globalComponentStyles?.Icon?.color?.value
                : themeColors?.LocationModalSearchLocationButtonIconColor?.value

    };

    const getSearchLocationStyles = {
        color:
            layout?.locationLayout?.body[0].styles?.LocationModalSearchLocationButtonColor?.value !== ""
                ? `${layout?.locationLayout?.body[0].styles?.LocationModalSearchLocationButtonColor?.value}`
                : globalComponentStyles?.Button?.color?.value != ""
                    ? globalComponentStyles?.Button?.color?.value
                    : `${themeColors?.LocationModalSearchLocationButtonColor?.value}`,
        fontSize:
            layout?.locationLayout?.body[0].styles?.LocationModalSearchLocationButtonTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.locationLayout?.body[0].styles?.LocationModalSearchLocationButtonTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Button?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Button?.size?.value[getScreenSizeCategory()]
                    : themeColors?.LocationModalSearchLocationButtonTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.locationLayout?.body[0].styles?.LocationModalSearchLocationButtonTextWeight?.value != ""
                ? layout?.locationLayout?.body[0].styles?.LocationModalSearchLocationButtonTextWeight?.value
                : globalComponentStyles?.Button?.fontWeight?.value != ""
                    ? globalComponentStyles?.Button?.fontWeight?.value
                    : themeColors?.LocationModalSearchLocationButtonTextWeight?.value,
        fontFamily:
            layout?.locationLayout?.body[0].styles?.LocationModalSearchLocationButtonTextFont?.value != ""
                ? layout?.locationLayout?.body[0].styles?.LocationModalSearchLocationButtonTextFont?.value
                : globalComponentStyles?.Button?.fontFamily?.value != ""
                    ? globalComponentStyles?.Button?.fontFamily?.value
                    : themeColors?.LocationModalSearchLocationButtonTextFont?.value,
        fontStyle:
            layout?.locationLayout?.body[0].styles?.LocationModalSearchLocationButtonTextStyle?.value !== ""
                ? layout?.locationLayout?.body[0].styles?.LocationModalSearchLocationButtonTextStyle?.value
                : globalComponentStyles?.Button?.fontStyle?.value != ""
                    ? globalComponentStyles?.Button?.fontStyle?.value
                    : themeColors?.LocationModalSearchLocationButtonTextStyle?.value,
    };


    const getSelectOutletStyles = {
        color:
            layout?.locationLayout?.body[0].styles?.LocationModalSelectOutletTextColor?.value !== ""
                ? `${layout?.locationLayout?.body[0].styles?.LocationModalSelectOutletTextColor?.value}`
                : `${themeColors?.LocationModalSelectOutletTextColor?.value}`,
        fontSize:
            layout?.locationLayout?.body[0].styles?.LocationModalSelectOutletTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.locationLayout?.body[0].styles?.LocationModalSelectOutletTextSize?.value[getScreenSizeCategory()]
                : themeColors?.LocationModalSelectOutletTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.locationLayout?.body[0].styles?.LocationModalSelectOutletTextWeight?.value != ""
                ? layout?.locationLayout?.body[0].styles?.LocationModalSelectOutletTextWeight?.value
                : themeColors?.LocationModalSelectOutletTextWeight?.value,
        fontFamily:
            layout?.locationLayout?.body[0].styles?.LocationModalSelectOutletTextFont?.value != ""
                ? layout?.locationLayout?.body[0].styles?.LocationModalSelectOutletTextFont?.value
                : themeColors?.LocationModalSelectOutletTextFont?.value,
        fontStyle:
            layout?.locationLayout?.body[0].styles?.LocationModalSelectOutletTextStyle?.value !== ""
                ? layout?.locationLayout?.body[0].styles?.LocationModalSelectOutletTextStyle?.value
                : themeColors?.LocationModalSelectOutletTextStyle?.value,
    };

    const handleOutletSelection = async () => {
        if (!states?.addressForPickUpMode && states.franchise.configurations.isEnabledPickUpLocation) {
            try {
                const response = await actions.handleLocateMe();
                if (response) {
                    states.setGetNewData(true);
                    actions.handleOpenLocationModal(false);
                    actions.handleOpenLocationModalOnClick(false);
                    actions.handleDeleteCartBySessionId();
                    actions.handleSetSelectedVenue(states.selectedOutlet);
                }
            } catch (err) {
                console.log(err);
            }
        }

        if (states?.addressForPickUpMode || !states.franchise.configurations.isEnabledPickUpLocation) {
            states.setGetNewData(true);
            actions.handleOpenLocationModal(false);
            actions.handleOpenLocationModalOnClick(false);
            actions.handleDeleteCartBySessionId();
            actions.handleSetSelectedVenue(states.selectedOutlet);
        }
    };

  function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
        const R = 6371e3;
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    const handleSelectedLocation = async () => {
        if (states.franchise.configurations.isEnabledDeliveryLocation && !states.franchise.configurations.isRegionBasedDeliveryOnStore) {
            try {
                const response = await actions.handleLocateMe();
                if (response) {
                    const [franLat, franLng] = states.latLongForDelivery.split(",").map(Number);
                    const [userLat, userLng] = response.split(",").map(Number);

                    const distance = getDistanceFromLatLonInMeters(franLat, franLng, userLat, userLng);

                    if (distance <= states.franchise.deliveryRadius * 1000) {
                        actions.handleSelectedLocation(states.latLongForDelivery);
                    } else {
                        states.setErrorForToFarLocation("Sorry! You are too far from the delivery address.");
                    }
                }
            } catch (error) {
                console.log("Error::", error);
            }
        } else if (states.franchise.configurations.isRegionBasedDeliveryOnStore) {
            if (states.franchise.configurations.isLocationRestrictedRegionBasedDeliveryOnStore) {
                try {
                    const response = await actions.handleLocateMe();
                    if (response) {
                        actions.handleSelectedRegion(states?.selectedRegion);
                    }
                } catch (error) {
                    console.log("Error::", error);
                }
            } else {
                actions.handleSelectedRegion(states?.selectedRegion);
            }
        } else {
            actions.handleSelectedLocation(states.latLongForDelivery);
        }
    };
    
    const content = (
        <Box >
            <Box
                sx={{
                    ...(!previewMode
                        ? {
                            position: "absolute",
                            top: "10px",
                            left: "50%",
                            transform: "translateX(-50%)",
                        }
                        : {
                            margin: "0 auto",
                        }),
                    width: "80px",
                    height: "80px",
                    borderRadius:
                        layout?.locationLayout?.body[0].styles?.LocationModalImageBorderRadius?.value !== ""
                            ? `${layout?.locationLayout?.body[0].styles?.LocationModalImageBorderRadius?.value}px`
                            : `${themeColors?.LocationModalImageBorderRadius?.value || 0}px`,
                    backgroundColor:
                        layout?.locationLayout?.body[0].styles?.LocationModalImageBackgroundColor?.value != ""
                            ? `${layout?.locationLayout?.body[0].styles?.LocationModalImageBackgroundColor?.value}`
                            : `${themeColors?.LocationModalImageBackgroundColor?.value}`,
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <UniversalImage
                    src={prop.editable.logoImage.value}
                    alt="BRGR Logo"
                    layout="fill"
                    objectFit="contain"
                />
            </Box>

            {/* Content */}
            <Typography
                align="center"
                sx={{
                    color:
                        layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeHeadingColor?.value !== ""
                            ? `${layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeHeadingColor?.value}`
                            : globalComponentStyles?.Text?.color?.value != ""
                                ? globalComponentStyles?.Text?.color?.value
                                : `${themeColors?.LocationModalOrderTypeHeadingColor?.value}`,
                    fontSize:
                        layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeHeadingTextSize?.value[getScreenSizeCategory()] !== 0
                            ? layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeHeadingTextSize?.value[getScreenSizeCategory()]
                            : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                                ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                                : themeColors?.LocationModalOrderTypeHeadingTextSize?.value[getScreenSizeCategory()],
                    fontWeight:
                        layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeHeadingTextWeight?.value !== 0
                            ? layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeHeadingTextWeight?.value
                            : globalComponentStyles?.Text?.fontWeight?.value != 0
                                ? globalComponentStyles?.Text?.fontWeight?.value
                                : themeColors?.LocationModalOrderTypeHeadingTextWeight?.value,

                    fontFamily: layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeHeadingTextFont?.value !== 0
                        ? `${layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeHeadingTextFont?.value}`
                        : globalComponentStyles?.Text?.fontFamily?.value != ""
                            ? globalComponentStyles?.Text?.fontFamily?.value
                            : `${themeColors?.LocationModalOrderTypeHeadingTextFont?.value}`,

                    fontStyle: layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeHeadingTextStyle?.value !== ""
                        ? `${layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeHeadingTextStyle?.value}`
                        : `${themeColors?.LocationModalOrderTypeHeadingTextStyle?.value}`,

                    marginTop: "60px",
                    marginBottom: "16px",
                }}
            >
                Select your order type
            </Typography>

            {/* Order Type Buttons */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                <Box
                    sx={{
                        display: "flex",
                        backgroundColor:
                            layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeSelectorBackgroundColor?.value !== ""
                                ? layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeSelectorBackgroundColor?.value
                                : globalComponentStyles?.Button?.backgroundColor?.value != ""
                                    ? globalComponentStyles?.Button?.backgroundColor?.value
                                    : themeColors?.LocationModalOrderTypeSelectorBackgroundColor?.value,
                        borderRadius:
                            layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeSelectorBorderRadius?.value != 0
                                ? `${layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeSelectorBorderRadius?.value}px`
                                : globalComponentStyles?.Button?.borderRadius?.value != 0
                                    ? `${globalComponentStyles?.Button?.borderRadius?.value}px`
                                    : `${themeColors?.LocationModalOrderTypeSelectorBorderRadius?.value}px`,
                        p: "4px",
                    }}
                >
                    <Button
                        onClick={() => actions.handleSetOrderType("storeDelivery")}
                        sx={{
                            borderRadius:
                                layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeSelectorButtonBorderRadius?.value != 0
                                    ? `${layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeSelectorButtonBorderRadius?.value}px`
                                    : globalComponentStyles?.Button?.borderRadius?.value != 0
                                        ? `${globalComponentStyles?.Button?.borderRadius?.value}px`
                                        : `${themeColors?.LocationModalOrderTypeSelectorButtonBorderRadius?.value}px`,
                            px: 3,
                            py: 1,
                            bgcolor: states.orderType === "storeDelivery" ?
                                layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeSelectedSelectorColor?.value !== ""
                                    ? layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeSelectedSelectorColor?.value
                                    : globalComponentStyles?.Button?.backgroundColor?.value != ""
                                        ? globalComponentStyles?.Button?.backgroundColor?.value
                                        : themeColors?.LocationModalOrderTypeSelectedSelectorColor?.value : "transparent",
                            color: states.orderType === "storeDelivery" ?
                                layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeSelectedSelectorTextColor?.value !== ""
                                    ? layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeSelectedSelectorTextColor?.value
                                    : globalComponentStyles?.Button?.backgroundColor?.value != ""
                                        ? globalComponentStyles?.Button?.backgroundColor?.value
                                        : themeColors?.LocationModalOrderTypeSelectedSelectorTextColor?.value :

                                layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeUnSelectedSelectorTextColor?.value !== ""
                                    ? layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeUnSelectedSelectorTextColor?.value
                                    : globalComponentStyles?.Button?.backgroundColor?.value != ""
                                        ? globalComponentStyles?.Button?.backgroundColor?.value
                                        : themeColors?.LocationModalOrderTypeUnSelectedSelectorTextColor?.value,
                            boxShadow: "none",
                            minWidth: "100px",
                            ...getOrderTypeSelectorSelectedButtonStyles,
                               "&:hover": {
                                backgroundColor: "transparent"
                            },
                        }}
                    >
                        DELIVERY
                    </Button>
                    <Button
                        onClick={() => actions.handleSetOrderType("storePickUp")}
                        sx={{
                            borderRadius:
                                layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeSelectorButtonBorderRadius?.value != 0
                                    ? `${layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeSelectorButtonBorderRadius?.value}px`
                                    : globalComponentStyles?.Button?.borderRadius?.value != 0
                                        ? `${globalComponentStyles?.Button?.borderRadius?.value}px`
                                        : `${themeColors?.LocationModalOrderTypeSelectorButtonBorderRadius?.value}px`,

                            px: 3,
                            py: 1,
                            bgcolor: states.orderType === "storePickUp" ?
                                layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeSelectedSelectorColor?.value !== ""
                                    ? layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeSelectedSelectorColor?.value
                                    : globalComponentStyles?.Button?.backgroundColor?.value != ""
                                        ? globalComponentStyles?.Button?.backgroundColor?.value
                                        : themeColors?.LocationModalOrderTypeSelectedSelectorColor?.value : "transparent",
                            color: states.orderType === "storePickUp" ?
                                layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeSelectedSelectorTextColor?.value !== ""
                                    ? layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeSelectedSelectorTextColor?.value
                                    : globalComponentStyles?.Button?.backgroundColor?.value != ""
                                        ? globalComponentStyles?.Button?.backgroundColor?.value
                                        : themeColors?.LocationModalOrderTypeSelectedSelectorTextColor?.value :

                                layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeUnSelectedSelectorTextColor?.value !== ""
                                    ? layout?.locationLayout?.body[0].styles?.LocationModalOrderTypeUnSelectedSelectorTextColor?.value
                                    : globalComponentStyles?.Button?.backgroundColor?.value != ""
                                        ? globalComponentStyles?.Button?.backgroundColor?.value
                                        : themeColors?.LocationModalOrderTypeUnSelectedSelectorTextColor?.value
                            ,
                            boxShadow: "none",
                            minWidth: "100px",
                            ...getOrderTypeSelectorSelectedButtonStyles,
                               "&:hover": {
                                backgroundColor: "transparent"
                            },
                        }}
                    >
                        PICKUP
                    </Button>
                </Box>
            </Box>

            {/* Search Location Field */}
            { states.orderType === "storeDelivery" && <Typography
                    variant="body2"
                    sx={{
                        marginBottom: "12px",
                        textAlign: "center",
                        color:
                            layout?.locationLayout?.body[0].styles?.LocationModalSelectLocationHeadingColor?.value !== ""
                                ? `${layout?.locationLayout?.body[0].styles?.LocationModalSelectLocationHeadingColor?.value}`
                                : globalComponentStyles?.Text?.color?.value != ""
                                    ? globalComponentStyles?.Text?.color?.value
                                    : `${themeColors?.LocationModalSelectLocationHeadingColor?.value}`,
                        fontSize:
                            layout?.locationLayout?.body[0].styles?.LocationModalSelectLocationHeadingTextSize?.value[getScreenSizeCategory()] !== 0
                                ? layout?.locationLayout?.body[0].styles?.LocationModalSelectLocationHeadingTextSize?.value[getScreenSizeCategory()]
                                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                                    : themeColors?.LocationModalSelectLocationHeadingTextSize?.value[getScreenSizeCategory()],
                        fontWeight:
                            layout?.locationLayout?.body[0].styles?.LocationModalSelectLocationHeadingTextWeight?.value !== 0
                                ? layout?.locationLayout?.body[0].styles?.LocationModalSelectLocationHeadingTextWeight?.value
                                : globalComponentStyles?.Text?.fontWeight?.value != 0
                                    ? globalComponentStyles?.Text?.fontWeight?.value
                                    : themeColors?.LocationModalSelectLocationHeadingTextWeight?.value,
                        fontFamily:
                            layout?.locationLayout?.body[0].styles?.LocationModalSelectLocationHeadingTextFont?.value !== 0
                                ? `${layout?.locationLayout?.body[0].styles?.LocationModalSelectLocationHeadingTextFont?.value}`
                                : globalComponentStyles?.Text?.fontFamily?.value != ""
                                    ? globalComponentStyles?.Text?.fontFamily?.value
                                    : `${themeColors?.LocationModalSelectLocationHeadingTextFont?.value}`,

                        fontStyle: layout?.locationLayout?.body[0].styles?.LocationModalSelectLocationHeadingTextStyle?.value !== ""
                            ? `${layout?.locationLayout?.body[0].styles?.LocationModalSelectLocationHeadingTextStyle?.value}`
                            : `${themeColors?.LocationModalSelectLocationHeadingTextStyle?.value}`,

                    }}
                >
                    Please select your location
                </Typography>
            }
            {
                states.orderType === "storePickUp" && <Typography
                    sx={{ marginBottom: "12px", textAlign: "center", ...getOuletSelectTextStyles }}
                >
                    Which outlet would you like to pick-up from?
                </Typography>
            }

            {
                states?.orderType === "storePickUp" && (
                    <>
                    {/* <Autocomplete
                        options={filteredOutlets}
                        getOptionLabel={(option) => {
                            if (typeof option === "string") return option;
                            if (option && typeof option.name === "string") return option.name;
                            return "";
                        }}
                        value={states.selectedOutlet}
                        onChange={(event, newValue) => {
                            if (!newValue?.isOnlineForStore) return;
                            states.setSelectedOutlet(newValue);
                        }}
                        inputValue={states.searchQuery}
                        onInputChange={(event, newInputValue) => {
                            states.setSearchQuery(newInputValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Select Outlet"
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    ...params.InputProps,
                                    sx: {
                                        borderRadius:
                                            layout?.locationLayout?.body[0].styles?.LocationModalSelectOutletBorderRadius?.value != 0
                                                ? `${layout?.locationLayout?.body[0].styles?.LocationModalSelectOutletBorderRadius?.value}px`
                                                : `${themeColors?.LocationModalSelectOutletBorderRadius?.value}px`,
                                        height: "48px",
                                        backgroundColor:
                                            layout?.locationLayout?.body[0].styles?.LocationModalSelectOutletBackgroundColor?.value !== ""
                                                ? layout?.locationLayout?.body[0].styles?.LocationModalSelectOutletBackgroundColor?.value
                                                : themeColors?.LocationModalSelectOutletBackgroundColor?.value,
                                        '& .MuiInputBase-input': {
                                            ...getSelectOutletStyles,
                                        },
                                    },
                                }}
                            />
                        )}
                        renderOption={(props, option) => (
                            <li
                                {...props}
                                key={option._id}
                                style={{
                                    opacity: option.isOnlineForStore ? 1 : 0.5,
                                    pointerEvents: option.isOnlineForStore ? 'auto' : 'none',
                                }}
                            >
                                <Box>
                                    <Typography fontWeight="bold">
                                        {option.name} {!option.isOnlineForStore && "(Offline)"}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {option?.venueAddressOne} {option?.venueAddressTwo}
                                    </Typography>
                                </Box>
                            </li>
                        )}
                        noOptionsText="No outlets found"
                        sx={{ mb: 2 }}
                    /> */}
                     <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel id="select-outlet-label">Select Outlet</InputLabel>
                            <Select
                                labelId="select-outlet-label"
                                value={states.selectedOutlet?._id || ""}
                                onChange={(e) => {
                                    const selected = filteredOutlets.find(
                                        (outlet) => outlet._id === e.target.value
                                    );
                                    if (!selected?.isOnlineForStore) return;
                                    states.setSelectedOutlet(selected);
                                }}
                                label="Select Outlet"
                                renderValue={(selectedId) => {
                                    const selected = filteredOutlets.find(o => o._id === selectedId);
                                    return selected ? selected.name : "";
                                }}
                                sx={{
                                    borderRadius:
                                        layout?.locationLayout?.body[0].styles?.LocationModalSelectOutletBorderRadius?.value != 0
                                            ? `${layout?.locationLayout?.body[0].styles?.LocationModalSelectOutletBorderRadius?.value}px`
                                            : `${themeColors?.LocationModalSelectOutletBorderRadius?.value}px`,
                                    backgroundColor:
                                        layout?.locationLayout?.body[0].styles?.LocationModalSelectOutletBackgroundColor?.value !== ""
                                            ? layout?.locationLayout?.body[0].styles?.LocationModalSelectOutletBackgroundColor?.value
                                            : themeColors?.LocationModalSelectOutletBackgroundColor?.value,
                                    "& .MuiSelect-select": {
                                        ...getSelectOutletStyles,
                                    },
                                }}
                            >
                                {filteredOutlets.length > 0 ? (
                                    filteredOutlets.map((outlet) => (
                                        <MenuItem
                                            key={outlet._id}
                                            value={outlet._id}
                                            disabled={!outlet.isOnlineForStore}
                                        >
                                            <Box>
                                                <Typography fontWeight="bold">{outlet.name}</Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {outlet.venueAddressOne} {outlet.venueAddressTwo}
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>
                                        <Typography>
                                            No outlets found
                                        </Typography>
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </>
                )
            }

            {
                (states?.orderType === "storeDelivery" && !states?.franchise?.configurations?.isRegionBasedDeliveryOnStore) ?
                    (
                        <>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 1,
                                }}
                            >
                                <TextField
                                    placeholder="Search Location"
                                    variant="outlined"
                                    value={states?.value}
                                    onChange={(e) => actions?.handleInput(e)}
                                    autoComplete="off"
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <ArrowForwardIcon sx={{ ...getSearchLocationIconStyles }} />
                                            </InputAdornment>
                                        ),
                                        sx: {
                                            backgroundColor:
                                                layout?.locationLayout?.body[0].styles?.LocationModalSearchLocationButtonBackgroundColor?.value !== ""
                                                    ? layout?.locationLayout?.body[0].styles?.LocationModalSearchLocationButtonBackgroundColor?.value
                                                    : globalComponentStyles?.Button?.backgroundColor?.value != ""
                                                        ? globalComponentStyles?.Button?.backgroundColor?.value
                                                        : themeColors?.LocationModalSearchLocationButtonBackgroundColor?.value,
                                            borderRadius:
                                                layout?.locationLayout?.body[0].styles?.LocationModalSearchLocationButtonBorderRadius?.value != 0
                                                    ? `${layout?.locationLayout?.body[0].styles?.LocationModalSearchLocationButtonBorderRadius?.value}px`
                                                    : globalComponentStyles?.Button?.borderRadius?.value != 0
                                                        ? `${globalComponentStyles?.Button?.borderRadius?.value}px`
                                                        : `${themeColors?.LocationModalSearchLocationButtonBorderRadius?.value}px`,
                                            height: "44px",
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                border: "none",
                                            },
                                            ...getSearchLocationStyles
                                        },
                                    }}
                                />
                            </Box>

                            {states.value?.length > 0 && states.data?.length > 0 && (
                                <SearchMenuList
                                    data={states.data}
                                    actions={actions}
                                    onSelect={(e) => actions?.handleSelect(e)}
                                    themeColors={themeColors}
                                    layout={layout}
                                    globalComponentStyles={globalComponentStyles}
                                />
                            )}
                        </>
                    ) : (states?.orderType === "storeDelivery" && states?.franchise?.configurations?.isRegionBasedDeliveryOnStore) ? (
                        <>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 1,
                                }}
                            >
                                <TextField
                                    placeholder="Lahore"
                                    variant="outlined"
                                    value={states?.value}
                                    autoComplete="off"
                                    fullWidth
                                    disabled
                                    InputProps={{
                                        sx: {
                                            backgroundColor:
                                                layout?.locationLayout?.body[0].styles?.LocationModalSearchLocationButtonBackgroundColor?.value !== ""
                                                    ? layout?.locationLayout?.body[0].styles?.LocationModalSearchLocationButtonBackgroundColor?.value
                                                    : globalComponentStyles?.Button?.backgroundColor?.value != ""
                                                        ? globalComponentStyles?.Button?.backgroundColor?.value
                                                        : themeColors?.LocationModalSearchLocationButtonBackgroundColor?.value,
                                            borderRadius:
                                                layout?.locationLayout?.body[0].styles?.LocationModalSearchLocationButtonBorderRadius?.value != 0
                                                    ? `${layout?.locationLayout?.body[0].styles?.LocationModalSearchLocationButtonBorderRadius?.value}px`
                                                    : globalComponentStyles?.Button?.borderRadius?.value != 0
                                                        ? `${globalComponentStyles?.Button?.borderRadius?.value}px`
                                                        : `${themeColors?.LocationModalSearchLocationButtonBorderRadius?.value}px`,
                                            height: "44px",
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                border: "none",
                                            },
                                            ...getSearchLocationStyles
                                        },
                                    }}
                                />
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 1,
                                }}
                            >
                                <Autocomplete
                                    fullWidth
                                    options={uniqueVenues}
                                    getOptionLabel={(option) => option?.name || ""}
                                    value={states?.selectedRegion || null}
                                    onChange={(event, newValue) => actions?.handleSelectRegion(newValue)}
                                    noOptionsText="No options found"
                                    popupIcon={null} // hide default chevron
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Select Area / Sub Region"
                                            variant="outlined"
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <InputAdornment
                                                        sx={{
                                                            position: "absolute",
                                                            right: 8,
                                                            pointerEvents: "none",
                                                        }}>
                                                        <ArrowDropDownIcon sx={{ ...getSearchLocationIconStyles }} />

                                                    </InputAdornment>
                                                ),
                                                sx: {
                                                    backgroundColor:
                                                        layout?.locationLayout?.body[0].styles?.LocationModalSearchLocationButtonBackgroundColor?.value !== ""
                                                            ? layout?.locationLayout?.body[0].styles?.LocationModalSearchLocationButtonBackgroundColor?.value
                                                            : globalComponentStyles?.Button?.backgroundColor?.value !== ""
                                                                ? globalComponentStyles?.Button?.backgroundColor?.value
                                                                : themeColors?.LocationModalSearchLocationButtonBackgroundColor?.value,
                                                    borderRadius:
                                                        layout?.locationLayout?.body[0].styles?.LocationModalSearchLocationButtonBorderRadius?.value !== 0
                                                            ? `${layout?.locationLayout?.body[0].styles?.LocationModalSearchLocationButtonBorderRadius?.value}px`
                                                            : globalComponentStyles?.Button?.borderRadius?.value !== 0
                                                                ? `${globalComponentStyles?.Button?.borderRadius?.value}px`
                                                                : `${themeColors?.LocationModalSearchLocationButtonBorderRadius?.value}px`,
                                                    height: "44px",
                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                        border: "none",
                                                    },
                                                    ...getSearchLocationStyles,
                                                },
                                            }}
                                        />
                                    )}
                                />
                            </Box>
                        </>
                    ) : null
            }

            {
                (states?.orderType === "storeDelivery" && !states?.franchise?.configurations?.isRegionBasedDeliveryOnStore) && (<Box
                    onClick={() => states?.setRefineModalOpen(true)}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor:
                            layout?.locationLayout?.body[0].styles?.LocationModalUseCurrentLocationBackgroundColor?.value !== ""
                                ? layout?.locationLayout?.body[0].styles?.LocationModalUseCurrentLocationBackgroundColor?.value
                                : globalComponentStyles?.Button?.backgroundColor?.value != ""
                                    ? globalComponentStyles?.Button?.backgroundColor?.value
                                    : themeColors?.LocationModalUseCurrentLocationBackgroundColor?.value,
                        px: 2,
                        py: 3,
                        mb: 2,
                        cursor: "pointer",
                        width: "100%",
                        borderRadius:
                            layout?.locationLayout?.body[0].styles?.LocationModalUseCurrentLocationBorderRadius?.value != 0
                                ? `${layout?.locationLayout?.body[0].styles?.LocationModalUseCurrentLocationBorderRadius?.value}px`
                                : globalComponentStyles?.Button?.borderRadius?.value != 0
                                    ? `${globalComponentStyles?.Button?.borderRadius?.value}px`
                                    : `${themeColors?.LocationModalUseCurrentLocationBorderRadius?.value}px`,
                    }}
                >
                    <MyLocationIcon sx={{
                        mr: 1,
                        ...getUseCurrentLocationIconStyles
                    }} />
                    <Typography
                        sx={{
                            ...getUseCurrentLocationStyles,
                        }}
                    >
                        Use Current Location
                    </Typography>
                </Box>)
            }

            {
                states?.currentLocation && states?.orderType === "storeDelivery" && !states?.franchise?.configurations?.isRegionBasedDeliveryOnStore && <Box
                    sx={{
                        // backgroundColor: "#f9f9f9",
                        p: 2,
                        borderRadius: "12px",
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 3,
                    }}
                >
                    <Typography sx={{ fontSize: "14px", mb: 0.5 }}>
                        {states.currentLocation}
                    </Typography>
                    <Typography
                        component="span"
                        sx={{
                            color: "blue",
                            cursor: "pointer",
                            fontWeight: "bold",
                            width: "fit-content",
                        }}
                        onClick={() => states?.setRefineModalOpen(true)}
                    >
                        change
                    </Typography>
                </Box>
            }


            {/* Confirm Button */}
            {
                states?.orderType === 'storeDelivery' &&
                <>
                    <Button
                        fullWidth
                        onClick={handleSelectedLocation}
                        sx={{
                            py: 1.5,
                            textTransform: "none",
                            ":hover": {
                                backgroundColor: layout?.locationLayout?.body[0].styles?.LocationModalOrderConfirmSelectionHoverTextColor?.value !== ""
                                    ? `${layout?.locationLayout?.body[0].styles?.LocationModalOrderConfirmSelectionHoverTextColor?.value}`
                                    : `${themeColors?.LocationModalOrderConfirmSelectionHoverTextColor?.value}`
                            },
                            ...getSelectButtonStyles
                        }}
                        disabled={!previewMode && !states.currentLocation && !states?.selectedRegion?.name}
                    >
                        Confirm Selection
                    </Button>
                    {states?.noVenueFound && (
                        <Typography
                            variant="body2"
                            color="error"
                            sx={{ mt: 2, textAlign: "center" }}
                        >
                            {states.noVenueFound}
                        </Typography>
                    )}
                    {states?.errorForToFarLocation && (
                        <Typography
                            variant="body2"
                            color="error"
                            sx={{ mt: 2, textAlign: "center" }}
                        >
                            {states?.errorForToFarLocation}
                        </Typography>
                    )}
                </>
            }

            {
                states?.orderType === 'storePickUp' &&
                <>
                    <Button
                        fullWidth
                        onClick={handleOutletSelection}
                        sx={{

                            py: 1.5,
                            textTransform: "none",
                            ":hover": {
                                backgroundColor: layout?.locationLayout?.body[0].styles?.LocationModalOrderConfirmSelectionHoverTextColor?.value !== ""
                                    ? `${layout?.locationLayout?.body[0].styles?.LocationModalOrderConfirmSelectionHoverTextColor?.value}`
                                    : `${themeColors?.LocationModalOrderConfirmSelectionHoverTextColor?.value}`

                            },
                            ...getSelectButtonStyles
                        }}
                        disabled={
                            !previewMode &&
                            (!states.selectedOutlet || !states.selectedOutlet.isOnlineForStore)
                        }
                    >
                        Select
                    </Button>
                    
                    {states?.errorForDeniedLocation && (
                        <Typography
                            variant="body2"
                            color="error"
                            sx={{ mt: 2, textAlign: "center" }}
                        >
                            {states?.errorForDeniedLocation}
                        </Typography>
                    )}
                </>
            }
        </Box >
    );


    return previewMode ? (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    width: 500,
                    boxShadow: 24,
                    padding: "32px 24px 24px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor:
                        layout?.locationLayout?.body[0].styles?.LocationModalBackgroundColor?.value != ""
                            ? `${layout?.locationLayout?.body[0].styles?.LocationModalBackgroundColor?.value}`

                            : `${themeColors?.LocationModalBackgroundColor?.value}`,
                    borderRadius:
                        layout?.locationLayout?.body[0].styles?.LocationModalBorderRadius?.value != 0
                            ? `${layout?.locationLayout?.body[0].styles?.LocationModalBorderRadius?.value}px`
                            : `${themeColors?.LocationModalBorderRadius?.value}px`,
                }}

            >{content}</Box>
        </Box>
    ) : (
        <>
            <Modal open={openModal}>
                <Box sx={modalStyle(themeColors, layout)} >
                    {content}
                </Box>
            </Modal>
            <RefineLocationModal
                open={states?.refineModalOpen}
                states={states}
                actions={actions}
                onClose={() => states?.setRefineModalOpen(false)}
                currentCoords={states?.userCoordinates}
                onSave={({ coords, address }) => {
                    states?.setUserCoordinates(coords);
                }}
            />
        </>
    );

}
