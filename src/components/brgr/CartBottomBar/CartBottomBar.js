import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
// import {Iconify} from "src/components/brgr/iconify";
import {
    calculateSubTotal,
} from "../../../utils/cart";
import { fNumber } from "../../../utils/formatNumber";
// import { useCart } from '../CartContext';
// import CartDrawer from '../header/CartDrawer';
// import { useUI } from './ScrollContext';
import { getScreenSizeCategory } from "../../../utils/fontsize";

export default function CartBottomBar({
    states,
    actions,
    previewMode = false,
    globalComponentStyles,
    layout,
    themeColors
}) {
    layout = layout?.json ? layout?.json : layout
    // console.log("CartBottomBar layout", layout);
    // console.log("CartBottomBar globalComponentStyles", globalComponentStyles);
    // const { cartItems } = useCart();
    const [cartOpen, setCartOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    // const { scrollToSearch } = useUI();

    // const totalPrice = cartItems.reduce(
    //     (sum, item) => sum + item.price * item.quantity,
    //     0
    // );
    const cardItems = states?.cardItems?.items ?? [];


    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getTextStyles = {
        color:
            layout?.cartBottomBarLayout?.body[0].styles?.cartBottomBarTextColor?.value !== ""
                ? `${layout?.cartBottomBarLayout?.body[0].styles?.cartBottomBarTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ""
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.cartBottomBarTextColor?.value}`,
        fontWeight:
            layout?.cartBottomBarLayout?.body[0].styles?.cartBottomBarTextWeight?.value !== ""
                ? layout?.cartBottomBarLayout?.body[0].styles?.cartBottomBarTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value :
                    themeColors?.cartBottomBarTextWeight?.value,
        fontSize:
            layout?.cartBottomBarLayout?.body[0].styles?.cartBottomBarTextSize?.value[getScreenSizeCategory()] != 0
                ? layout?.cartBottomBarLayout?.body[0].styles?.cartBottomBarTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.cartBottomBarTextSize?.value[getScreenSizeCategory()],

        fontFamily: layout?.cartBottomBarLayout?.body[0].styles?.cartBottomBarTextFont?.value != ""
            ? `${layout?.cartBottomBarLayout?.body[0].styles?.cartBottomBarTextFont?.value}`
            : globalComponentStyles?.Text?.fontFamily?.value != ""
                ? globalComponentStyles?.Text?.fontFamily?.value
                : `${themeColors?.cartBottomBarTextFont?.value}`,

        fontStyle: layout?.cartBottomBarLayout?.body[0].styles?.cartBottomBarTextStyle?.value !== ""
            ? `${layout?.cartBottomBarLayout?.body[0].styles?.cartBottomBarTextStyle?.value}`
            : globalComponentStyles?.Text?.fontStyle?.value != ""
                ? globalComponentStyles?.Text?.fontStyle?.value
                : `${themeColors?.cartBottomBarTextStyle?.value}`,
        backgroundColor: 
           layout?.cartBottomBarLayout?.body[0].styles?.cartBottomBarBackgroundColor?.value !== ""
                ? `${layout?.cartBottomBarLayout?.body[0].styles?.cartBottomBarBackgroundColor?.value}`
                : globalComponentStyles?.Background?.color?.value !== ""
                    ? globalComponentStyles?.Background?.color?.value
                    : `${themeColors?.cartBottomBarBackgroundColor?.value}`,
    };

    const content = (
        <Box
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '16px',
                zIndex: 1000,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'center',
                }}
            >
                {states?.cardItems?.items?.length > 0 && (
                    <Box
                        style={{
                            ...getTextStyles,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 30,
                            padding: 16,
                            borderRadius: '20px',
                            maxWidth: 400,
                            width: '100%',
                            justifyContent: 'space-between',
                            flex: 1,
                            margin: '0 12px',
                        }}
                        onClick={() => {
                            if (!previewMode) {
                                actions.handleOpenCart()
                            }
                        }}>
                        <Typography style={{ fontWeight: 'bold' }}>
                            {states?.cardItems?.items?.length}
                        </Typography>
                        <Typography style={{ fontWeight: 'bold' }}>
                            View Cart
                        </Typography>
                        <Typography style={{ fontWeight: 'bold' }}>
                            Rs. {fNumber(calculateSubTotal(cardItems))}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
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
                    ...getTextStyles,
                    width: '90%',
                    borderRadius: "20px",
                    boxShadow: 24,
                    padding: "32px 24px 24px",
                    border: "2px solid #e0e0e0",
                }}

            >{content}</Box>
        </Box>
    ) : (
        <>
            {content}
        </>
    );
}