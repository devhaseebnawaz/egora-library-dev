import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const StyledBox = styled(Box)({
  boxShadow: "2px 6px 10px rgba(0, 0, 0, 0.3)",
  borderRadius: "8px",
  backgroundColor: "#fff",
  padding: "12px",
  width: "100%",
  marginBottom: '10px',
});

export const StyledMenuItem = styled(Typography)(
  ({ themeColors, layout, globalComponentStyles }) => ({
    fontSize: "14px",
    textAlign: "left",
    padding: "6px",
    cursor: "pointer",
    fontFamily: "Arial, sans-serif",
    width: "100%",
    "&:hover": {
      color:
        layout?.locationLayout?.body[0].styles?.LocationModalOrderConfirmSelectionTextColor?.value !== ""
          ? `${layout?.locationLayout?.body[0].styles?.LocationModalOrderConfirmSelectionTextColor?.value}`
          : globalComponentStyles?.Button?.color?.value != ""
            ? globalComponentStyles?.Button?.color?.value
            : `${themeColors?.LocationModalOrderConfirmSelectionTextColor?.value}`,
      backgroundColor:
        layout?.locationLayout?.body[0].styles?.LocationModalConfirmSelectionBackgroundColor?.value != ""
          ? `${layout?.locationLayout?.body[0].styles?.LocationModalConfirmSelectionBackgroundColor?.value}`
          : globalComponentStyles?.Button?.backgroundColor?.value != ""
            ? globalComponentStyles?.Button?.backgroundColor?.value
            : `${themeColors?.LocationModalConfirmSelectionBackgroundColor?.value}`,
      borderRadius: "4px",
    },
  })
);
