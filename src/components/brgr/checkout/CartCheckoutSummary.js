import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Grid, Paper, Divider, Button, Link, Alert
} from '@mui/material';
import UserInfoPage from './UserInfoPage';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../../components/hook-form";
import * as Yup from "yup";
import CartItems from '../header/CartItems';
import CartCheckoutTotalSummary from './CartCheckoutTotalSummary';
import PaymentMethods from './PaymentMethods';
import { getScreenSizeCategory } from '../../../utils/fontsize';
import CustomerInfoModal from '../categories/CustomerInfoModal';

const CartCheckoutSummary = ({ layout, globalComponentStyles, themeColors, actions, prop, styles, states, PaymentComponent, previewMode = false }) => {
    layout = layout?.json ? layout?.json : layout
    const getDescriptionStyles = {
        color:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryDescriptionTextColor?.value !== ""
                ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryDescriptionTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.CartCheckoutSummaryDescriptionTextColor?.value}`,
        fontSize:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryDescriptionTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryDescriptionTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.CartCheckoutSummaryDescriptionTextSize?.value[getScreenSizeCategory()],

        fontWeight: layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryDescriptionTextWeight?.value != ""
            ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryDescriptionTextWeight?.value
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : themeColors?.CartCheckoutSummaryDescriptionTextWeight?.value,

        fontFamily: layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryDescriptionTextFont?.value != ""
            ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryDescriptionTextFont?.value}`
            : globalComponentStyles?.Text?.fontFamily?.value != ""
                ? globalComponentStyles?.Text?.fontFamily?.value
                : `${themeColors?.CartCheckoutSummaryDescriptionTextFont?.value}`,

        fontStyle: layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryDescriptionTextStyle?.value !== ""
            ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryDescriptionTextStyle?.value}`
            : globalComponentStyles?.Text?.fontStyle?.value != ""
                ? globalComponentStyles?.Text?.fontStyle?.value
                : `${themeColors?.CartCheckoutSummaryDescriptionTextStyle?.value}`,
    };

    const getHeadingStyles = {
        color:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryHeadingTextColor?.value !== ""
                ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryHeadingTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.CartCheckoutSummaryHeadingTextColor?.value}`,
        fontSize:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryHeadingTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryHeadingTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.CartCheckoutSummaryHeadingTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryHeadingTextWeight?.value != ""
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryHeadingTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.CartCheckoutSummaryHeadingTextWeight?.value,
        fontFamily:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryHeadingTextFont?.value != ""
                ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryHeadingTextFont?.value}`
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : `${themeColors?.CartCheckoutSummaryHeadingTextFont?.value}`,

        fontStyle: layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryHeadingTextStyle?.value !== ""
            ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryHeadingTextStyle?.value}`
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : `${themeColors?.CartCheckoutSummaryHeadingTextStyle?.value}`,
    };

    const getOrderHeadingStyles = {
        color:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryOrderTotalHeadingTextColor?.value !== ""
                ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryOrderTotalHeadingTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.CartCheckoutSummaryOrderTotalHeadingTextColor?.value}`,
        fontSize:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryOrderTotalHeadingTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryOrderTotalHeadingTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.CartCheckoutSummaryOrderTotalHeadingTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryOrderTotalHeadingTextWeight?.value != ""
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryOrderTotalHeadingTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.CartCheckoutSummaryOrderTotalHeadingTextWeight?.value,
        fontFamily:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryOrderTotalHeadingTextFont?.value != ""
                ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryOrderTotalHeadingTextFont?.value}`
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : `${themeColors?.CartCheckoutSummaryOrderTotalHeadingTextFont?.value}`,

        fontStyle: layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryOrderTotalHeadingTextStyle?.value !== ""
            ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryOrderTotalHeadingTextStyle?.value}`
            : globalComponentStyles?.Text?.fontStyle?.value != ""
                ? globalComponentStyles?.Text?.fontStyle?.value
                : `${themeColors?.CartCheckoutSummaryOrderTotalHeadingTextStyle?.value}`,
    };
   
    const getPayAtCounterStyles = {
        color:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutPayAtCounterTextColor?.value !== ""
                ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutPayAtCounterTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.CartCheckoutPayAtCounterTextColor?.value}`,
        fontSize:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutPayAtCounterTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutPayAtCounterTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.CartCheckoutPayAtCounterTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutPayAtCounterTextWeight?.value != ""
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutPayAtCounterTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.CartCheckoutPayAtCounterTextWeight?.value,
        fontFamily:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutPayAtCounterTextFont?.value != ""
                ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutPayAtCounterTextFont?.value}`
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : `${themeColors?.CartCheckoutPayAtCounterTextFont?.value}`,

        fontStyle: layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutPayAtCounterTextStyle?.value !== ""
            ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutPayAtCounterTextStyle?.value}`
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : `${themeColors?.CartCheckoutPayAtCounterTextStyle?.value}`,
    };

    const getCreditDebitCardStyles = {
        color:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutCreditDebitTextColor?.value !== ""
                ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutCreditDebitTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.CartCheckoutCreditDebitTextColor?.value}`,
        fontSize:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutCreditDebitTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutCreditDebitTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.CartCheckoutCreditDebitTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutCreditDebitTextWeight?.value != ""
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutCreditDebitTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.CartCheckoutCreditDebitTextWeight?.value,
        fontFamily:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutCreditDebitTextFont?.value != ""
                ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutCreditDebitTextFont?.value}`
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : `${themeColors?.CartCheckoutCreditDebitTextFont?.value}`,

        fontStyle: layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutCreditDebitTextStyle?.value !== ""
            ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutCreditDebitTextStyle?.value}`
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : `${themeColors?.CartCheckoutCreditDebitTextStyle?.value}`,
    };

    const getPaymentCheckedIconStyles = {
        width:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutPaymentIconCheckedHeightWidth?.value != 0
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutPaymentIconCheckedHeightWidth?.value
                : themeColors?.CartCheckoutPaymentIconCheckedHeightWidth?.value,
        height:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutPaymentIconCheckedHeightWidth?.value != 0
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutPaymentIconCheckedHeightWidth?.value
                : themeColors?.CartCheckoutPaymentIconCheckedHeightWidth?.value,

        color: layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutPaymentCheckedIconColor?.value != ""
            ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutPaymentCheckedIconColor?.value}`
            : `${themeColors?.CartCheckoutPaymentCheckedIconColor?.value}`

    };
    
    const getPaymentUnCheckedIconStyles = {
        width:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutPaymentIconUnCheckedHeightWidth?.value != 0
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutPaymentIconUnCheckedHeightWidth?.value
                : themeColors?.CartCheckoutPaymentIconUnCheckedHeightWidth?.value,
        height:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutPaymentIconUnCheckedHeightWidth?.value != 0
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutPaymentIconUnCheckedHeightWidth?.value
                : themeColors?.CartCheckoutPaymentIconUnCheckedHeightWidth?.value,

        color: layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutPaymentUnCheckedIconColor?.value != ""
            ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutPaymentUnCheckedIconColor?.value}`
            : `${themeColors?.CartCheckoutPaymentUnCheckedIconColor?.value}`

    };

    const { items } = states.cardItems ?? []
    const cartItems = items
    const [orderData, setOrderData] = useState({})
    const [franchiseId, setFranchiseId] = useState('');

    useEffect(() => {
        const id = sessionStorage.getItem('franchiseId');
        if (id) setFranchiseId(id);
    }, []);

    const { orderType } = states;
    const { franchise } = states ?? {}
    const { configurations } = franchise ?? {}
    const { isCardAvailableOnStore, isCashAvailableOnStore, isCardAvailableOnDelivery, isCardAvailableOnPickUp, isCashAvailableOnDelivery, isCashAvailableOnPickUp } = configurations ?? {};

    const isCashAllowed = isCashAvailableOnStore &&
        ((orderType === "storeDelivery" && isCashAvailableOnDelivery) ||
            (orderType === "storePickUp" && isCashAvailableOnPickUp));

    const isCardAllowed = isCardAvailableOnStore &&
        ((orderType === "storeDelivery" && isCardAvailableOnDelivery) ||
            (orderType === "storePickUp" && isCardAvailableOnPickUp));

    const canShowPaymentMethods = isCashAllowed || isCardAllowed;

    const UserSchema = Yup.object().shape({
        firstName: Yup.string().required("First name is required").matches(/^[a-zA-Z ]*$/, "Only alphabets allowed"),
        lastName: Yup.string().required("Last name is required").matches(/^[a-zA-Z ]*$/, "Only alphabets allowed"),
        phone: Yup.string().required("Phone is required").matches(/^\d+$/, "Only numbers allowed").length(10, "10 digits required"),
        email: Yup.string().required("Email is required").email("Invalid email"),
        address: Yup.object().shape({
            street: Yup.string().when([], {
                is: () => orderType === "storeDelivery",
                then: (schema) => schema.required("Delivery Address is required"),
                otherwise: (schema) => schema.notRequired(),
            }),
            area: Yup.string().when([], {
                is: () => orderType === "storeDelivery",
                then: (schema) => schema.required("Area is required"),
                otherwise: (schema) => schema.notRequired(),
            }),
            city: Yup.string(),
        }),
    });

    const defaultValues = {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: {
            street: states.currentLocation,
            area: "",
            city: states.selectedVenue?.city ?? "",
        },
    };

    const methods = useForm({
        resolver: yupResolver(UserSchema),
        defaultValues,
    });

    const { handleSubmit, formState: { isSubmitting } } = methods;

    const onSubmit = async (data) => {
        try {
            states.setCustomerInfo(data);
            if (states.paymentMethod === "cash") {
                let response = await actions.handlePlaceOrder({
                    ...orderData,
                    customer: { ...data },
                });
                if (response) {
                    actions.naviagateOrderSuccess(response.data.id);
                }
            } else {
                let response = await actions.handlePlaceOrderFromCard({
                    ...orderData,
                    customer: { ...data },
                });
                if (response) {
                    actions.naviagateOrderSuccess();
                }
            }
        } catch (error) {
            console.error("Order placement failed:", error);
        }
    }
    const getPlaceOrderButtonStyles = {
        color:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextColor?.value !== ""
                ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.CartCheckoutSummaryPlaceOrderTextColor?.value}`,
        fontSize:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.CartCheckoutSummaryPlaceOrderTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextWeight?.value != ""
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.CartCheckoutSummaryPlaceOrderTextWeight?.value,

        fontFamily:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextFont?.value != ""
                ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextFont?.value}`
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : `${themeColors?.CartCheckoutSummaryPlaceOrderTextFont?.value}`,

        fontStyle: layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextStyle?.value !== ""
            ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextStyle?.value}`
            : globalComponentStyles?.Text?.fontStyle?.value != ""
                ? globalComponentStyles?.Text?.fontStyle?.value
                : `${themeColors?.CartCheckoutSummaryPlaceOrderTextStyle?.value}`,

        backgroundColor:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderBackgroundColor?.value !== ""
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderBackgroundColor?.value
                : globalComponentStyles?.Button?.backgroundColor?.value != ""
                    ? globalComponentStyles?.Button?.backgroundColor?.value
                    : themeColors?.CartCheckoutSummaryPlaceOrderBackgroundColor?.value,
    };

    const getAddMoreItemsStyles = {
        color:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryAddMoreItemsColor?.value !== ""
                ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryAddMoreItemsColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.CartCheckoutSummaryAddMoreItemsColor?.value}`,
        fontSize:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryAddMoreItemsTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryAddMoreItemsTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.CartCheckoutSummaryAddMoreItemsTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryAddMoreItemsTextWeight?.value != ""
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryAddMoreItemsTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.CartCheckoutSummaryAddMoreItemsTextWeight?.value,

        fontFamily:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryAddMoreItemsTextFont?.value != ""
                ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryAddMoreItemsTextFont?.value}`
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : `${themeColors?.CartCheckoutSummaryAddMoreItemsTextFont?.value}`,

        fontStyle: layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryAddMoreItemsTextStyle?.value !== ""
            ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryAddMoreItemsTextStyle?.value}`
            : globalComponentStyles?.Text?.fontStyle?.value != ""
                ? globalComponentStyles?.Text?.fontStyle?.value
                : `${themeColors?.CartCheckoutSummaryAddMoreItemsTextStyle?.value}`,

        backgroundColor:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryAddMoreItemsBackgroundColor?.value !== ""
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryAddMoreItemsBackgroundColor?.value
                : globalComponentStyles?.Button?.backgroundColor?.value != ""
                    ? globalComponentStyles?.Button?.backgroundColor?.value
                    : themeColors?.CartCheckoutSummaryAddMoreItemsBackgroundColor?.value,
    };

    const getItemPriceStyles = {
        color:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemPriceTextColor?.value !== ""
                ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemPriceTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.CartCheckoutSummaryItemPriceTextColor?.value}`,
        fontSize:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemPriceTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemPriceTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.CartCheckoutSummaryItemPriceTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemPriceTextWeight?.value != ""
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemPriceTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.CartCheckoutSummaryItemPriceTextWeight?.value,

        fontFamily: layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemPriceTextFont?.value != ""
            ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemPriceTextFont?.value}`
            : globalComponentStyles?.Text?.fontFamily?.value != ""
                ? globalComponentStyles?.Text?.fontFamily?.value
                : `${themeColors?.CartCheckoutSummaryItemPriceTextFont?.value}`,

        fontStyle: layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemPriceTextStyle?.value !== ""
            ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemPriceTextStyle?.value}`
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : `${themeColors?.CartCheckoutSummaryItemPriceTextStyle?.value}`,
    };


    const getItemDescriptionStyles = {
        color:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemDescriptionTextColor?.value !== ""
                ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemDescriptionTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.CartCheckoutSummaryItemDescriptionTextColor?.value}`,
        fontSize:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemDescriptionTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemDescriptionTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.CartCheckoutSummaryItemDescriptionTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemDescriptionTextWeight?.value != ""
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemDescriptionTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.CartCheckoutSummaryItemDescriptionTextWeight?.value,
        fontFamily:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemDescriptionTextFont?.value != ""
                ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemDescriptionTextFont?.value}`
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : `${themeColors?.CartCheckoutSummaryItemDescriptionTextFont?.value}`,

        fontStyle: layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemDescriptionTextStyle?.value !== ""
            ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemDescriptionTextStyle?.value}`
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : `${themeColors?.CartCheckoutSummaryItemDescriptionTextStyle?.value}`,
    };

    const getItemHeadingStyles = {
        color:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemHeadingsTextColor?.value !== ""
                ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemHeadingsTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.CartCheckoutSummaryItemHeadingsTextColor?.value}`,
        fontSize:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemHeadingsTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemHeadingsTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.CartCheckoutSummaryItemHeadingsTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemHeadingsTextWeight?.value != ""
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemHeadingsTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.CartCheckoutSummaryItemHeadingsTextWeight?.value,
        fontFamily:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemHeadingsTextFont?.value != ""
                ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemHeadingsTextFont?.value}`
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : `${themeColors?.CartCheckoutSummaryItemHeadingsTextFont?.value}`,

        fontStyle: layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemHeadingsTextStyle?.value !== ""
            ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemHeadingsTextStyle?.value}`
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : `${themeColors?.CartCheckoutSummaryItemHeadingsTextStyle?.value}`,
    };

    const getItemNameStyles = {
        color:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemNameTextColor?.value !== ""
                ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemNameTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.CartCheckoutSummaryItemNameTextColor?.value}`,
        fontSize:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemNameTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemNameTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.CartCheckoutSummaryItemNameTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemNameTextWeight?.value != ""
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemNameTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.CartCheckoutSummaryItemNameTextWeight?.value,

        fontFamily: layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemNameTextFont?.value != ""
            ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemNameTextFont?.value}`
            : globalComponentStyles?.Text?.fontFamily?.value != ""
                ? globalComponentStyles?.Text?.fontFamily?.value
                : `${themeColors?.CartCheckoutSummaryItemNameTextFont?.value}`,

        fontStyle: layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemNameTextStyle?.value !== ""
            ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemNameTextStyle?.value}`
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : `${themeColors?.CartCheckoutSummaryItemNameTextStyle?.value}`,
    };

    const getImageStyles = {
        width:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemImageHeightWidth?.value != 0
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemImageHeightWidth?.value
                : themeColors?.CartCheckoutSummaryItemImageHeightWidth?.value,
        height:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemImageHeightWidth?.value != 0
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemImageHeightWidth?.value
                : themeColors?.CartCheckoutSummaryItemImageHeightWidth?.value,

        backgroundColor: layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemImageBackgroundColor?.value != ""
            ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemImageBackgroundColor?.value}`
            : `${themeColors?.CartCheckoutSummaryItemImageBackgroundColor?.value}`,

        borderRadius: layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemImageBorderRadius?.value != 0
            ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemImageBorderRadius?.value}px`
            : `${themeColors?.CartCheckoutSummaryItemImageBorderRadius?.value}px`,
    };

    const getItemQtyStyles = {
        color:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemQtyTextColor?.value !== ""
                ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemQtyTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.CartCheckoutSummaryItemQtyTextColor?.value}`,
        fontSize:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemQtyTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemQtyTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.CartCheckoutSummaryItemQtyTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemQtyTextWeight?.value != ""
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemQtyTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.CartCheckoutSummaryItemQtyTextWeight?.value,

        fontFamily: layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemQtyTextFont?.value != ""
            ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemQtyTextFont?.value}`
            : globalComponentStyles?.Text?.fontFamily?.value != ""
                ? globalComponentStyles?.Text?.fontFamily?.value
                : `${themeColors?.CartCheckoutSummaryItemQtyTextFont?.value}`,

        fontStyle: layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemQtyTextStyle?.value !== ""
            ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemQtyTextStyle?.value}`
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : `${themeColors?.CartCheckoutSummaryItemQtyTextStyle?.value}`,
    };

    const getItemNotesStyles = {
        color:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemNotesTextColor?.value !== ""
                ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemNotesTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.CartCheckoutSummaryItemNotesTextColor?.value}`,
        fontSize:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemNotesTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemNotesTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.CartCheckoutSummaryItemNotesTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemNotesTextWeight?.value != ""
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemNotesTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.CartCheckoutSummaryItemNotesTextWeight?.value,

        fontFamily: layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemNotesTextFont?.value != ""
            ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemNotesTextFont?.value}`
            : globalComponentStyles?.Text?.fontFamily?.value != ""
                ? globalComponentStyles?.Text?.fontFamily?.value
                : `${themeColors?.CartCheckoutSummaryItemNotesTextFont?.value}`,

        fontStyle: layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemNotesTextStyle?.value !== ""
            ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemNotesTextStyle?.value}`
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : `${themeColors?.CartCheckoutSummaryItemNotesTextStyle?.value}`,
    };
    
    const getViewLocationtyles = {
        color:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryViewLocationTextColor?.value !== ""
                ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryViewLocationTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.CartCheckoutSummaryViewLocationTextColor?.value}`,
        fontSize:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryViewLocationTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryViewLocationTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.CartCheckoutSummaryViewLocationTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryViewLocationTextWeight?.value != ""
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryViewLocationTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.CartCheckoutSummaryViewLocationTextWeight?.value,

        fontFamily: layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryViewLocationTextFont?.value != ""
            ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryViewLocationTextFont?.value}`
            : globalComponentStyles?.Text?.fontFamily?.value != ""
                ? globalComponentStyles?.Text?.fontFamily?.value
                : `${themeColors?.CartCheckoutSummaryViewLocationTextFont?.value}`,

        fontStyle: layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryViewLocationTextStyle?.value !== ""
            ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryViewLocationTextStyle?.value}`
            : globalComponentStyles?.Text?.fontWeight?.value != ""
                ? globalComponentStyles?.Text?.fontWeight?.value
                : `${themeColors?.CartCheckoutSummaryViewLocationTextStyle?.value}`,
    };

    const checkoutTotalSummaryBackground = {
        backgroundColor:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryOrderSectionBackgroundColor?.value !== ""
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryOrderSectionBackgroundColor?.value
                : themeColors?.CartCheckoutSummaryOrderSectionBackgroundColor?.value,
    };

    const pickUpSectionSummaryBackground = {
        backgroundColor:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPickUpSectionBackgroundColor?.value !== ""
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPickUpSectionBackgroundColor?.value
                : themeColors?.CartCheckoutSummaryPickUpSectionBackgroundColor?.value,
    };

    const orderTypeSectionSummaryBackground = {
        backgroundColor:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryOrderTypeSectionBackgroundColor?.value !== ""
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryOrderTypeSectionBackgroundColor?.value
                : themeColors?.CartCheckoutSummaryOrderTypeSectionBackgroundColor?.value,
    };
    const paymentSectionBackground = {
        backgroundColor:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPaymentSectionBackgroundColor?.value !== ""
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPaymentSectionBackgroundColor?.value
                : themeColors?.CartCheckoutSummaryPaymentSectionBackgroundColor?.value,
    };

    const itemSectionSectionBackground = {
        backgroundColor:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemSectionBackgroundColor?.value !== ""
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryItemSectionBackgroundColor?.value
                : themeColors?.CartCheckoutSummaryItemSectionBackgroundColor?.value,
    };

    const redirectHome = () => {
        const baseUrl = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}`;
        const urlsToAppendId = ["http://localhost:3031", "http://stores.dev.egora.pk", "http://stores.stg.egora.pk", "http://stores.test.egora.pk", "http://stores.egora.pk"];
        if (urlsToAppendId.includes(baseUrl)) {
            actions.navigateToHome(`${baseUrl}/?${franchiseId}`)
        } else {
            actions.navigateToHome(`${baseUrl}`)
        }
    }
    return (
        <>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{
                py: { xs: 4, sm: 4, md: 4 }, px: { xs: 2, sm: 2, md: 10 },
                backgroundColor:
                    styles?.CartCheckoutSummaryBackgroundColor?.value != ""
                        ? styles?.CartCheckoutSummaryBackgroundColor?.value
                        : globalComponentStyles?.Background?.color?.value != ""
                            ? globalComponentStyles?.Background?.color?.value
                            : themeColors?.CartCheckoutSummaryBackgroundColor?.value,
            }} >
                <Grid container spacing={3} justifyContent="center">
                    {states.logoUrl &&
                        <Grid item xs={12} sx={{
                            display: 'flex', justifyContent: 'center',
                            borderRadius:
                                layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryImageBorderRadius?.value !== ""
                                    ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryImageBorderRadius?.value}px`
                                    : `${themeColors?.CartCheckoutSummaryImageBorderRadius?.value || 0}px`,
                            backgroundColor:
                                layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryImageBackgroundColor?.value != ""
                                    ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryImageBackgroundColor?.value}`
                                    : `${themeColors?.CartCheckoutSummaryImageBackgroundColor?.value}`
                        }}>
                            <img src={states.logoUrl} alt="Logo"
                                style={{
                                    borderRadius:
                                        layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryImageBorderRadius?.value !== ""
                                            ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryImageBorderRadius?.value}px`
                                            : `${themeColors?.CartCheckoutSummaryImageBorderRadius?.value || 0}px`,
                                    width: 
                                        layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryImageHeightWidth?.value !== ""
                                            ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryImageHeightWidth?.value
                                            : themeColors?.CartCheckoutSummaryImageHeightWidth?.value,
                                    height: 
                                        layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryImageHeightWidth?.value !== ""
                                            ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryImageHeightWidth?.value
                                            : themeColors?.CartCheckoutSummaryImageHeightWidth?.value,  

                                    cursor: 'pointer'
                                }}
                                onClick={redirectHome}
                            />
                        </Grid>
                    }

                    <Grid item xs={12} md={12} container spacing={2} >
                        <Grid item xs={12} md={7} >
                            <Paper sx={{ p: 3, ...orderTypeSectionSummaryBackground }} >
                                {states.orderType == "storeDelivery" && (
                                    <>
                                        <Typography sx={{ ...getHeadingStyles }}>
                                            This is a <span style={{ fontWeight: "bold", fontWeight: 600 }}>Delivery Order</span>
                                        </Typography>
                                        <Typography mb={2} sx={{ ...getHeadingStyles }}  >
                                            Just a last step, please enter your details:
                                        </Typography>
                                        <Divider
                                            sx={{
                                                marginTop: "10px",
                                                borderColor: "#E0E0E0",
                                                mb: 2
                                            }}
                                        />
                                    </>
                                )}
                                {orderType === "storePickUp" && (
                                    <>
                                        <Paper sx={{ p: 4, mb: 2, ...pickUpSectionSummaryBackground  }}>
                                            <Typography sx={{ ...getHeadingStyles }}>
                                                This is a <span style={{ fontWeight: "bold", fontWeight: 600 }}>Pickup Order</span>
                                            </Typography>
                                            <Typography mb={2} mt={2} sx={{ ...getHeadingStyles }}  >
                                                You have to collect your order from
                                            </Typography>
                                            <Box mt={2}>
                                                <Typography fontWeight="bold" sx={{ ...getHeadingStyles }} >{states?.selectedVenue?.name}</Typography>
                                                <Typography>
                                                    <Box component="strong" sx={{ ...getHeadingStyles }}>
                                                        Location:
                                                    </Box>{' '}
                                                    <Box component="strong" sx={{ ...getDescriptionStyles }}>
                                                        {states?.selectedVenue?.name} - {states?.selectedVenue?.venueAddressOne} {states?.selectedVenue?.venueAddressTwo}
                                                    </Box>{' '}
                                                </Typography>
                                                <Link
                                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                                        `${states?.selectedVenue?.venueAddressOne} ${states?.selectedVenue?.venueAddressTwo}`
                                                    )}`}
                                                    underline="hover"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    sx={{ 
                                                        ...getViewLocationtyles
                                                    }}
                                                >
                                                    View Location 📍
                                                </Link>
                                                <Typography>
                                                    <Box component="strong" sx={{ ...getHeadingStyles }}>
                                                        Phone:
                                                    </Box>{' '}
                                                    <Link href="tel:03XX-XXXXXXX" underline="hover" sx={{ ...getDescriptionStyles }}>
                                                        {states?.selectedVenue?.venuePhoneNumber}
                                                    </Link>
                                                </Typography>
                                            </Box >
                                        </Paper>
                                        <Typography mb={2} sx={{ ...getHeadingStyles }}  >
                                            JUST A LAST STEP, PLEASE FILL YOUR INFORMATION BELOW
                                        </Typography>
                                    </>

                                )
                                }

                                
                                  <Grid item xs={12}>
                    <Typography sx={{ mb: 4, ...getHeadingStyles }}>
                      Have you ordered before?
                      <Box
                        component="span"
                        sx={{
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          textDecoration: 'underline',
                          '&:hover': { opacity: 0.8 },
                        }}
                        // onClick={() => states.setOpenCustomerInfoDialog(true)}
                         onClick={() => !previewMode? states.setOpenCustomerInfoDialog(true) : null }
                      >
                        Click here
                      </Box>
                    </Typography>
                  </Grid>

                                <UserInfoPage states={states} layout={layout} globalComponentStyles={globalComponentStyles} themeColors={themeColors} />
                                {canShowPaymentMethods && (
                                    <Box mt={2}>
                                        <Typography fontWeight="bold" sx={{ ...getHeadingStyles }}  >
                                            Payment Information
                                        </Typography>
                                        <PaymentMethods
                                            paymentSectionBackground={paymentSectionBackground}
                                            getPayAtCounterStyles={getPayAtCounterStyles}
                                            getPaymentCheckedIconStyles={getPaymentCheckedIconStyles}
                                            getCreditDebitCardStyles={getCreditDebitCardStyles}
                                            getPaymentUnCheckedIconStyles={getPaymentUnCheckedIconStyles}
                                            actions={actions}
                                            prop={prop}
                                            styles={styles}
                                            states={states}
                                            PaymentComponent={PaymentComponent}
                                        />
                                    </Box>
                                )}

                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={5}>
                            <Grid item xs={12} md={12} mb={2}>
                                <Paper sx={{
                                    p: 2, mb: 2,
                                   ...itemSectionSectionBackground
                                }}>
                                    {cartItems?.map((cartItem, index) => (
                                        <CartItems
                                            previewMode={previewMode}
                                            showButtons={false}
                                            key={index}
                                            cartItem={cartItem}
                                            actions={actions}
                                            index={index}
                                            showDeleteIndex={states.showDeleteIndex}
                                            setShowDeleteIndex={states.setShowDeleteIndex}
                                            handleRemoveFromCart={actions.handleRemoveFromCart}
                                            handleMenuItemClick={actions.handleMenuItemClick}
                                            states={states}
                                            cardItems={cartItems}
                                            getItemPriceStyles={getItemPriceStyles}
                                            getItemDescriptionStyles={getItemDescriptionStyles}
                                            getItemHeadingStyles={getItemHeadingStyles}
                                            getItemNameStyles={getItemNameStyles}
                                            getImageStyles={getImageStyles}
                                            getItemQtyStyles={getItemQtyStyles}
                                            getItemNotesStyles={getItemNotesStyles}
                                            
                                        />
                                    ))}
                                </Paper>
                            </Grid>

                            <Grid item xs={12} md={12}>

                                <Paper sx={{ backgroundColor: checkoutTotalSummaryBackground }}>
                                    <CartCheckoutTotalSummary
                                        getDescriptionStyles={getDescriptionStyles}
                                        getHeadingStyles={getHeadingStyles}
                                        getOrderHeadingStyles={getOrderHeadingStyles}
                                        open={states.locationModalOpen}
                                        handleClose={actions.handleOpenLocationModal}
                                        themeColors={themeColors}
                                        actions={actions}
                                        prop={prop}
                                        styles={styles}
                                        states={states}
                                        setOrderData={setOrderData}
                                        checkoutTotalSummaryBackground={checkoutTotalSummaryBackground}
                                    />
                                </Paper>

                                {canShowPaymentMethods ? (
                                    <>

                                        {states.paymentMethod === "cash" &&
                                            <Button
                                                disableRipple
                                                disableElevation
                                                variant="contained"
                                                fullWidth
                                                type="submit"
                                                sx={{
                                                    mt: 2,
                                                    "&:hover": {
                                                        backgroundColor: layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderBackgroundColor?.value !== ""
                                                            ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderBackgroundColor?.value
                                                            : globalComponentStyles?.Button?.backgroundColor?.value != ""
                                                                ? globalComponentStyles?.Button?.backgroundColor?.value
                                                                : themeColors?.CartCheckoutSummaryPlaceOrderBackgroundColor?.value
                                                    },
                                                    ...getPlaceOrderButtonStyles
                                                }}
                                            >
                                                {isSubmitting ? "Placing Order..." : "Place Order"}
                                            </Button>
                                        }
                                        {(states.errorForPlaceOrder && states.paymentMethod === "cash") && (
                                            <Alert severity="error" sx={{ mb: 2, mt: 2 }}>
                                                {states.errorForPlaceOrder}
                                            </Alert>
                                        )}
                                        {
                                            previewMode && <Box textAlign="center" mt={2}>
                                                <Link underline="hover" fontSize={14} sx={{ ...getAddMoreItemsStyles }} >
                                                    ← continue to add more items
                                                </Link>
                                            </Box>
                                        } {!previewMode &&

                                            <Box textAlign="center" mt={2}>
                                                <Link href={`/?${franchiseId}`} underline="hover" fontSize={14} sx={{ ...getAddMoreItemsStyles }} >
                                                    ← continue to add more items
                                                </Link>
                                            </Box>
                                        }
                                    </>
                                )
                                    :
                                    <Typography fontWeight="bold" sx={{ mt: 2, mb: 2 }}>
                                        You can't place the order.
                                    </Typography>
                                }
                                {/* </Paper> */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </FormProvider >
          <CustomerInfoModal
        open={states.openCustomerInfoDialog}
        onClose={() => states.setOpenCustomerInfoDialog(false)}
        actions={actions}
        states={states}
        layout={layout}
       styles={ styles}
      previewMode={previewMode}
        globalComponentStyles={globalComponentStyles}
        themeColors={themeColors}
        onCustomerFound={(customer) => {
          methods.reset({
            firstName: customer.firstName || defaultValues.firstName,
            lastName: customer.lastName || defaultValues.lastName,
            phone: customer.phone || defaultValues.phone,
            email: customer.email || defaultValues.email,
          });
        }}
      />

        </>
    );
};

export default CartCheckoutSummary;
