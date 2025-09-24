'use client';
import React, { useState, useEffect } from "react";
import {
    Box,
    Divider,
    IconButton,
    Button,
    Typography,
    Link as MuiLink,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import Iconify from '../iconify';
import { getIconWidthHeight, getScreenSizeCategory } from '../../../utils/fontsize';

const ReviewModal = ({ states, onClose, previewMode = false, layout, globalComponentStyles, themeColors }) => {
    const goToOrder = () => {
        const orderId = states?.orderData?.id;
        //   navigate(`/review?orderId=${orderId}`);
    };

     const orderCompletedStyles = {
        color:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderCompletedTextColor?.value !== ""
                ? `${layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderCompletedTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.reviewModalOrderCompletedTextColor?.value}`,
        fontSize:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderCompletedTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderCompletedTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.reviewModalOrderCompletedTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderCompletedTextWeight?.value != ""
                ? layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderCompletedTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.reviewModalOrderCompletedTextWeight?.value,
        fontFamily:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderCompletedTextFont?.value != ""
                ? layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderCompletedTextFont?.value
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : themeColors?.reviewModalOrderCompletedTextFont?.value,
        fontStyle:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderCompletedTextStyle?.value !== ""
                ? layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderCompletedTextStyle?.value
                : globalComponentStyles?.Text?.fontStyle?.value != ""
                    ? globalComponentStyles?.Text?.fontStyle?.value
                    : themeColors?.reviewModalOrderCompletedTextStyle?.value,
    };

     const addReviewStyles = {
        color:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalReviewAddTextColor?.value !== ""
                ? `${layout?.reviewModalLayout?.body[0].styles?.reviewModalReviewAddTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.reviewModalReviewAddTextColor?.value}`,
        fontSize:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalReviewAddTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.reviewModalLayout?.body[0].styles?.reviewModalReviewAddTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.reviewModalReviewAddTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalReviewAddTextWeight?.value != ""
                ? layout?.reviewModalLayout?.body[0].styles?.reviewModalReviewAddTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.reviewModalReviewAddTextWeight?.value,
        fontFamily:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalReviewAddTextFont?.value != ""
                ? layout?.reviewModalLayout?.body[0].styles?.reviewModalReviewAddTextFont?.value
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : themeColors?.reviewModalReviewAddTextFont?.value,
        fontStyle:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalReviewAddTextStyle?.value !== ""
                ? layout?.reviewModalLayout?.body[0].styles?.reviewModalReviewAddTextStyle?.value
                : globalComponentStyles?.Text?.fontStyle?.value != ""
                    ? globalComponentStyles?.Text?.fontStyle?.value
                    : themeColors?.reviewModalReviewAddTextStyle?.value,
    };

    const orderDeclinedStyles = {
        color:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderDeclinedTextColor?.value !== ""
                ? `${layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderDeclinedTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.reviewModalOrderDeclinedTextColor?.value}`,
        fontSize:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderDeclinedTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderDeclinedTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.reviewModalOrderDeclinedTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderDeclinedTextWeight?.value != ""
                ? layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderDeclinedTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.reviewModalOrderDeclinedTextWeight?.value,
        fontFamily:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderDeclinedTextFont?.value != ""
                ? layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderDeclinedTextFont?.value
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : themeColors?.reviewModalOrderDeclinedTextFont?.value,
        fontStyle:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderDeclinedTextStyle?.value !== ""
                ? layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderDeclinedTextStyle?.value
                : globalComponentStyles?.Text?.fontStyle?.value != ""
                    ? globalComponentStyles?.Text?.fontStyle?.value
                    : themeColors?.reviewModalOrderDeclinedTextStyle?.value,
    };

    const renderOrderContent = () => {
        const state = states?.orderData?.state;
        return (
            <>
                {state === "abort" && (
                    <Typography component="h2" sx={{ ...orderDeclinedStyles}}>
                        Your order has been declined from{" "}
                        {states?.orderData?.venueId?.name}.
                    </Typography>
                )}
                {state === "completed" && (
                    <>
                        <Typography variant="h6" component="h2" sx={{ mb: 2, ...orderCompletedStyles }}>
                            Your order has been completed.
                        </Typography>
                        <MuiLink
                            sx={{
                                display: "block",
                                mb: 3,
                                cursor: "pointer",
                                ...addReviewStyles
                            }}
                            color="primary"
                            onClick={() => {
                                if (previewMode == false) {
                                    goToOrder();
                                }
                            }}

                        >
                            Want to Add Review
                        </MuiLink>
                    </>
                )}
            </>
        );
    };
    
   const ReviewModal = ({ states, previewMode = false, layout, globalComponentStyles, themeColors, actions }) => {
    const goToOrder = () => {
        const orderId = states?.orderData?.id;
        actions.naviagateReviewPage(`${orderId}`)
    };

    const orderCompletedStyles = {
        color:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderCompletedTextColor?.value !== ""
                ? `${layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderCompletedTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.reviewModalOrderCompletedTextColor?.value}`,
        fontSize:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderCompletedTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderCompletedTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.reviewModalOrderCompletedTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderCompletedTextWeight?.value != ""
                ? layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderCompletedTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.reviewModalOrderCompletedTextWeight?.value,
        fontFamily:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderCompletedTextFont?.value != ""
                ? layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderCompletedTextFont?.value
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : themeColors?.reviewModalOrderCompletedTextFont?.value,
        fontStyle:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderCompletedTextStyle?.value !== ""
                ? layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderCompletedTextStyle?.value
                : globalComponentStyles?.Text?.fontStyle?.value != ""
                    ? globalComponentStyles?.Text?.fontStyle?.value
                    : themeColors?.reviewModalOrderCompletedTextStyle?.value,
    };

    const addReviewStyles = {
        color:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalReviewAddTextColor?.value !== ""
                ? `${layout?.reviewModalLayout?.body[0].styles?.reviewModalReviewAddTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.reviewModalReviewAddTextColor?.value}`,
        fontSize:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalReviewAddTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.reviewModalLayout?.body[0].styles?.reviewModalReviewAddTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.reviewModalReviewAddTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalReviewAddTextWeight?.value != ""
                ? layout?.reviewModalLayout?.body[0].styles?.reviewModalReviewAddTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.reviewModalReviewAddTextWeight?.value,
        fontFamily:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalReviewAddTextFont?.value != ""
                ? layout?.reviewModalLayout?.body[0].styles?.reviewModalReviewAddTextFont?.value
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : themeColors?.reviewModalReviewAddTextFont?.value,
        fontStyle:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalReviewAddTextStyle?.value !== ""
                ? layout?.reviewModalLayout?.body[0].styles?.reviewModalReviewAddTextStyle?.value
                : globalComponentStyles?.Text?.fontStyle?.value != ""
                    ? globalComponentStyles?.Text?.fontStyle?.value
                    : themeColors?.reviewModalReviewAddTextStyle?.value,
    };

    const orderDeclinedStyles = {
        color:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderDeclinedTextColor?.value !== ""
                ? `${layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderDeclinedTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.reviewModalOrderDeclinedTextColor?.value}`,
        fontSize:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderDeclinedTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderDeclinedTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.reviewModalOrderDeclinedTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderDeclinedTextWeight?.value != ""
                ? layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderDeclinedTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.reviewModalOrderDeclinedTextWeight?.value,
        fontFamily:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderDeclinedTextFont?.value != ""
                ? layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderDeclinedTextFont?.value
                : globalComponentStyles?.Text?.fontFamily?.value != ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : themeColors?.reviewModalOrderDeclinedTextFont?.value,
        fontStyle:
            layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderDeclinedTextStyle?.value !== ""
                ? layout?.reviewModalLayout?.body[0].styles?.reviewModalOrderDeclinedTextStyle?.value
                : globalComponentStyles?.Text?.fontStyle?.value != ""
                    ? globalComponentStyles?.Text?.fontStyle?.value
                    : themeColors?.reviewModalOrderDeclinedTextStyle?.value,
    };

    const renderOrderContent = () => {
        const state = states?.orderData?.state;
        console.log('the states is', state)
        return (
            <>
                {state === "abort" && (
                    <Typography component="h2" sx={{ ...orderDeclinedStyles }}>
                        Your order has been declined from{" "}
                        {states?.orderData?.venueId?.name}.
                    </Typography>
                )}
                {state === "completed" && (
                    <>
                        <Typography variant="h6" component="h2" sx={{ mb: 2, ...orderCompletedStyles }}>
                            Your order has been completed.
                        </Typography>
                        <MuiLink
                            sx={{
                                display: "block",
                                mb: 3,
                                cursor: "pointer",
                                ...addReviewStyles
                            }}
                            color="primary"
                            onClick={() => {
                                if (previewMode == false) {
                                    goToOrder();
                                }
                            }}

                        >
                            Want to Add Review
                        </MuiLink>
                    </>
                )}
            </>
        );
    };

    return (
        <>
            {previewMode ? (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        sx={{
                            width: 400,
                            maxWidth: "90%",
                            bgcolor: "background.paper",
                            borderRadius: 2,
                            boxShadow: 24,
                            p: 4,
                            textAlign: "center",
                            backgroundColor: layout?.reviewModalLayout?.body[0].styles?.reviewModalBackgroundColor?.value || themeColors?.reviewModalBackgroundColor?.value
                        }}
                    >
                        {renderOrderContent()}
                    </Box>
                </Box>
            ) : (
                <Dialog
                    open={open}
                    onClose={()=>{ states.setOpenReviewModal(false)}}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: 2,
                            overflow: 'hidden',
                        }
                    }}
                >
                    <DialogTitle
                        sx={{
                            backgroundColor: layout?.reviewModalLayout?.body[0].styles?.reviewModalBackgroundColor?.value || themeColors?.reviewModalBackgroundColor?.value,
                            px: 3,
                            py: 2,
                        }}
                    >
                        
                    </DialogTitle>

                    <DialogContent sx={{ px: 3, py: 2, textAlign: 'center' }}>
                         {renderOrderContent()}
                    </DialogContent>

                    <DialogActions
                        sx={{
                            justifyContent: 'flex-end',
                            px: 3,
                            py: 2,
                        }}
                    >
                        <Button
                            onClick={()=>{ states.setOpenReviewModal(false) }}
                            variant="outlined"
                            sx={{
                                borderColor: '#fca92e',
                                color: '#fca92e',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    borderColor: '#fca92e',
                                    opacity: 0.8,
                                }
                            }}
                        >
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>


            )}
        </>
    );

};

};


export default ReviewModal;
