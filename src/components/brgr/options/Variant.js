import React, { useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import { fNumber } from "../../../utils/formatNumber";

export default function Variant({
    themeColors,
    layout,
    variants,
    hanldeSelectOption,
    selectedVariant,
    getDescriptionStyles,
    getHeadingStyles
}) {
    return (
        <>
            {variants && (
                <>
                    <Typography sx={{ fontSize: 15, marginLeft: '2px', ...getHeadingStyles }} variant="subtitle2" >
                        Variants
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 1,
                            marginTop: 1,

                        }}
                    >
                        {variants.map((variant, index) => {
                            const isSelected = variant === selectedVariant;
                            return (
                                <Button
                                    size="small"
                                    sx={{
                                        minWidth: {
                                            xs: 'calc(50% - 8px)',
                                            sm: 'calc(50% - 8px)',
                                            md: 120
                                        },
                                        minHeight: 40,
                                        flexGrow: { xs: 0, sm: 0, md: 0 },
                                        ml: { xs: 0, sm: 0, md: 0 },
                                        mb: 1,
                                        ...getDescriptionStyles,
                                        border:
                                            layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalButtonBorderColor?.value ?
                                                `solid ${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalButtonBorderColor?.value}`
                                                : `solid ${themeColors?.ItemDetailModalButtonBorderColor?.value}`,
                                        borderRadius: layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalButtonBorderRadius?.value != 0 ?
                                            `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalButtonBorderRadius?.value}px` :
                                            `${themeColors?.ItemDetailModalButtonBorderRadius?.value}px`,
                                        backgroundColor: isSelected ?
                                            (layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalButtonSelectedBackgroundColor?.value != "" ?
                                                layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalButtonSelectedBackgroundColor?.value :
                                                `${themeColors?.ItemDetailModalButtonSelectedBackgroundColor?.value}`) :
                                            (layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalButtonBackgroundColor?.value != "" ?
                                                layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalButtonBackgroundColor?.value :
                                                `${themeColors?.ItemDetailModalButtonBackgroundColor?.value}`),

                                        color: isSelected ?
                                            (layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalSelectedDescriptionTextColor?.value != "" ?
                                                layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalSelectedDescriptionTextColor?.value :
                                                `${themeColors?.ItemDetailModalSelectedDescriptionTextColor?.value}`) :

                                            (layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalDescriptionTextColor?.value != "" ?
                                                layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalDescriptionTextColor?.value :
                                                `${themeColors?.ItemDetailModalDescriptionTextColor?.value}`),
                                        '&:hover': {
                                            backgroundColor: isSelected ?
                                                (layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalButtonSelectedHoverColor?.value != "" ?
                                                    layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalButtonSelectedHoverColor?.value :
                                                    `${themeColors?.ItemDetailModalButtonSelectedHoverColor?.value}`)
                                                : (layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalButtonHoverColor?.value != "" ?
                                                    layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalButtonHoverColor?.value :
                                                    `${themeColors?.ItemDetailModalButtonHoverColor?.value}`),
                                            border:
                                                layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalButtonBorderColor?.value ?
                                                    `solid ${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalButtonBorderColor?.value}`
                                                    : `solid ${themeColors?.ItemDetailModalButtonBorderColor?.value}`
                                        }

                                    }}
                                    variant={isSelected ? "contained" : "outlined"}
                                    key={index}
                                    onClick={() => hanldeSelectOption(variant)}
                                >
                                    {variant.name} (Rs.  {fNumber(variant?.price)})
                                </Button>
                            );
                        })}
                    </Box>
                </>
            )}
        </>
    );
}
