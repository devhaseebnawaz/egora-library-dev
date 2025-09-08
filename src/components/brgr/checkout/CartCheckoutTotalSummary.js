import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Box, Card, Stack, Typography, CardContent,
} from "@mui/material";
import { fNumber } from "../../../utils/formatNumber";

const CartCheckoutTotalSummary = ({ themeColors, actions, prop, styles, states, setOrderData, getDescriptionStyles, getHeadingStyles, getOrderHeadingStyles, checkoutTotalSummaryBackground }) => {

  const { cardItems, franchise, orderType } = states ?? {};
  const { serviceFeesObject, configurations, storeTaxOnCash, storeTaxOnCard, platformFees, deliveryFees } = franchise ?? {};
  const { isServiceFeesApplicableOnStore, isTaxApplicableOnStore, isPlatformFeeApplicableOnStore, isCashAvailableOnPickUp, isCashAvailableOnDelivery, isDeliveryFeeApplicableOnStore } = configurations ?? {};

  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedTip, setSelectedTip] = useState(cardItems?.tip || 0);

  const calculateAndRoundTax = (total, taxRate, discount) => {
    let t = total - discount
    const taxAmount = t * taxRate;
    const roundedTax = Math.round(taxAmount * 100) / 100;
    return roundedTax;
  };

  const isApplicable = (applicable) => applicable === "true" || applicable === true;

  const calculateSubTotal = () => {
    return cardItems.items.reduce((total, cartItem) => {
      const qty = cartItem.qty;
      let itemTotal = parseFloat(cartItem.priceWithChoiceGroup ?? cartItem.price) * qty;
      if (cartItem.selectedAddOns?.length > 0) {
        cartItem.selectedAddOns.forEach((addon) => {
          itemTotal += parseFloat(addon.price.replace("Rs. ", ""));
        });
      }
      return total + itemTotal;
    }, 0);
  };

  const subTotalOfItems = useMemo(() => (
    cardItems?.items?.length > 0 ? calculateSubTotal() : 0
  ), [cardItems]);

  useEffect(() => {
    setSubTotal(subTotalOfItems);
  }, [subTotalOfItems]);

  const taxRate = isTaxApplicableOnStore
    ? (states.paymentMethod === "cash"
      ? storeTaxOnCash / 100
      : states.paymentMethod === "card"
        ? storeTaxOnCard / 100
        : 0)
    : 0;

  const taxAmount = useMemo(() => (
    calculateAndRoundTax(subTotal, taxRate, discount)
  ), [subTotal, taxRate, discount]);

  const calculateServiceFee = () => {
    if (!isServiceFeesApplicableOnStore) return 0;

    const modeCashAvailability = {
      storePickUp: isCashAvailableOnPickUp,
      storeDelivery: isCashAvailableOnDelivery,
    };

    if (!modeCashAvailability[states.orderType] && states.paymentMethod === "cash") {
      return 0;
    }

    const modeData = serviceFeesObject?.[states.orderType];
    const paymentData = modeData?.[states.paymentMethod];
    if (!paymentData || !isApplicable(paymentData.applicable)) return 0;

    const feeableSubtotal = subTotal - discount;

    return paymentData.type === "Percentage"
      ? (feeableSubtotal * parseFloat(paymentData.amount)) / 100
      : parseFloat(paymentData.amount);
  };

  const serviceFee = useMemo(() => (
    cardItems?.items?.length > 0
      ? calculateServiceFee()
      : 0
  ), [cardItems, subTotal, discount, states.orderType, states.paymentMethod]);

  useEffect(() => {
    let updatedTotal = Number(subTotal);
    if (
      isServiceFeesApplicableOnStore &&
      isApplicable(serviceFeesObject?.[states.orderType]?.[states.paymentMethod]?.applicable)
    ) {
      updatedTotal += Number(serviceFee);
    }
    const platformFee = isPlatformFeeApplicableOnStore ? platformFees : 0;
    const deliveryFee = (isDeliveryFeeApplicableOnStore && orderType === "storeDelivery") ? deliveryFees : 0;
    const grandTotal = Number(updatedTotal) + Number(platformFee) + Number(deliveryFee) + Number(taxAmount) + Number(selectedTip);
    setTotal(grandTotal);
  }, [
    subTotal,
    discount,
    serviceFee,
    taxAmount,
    selectedTip,
    states.paymentMethod,
    serviceFeesObject,
    isServiceFeesApplicableOnStore,
    states.orderType,
    platformFees,
    deliveryFees
  ]);

  const renderServiceFee = () => {
    const service = serviceFeesObject?.[states.orderType]?.[states.paymentMethod];
    if (isServiceFeesApplicableOnStore && isApplicable(service?.applicable) && serviceFee > 0) {
      return (
        <Stack direction="row" justifyContent="space-between" marginBottom='5px'>
          <Typography sx={{ color: "text.secondary", fontWeight: "600", ...getHeadingStyles }}>
            Service Fee {service?.type === "Percentage" ? `(${service.amount}%)` : ""}
          </Typography>
          <Typography variant="subtitle2" sx={{ ...getDescriptionStyles }}>
            Rs. {fNumber(serviceFee)}
          </Typography>
        </Stack>
      );
    }
    return null;
  };

  useEffect(() => {
    if (!cardItems || cardItems.items?.length === 0) return;

    const mode = states.orderType;

    let totalServiceValue = 0;
    let serviceFeesObj = {};

    if (
      isServiceFeesApplicableOnStore &&
      isApplicable(serviceFeesObject?.[mode]?.[states.paymentMethod]?.applicable)
    ) {
      totalServiceValue = Number(serviceFee);
      serviceFeesObj = {
        [mode]: {
          [states.paymentMethod]: serviceFeesObject?.[mode]?.[states.paymentMethod],
        },
      };
    }

    const orderData = {
      levelId: cardItems?.levelId,
      venueId: cardItems?.venueId,
      total: fNumber(total),
      orderType: mode,
      type: "store",
      paymentType: states.paymentMethod,
      tax: fNumber(taxAmount),
      subTotal: fNumber(subTotal),
      tip: selectedTip === null ? 0 : fNumber(selectedTip),
      serviceFees: fNumber(totalServiceValue),
      location: states.latLong ? states.latLong : "2,2",
      platformFees: isPlatformFeeApplicableOnStore ? platformFees : 0,
      deliveryFees: (isDeliveryFeeApplicableOnStore && orderType === "storeDelivery") ? deliveryFees : 0,
      serviceFeesObject: serviceFeesObj,
    };

    setOrderData(orderData);
  }, [cardItems, total, selectedTip, serviceFee, taxAmount, subTotal, states.paymentMethod, states.orderType, isServiceFeesApplicableOnStore, serviceFeesObject,
  ]);


  return (
    <>
      <Card sx={{
        mb: 2,
        backgroundColor: checkoutTotalSummaryBackground
      }}>
        <CardContent sx={{ padding: '16px !important' }}>
          <Stack spacing={1}>
            <Typography variant="h4" sx={{ fontWeight: "700", fontSize: 25, ...getOrderHeadingStyles }}>
              Your Order
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ color: "text.secondary", fontWeight: "600", ...getHeadingStyles }}>Sub Total</Typography>
              <Typography variant="subtitle2" sx={{ ...getDescriptionStyles }}>Rs. {fNumber(subTotal)}</Typography>
            </Stack>
            {isPlatformFeeApplicableOnStore && (
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ color: "text.secondary", fontWeight: "600", ...getHeadingStyles }}>Platform Fee</Typography>
                <Typography variant="subtitle2" sx={{ ...getDescriptionStyles }}>Rs. {platformFees}</Typography>
              </Stack>
            )}

            {renderServiceFee()}

            {isDeliveryFeeApplicableOnStore && orderType === "storeDelivery" && (
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ color: "text.secondary", fontWeight: "600", ...getHeadingStyles }}>Delivery Fee</Typography>
                <Typography variant="subtitle2" sx={{ ...getDescriptionStyles }}>Rs. {deliveryFees}</Typography>
              </Stack>
            )}

            {discount > 0 && (
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ color: "text.secondary", fontWeight: "600", ...getHeadingStyles }}>Discount</Typography>
                <Typography variant="subtitle2" sx={{ ...getDescriptionStyles }}>Rs. {fNumber(discount)}</Typography>
              </Stack>
            )}

            {/* <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ color: "text.secondary", fontWeight: "600", ...getHeadingStyles }}>Tip</Typography>
              <Typography variant="subtitle2" sx={{ ...getDescriptionStyles}}>Rs. {fNumber(selectedTip || 0)}</Typography>
            </Stack> */}

            {isTaxApplicableOnStore && (
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ color: "text.secondary", fontWeight: "600", ...getHeadingStyles }}>Tax</Typography>
                <Typography variant="subtitle2" sx={{ ...getDescriptionStyles }}>Rs. {fNumber(taxAmount)}</Typography>
              </Stack>
            )}

            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ color: "#FCA92E", fontWeight: "600", ...getHeadingStyles }}>Total Amount</Typography>
              <Typography variant="subtitle2" sx={{ color: "#FCA92E", ...getDescriptionStyles }}>
                Rs. {fNumber(total.toFixed(2))}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default CartCheckoutTotalSummary;
