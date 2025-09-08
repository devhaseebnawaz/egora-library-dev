import React from 'react';
import { Box, Typography } from '@mui/material';
import Markdown from '../../markdown';
import { decodeHTML } from '../../../utils/decodeHTML';

export default function EditorTextBlock({ themeColors, actions, prop, styles, states, globalComponentStyles }) {
    
    return (
        <Box
            sx={{
                width: '100%',
                py: '50px',
                px: {
                    xs: '20px',
                    md: '40px',
                },
                fontSize: '14px',
                margin: '0 auto',
                overflowY: 'hidden',
                display: 'flex',
                backgroundColor: styles?.EditorTextBlockBackgroundColor?.value || themeColors?.EditorTextBlockBackgroundColor?.value,
            }}
        >
            <Typography>
                <Markdown children={decodeHTML(prop.editable.text.value)} />
            </Typography>
        </Box>
    );
}