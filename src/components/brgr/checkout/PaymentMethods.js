import React from "react";
import { Stack, Paper, Radio, RadioGroup, Box,  FormControlLabel } from "@mui/material";
import Iconify from "../iconify";

const PAYMENT_OPTIONS = [
  {
    value: "cash",
    title: "Pay at the counter",
    icons: ["/assets/icons/payments/ic_paypal.svg"],
  },
  {
    value: "card",
    title: "Credit / Debit Card",
    icons: [
      "/assets/icons/payments/ic_mastercard.svg",
      "/assets/icons/payments/ic_visa.svg",
    ],
  },
];

export default function PaymentMethods({ actions, prop, styles, states, PaymentComponent, getPayAtCounterStyles, getPaymentCheckedIconStyles, getCreditDebitCardStyles, getPaymentUnCheckedIconStyles, paymentSectionBackground }) {
  const { franchise, orderType } = states ?? {}
  const { configurations } = franchise ?? {}
  const { isCardAvailableOnStore, isCashAvailableOnStore, isCardAvailableOnDelivery, isCardAvailableOnPickUp, isCashAvailableOnDelivery, isCashAvailableOnPickUp } = configurations ?? {}

  const isCashAvailable = () => {
    if (!isCashAvailableOnStore) return false;
    if (orderType === "storeDelivery" && isCashAvailableOnDelivery) return true;
    if (orderType === "storePickUp" && isCashAvailableOnPickUp) return true
    return false;
  };

  const isCardAvailable = () => {
    if (!isCardAvailableOnStore) return false;
    if (orderType === "storeDelivery" && isCardAvailableOnDelivery) return true;
    if (orderType === "storePickUp" && isCardAvailableOnPickUp) return true;
    return false;
  };


  return (
    <Box sx={{ marginTop: '5px' }}>
      <RadioGroup
        value={states.paymentMethod}
        onChange={(event) => actions.handleSetPaymentMethod(event.target.value)}
        sx={{ marginTop: 0 }}
      >
        <Stack sx={{ display: 'flex', flexDirection: { sm: 'row' }, justifyContent: 'space-between', gap: 1 }}>
          {PAYMENT_OPTIONS.filter((option) => {
            if (option.value === "cash") return isCashAvailable();
            if (option.value === "card") return isCardAvailable();
            return false;
          }).map((option) => (
            <PaymentOption
            paymentSectionBackground={paymentSectionBackground}
              key={option.title}
              option={option}
              isSelected={states.paymentMethod === option.value}
              hasChild={option.value === "card"}
              isCreditMethod={option.value === "card" && states.paymentMethod === "card"}
              getPayAtCounterStyles={getPayAtCounterStyles}
              getPaymentCheckedIconStyles={getPaymentCheckedIconStyles}
              getCreditDebitCardStyles={getCreditDebitCardStyles}
              getPaymentUnCheckedIconStyles={getPaymentUnCheckedIconStyles}
            />
          ))}
        </Stack>
      </RadioGroup>
      {PaymentComponent && states.paymentMethod === "card" && states.openPaymentCard && (
        <PaymentComponent
          actions={actions}
          prop={prop}
          styles={styles}
          states={states}
        />
      )}
    </Box>
  );
}

function PaymentOption({
  option,
  hasChild,
  getPayAtCounterStyles,
  getCreditDebitCardStyles,
  getPaymentCheckedIconStyles, 
  getPaymentUnCheckedIconStyles,
  paymentSectionBackground
}) {
  const { value, title, icons } = option;

  return (
    <Paper
      variant="outlined"
      sx={{
        display: "flex",
        position: "relative",
        justifyContent: "space-between",
        width: "100%",
        transition: (theme) => theme.transitions.create("all"),
        ...(hasChild && {
        }),
        ...paymentSectionBackground
      }}
    >
      <FormControlLabel
        value={value}
        control={
          <Radio
            checkedIcon={<Iconify icon="eva:checkmark-circle-2-fill" />}
            sx={{
              color: getPaymentUnCheckedIconStyles, 
              '&.Mui-checked': {
                color: getPaymentCheckedIconStyles , 
              },
             
            }}
          />
        }
        label={title}
        sx={{
          py: 2, pl: 2.5, flexGrow: 1, mr: 0,
          '& .MuiFormControlLabel-label': {
            ...(title === 'Pay at the counter'
              ? getPayAtCounterStyles
              : getCreditDebitCardStyles),
          },

        }}
      />

      <Stack
        spacing={1}
        direction="row"
        alignItems="center"
        sx={{ position: "absolute", right: 20, top: 24 }}
      >
      </Stack>
    </Paper>
  );
}
