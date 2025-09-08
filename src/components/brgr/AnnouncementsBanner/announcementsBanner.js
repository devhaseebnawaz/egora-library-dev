import React from 'react';
import { Box, Typography } from '@mui/material';
import { getScreenSizeCategory } from "../../../utils/fontsize";

export default function AnnouncementsBanner({ themeColors, actions, prop, styles, states, globalComponentStyles }) {

    const getTextBlockStyles = {
        fontWeight:
                   styles?.AnnouncementsBannerTextWeight?.value != ""
                    ? styles?.AnnouncementsBannerTextWeight?.value
                    : globalComponentStyles?.Text?.fontWeight?.value != ""
                      ? globalComponentStyles?.Text?.fontWeight?.value :
                      themeColors?.AnnouncementsBannerTextWeight?.value,
        color:
            styles?.AnnouncementsBannerTextColor?.value !== ""
                ? styles?.AnnouncementsBannerTextColor?.value
                : globalComponentStyles?.Text?.color?.value !== ""
                    ? globalComponentStyles?.Text?.color?.value
                    : themeColors?.AnnouncementsBannerTextColor?.value,
    
        fontSize:
            styles?.AnnouncementsBannerTextSize?.value[getScreenSizeCategory()] != 0
                ? styles?.AnnouncementsBannerTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.AnnouncementsBannerTextSize?.value[getScreenSizeCategory()],
    
        fontFamily:
            styles?.AnnouncementsBannerTextFont?.value !== ""
                ? styles?.AnnouncementsBannerTextFont?.value
                : globalComponentStyles?.Text?.fontFamily?.value !== ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : themeColors?.AnnouncementsBannerTextFont?.value,
    
        fontStyle:
            styles?.AnnouncementsBannerTextStyle?.value !== ""
                ? styles?.AnnouncementsBannerTextStyle?.value
                : globalComponentStyles?.Text?.fontStyle?.value !== ""
                    ? globalComponentStyles?.Text?.fontStyle?.value
                    : themeColors?.AnnouncementsBannerTextStyle?.value,
    };

    return (
        <Box
            style={{
                width: '100%',
                padding: '5px 0',
                fontWeight: '500 !important',
                fontSize: '14px',
                margin: '0 auto',
                height: '30px',
                overflowY: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: styles?.AnnouncementsBannerBackgroundColor?.value != ""
                    ? styles?.AnnouncementsBannerBackgroundColor?.value
                    : globalComponentStyles?.Background?.color?.value != ""
                      ? globalComponentStyles?.Background?.color?.value
                    : themeColors?.AnnouncementsBannerBackgroundColor?.value,
            }}
        >
            <Typography sx={{...getTextBlockStyles}} >
                {prop.editable.text.value}
            </Typography>
        </Box>
    );
}