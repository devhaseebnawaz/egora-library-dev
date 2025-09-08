import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { color } from "@mui/system";
export const StyledBox = styled(Box)({
    boxShadow: "2px 6px 10px rgba(0, 0, 0, 0.3)",
    borderRadius: "8px",
    backgroundColor: "#fff",
    padding: "12px",
    width: "100%",
    marginBottom:'10px',
  });
 export const StyledMenuItem = styled(Typography)({
    fontSize: "14px",
    textAlign:'left',
    padding:'6px',
    cursor:'pointer',
    fontFamily: "Arial, sans-serif",
    width:"100%",
    "&:hover": {
      color: "#000",
      backgroundColor:"#FCA92E",
      borderRadius:'4px',
    },
  });