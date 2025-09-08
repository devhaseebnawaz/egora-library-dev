import React, { useEffect } from "react";
import { Box, Typography, Stack, Divider, Button, Chip, Grid, TableContainer, Paper, Table, TableHead, TableCell, TableRow, TableBody, useMediaQuery, Link, IconButton } from '@mui/material';
import cartIcon from "@iconify-icons/mdi/cart";
import creditCardIcon from '@iconify-icons/mdi/credit-card-outline';
import locationIcon from '@iconify-icons/mdi/map-marker';
import { Icon } from "@iconify/react";
import { fNumber } from "../../../utils/formatNumber";
import UniversalImage from "../../../UniversalImage";
import { formatTime, formatDate } from "../../../utils/formatDateTime";
import { getScreenSizeCategory, getIconWidthHeight } from '../../../utils/fontsize';

export default function OrderSuccessPage({ open, onClose, themeColors, actions, prop, styles, states, globalComponentStyles, layout }) {

    layout = layout?.json ? layout?.json : layout
    const isBelow850 = useMediaQuery('(max-width:850px)');
    const { orderData } = states ?? {}
    const { orderType, customer, billNumber, tax, deliveryFees, serviceFees, platformFees, subTotal, total, paymentType, venueId, items, state, createdAt } = orderData ?? {}
    const { name, venueAddressOne, venueAddressTwo, venuePhoneNumber, franchiseId } = venueId ?? {}
    const { firstName, lastName, address, phone } = customer ?? {}
    const { street, area } = address ?? {}
    const redirectHome = () => {
        const baseUrl = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}`;
        const urlsToAppendId = ["http://localhost:3031", "http://stores.dev.egora.pk", "http://stores.stg.egora.pk", "http://stores.test.egora.pk", "http://stores.egora.pk"];
        if (urlsToAppendId.includes(baseUrl)) {
            actions.navigateToHome(`${baseUrl}/?${franchiseId.id}`)
        } else {
            actions.navigateToHome(`${baseUrl}`)
        }
    }




    const getOrderInformationHeadingStyles = {
        color:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationHeadingTextColor?.value !== ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationHeadingTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.OrderSuccessOrderInformationHeadingTextColor?.value}`,
        fontSize:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationHeadingTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationHeadingTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.OrderSuccessOrderInformationHeadingTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationHeadingTextWeight?.value != ""
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationHeadingTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.OrderSuccessOrderInformationHeadingTextWeight?.value,
        fontFamily:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationHeadingTextFont?.value != ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationHeadingTextFont?.value}`
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : `${themeColors?.OrderSuccessOrderInformationHeadingTextFont?.value}`,

        fontStyle: layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationHeadingTextStyle?.value !== ""
            ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationHeadingTextStyle?.value}`
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : `${themeColors?.OrderSuccessOrderInformationHeadingTextStyle?.value}`,
    };


    const getOrderInformationKeyStyles = {
        color:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationKeyTextColor?.value !== ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationKeyTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.OrderSuccessOrderInformationKeyTextColor?.value}`,
        fontSize:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationKeyTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationKeyTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.OrderSuccessOrderInformationKeyTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationKeyTextWeight?.value != ""
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationKeyTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.OrderSuccessOrderInformationKeyTextWeight?.value,
        fontFamily:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationKeyTextFont?.value != ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationKeyTextFont?.value}`
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : `${themeColors?.OrderSuccessOrderInformationKeyTextFont?.value}`,

        fontStyle: layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationKeyTextStyle?.value !== ""
            ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationKeyTextStyle?.value}`
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : `${themeColors?.OrderSuccessOrderInformationKeyTextStyle?.value}`,
    };

    const getOrderInformationValueStyles = {
        color:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationValueTextColor?.value !== ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationValueTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.OrderSuccessOrderInformationValueTextColor?.value}`,
        fontSize:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationValueTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationValueTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.OrderSuccessOrderInformationValueTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationValueTextWeight?.value != ""
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationValueTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.OrderSuccessOrderInformationValueTextWeight?.value,
        fontFamily:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationValueTextFont?.value != ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationValueTextFont?.value}`
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : `${themeColors?.OrderSuccessOrderInformationValueTextFont?.value}`,

        fontStyle: layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationValueTextStyle?.value !== ""
            ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationValueTextStyle?.value}`
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : `${themeColors?.OrderSuccessOrderInformationValueTextStyle?.value}`,
    };








    const getPaymentInformationHeadingStyles = {
        color:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentHeadingTextColor?.value !== ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentHeadingTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.OrderSuccessPaymentHeadingTextColor?.value}`,
        fontSize:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentHeadingTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentHeadingTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.OrderSuccessPaymentHeadingTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentHeadingTextWeight?.value != ""
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentHeadingTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.OrderSuccessPaymentHeadingTextWeight?.value,
        fontFamily:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentHeadingTextFont?.value != ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentHeadingTextFont?.value}`
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : `${themeColors?.OrderSuccessPaymentHeadingTextFont?.value}`,

        fontStyle: layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentHeadingTextStyle?.value !== ""
            ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentHeadingTextStyle?.value}`
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : `${themeColors?.OrderSuccessPaymentHeadingTextStyle?.value}`,
    };


    const getPaymentInformationKeyStyles = {
        color:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentKeyTextColor?.value !== ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentKeyTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.OrderSuccessPaymentKeyTextColor?.value}`,
        fontSize:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentKeyTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentKeyTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.OrderSuccessPaymentKeyTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentKeyTextWeight?.value != ""
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentKeyTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.OrderSuccessPaymentKeyTextWeight?.value,
        fontFamily:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentKeyTextFont?.value != ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentKeyTextFont?.value}`
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : `${themeColors?.OrderSuccessPaymentKeyTextFont?.value}`,

        fontStyle: layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentKeyTextStyle?.value !== ""
            ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentKeyTextStyle?.value}`
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : `${themeColors?.OrderSuccessPaymentKeyTextStyle?.value}`,
    };

    const getPaymentInformationValueStyles = {
        color:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentValueTextColor?.value !== ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentValueTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.OrderSuccessPaymentValueTextColor?.value}`,
        fontSize:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentValueTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentValueTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.OrderSuccessPaymentValueTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentValueTextWeight?.value != ""
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentValueTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.OrderSuccessPaymentValueTextWeight?.value,
        fontFamily:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentValueTextFont?.value != ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentValueTextFont?.value}`
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : `${themeColors?.OrderSuccessPaymentValueTextFont?.value}`,

        fontStyle: layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentValueTextStyle?.value !== ""
            ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentValueTextStyle?.value}`
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : `${themeColors?.OrderSuccessPaymentValueTextStyle?.value}`,
    };







    const getProductInformationHeadingStyles = {
        color:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsHeadingTextColor?.value !== ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsHeadingTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.OrderSuccessProductsHeadingTextColor?.value}`,
        fontSize:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsHeadingTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsHeadingTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.OrderSuccessProductsHeadingTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsHeadingTextWeight?.value != ""
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsHeadingTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.OrderSuccessProductsHeadingTextWeight?.value,
        fontFamily:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsHeadingTextFont?.value != ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsHeadingTextFont?.value}`
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : `${themeColors?.OrderSuccessProductsHeadingTextFont?.value}`,

        fontStyle: layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsHeadingTextStyle?.value !== ""
            ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsHeadingTextStyle?.value}`
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : `${themeColors?.OrderSuccessProductsHeadingTextStyle?.value}`,
    };


    const getProductInformationKeyStyles = {
        color:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsKeyTextColor?.value !== ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsKeyTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.OrderSuccessProductsKeyTextColor?.value}`,
        fontSize:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsKeyTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsKeyTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.OrderSuccessProductsKeyTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsKeyTextWeight?.value != ""
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsKeyTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.OrderSuccessProductsKeyTextWeight?.value,
        fontFamily:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsKeyTextFont?.value != ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsKeyTextFont?.value}`
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : `${themeColors?.OrderSuccessProductsKeyTextFont?.value}`,

        fontStyle: layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsKeyTextStyle?.value !== ""
            ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsKeyTextStyle?.value}`
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : `${themeColors?.OrderSuccessProductsKeyTextStyle?.value}`,
    };

    const getProductInformationValueStyles = {
        color:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsValueTextColor?.value !== ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsValueTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.OrderSuccessProductsValueTextColor?.value}`,
        fontSize:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsValueTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsValueTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.OrderSuccessProductsValueTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsValueTextWeight?.value != ""
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsValueTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.OrderSuccessProductsValueTextWeight?.value,
        fontFamily:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsValueTextFont?.value != ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsValueTextFont?.value}`
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : `${themeColors?.OrderSuccessProductsValueTextFont?.value}`,

        fontStyle: layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsValueTextStyle?.value !== ""
            ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsValueTextStyle?.value}`
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : `${themeColors?.OrderSuccessProductsValueTextStyle?.value}`,
    };



    const getThankYouStyles = {
        color:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessThankYouTextColor?.value !== ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessThankYouTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.OrderSuccessThankYouTextColor?.value}`,
        fontSize:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessThankYouTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessThankYouTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.OrderSuccessThankYouTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessThankYouTextWeight?.value != ""
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessThankYouTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.OrderSuccessThankYouTextWeight?.value,
        fontFamily:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessThankYouTextFont?.value != ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessThankYouTextFont?.value}`
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : `${themeColors?.OrderSuccessThankYouTextFont?.value}`,

        fontStyle: layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessThankYouTextStyle?.value !== ""
            ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessThankYouTextStyle?.value}`
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : `${themeColors?.OrderSuccessThankYouTextStyle?.value}`,
    };

    const getOrderPlacedStyles = {
        color:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderPlacedTextColor?.value !== ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderPlacedTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.OrderSuccessOrderPlacedTextColor?.value}`,
        fontSize:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderPlacedTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderPlacedTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.OrderSuccessOrderPlacedTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderPlacedTextWeight?.value != ""
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderPlacedTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.OrderSuccessOrderPlacedTextWeight?.value,
        fontFamily:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderPlacedTextFont?.value != ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderPlacedTextFont?.value}`
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : `${themeColors?.OrderSuccessOrderPlacedTextFont?.value}`,

        fontStyle: layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderPlacedTextStyle?.value !== ""
            ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderPlacedTextStyle?.value}`
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : `${themeColors?.OrderSuccessOrderPlacedTextStyle?.value}`,
    };

    const getHeadingsStyles = {
        color:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessHeadingsTextColor?.value !== ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessHeadingsTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.OrderSuccessHeadingsTextColor?.value}`,
        fontSize:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessHeadingsTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessHeadingsTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.OrderSuccessHeadingsTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessHeadingsTextWeight?.value != ""
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessHeadingsTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.OrderSuccessHeadingsTextWeight?.value,
        fontFamily:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessHeadingsTextFont?.value != ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessHeadingsTextFont?.value}`
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : `${themeColors?.OrderSuccessHeadingsTextFont?.value}`,

        fontStyle: layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderPlacedTextStyle?.value !== ""
            ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderPlacedTextStyle?.value}`
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : `${themeColors?.OrderSuccessOrderPlacedTextStyle?.value}`,
    };


    const getDescriptionStyles = {
        color:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessDescriptionTextColor?.value !== ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessDescriptionTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.OrderSuccessDescriptionTextColor?.value}`,
        fontSize:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessDescriptionTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessDescriptionTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.OrderSuccessDescriptionTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessDescriptionTextWeight?.value != ""
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessDescriptionTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.OrderSuccessDescriptionTextWeight?.value,
        fontFamily:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessDescriptionTextFont?.value != ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessDescriptionTextFont?.value}`
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : `${themeColors?.OrderSuccessDescriptionTextFont?.value}`,

        fontStyle: layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessDescriptionTextStyle?.value !== ""
            ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessDescriptionTextStyle?.value}`
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : `${themeColors?.OrderSuccessDescriptionTextStyle?.value}`,
    };

    const getPlaceOrderButtonStyles = {
        backgroundColor:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPlaceAnotherOrderTextBackgroundColor?.value != ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPlaceAnotherOrderTextBackgroundColor?.value}`
                : globalComponentStyles?.Button?.backgroundColor?.value != ""
                    ? globalComponentStyles?.Button?.backgroundColor?.value
                    : `${themeColors?.OrderSuccessPlaceAnotherOrderTextBackgroundColor?.value}`,
        color:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPlaceAnotherOrderTextColor?.value !== ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPlaceAnotherOrderTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.OrderSuccessPlaceAnotherOrderTextColor?.value}`,
        fontSize:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPlaceAnotherOrderTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPlaceAnotherOrderTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.OrderSuccessPlaceAnotherOrderTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPlaceAnotherOrderTextWeight?.value != ""
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPlaceAnotherOrderTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.OrderSuccessPlaceAnotherOrderTextWeight?.value,
        fontFamily:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPlaceAnotherOrderTextFont?.value != ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPlaceAnotherOrderTextFont?.value}`
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : `${themeColors?.OrderSuccessPlaceAnotherOrderTextFont?.value}`,

        fontStyle: layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPlaceAnotherOrderTextStyle?.value !== ""
            ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPlaceAnotherOrderTextStyle?.value}`
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : `${themeColors?.OrderSuccessPlaceAnotherOrderTextStyle?.value}`,
    };



    const getNeedSupportStyles = {
        color:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessNeedSupportTextColor?.value !== ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessNeedSupportTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.OrderSuccessNeedSupportTextColor?.value}`,
        fontSize:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessNeedSupportTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessNeedSupportTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.OrderSuccessNeedSupportTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessNeedSupportTextWeight?.value != ""
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessNeedSupportTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.OrderSuccessNeedSupportTextWeight?.value,
        fontFamily:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessNeedSupportTextFont?.value != ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessNeedSupportTextFont?.value}`
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : `${themeColors?.OrderSuccessNeedSupportTextFont?.value}`,

        fontStyle: layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessNeedSupportTextStyle?.value !== ""
            ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessNeedSupportTextStyle?.value}`
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : `${themeColors?.OrderSuccessNeedSupportTextStyle?.value}`,
    };


    const getCallUsStyles = {
        color:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessCallUsTextColor?.value !== ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessCallUsTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.OrderSuccessCallUsTextColor?.value}`,
        fontSize:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessCallUsTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessCallUsTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.OrderSuccessCallUsTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessCallUsTextWeight?.value != ""
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessCallUsTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.OrderSuccessCallUsTextWeight?.value,
        fontFamily:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessCallUsTextFont?.value != ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessCallUsTextFont?.value}`
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : `${themeColors?.OrderSuccessCallUsTextFont?.value}`,

        fontStyle: layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessCallUsTextStyle?.value !== ""
            ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessCallUsTextStyle?.value}`
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : `${themeColors?.OrderSuccessCallUsTextStyle?.value}`,
    };

    const getInquiryStyles = {
        color:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessInquiryTextColor?.value !== ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessInquiryTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.OrderSuccessInquiryTextColor?.value}`,
        fontSize:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessInquiryTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessInquiryTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.OrderSuccessInquiryTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessInquiryTextWeight?.value != ""
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessInquiryTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.OrderSuccessInquiryTextWeight?.value,
        fontFamily:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessInquiryTextFont?.value != ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessInquiryTextFont?.value}`
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : `${themeColors?.OrderSuccessInquiryTextFont?.value}`,

        fontStyle: layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessInquiryTextStyle?.value !== ""
            ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessInquiryTextStyle?.value}`
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : `${themeColors?.OrderSuccessInquiryTextStyle?.value}`,
    };

    const getViewLocationStyles = {
        color:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessViewLocationTextColor?.value !== ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessViewLocationTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.OrderSuccessViewLocationTextColor?.value}`,
        fontSize:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessViewLocationTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessViewLocationTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.OrderSuccessViewLocationTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessViewLocationTextWeight?.value != ""
                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessViewLocationTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.OrderSuccessViewLocationTextWeight?.value,
        fontFamily:
            layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessViewLocationTextFont?.value != ""
                ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessViewLocationTextFont?.value}`
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : `${themeColors?.OrderSuccessViewLocationTextFont?.value}`,

        fontStyle: layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessViewLocationTextStyle?.value !== ""
            ? `${layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessViewLocationTextStyle?.value}`
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : `${themeColors?.OrderSuccessViewLocationTextStyle?.value}`,
    };

    const getFooterStyles = (type) => ({
        color:
            styles?.[type + "Color"]?.value ||
            globalComponentStyles?.Text?.color?.value ||
            themeColors?.[type + "Color"]?.value,
        fontSize:
            styles?.[type + "Size"]?.value[getScreenSizeCategory()] ||
            globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] ||
            themeColors?.[type + "Size"]?.value[getScreenSizeCategory()],
        fontWeight:
            styles?.[type + "Weight"]?.value ||
            globalComponentStyles?.Text?.fontFamily?.value ||
            themeColors?.[type + "Weight"]?.value,
        fontFamily:
            styles?.[type + "Font"]?.value ||
            globalComponentStyles?.Text?.fontFamily?.value ||
            themeColors?.[type + "Font"]?.value,
        fontStyle:
            styles?.[type + "Style"]?.value ||
            globalComponentStyles?.Text?.fontWeight?.value ||
            themeColors?.[type + "Style"]?.value,
    });

    return (
        <Box sx={{
            backgroundColor: "#ffffff"
        }}>
            {states.logoUrl &&
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={states.logoUrl} alt="Logo" style={{ height: '110px', zIndex: '1000000' }} />
                </Grid>
            }

            <Box px={2} py={4} sx={{ backgroundColor: layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessBackgroundColor?.value, minHeight: "100vh", position: 'relative', top: '-25px' }}>
                <Box mx="auto" width="95%" >
                    {/* Thank you part start */}
                    <Stack alignItems="center" spacing={2} mb={4}>
                        <UniversalImage
                            src="/assets/tick-unscreen.gif"
                            alt="Order Success"
                            width={200}
                            height={200}
                            style={{ objectFit: "contain" }}
                            priority
                        />
                        <Typography sx={{ ...getThankYouStyles }} >Thank You!</Typography>
                        <Typography sx={{ ...getOrderPlacedStyles }} >Your order has been placed successfully</Typography>
                    </Stack>
                    {/* Thank you part end */}

                    {/* order and branch detail start */}
                    <Box
                        p={{ xs: 2, md: 3 }}
                        borderRadius={3}
                        bgcolor="white"
                        boxShadow={1}
                        sx={{
                            background: layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessCardOneColor?.value
                        }}

                    >
                        {orderType === "storePickUp"}
                        <Box sx={{
                           
                        }}>
                            <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                                <Typography variant="subtitle1" fontWeight={700} sx={{ ...getHeadingsStyles }}>Your Order is</Typography>
                                <Chip label={state} color="warning" size="small" />
                                {state === "processing" || state === "finished" &&
                                    <UniversalImage
                                        src="/assets/live.gif"
                                        alt="Order Success"
                                        width={30}
                                        height={30}
                                        style={{ objectFit: "contain" }}
                                        priority
                                    />
                                }
                            </Stack>
                            <Typography sx={{ ...getHeadingsStyles }} >Order No:{" "}
                                <Typography component="span" sx={{ ...getDescriptionStyles }}>
                                    {billNumber}
                                </Typography>
                            </Typography>
                            {orderType === "storeDelivery" ? (
                                <Typography
                                    mt={2}
                                    sx={{
                                        fontWeight: 600,
                                        color: "#6c757d",
                                    }}
                                >
                                    Your order has been received, we might call you for confirmation or address
                                    <Box
                                        component="span"
                                        sx={{
                                            display: { xs: "inline", sm: "block" }
                                        }}
                                    >
                                        {" "}details if required.
                                    </Box>
                                </Typography>
                            ) : (
                                <>
                                    <Typography variant="body2" mt={1} sx={{ ...getDescriptionStyles }}>
                                        You have to collect your order from:
                                    </Typography>
                                    <Typography mt={1} sx={{ ...getHeadingsStyles }}><strong>{name}</strong></Typography>
                                    <Typography color="text.secondary" sx={{ ...getHeadingsStyles }}>
                                        Location:{" "}
                                        <Typography component="span" sx={{ ...getDescriptionStyles }}>
                                            {`${venueAddressOne} ${venueAddressTwo}`}
                                        </Typography>
                                    </Typography>
                                    <Link
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                            `${venueAddressOne} ${venueAddressTwo}`
                                        )}`}
                                        underline="hover"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{ 
                                            ...getViewLocationStyles
                                         }}
                                    >
                                        View Location 📍
                                    </Link>
                                    <Typography mt={1} sx={{ ...getHeadingsStyles }}>
                                        Phone:{" "}
                                        <Typography component="span" sx={{ ...getDescriptionStyles }}>
                                            {venuePhoneNumber}
                                        </Typography>
                                    </Typography>
                                </>
                            )
                            }
                        </Box>
                    </Box>

                    {/* order and branch detail end */}

                    {/* Order Information Paymnet and Product section start */}
                    <Box
                        mt={{ xs: 2, md: 6 }}
                        borderRadius={3}
                        bgcolor="white"
                        boxShadow={1}
                        sx={{
                            background: layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessCardTwoColor?.value
                        }}
                    >
                        <Grid container spacing={{ xs: 0, md: 3 }} px={{ xs: 0, md: 3 }} pt={2} >
                            <Grid item xs={12} md={8} px={{ xs: 2, md: 0 }}>
                                <Typography variant="h6" sx={{
                                    ...getOrderInformationHeadingStyles
                                }}>
                                    <IconButton sx={{
                                        padding: '0  2px 0 0',
                                        color: layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationHeadingIconColor?.value
                                            ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationHeadingIconColor?.value
                                            : globalComponentStyles?.Icon?.color?.value != ""
                                                ? globalComponentStyles?.Icon?.color?.value
                                                : themeColors?.OrderSuccessOrderInformationHeadingIconColor?.value
                                    }}>
                                        <Icon
                                            height={getIconWidthHeight(layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationHeadingIconHeightWidth?.value != ""
                                                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationHeadingIconHeightWidth?.value
                                                : globalComponentStyles?.Icon?.size?.value != ""
                                                    ? globalComponentStyles?.Icon?.size?.value
                                                    : themeColors?.OrderSuccessOrderInformationHeadingIconHeightWidth?.value, isBelow850, 18)}
                                            width={getIconWidthHeight(layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationHeadingIconHeightWidth?.value != ""
                                                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessOrderInformationHeadingIconHeightWidth?.value
                                                : globalComponentStyles?.Icon?.size?.value != ""
                                                    ? globalComponentStyles?.Icon?.size?.value
                                                    : themeColors?.OrderSuccessOrderInformationHeadingIconHeightWidth?.value, isBelow850, 18)}
                                            icon={locationIcon}

                                        />
                                    </IconButton>
                                    Order Information
                                </Typography>
                                <Divider sx={{ mt: 1 }} />
                                <Stack direction="row" justifyContent="space-between" mt={1}>
                                    <Typography sx={{ ...getOrderInformationKeyStyles }}>Customer Name</Typography>
                                    <Typography sx={{ ...getOrderInformationValueStyles }}>{`${firstName} ${lastName}`}</Typography>
                                </Stack>
                                {orderType === "storeDelivery" && (
                                    <>
                                        <Divider sx={{ mt: 1.5 }} />
                                        <Stack direction="row" justifyContent="space-between" mt={1}>
                                            <Typography sx={{ ...getOrderInformationKeyStyles }}>Delivery Address</Typography>
                                            <Typography sx={{ ...getOrderInformationValueStyles }}>{`${street} , ${area}`}</Typography>
                                        </Stack>
                                    </>
                                )}

                                <Divider sx={{ mt: 1.5 }} />
                                <Stack direction="row" justifyContent="space-between" mt={1}>
                                    <Typography sx={{ ...getOrderInformationKeyStyles }} >Type</Typography>
                                    <Typography sx={{ ...getOrderInformationValueStyles }} >{orderType == "storeDelivery" ? "Delivery" : "Pickup"}</Typography>
                                </Stack>
                                <Divider sx={{ mt: 1.5 }} />
                                <Stack direction="row" justifyContent="space-between" mt={1}>
                                    <Typography sx={{ ...getOrderInformationKeyStyles }} >Mobile Number</Typography>
                                    <Typography sx={{ ...getOrderInformationValueStyles }} >+92{phone}</Typography>
                                </Stack>
                                <Divider sx={{ mt: 1.5 }} />
                                <Stack direction="row" justifyContent="space-between" mt={1}>
                                    <Typography sx={{ ...getOrderInformationKeyStyles }} >Order Date</Typography>
                                    <Typography sx={{ ...getOrderInformationValueStyles }} >{`${formatDate(new Date(createdAt))} ${formatTime(new Date(createdAt))}`}</Typography>
                                </Stack>
                                {/* <Divider sx={{ mt: 1.5 }} />
                                <Stack direction="row" justifyContent="space-between" mt={1}>
                                    <Typography>{orderType === "storeDelivery" ? "Delivery" : "Pickup"} Date</Typography>
                                    <Typography>August 26,2025 10:30 PM</Typography>
                                </Stack> */}
                            </Grid>
                            <Grid item xs={12} md={4} >
                                <Box
                                    sx={{
                                        borderLeft: { md: '1px solid #f2f4f5', xs: 'none' },
                                        borderTop: { xs: '1px solid #f2f4f5', md: 'none' },
                                        pt: { xs: 2, md: 0 },
                                        pl: { md: 2, xs: 0 },
                                        mt: { xs: 2, md: 0 },
                                        height: '100%',
                                        px: { xs: 2, md: 3 }
                                    }}
                                >
                                    <Typography variant="h6" sx={{
                                        ...getPaymentInformationHeadingStyles
                                    }}>
                                        <IconButton sx={{
                                            padding: '0 5px 0 0',
                                            color: layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentHeadingIconColor?.value
                                                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentHeadingIconColor?.value
                                                : globalComponentStyles?.Icon?.color?.value != ""
                                                    ? globalComponentStyles?.Icon?.color?.value
                                                    : themeColors?.OrderSuccessPaymentHeadingIconColor?.value
                                        }} >
                                            <Icon
                                                icon={creditCardIcon}
                                                height={getIconWidthHeight(layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentHeadingIconHeightWidth?.value != ""
                                                    ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentHeadingIconHeightWidth?.value
                                                    : globalComponentStyles?.Icon?.size?.value != ""
                                                        ? globalComponentStyles?.Icon?.size?.value
                                                        : themeColors?.OrderSuccessPaymentHeadingIconHeightWidth?.value, isBelow850, 18)}
                                                width={getIconWidthHeight(layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentHeadingIconHeightWidth?.value != ""
                                                    ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessPaymentHeadingIconHeightWidth?.value
                                                    : globalComponentStyles?.Icon?.size?.value != ""
                                                        ? globalComponentStyles?.Icon?.size?.value
                                                        : themeColors?.OrderSuccessPaymentHeadingIconHeightWidth?.value, isBelow850, 18)}
                                            />
                                        </IconButton>
                                        Payment
                                    </Typography>
                                    <Divider sx={{ mt: 1 }} />

                                    <Stack direction="row" justifyContent="space-between" mt={1}>
                                        <Typography sx={{ ...getPaymentInformationKeyStyles }}>Total</Typography>
                                        <Typography sx={{ ...getPaymentInformationValueStyles }} >Rs. {subTotal}</Typography>
                                    </Stack>

                                    {tax > 0 && (
                                        <>
                                            <Divider sx={{ mt: 1.5 }} />
                                            <Stack direction="row" justifyContent="space-between" mt={1}>
                                                <Typography sx={{ ...getPaymentInformationKeyStyles }} >Tax</Typography>
                                                <Typography sx={{ ...getPaymentInformationValueStyles }} >Rs. {tax}</Typography>
                                            </Stack>
                                        </>
                                    )}

                                    {serviceFees > 0 && (
                                        <>
                                            <Divider sx={{ mt: 1.5 }} />
                                            <Stack direction="row" justifyContent="space-between" mt={1}>
                                                <Typography sx={{ ...getPaymentInformationKeyStyles }}>Service Fee</Typography>
                                                <Typography sx={{ ...getPaymentInformationValueStyles }} >Rs. {serviceFees}</Typography>
                                            </Stack>
                                        </>
                                    )}

                                    {deliveryFees > 0 && orderType === "storeDelivery" && (
                                        <>
                                            <Divider sx={{ mt: 1.5 }} />
                                            <Stack direction="row" justifyContent="space-between" mt={1}>
                                                <Typography sx={{ ...getPaymentInformationKeyStyles }} >Delivery Fee</Typography>
                                                <Typography sx={{ ...getPaymentInformationValueStyles }} >Rs. {deliveryFees}</Typography>
                                            </Stack>
                                        </>
                                    )}

                                    {platformFees > 0 && (
                                        <>
                                            <Divider sx={{ mt: 1.5 }} />
                                            <Stack direction="row" justifyContent="space-between" mt={1}>
                                                <Typography sx={{ ...getPaymentInformationKeyStyles }} >Platform Fee</Typography>
                                                <Typography sx={{ ...getPaymentInformationValueStyles }} >Rs. {platformFees}</Typography>
                                            </Stack>
                                        </>
                                    )}

                                    <Divider sx={{ mt: 1.5 }} />
                                    <Stack direction="row" justifyContent="space-between" mt={1}>
                                        <Typography sx={{ ...getPaymentInformationKeyStyles }} >Grand Total</Typography>
                                        <Typography sx={{ ...getPaymentInformationValueStyles }}>Rs. {total}</Typography>
                                    </Stack>

                                    <Divider sx={{ mt: 1.5 }} />
                                    <Stack direction="row" justifyContent="space-between" mt={1}>
                                        <Typography sx={{ ...getPaymentInformationKeyStyles }} >Payment Type</Typography>
                                        <Typography sx={{ ...getPaymentInformationValueStyles, fontWeight: "bold" }}>
                                            {paymentType === "cash" ? "Cash" : "Card"}
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Grid>

                        </Grid>
                        <Divider sx={{ mt: 1.5 }} />
                        <Grid container spacing={2} p={{ xs: 2, md: 3 }}>
                            <Grid item xs={12} md={12}>
                                <Typography variant="h6" gutterBottom sx={{ ...getProductInformationHeadingStyles }}>
                                    <IconButton sx={{
                                        padding: '0 5px 0 0',
                                        color: layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsHeadingIconColor?.value
                                            ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsHeadingIconColor?.value
                                            : globalComponentStyles?.Icon?.color?.value != ""
                                                ? globalComponentStyles?.Icon?.color?.value
                                                : themeColors?.OrderSuccessProductsHeadingIconColor?.value
                                    }} >
                                        <Icon
                                            icon={cartIcon}
                                            height={getIconWidthHeight(layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsHeadingIconHeightWidth?.value != ""
                                                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsHeadingIconHeightWidth?.value
                                                : globalComponentStyles?.Icon?.size?.value != ""
                                                    ? globalComponentStyles?.Icon?.size?.value
                                                    : themeColors?.OrderSuccessProductsHeadingIconHeightWidth?.value, isBelow850, 18)}
                                            width={getIconWidthHeight(layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsHeadingIconHeightWidth?.value != ""
                                                ? layout?.orderSuccessLayout?.body[0].styles?.OrderSuccessProductsHeadingIconHeightWidth?.value
                                                : globalComponentStyles?.Icon?.size?.value != ""
                                                    ? globalComponentStyles?.Icon?.size?.value
                                                    : themeColors?.OrderSuccessProductsHeadingIconHeightWidth?.value, isBelow850, 18)}
                                        />
                                    </IconButton>
                                    Product
                                </Typography>

                                <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow sx={{ ...getProductInformationKeyStyles }}>
                                                <TableCell><strong  >Name</strong></TableCell>
                                                <TableCell align="center"><strong>Quantity</strong></TableCell>
                                                <TableCell align="right"><strong>Price</strong></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {items.map((item, index) => (
                                                <TableRow key={index} >
                                                    <TableCell align="left">
                                                        <Typography
                                                            sx={{
                                                                ...getProductInformationValueStyles,
                                                                fontWeight: "bold",
                                                            }}
                                                        >
                                                            {item.name}
                                                        </Typography>
                                                        {item?.selectedVariant && (
                                                            <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: 12,
                                                                        fontWeight: "bold",
                                                                        mr: 0.5,
                                                                        ...getPaymentInformationKeyStyles

                                                                    }}
                                                                >
                                                                    Variant:
                                                                </Typography>
                                                                <Typography sx={{ fontSize: 12, ...getProductInformationValueStyles }}>
                                                                    {item?.selectedVariant?.name}
                                                                </Typography>
                                                            </Box>
                                                        )}

                                                        {item?.groups?.length > 0 && (
                                                            <Box sx={{ mt: 0.5 }}>
                                                                {item.groups.map((sauce, index) => (
                                                                    <Typography
                                                                        key={index}
                                                                        variant="caption"
                                                                        sx={{
                                                                            display: "flex",
                                                                            flexWrap: "wrap",
                                                                            fontWeight: "bold",
                                                                            fontSize: 12,
                                                                            ...getProductInformationValueStyles
                                                                        }}
                                                                    >
                                                                        + {sauce?.name} :
                                                                        <Typography
                                                                            variant="caption"
                                                                            sx={{
                                                                                ml: 0.5,
                                                                                fontSize: 12,
                                                                                display: "flex",
                                                                                flexWrap: "wrap",
                                                                                ...getProductInformationValueStyles
                                                                            }}
                                                                        >
                                                                            {sauce?.items?.map((sauceItem, sauceIndex) => (
                                                                                <span key={sauceIndex}>
                                                                                    {sauceItem?.item} {`(Rs. ${fNumber(sauceItem.price * item.qty)})`}
                                                                                    {sauceIndex !== sauce?.items?.length - 1 && ", "}
                                                                                </span>
                                                                            ))}
                                                                        </Typography>
                                                                    </Typography>
                                                                ))}
                                                            </Box>
                                                        )}

                                                        {/* Notes */}
                                                        {item?.notes && (
                                                            <Typography
                                                                variant="caption"
                                                                sx={{
                                                                    display: "block",
                                                                    mt: 0.5,
                                                                    fontSize: 12,
                                                                    color: "#666",
                                                                    whiteSpace: "nowrap",
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",
                                                                    maxWidth: "200px",
                                                                    "@media (max-width: 600px)": {
                                                                        fontSize: "10px",
                                                                        maxWidth: "120px",
                                                                    },
                                                                    ...getProductInformationKeyStyles
                                                                }}
                                                            >
                                                                Note: <span sx={{ ...getProductInformationValueStyles }}>{item?.notes} </span>
                                                            </Typography>
                                                        )}
                                                    </TableCell>
                                                    <TableCell align="center" sx={{ ...getProductInformationValueStyles }} >{item.qty}</TableCell>
                                                    <TableCell align="right" sx={{ ...getProductInformationValueStyles }} >Rs. {Number(item.qty) * Number(item.price)}</TableCell>
                                                </TableRow>

                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </Box>
                    {/* Order Information Paymnet and Product section End */}
                </Box>

                {/* Footer */}
                <Box sx={{ width: '85%', mx: 'auto' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 2,
                            py: 2,
                        }}
                    >
                        <Box>
                            <Typography variant="h4"
                                sx={{
                                    textAlign: { xs: "center", md: "left", ...getNeedSupportStyles }
                                }}
                            >Need Support ?
                            </Typography>
                            <Typography mt={1} sx={{...getInquiryStyles}}>
                                Question regarding your order?
                                <span style={{
                                    fontWeight: 700,
                                    marginLeft: 10, 
                                    ...getCallUsStyles
                                }}>
                                    Call us: 0{venuePhoneNumber}
                                </span>
                            </Typography>
                        </Box>

                        <Button variant="contained"
                            onClick={redirectHome}
                            sx={{
                                ...getPlaceOrderButtonStyles
                            }}
                        >
                            Place another order
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            py: 3,
                            backgroundColor:
                                styles?.FooterBackgroundColor?.value || themeColors?.FooterBackgroundColor?.value,
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <Typography variant="body2" component="span" sx={getFooterStyles("FooterText")}>
                            Powered by
                        </Typography>
                        <Link
                            href="#"
                            color="inherit"
                            underline="hover"
                            sx={getFooterStyles("FooterLink")}
                            fontWeight="bold"
                        >
                            Egora
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>

    );
}