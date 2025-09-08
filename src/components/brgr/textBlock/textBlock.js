import React from 'react';
import { Box, Typography } from '@mui/material';
import { getScreenSizeCategory } from '../../../utils/fontsize';

export default function TextBlock({ themeColors, actions, prop, styles, states, globalComponentStyles }) {

    const getTextBlockStyles = {
        color:
            styles?.TextBlockTextColor?.value !== ""
                ? styles?.TextBlockTextColor?.value
                : globalComponentStyles?.Text?.color?.value !== ""
                    ? globalComponentStyles?.Text?.color?.value
                    : themeColors?.TextBlockTextColor?.value,
        fontWeight:
            styles?.TextBlockTextWeight?.value != ""
                ? styles?.TextBlockTextWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value :
                    themeColors?.TextBlockTextWeight?.value,
        fontSize:
            styles?.TextBlockTextSize?.value[getScreenSizeCategory()] != 0
                ? styles?.TextBlockTextSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.TextBlockTextSize?.value[getScreenSizeCategory()],

        fontFamily:
            styles?.TextBlockTextFont?.value !== ""
                ? styles?.TextBlockTextFont?.value
                : globalComponentStyles?.Text?.fontFamily?.value !== ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : themeColors?.TextBlockTextFont?.value,
    
        fontStyle:
            styles?.TextBlockTextStyle?.value !== ""
                ? styles?.TextBlockTextStyle?.value
                : globalComponentStyles?.Text?.fontWeight?.value !== ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.TextBlockTextStyle?.value,
    };

    return (
        <Box
            style={{
                width: '100%',
                padding: '50px 0',
                fontSize: '14px',
                margin: '0 auto',
                height: '345px',
                overflowY: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: styles?.TextBlockBackgroundColor?.value != ""
                    ? styles?.TextBlockBackgroundColor?.value
                    : themeColors?.TextBlockBackgroundColor?.value,
            }}
        >
            <Typography sx={{ ...getTextBlockStyles }} >
                {prop.editable.text.value}
            </Typography>
        </Box>
    );
}