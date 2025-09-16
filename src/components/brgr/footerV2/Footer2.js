import React, { useState, useEffect } from "react";
import { Typography, Box, Link, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { getScreenSizeCategory } from "src/components/brgr/utils/fontsize";

export default function CustomFooterV2({
  themeColors,
  prop,
  styles,
  globalComponentStyles,
  previewMode,
  inFranchise = false,
  states,
  actions
}) {
  const [isShort, setIsShort] = useState(false);

  const getFooterStyles = (type) => ({
    fontWeight:
      styles?.[type + "Weight"]?.value ||
      globalComponentStyles?.Text?.fontWeight?.value ||
      themeColors?.[type + "Weight"]?.value,
    color:
      styles?.[type + "Color"]?.value ||
      globalComponentStyles?.Text?.color?.value ||
      themeColors?.[type + "Color"]?.value,
    fontSize:
      styles?.[type + "Size"]?.value[getScreenSizeCategory()] ||
      globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] ||
      themeColors?.[type + "Size"]?.value[getScreenSizeCategory()],
    fontFamily:
      styles?.[type + "Font"]?.value ||
      globalComponentStyles?.Text?.fontFamily?.value ||
      themeColors?.[type + "Font"]?.value,
    fontStyle:
      styles?.[type + "Style"]?.value ||
      globalComponentStyles?.Text?.fontStyle?.value ||
      themeColors?.[type + "Style"]?.value,
  });

  useEffect(() => {
    const checkHeight = () => {
      const body = document.body;
      const bodyHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      const viewportHeight = window.innerHeight;
      if (previewMode) {
        setIsShort(false);
      } else if (bodyHeight <= viewportHeight) {
        setIsShort(true);
      } else {
        setIsShort(false);
      }
    };
    checkHeight();
    window.addEventListener("resize", checkHeight);
    return () => window.removeEventListener("resize", checkHeight);
  }, [previewMode]);

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor:
          styles?.FooterBackgroundColorV2?.value ||
          themeColors?.FooterBackgroundColorV2?.value ||
          "#fff",
        px: { xs: 2, md: 6 },
        py: 4,
        position: isShort ? "fixed" : "relative",
        bottom: isShort ? 0 : "auto",
        borderTop: "1px solid #eee",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 3,
        }}
      >
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1757479964316-8cc688dde5c5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Logo"
            style={{ marginBottom: "1rem" }}
            width="300"
            height="200"
          />
        </Box>

        <Box sx={{ display: "flex", flex: "1 1 300px", flexDirection: 'column', alignContent: "center" }}>
          <Typography sx={getFooterStyles("FooterText")}>
            <strong>Phone:</strong> 000-111-222
          </Typography>
          <Typography sx={getFooterStyles("FooterText")}>
            <strong>Email:</strong> info@example.com
          </Typography>
          <Typography sx={getFooterStyles("FooterText")}>
            <strong>Address:</strong> Dummy Plaza, Block A, Dummy City
          </Typography>

        </Box>

        {/* Right side - Timings + Social Links */}
        <Box sx={{ flex: "1 1 200px" }}>
          <Typography sx={{ ...getFooterStyles("FooterText"), fontWeight: "bold" }}>
            Our Timings
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={getFooterStyles("FooterText")}>
              Monday - Sunday
            </Typography>
            <Typography sx={getFooterStyles("FooterText")}>
              12:00 PM - 02:00 AM
            </Typography>
          </Box>

          <Box mt={2}>
            <Typography
              sx={{ ...getFooterStyles("FooterText"), fontWeight: "bold" }}
            >
              Follow Us:
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              <IconButton size="small" color="primary">
                <FacebookIcon />
              </IconButton>
              <IconButton size="small" color="primary">
                <InstagramIcon />
              </IconButton>
              <IconButton size="small" color="primary">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Box>

          <Box mt={2} sx={{ display: "flex", gap: 2 }}>
            <Link href="#" underline="hover" sx={getFooterStyles("FooterLink")}>
              Terms and Conditions
            </Link>
            <Link href="#" underline="hover" sx={getFooterStyles("FooterLink")}>
              Privacy Policy
            </Link>
            <Link href="#" underline="hover" sx={getFooterStyles("FooterLink")}>
              Sitemap
            </Link>
          </Box>
        </Box>
      </Box>

      {/* Bottom copyright */}
      <Box
        sx={{
          mt: 3,
          borderTop: "1px solid #eee",
          pt: 2,
          textAlign: "center",
        }}
      >
        <Typography sx={getFooterStyles("FooterText")} variant="body2">
          © 2025 Powered by <Link href="#">Egora.</Link>
        </Typography>
      </Box>
    </Box>
  );
}
