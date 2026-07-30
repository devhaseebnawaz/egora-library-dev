import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Box, Card, Stack, Typography, CardContent,
} from "@mui/material";
import { fNumber, fNumberRound, formatTo2, truncateTo2 } from "../../../utils/formatNumber";
import { calculeteDeliveryFee } from "../../../utils/calculeteDeliveryFee";
import { calculateCartManualDiscount, calculateCartPromotion, calculateSubTotal, } from '../../../utils/cart';
import { calculateAndRoundTax, calculateTaxableCartBase, } from '../../../utils/tax';

const isApplicable = (applicable) =>
  applicable === 'true' || applicable === true;

const isTaxableByConfiguration = (value) =>
  value !== false && value !== 'false';

const CartCheckoutTotalSummary = ({
  states,
  setOrderData,
  getDescriptionStyles,
  getHeadingStyles,
  getOrderHeadingStyles,
  checkoutTotalSummaryBackground,
}) => {
  const { cardItems, franchise, orderType } = states ?? {};
  const items = cardItems?.items || [];

  const { serviceFeesObject, configurations, storeTaxOnCash, storeTaxOnCard, platformFees, deliveryFees, storeDeliveryMaxOrderThreshold, storeDeliveryMaxDistanceThreshold,
  } = franchise ?? {};

  const {
    isServiceFeesApplicableOnStore,
    isTaxApplicableOnStore,
    isPlatformFeeApplicableOnStore,
    isCashAvailableOnPickUp,
    isCashAvailableOnDelivery,
    isDeliveryFeeApplicableOnStore,
    isServiceFeeTaxableOnStore,
    isTipTaxableOnStore,
    isPlatformFeeTaxableOnStore,
    isDeliveryFeeTaxableOnStore,
  } = configurations ?? {};

  const [selectedTip] = useState(cardItems?.tip || 0);

  const subTotal = useMemo(
    () => Number(calculateSubTotal(items) || 0),
    [items]
  );

  const discount = useMemo(
    () => calculateCartManualDiscount(items, cardItems),
    [items, cardItems]
  );

  const promotion = useMemo(
    () => calculateCartPromotion(items, cardItems),
    [items, cardItems]
  );

  const totalReduction =
    Number(discount || 0) + Number(promotion || 0);

  const netItemsTotal = Math.max(
    Number(subTotal) - totalReduction,
    0
  );

  const taxRate = isTaxApplicableOnStore
    ? states.paymentMethod === 'cash'
      ? Number(storeTaxOnCash || 0) / 100
      : states.paymentMethod === 'card'
        ? Number(storeTaxOnCard || 0) / 100
        : 0
    : 0;

  const serviceFee = useMemo(() => {
    if (!isServiceFeesApplicableOnStore || items.length === 0) {
      return 0;
    }

    const modeCashAvailability = {
      storePickUp: isCashAvailableOnPickUp,
      storeDelivery: isCashAvailableOnDelivery,
    };

    if (
      !modeCashAvailability[states.orderType] &&
      states.paymentMethod === 'cash'
    ) {
      return 0;
    }

    const paymentData =
      serviceFeesObject?.[states.orderType]?.[states.paymentMethod];

    if (!paymentData || !isApplicable(paymentData.applicable)) {
      return 0;
    }

    if (paymentData.type === 'Percentage') {
      return (
        (netItemsTotal * Number(paymentData.amount || 0)) /
        100
      );
    }

    return Number(paymentData.amount || 0);
  }, [
    isServiceFeesApplicableOnStore,
    items.length,
    isCashAvailableOnPickUp,
    isCashAvailableOnDelivery,
    states.orderType,
    states.paymentMethod,
    serviceFeesObject,
    netItemsTotal,
  ]);

  const platformFee = isPlatformFeeApplicableOnStore
    ? Number(platformFees || 0)
    : 0;

  const sharedTaxPayload = useMemo(
    () => ({
      items,
      cartMeta: cardItems,
      cartSubtotal: subTotal,
      manualDiscount: discount,
      promotion,
      serviceFee,
      tip: Number(selectedTip || 0),
      platformFee,
      isServiceFeeTaxable: isTaxableByConfiguration(
        isServiceFeeTaxableOnStore
      ),
      isTipTaxable: isTaxableByConfiguration(
        isTipTaxableOnStore
      ),
      isPlatformFeeTaxable: isTaxableByConfiguration(
        isPlatformFeeTaxableOnStore
      ),
    }),
    [
      items,
      cardItems,
      subTotal,
      discount,
      promotion,
      serviceFee,
      selectedTip,
      platformFee,
      isServiceFeeTaxableOnStore,
      isTipTaxableOnStore,
      isPlatformFeeTaxableOnStore,
    ]
  );


  const provisionalTax = useMemo(() => {
    const taxableBaseWithoutDelivery =
      calculateTaxableCartBase({
        ...sharedTaxPayload,
        deliveryFee: 0,
      });

    return calculateAndRoundTax(
      taxableBaseWithoutDelivery,
      taxRate
    );
  }, [sharedTaxPayload, taxRate]);

  const deliveryResult = useMemo(
    () =>
      calculeteDeliveryFee({
        states,
        baseTotal:
          netItemsTotal +
          Number(serviceFee || 0) +
          platformFee +
          Number(selectedTip || 0) +
          provisionalTax,
      }),
    [
      states,
      netItemsTotal,
      serviceFee,
      platformFee,
      selectedTip,
      provisionalTax,
    ]
  );

  const finalDeliveryFee =
    isDeliveryFeeApplicableOnStore &&
      orderType === 'storeDelivery'
      ? Number(deliveryResult?.finalDeliveryFee || 0)
      : 0;

  const taxAmount = useMemo(() => {
    const taxableBase = calculateTaxableCartBase({
      ...sharedTaxPayload,
      deliveryFee: finalDeliveryFee,
      isDeliveryFeeTaxable: isTaxableByConfiguration(
        isDeliveryFeeTaxableOnStore
      ),
    });

    return calculateAndRoundTax(taxableBase, taxRate);
  }, [
    sharedTaxPayload,
    finalDeliveryFee,
    isDeliveryFeeTaxableOnStore,
    taxRate,
  ]);

  const total = useMemo(
    () =>
      netItemsTotal +
      Number(serviceFee || 0) +
      platformFee +
      Number(selectedTip || 0) +
      finalDeliveryFee +
      Number(taxAmount || 0),
    [
      netItemsTotal,
      serviceFee,
      platformFee,
      selectedTip,
      finalDeliveryFee,
      taxAmount,
    ]
  );

  const renderServiceFee = () => {
    const service =
      serviceFeesObject?.[states.orderType]?.[
      states.paymentMethod
      ];

    if (
      isServiceFeesApplicableOnStore &&
      isApplicable(service?.applicable) &&
      serviceFee > 0
    ) {
      return (
        <Stack
          direction="row"
          justifyContent="space-between"
          marginBottom="5px"
        >
          <Typography
            sx={{
              color: 'text.secondary',
              fontWeight: '600',
              ...getHeadingStyles,
            }}
          >
            Service Fee{' '}
            {service?.type === 'Percentage'
              ? `(${service.amount}%)`
              : ''}
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{ ...getDescriptionStyles }}
          >
            Rs. {fNumber(serviceFee)}
          </Typography>
        </Stack>
      );
    }

    return null;
  };

  useEffect(() => {
    if (!cardItems || items.length === 0) {
      return;
    }

    const mode = states.orderType;
    let totalServiceValue = 0;
    let serviceFeesObj = {};

    const deliveryFeesObject = {
      reason: deliveryResult?.reason,
      waiveOff: true,
      waiveOffValue: deliveryFees,
      ...(deliveryResult?.reason === 'highOrderAmount' && {
        orderThreshold: storeDeliveryMaxOrderThreshold,
      }),
      ...(deliveryResult?.reason === 'lessDistanceOrder' && {
        distanceThreshold: storeDeliveryMaxDistanceThreshold,
      }),
    };

    if (
      isServiceFeesApplicableOnStore &&
      isApplicable(
        serviceFeesObject?.[mode]?.[
          states.paymentMethod
        ]?.applicable
      )
    ) {
      totalServiceValue = Number(serviceFee);

      serviceFeesObj = {
        [mode]: {
          [states.paymentMethod]:
            serviceFeesObject?.[mode]?.[
            states.paymentMethod
            ],
        },
      };
    }

    const orderData = {
      levelId: cardItems?.levelId,
      venueId: cardItems?.venueId,
      total: fNumber(total),
      orderType: mode,
      type: 'store',

      ...(mode === 'storeDelivery' && {
        isDeliveryFeesApplicable: true,
      }),

      paymentType: states.paymentMethod,
      tax: fNumber(taxAmount),
      subTotal: fNumber(subTotal),
      tip:
        selectedTip === null
          ? 0
          : fNumber(selectedTip),

      discount: Number(discount || 0),

      discountObject:
        cardItems?.discountObject || {
          reason: discount > 0 ? 'Promotion' : '',
          value: Number(discount || 0),
        },

      promotion: Number(promotion || 0),
      serviceFees: fNumber(totalServiceValue),
      location: states.latLong
        ? states.latLong
        : '2,2',

      platformFees: platformFee,
      deliveryFees: finalDeliveryFee,

      ...(isDeliveryFeeApplicableOnStore &&
        orderType === 'storeDelivery' &&
        finalDeliveryFee === 0 && {
        deliveryFeesObject,
      }),

      serviceFeesObject: serviceFeesObj,
    };

    setOrderData(orderData);
  }, [
    cardItems,
    items.length,
    states.orderType,
    states.paymentMethod,
    states.latLong,
    total,
    selectedTip,
    serviceFee,
    taxAmount,
    subTotal,
    discount,
    promotion,
    isServiceFeesApplicableOnStore,
    serviceFeesObject,
    deliveryResult,
    deliveryFees,
    storeDeliveryMaxOrderThreshold,
    storeDeliveryMaxDistanceThreshold,
    platformFee,
    finalDeliveryFee,
    isDeliveryFeeApplicableOnStore,
    orderType,
    setOrderData,
  ]);

  return (
    <Card
      sx={{
        mb: 2,
        backgroundColor: checkoutTotalSummaryBackground,
      }}
    >
      <CardContent sx={{ padding: '16px !important' }}>
        <Stack spacing={1}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: '700',
              fontSize: 25,
              ...getOrderHeadingStyles,
            }}
          >
            Your Order
          </Typography>

          <Stack
            direction="row"
            justifyContent="space-between"
          >
            <Typography
              sx={{
                color: 'text.secondary',
                fontWeight: '600',
                ...getHeadingStyles,
              }}
            >
              Sub Total
            </Typography>

            <Typography
              variant="subtitle2"
              sx={{ ...getDescriptionStyles }}
            >
              Rs. {truncateTo2(subTotal)}
            </Typography>
          </Stack>

          {discount > 0 && (
            <Stack
              direction="row"
              justifyContent="space-between"
            >
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontWeight: '600',
                  ...getHeadingStyles,
                }}
              >
                Discount
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{ ...getDescriptionStyles }}
              >
                - Rs. {fNumber(discount)}
              </Typography>
            </Stack>
          )}

          {promotion > 0 && (
            <Stack
              direction="row"
              justifyContent="space-between"
            >
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontWeight: '600',
                  ...getHeadingStyles,
                }}
              >
                Promotion
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{ ...getDescriptionStyles }}
              >
                - Rs. {fNumber(promotion)}
              </Typography>
            </Stack>
          )}

          {isPlatformFeeApplicableOnStore && (
            <Stack
              direction="row"
              justifyContent="space-between"
            >
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontWeight: '600',
                  ...getHeadingStyles,
                }}
              >
                Platform Fee
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{ ...getDescriptionStyles }}
              >
                Rs. {platformFee}
              </Typography>
            </Stack>
          )}

          {renderServiceFee()}

          {isDeliveryFeeApplicableOnStore &&
            orderType === 'storeDelivery' && (
              <Stack
                direction="row"
                justifyContent="space-between"
              >
                <Typography
                  sx={{
                    color: 'text.secondary',
                    fontWeight: '600',
                    ...getHeadingStyles,
                  }}
                >
                  Delivery Fee
                </Typography>

                <Typography
                  variant="subtitle2"
                  sx={{ ...getDescriptionStyles }}
                >
                  Rs. {finalDeliveryFee}
                </Typography>
              </Stack>
            )}

          {isTaxApplicableOnStore && (
            <Stack
              direction="row"
              justifyContent="space-between"
            >
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontWeight: '600',
                  ...getHeadingStyles,
                }}
              >
                Tax
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{ ...getDescriptionStyles }}
              >
                Rs. {fNumber(taxAmount)}
              </Typography>
            </Stack>
          )}

          <Stack
            direction="row"
            justifyContent="space-between"
          >
            <Typography
              sx={{
                color: '#FCA92E',
                fontWeight: '600',
                ...getHeadingStyles,
              }}
            >
              Total Amount
            </Typography>

            <Typography
              variant="subtitle2"
              sx={{
                color: '#FCA92E',
                ...getDescriptionStyles,
              }}
            >
              Rs. {fNumberRound(total)}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CartCheckoutTotalSummary;