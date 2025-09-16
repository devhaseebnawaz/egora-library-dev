import React from 'react';
import { Box, Typography,Container,useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getScreenSizeCategory } from '../../../utils/fontsize';

export default function InfoBlock({ themeColors, actions, prop, styles, states, globalComponentStyles }) {

    const theme = useTheme();
    const getInfoBlockTitleStyles = {
        color:
            styles?.InfoBlockTitleColor?.value !== ""
                ? styles?.InfoBlockTitleColor?.value
                : globalComponentStyles?.Text?.color?.value !== ""
                    ? globalComponentStyles?.Text?.color?.value
                    : themeColors?.InfoBlockTitleColor?.value,
        fontWeight:
            styles?.InfoBlockTitleWeight?.value != ""
                ? styles?.InfoBlockTitleWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value :
                    themeColors?.InfoBlockTitleWeight?.value,
        fontSize:
            styles?.InfoBlockTitleSize?.value[getScreenSizeCategory()] != 0
                ? styles?.InfoBlockTitleSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.InfoBlockTitleSize?.value[getScreenSizeCategory()],
        fontFamily:
            styles?.InfoBlockTitleFont?.value !== ""
                ? styles?.InfoBlockTitleFont?.value
                : globalComponentStyles?.Text?.fontFamily?.value !== ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : themeColors?.InfoBlockTitleFont?.value,
    
        fontStyle:
            styles?.InfoBlockTitleStyle?.value !== ""
                ? styles?.InfoBlockTitleStyle?.value
                : globalComponentStyles?.Text?.fontWeight?.value !== ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.InfoBlockTitleStyle?.value,
    };

    const getInfoBlockDescriptionStyles = {
        color:
            styles?.InfoBlockDescriptionColor?.value !== ""
                ? styles?.InfoBlockDescriptionColor?.value
                : globalComponentStyles?.Text?.color?.value !== ""
                    ? globalComponentStyles?.Text?.color?.value
                    : themeColors?.InfoBlockDescriptionColor?.value,
        fontWeight:
            styles?.InfoBlockDescriptionWeight?.value != ""
                ? styles?.InfoBlockDescriptionWeight?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ""
                    ? globalComponentStyles?.Text?.fontWeight?.value :
                    themeColors?.InfoBlockDescriptionWeight?.value,
        fontSize:
            styles?.InfoBlockDescriptionSize?.value[getScreenSizeCategory()] != 0
                ? styles?.InfoBlockDescriptionSize?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.InfoBlockDescriptionSize?.value[getScreenSizeCategory()],
        fontFamily:
            styles?.InfoBlockDescriptionFont?.value !== ""
                ? styles?.InfoBlockDescriptionFont?.value
                : globalComponentStyles?.Text?.fontFamily?.value !== ""
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : themeColors?.InfoBlockDescriptionFont?.value,
    
        fontStyle:
            styles?.InfoBlockDescriptionStyle?.value !== ""
                ? styles?.InfoBlockDescriptionStyle?.value
                : globalComponentStyles?.Text?.fontWeight?.value !== ""
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.InfoBlockDescriptionStyle?.value,
    };

    return (
        <Box
            style={{
                width: '100%',
                padding: '50px 0',
                fontSize: '14px',
                margin: '20px auto 0 auto',
                height: '345px',
                overflowY: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: styles?.InfoBlockBackgroundColor?.value != ""
                    ? styles?.InfoBlockBackgroundColor?.value
                    : themeColors?.InfoBlockBackgroundColor?.value,
            }}
        >
            <Container>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography sx={{ ...getInfoBlockTitleStyles }}>
                        {prop.editable.title.value}
                    </Typography>
                </Box>

            <Typography sx={{...getInfoBlockDescriptionStyles}} >
                {prop.editable.description.value}
            </Typography>
            </Container>
        </Box>
    );
}