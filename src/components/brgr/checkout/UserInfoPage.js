import React, { useState } from "react";
import { Grid, InputAdornment, Typography, Button } from "@mui/material";
import { RHFTextField } from "../../hook-form";
import { getScreenSizeCategory } from '../../../utils/fontsize';
import AddAddressModal from "./AddAddressModal";

const CountryCode = process.env.NEXT_PUBLIC_COUNTRY_CODE;

export default function UserInfoPage({ states, actions, layout, globalComponentStyles, themeColors }) {
    const { orderType } = states ?? {}
    const [open, setOpen] = useState(false);
    const { isRegionBasedDeliveryOnStore } = states.franchise.configurations ?? {}
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
            : globalComponentStyles?.Text?.fontStyle?.value != ""
                ? globalComponentStyles?.Text?.fontStyle?.value
                : `${themeColors?.CartCheckoutSummaryHeadingTextStyle?.value}`,
    };
    const getPlaceOrderButtonStyles = {
        color:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextColor
                ?.value !== ''
                ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ''
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.CartCheckoutSummaryPlaceOrderTextColor?.value}`,
        fontSize:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextSize
                ?.value[getScreenSizeCategory()] != 0
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextSize
                    ?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.CartCheckoutSummaryPlaceOrderTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextWeight
                ?.value != ''
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextWeight
                    ?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ''
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.CartCheckoutSummaryPlaceOrderTextWeight?.value,

        fontFamily:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextFont
                ?.value != ''
                ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextFont?.value}`
                : globalComponentStyles?.Text?.fontFamily?.value != ''
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : `${themeColors?.CartCheckoutSummaryPlaceOrderTextFont?.value}`,

        fontStyle:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextStyle
                ?.value !== ''
                ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextStyle?.value}`
                : globalComponentStyles?.Text?.fontStyle?.value != ''
                    ? globalComponentStyles?.Text?.fontStyle?.value
                    : `${themeColors?.CartCheckoutSummaryPlaceOrderTextStyle?.value}`,

        backgroundColor:
            layout?.cartCheckoutSummaryLayout?.body[0].styles
                ?.CartCheckoutSummaryPlaceOrderBackgroundColor?.value !== ''
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles
                    ?.CartCheckoutSummaryPlaceOrderBackgroundColor?.value
                : globalComponentStyles?.Button?.backgroundColor?.value != ''
                    ? globalComponentStyles?.Button?.backgroundColor?.value
                    : themeColors?.CartCheckoutSummaryPlaceOrderBackgroundColor?.value,
    };

    return (
        <>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography fontWeight="600" sx={{ ...getHeadingStyles }}  >
                                First Name*
                            </Typography>
                            <RHFTextField name="firstName"
                                sx={{
                                    "& .MuiInputBase-root": {
                                        backgroundColor: "white",
                                    },
                                    "& .Mui-error .MuiInputBase-root": {
                                        backgroundColor: "transparent",
                                    },
                                }}
                                placeholder="First Name" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography fontWeight="600" sx={{ ...getHeadingStyles }}  >
                                Last Name*
                            </Typography>
                            <RHFTextField name="lastName"
                                sx={{
                                    "& .MuiInputBase-root": {
                                        backgroundColor: "white",
                                    },
                                    "& .Mui-error .MuiInputBase-root": {
                                        backgroundColor: "transparent",
                                    },
                                }}
                                placeholder="Last Name" fullWidth />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography fontWeight="600" sx={{ ...getHeadingStyles }}  >
                                Mobile Number*
                            </Typography>
                            <RHFTextField
                                fullWidth
                                name="phone"
                                placeholder="3xxxxxxxxx"
                                sx={{
                                    "& .MuiInputBase-root": {
                                        backgroundColor: "white",
                                    },
                                    "& .Mui-error .MuiInputBase-root": {
                                        backgroundColor: "transparent",
                                    },
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <span>{CountryCode}</span>
                                        </InputAdornment>
                                    ),
                                    inputMode: "numeric",
                                }}
                                inputProps={{
                                    maxLength: 10,
                                    onInput: (e) => {
                                        e.target.value = e.target.value.replace(/\D/g, "");
                                    },
                                    onKeyDown: (e) => {
                                        if (!/^[0-9]$/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
                                            e.preventDefault();
                                        }
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography fontWeight="600" sx={{ ...getHeadingStyles }}  >
                                Email Address*
                            </Typography>
                            <RHFTextField name="email"
                                sx={{
                                    "& .MuiInputBase-root": {
                                        backgroundColor: "white",
                                    },
                                    "& .Mui-error .MuiInputBase-root": {
                                        backgroundColor: "transparent",
                                    },
                                }}
                                placeholder="Enter your email" fullWidth />
                        </Grid>
                    </Grid>
                </Grid>
                {(orderType === "storeDelivery" && !isRegionBasedDeliveryOnStore) ? (
                    <>
                        <Grid item xs={12} sm={12}>
                            <Typography fontWeight="600" sx={{ ...getHeadingStyles }}  >
                                Delivery Address*
                            </Typography>
                            <RHFTextField name="address.street"
                                sx={{
                                    "& .MuiInputBase-root": {
                                        backgroundColor: "white",
                                    },
                                    "& .Mui-error .MuiInputBase-root": {
                                        backgroundColor: "transparent",
                                    },
                                }}
                                fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography fontWeight="600" sx={{ ...getHeadingStyles }}  >
                                        Area*
                                    </Typography>
                                    <RHFTextField name="address.area"
                                        sx={{
                                            "& .MuiInputBase-root": {
                                                backgroundColor: "white",
                                            },
                                            "& .Mui-error .MuiInputBase-root": {
                                                backgroundColor: "transparent",
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography fontWeight="600" sx={{ ...getHeadingStyles }}  >
                                        City*
                                    </Typography>
                                    <RHFTextField name="address.city"
                                        sx={{ backgroundColor: "white" }}
                                        disabled />
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
                ) : (orderType === "storeDelivery" && isRegionBasedDeliveryOnStore) ? (
                    <>
                        <Grid container spacing={2} item xs={12} sm={12}>
                            <Grid item xs={12} sm={12}>
                                <Typography sx={{ ...getHeadingStyles, fontWeight: "700"}}>
                                    Your Address
                                </Typography>
                                    {states?.addressRegionCase && <Typography sx={{ ...getHeadingStyles }}>
                                        {states?.addressRegionCase}, {states?.selectedRegion?.name}, Lahore
                                    </Typography>}

                                <Button
                                    disableRipple
                                    disableElevation
                                    variant="contained"
                                    onClick={() => setOpen(true)}
                                    sx={{
                                        mt: 2,
                                        '&:hover': {
                                            backgroundColor:
                                                layout?.cartCheckoutSummaryLayout?.body[0].styles
                                                    ?.CartCheckoutSummaryPlaceOrderBackgroundColor?.value !== ''
                                                    ? layout?.cartCheckoutSummaryLayout?.body[0].styles
                                                        ?.CartCheckoutSummaryPlaceOrderBackgroundColor?.value
                                                    : globalComponentStyles?.Button?.backgroundColor?.value != ''
                                                        ? globalComponentStyles?.Button?.backgroundColor?.value
                                                        : themeColors?.CartCheckoutSummaryPlaceOrderBackgroundColor
                                                            ?.value,
                                        },
                                        ...getPlaceOrderButtonStyles,
                                    }}
                                >
                                    Add / Change Address
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                ) : null
                }
                {/* <Grid item xs={12} sm={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <Typography fontWeight="600" sx={{ ...getHeadingStyles }}  >
                            {orderType === "storeDelivery" ? "Delivery Instructions" : "Pickup Notes"}
                        </Typography>
                        <RHFTextField name="notes" sx={{ backgroundColor: "white" }}
                            placeholder={
                                orderType === "storeDelivery"
                                    ? "Delivery Instructions"
                                    : "Notes"
                            }
                            fullWidth />
                    </Grid>
                </Grid>
            </Grid> */}
            </Grid>
            <AddAddressModal states={states} actions={actions} layout={layout} globalComponentStyles={globalComponentStyles} themeColors={themeColors} open={open} onClose={() => setOpen(false)} />
        </>
    );
}
