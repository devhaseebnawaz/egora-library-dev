import React, { useCallback, useEffect } from "react";
// import { useCart } from "../CartContext";
// import { useSwipeable } from "react-swipeable";

import {
    Box,
    Button,
    Divider,
    Stack,
    Typography,
    IconButton,
    Avatar
} from "@mui/material";
import Iconify from "../iconify";
import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { updateItemsToCard,} from "src/redux/slices/cardSlice";
// import useSession from "src/utils/useSession";
import { fNumber } from "../../../utils/formatNumber";
// import { fetchImage } from "src/utils/fetchImage";
// import capitalizeWords from "src/utils/capitalizeWords";

import { getScreenSizeCategory } from '../../../utils/fontsize';

const CartItems = ({ showButtons = true, actions, cartItem, cardItems, index, showDeleteIndex, setShowDeleteIndex, handleRemoveFromCart, handleMenuItemClick, states, layout, globalComponentStyles, themeColors, previewMode, getItemPriceStyles, getItemIncreaseButtonStyles, getItemDecreaseButtonStyles, getItemDescriptionStyles, getItemHeadingStyles, getItemNameStyles, getImageStyles, getItemQtyStyles, getItemQtyButtonStyles, getItemNotesStyles }) => {
    // console.log("the cart item sis", cartItem)
    // const sessionInfo = useSession();
    // const dispatch = useDispatch();
    // const { cardItems } = useSelector((state) => state.cardSlice);
    // const { calculateMenuItemTotal } = useCart();


    // const [imageStyle, setImageStyle] = useState({});

    // const handlers = useSwipeable({
    //     onSwipedLeft: () => {
    //         setShowDeleteIndex(index);
    //         setImageStyle({ transform: "translateX(-30px)", transition: "transform 0.3s ease" });
    //     },
    //     onSwipedRight: () => {
    //         setShowDeleteIndex(null);
    //         setImageStyle({ transform: "translateX(0)", transition: "transform 0.3s ease" });
    //     },
    //     preventDefaultTouchmoveEvent: true,
    //     trackMouse: true,
    // });


    const [imageURLs, setImageURLs] = useState([]);

    // useEffect(() => {
    //     const fetchImagesForCart = async () => {
    //         if (cardItems?.data?.items && cardItems?.data?.items.length > 0) {
    //             const urls = await Promise.all(
    //                 cardItems?.data?.items.map(async (elem) => {
    //                     try {
    //                         const res = await fetchImage(elem.photoURL);
    //                         return res;
    //                     } catch (error) {
    //                         console.error("Error fetching data:", error);
    //                         return null;
    //                     }
    //                 })
    //             );
    //             setImageURLs(urls);
    //         }
    //     };

    //     fetchImagesForCart();
    // }, [cardItems]);

    const calculateMenuItemTotal = (cartItem) => {
        const itemQuantity = cartItem.qty;
        let p =
            cartItem?.choiceGroup?.length > 0 || cartItem?.variants?.length > 0
                ? cartItem?.priceWithChoiceGroup
                : cartItem?.price;
        let itemTotal = p * itemQuantity;
        if (cartItem.selectedAddOns && cartItem.selectedAddOns.length > 0) {
            cartItem.selectedAddOns.forEach((addon) => {
                itemTotal += parseFloat(addon.price.replace("Rs. ", ""));
            });
        }
        itemTotal = itemTotal.toFixed(0);
        return `Rs. ${fNumber(itemTotal)}`;
    };


    return (
        <Box>
            <>
                <Box
                    // {...handlers}
                    key={index}
                    sx={{
                        // ...imageStyle,
                        display: "flex",
                        padding: "10px 0",
                        justifyContent: "space-between",
                        alignItems: "start",
                        borderRadius: "5px",
                        width: "100%",
                    }}
                >
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "flex-start",
                            }}
                        // onClick={() => handleMenuItemClick(cartItem)}
                        >
                            <Box
                                sx={{

                                    display: "inline-block",
                                    padding: "5px",
                                    borderRadius: "8px",
                                    "@media (max-width: 600px)": {
                                        padding: "3px",
                                    },
                                }}
                            >
                                {/* <Image
                                    src={
                                        imageURLs[index]
                                            ? imageURLs[index]
                                            : "/assets/placeholder.png"
                                    }
                                    sx={{

                                        height: "80px",
                                        width: "80px",
                                        borderRadius: "5px",
                                        "@media (max-width: 600px)": {
                                            height: "50px",
                                            width: "50px",
                                        },
                                    }}
                                /> */}
                                <Avatar
                                    variant="rounded"
                                    src={cartItem?.photoURL ? `${states.storeImagesBaseUrl}/${cartItem.photoURL}`
                                        : '/assets/placeholder.png'
                                    }
                                    alt={cartItem.name}
                                    style={{
                                        // width: 64,
                                        // height: 64,
                                        // borderRadius: 8,
                                        marginRight: 4,
                                        ...getImageStyles,
                                    }}
                                />
                            </Box>

                            <Stack>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "self-end",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <Typography
                                        // onClick={() => handleMenuItemClick(cartItem)}
                                        onClick={() => {
                                            if (!previewMode) {
                                                // actions.handleOpenCard(); actions.handleItemEditOpen(), states.setItemForDetailedModal(cartItem)
                                            }
                                        }}
                                        sx={{
                                            fontWeight: 400,
                                            fontSize: "14px",
                                            marginLeft: "9px",
                                            cursor: showButtons ? "pointer" : "",
                                            "@media (max-width: 600px)": {
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                width: "80px"
                                            },

                                            "@media (max-width: 330px)": {
                                                maxWidth: "100px",
                                            },
                                            ...getItemNameStyles
                                        }}
                                    >
                                        {cartItem?.name}
                                    </Typography>
                                    {/* <img
                                        src="/assets/order/edit.svg"
                                        alt="Dine In"
                                        style={{
                                            marginLeft: "7px",
                                            color: "#F08203",
                                            cursor: "pointer",
                                            width: "12px",
                                            marginBottom: "3px",
                                        }}
                                        // onClick={() => handleMenuItemClick(cartItem)}
                                    /> */}
                                </Box>

                                {cartItem?.selectedVariant && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                ml: 1.3,
                                                fontSize: 12,
                                                fontWeight: "bold",
                                                // color: "#666",
                                                ...getItemHeadingStyles
                                            }}
                                        >
                                            Variant:
                                        </Typography>
                                        <Typography sx={{ ml: 1, fontSize: 12, ...getItemDescriptionStyles }}>
                                            {cartItem?.selectedVariant?.name}
                                        </Typography>
                                    </Box>
                                )}

                                {cartItem?.groups && cartItem?.groups?.length > 0 && (
                                    <>
                                        {cartItem?.groups?.map((sauce, index) => (
                                            <Typography
                                                key={index}
                                                variant="caption"
                                                sx={{
                                                    color: "#666",
                                                    display: "flex",
                                                    flexWrap: "wrap",
                                                    flexDirection: "row",
                                                    marginLeft: "10px",
                                                    gap: "2px",
                                                    fontWeight: "bold",
                                                    "@media (max-width: 600px)": {
                                                        fontSize: "10px",
                                                        marginLeft: "5px",
                                                        gap: "1px",
                                                    },
                                                    ...getItemHeadingStyles
                                                }}
                                            >
                                                + {sauce?.name} :
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color: "#666",
                                                        display: "flex",
                                                        marginLeft: "5px",
                                                        gap: "2px",
                                                        flexWrap: "wrap",
                                                        "@media (max-width: 600px)": {
                                                            fontSize: "10px",
                                                            marginLeft: "2px",
                                                            gap: "1px",
                                                        },
                                                        ...getItemDescriptionStyles
                                                    }}
                                                >
                                                    {sauce?.items?.map((sauceItem, sauceIndex) => (
                                                        <span key={sauceIndex}>
                                                            {sauceItem?.item}
                                                            {` (Rs. ${fNumber(
                                                                sauceItem.price * cartItem.qty
                                                            )})`}
                                                            {sauceIndex !== sauce?.items?.length - 1 &&
                                                                ", "}
                                                        </span>
                                                    ))}
                                                </Typography>
                                            </Typography>
                                        ))}
                                    </>
                                )}
                                <Typography
                                    variant="caption"
                                    sx={{
                                        display: "flex",
                                        marginLeft: "10px",
                                        gap: "2px",

                                        "@media (max-width: 600px)": {
                                            fontSize: "10px",
                                            "@media (max-width: 600px)": {
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                maxWidth: "80px",
                                            },
                                        },
                                        ...getItemNotesStyles
                                    }}
                                >
                                    <span>{cartItem?.notes}</span>
                                </Typography>
                                <Typography
                                    sx={{
                                        ...getItemPriceStyles,
                                        marginTop: "4px",
                                        marginLeft: "10px",
                                        fontWeight: "600",
                                        "@media (max-width: 1440px)": {
                                            fontSize: "12px",
                                        },
                                    }}
                                >
                                    {calculateMenuItemTotal(cartItem)}
                                </Typography>
                            </Stack>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "self-end",
                            flexWrap: "nowrap",
                        }}
                    >
                        {!showButtons &&
                            <Typography sx={{ ...getItemQtyStyles }}>
                                x{cartItem.qty}
                            </Typography>}
                        {
                            showButtons &&
                            <Box
                                sx={{
                                    height: "40px",
                                    width: "130px",
                                    borderRadius: "20px",
                                    // border: "2px solid #F08203",
                                    marginRight: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    px: 1,
                                    ...getItemQtyButtonStyles
                                }}
                            >
                                {cartItem.qty > 1 ? (
                                    <IconButton
                                        onClick={() => { actions.updateItemFromCardDecByOne(cartItem) }}
                                        sx={{ p: 0, ...getItemDecreaseButtonStyles }}
                                    >
                                        <Iconify icon={"ic:baseline-minus"} />
                                    </IconButton>
                                ) : (
                                    <IconButton
                                        onClick={() => {
                                            if (!previewMode) {
                                                actions.handleRemoveFromCart(cartItem)
                                            }
                                        }}
                                        sx={{ p: 0, ...getItemDecreaseButtonStyles }} 
                                    >
                                        <Iconify icon={"mdi:trash-outline"} />
                                    </IconButton>
                                )}

                                <Typography sx={{  ...getItemQtyStyles }}>
                                    {cartItem.qty}
                                </Typography>

                                <IconButton
                                    onClick={() => { if (!previewMode) { actions.updateItemFromCardAddByOne(cartItem) } }}
                                    sx={{ p: 0, ...getItemIncreaseButtonStyles }}
                                >
                                    <Iconify icon={"ic:baseline-plus"} />
                                </IconButton>
                            </Box>
                        }


                        {(showDeleteIndex === index && cartItem.qty > 1) && (
                            <Button
                                // onClick={() => handleRemoveFromCart(cartItem)}
                                sx={{
                                    minWidth: 0,
                                    margin: "0",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingButton: "5px",
                                    paddingLeft: "20px",
                                    paddingRight: "0px"

                                }}
                            >
                                <Iconify
                                    sx={{
                                        color: "#F08203",
                                        minWidth: 0,
                                        width: "24px",
                                        height: "24px",
                                    }}
                                    icon={"mdi:trash-outline"}
                                />
                            </Button>
                        )}
                    </Box>
                </Box>

                 {index < cardItems?.length - 1 && (
                    <Divider
                        sx={{
                            marginTop: "10px",
                            borderColor: "#E0E0E0",
                        }}
                    />
                )}
            </>

        </Box>
    );
};

export default CartItems;
