/* eslint-disable react/prop-types */
import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { keyframes } from "@emotion/react";
import { propValue, resolveComponentStyles, styleLength, styleValue } from "./retailShared";

const scrollMessages = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const toMessages = (value) => (Array.isArray(value) ? value : [value])
  .flatMap((entry) => String(entry ?? "").split(/\r?\n|\s*\|\s*/))
  .map((entry) => entry.trim())
  .filter(Boolean);

export default function RetailAnnouncement({ prop, styles: componentStyles, themeColors }) {
  const theme = useTheme();
  const styles = resolveComponentStyles(componentStyles, themeColors);
  const messages = toMessages(propValue(prop, "messages", propValue(prop, "text", ["Egora POS · Faster checkout for every business", "Inventory, sales and customer management in one place", "Built for growing businesses"])));

  if (!messages.length) return null;

  return (
    <Box sx={{
      overflow: "hidden",
      py: 1.25,
      background: styleValue(styles, ["AnnouncementsBannerBackgroundColor", "RetailAnnouncementBackgroundColor"], theme.palette.primary.main),
      color: styleValue(styles, ["AnnouncementsBannerTextColor", "RetailAnnouncementTextColor"], theme.palette.primary.contrastText),
    }}>
      <Box sx={{
        display: "flex",
        width: "max-content",
        minWidth: "200%",
        animation: `${scrollMessages} 35s linear infinite`,
        "&:hover": { animationPlayState: "paused" },
        "@media (prefers-reduced-motion: reduce)": { animation: "none", minWidth: 0, width: "100%", flexWrap: "wrap" },
      }}>
        {[0, 1].map((copy) => (
          <Box key={copy} aria-hidden={copy === 1 ? true : undefined} sx={{
            display: "flex", flex: "1 0 auto", justifyContent: "space-around", alignItems: "center",
            "@media (prefers-reduced-motion: reduce)": { display: copy === 1 ? "none" : "flex", flexWrap: "wrap", flex: "1 1 100%", rowGap: 1 },
          }}>
            {messages.map((message, index) => (
              <Typography component="span" variant="caption" key={`${message}-${index}`} sx={{
                px: { xs: 3, md: 7 }, textAlign: "center",
                fontSize: styleLength(styles, "AnnouncementsBannerTextSize", theme.typography.caption.fontSize),
              }}>{message}</Typography>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
