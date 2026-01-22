import React, { useState, useEffect } from "react";
import { Typography, Box, Link, IconButton , Container } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { getScreenSizeCategory } from "../../../utils/fontsize";

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
  const linksArray = prop?.editable?.link?.value || [];
  const schedule = prop?.editable?.openingTimings?.value || [];
  const socialLinks = prop?.editable?.socialLinks?.value || [];
  const footerPhone = prop?.editable?.footerPhone?.value;
  const footerEmail = prop?.editable?.footerEmail?.value;

  const [isShort, setIsShort] = useState(false);

  const getFooterStyles = (type) => ({
    fontWeight:
      styles?.[type + "WeightV2"]?.value ||
      globalComponentStyles?.Text?.fontWeight?.value ||
      themeColors?.[type + "WeightV2"]?.value,
    color:
      styles?.[type + "ColorV2"]?.value ||
      globalComponentStyles?.Text?.color?.value ||
      themeColors?.[type + "ColorV2"]?.value,
    fontSize:
      styles?.[type + "SizeV2"]?.value[getScreenSizeCategory()] ||
      globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] ||
      themeColors?.[type + "SizeV2"]?.value[getScreenSizeCategory()],
    fontFamily:
      styles?.[type + "FontV2"]?.value ||
      globalComponentStyles?.Text?.fontFamily?.value ||
      themeColors?.[type + "FontV2"]?.value,
    fontStyle:
      styles?.[type + "StyleV2"]?.value ||
      globalComponentStyles?.Text?.fontStyle?.value ||
      themeColors?.[type + "StyleV2"]?.value,
  });
  
  const getImageStyles = () => {
    const screen = getScreenSizeCategory();
    let size =
      styles?.FooterImageHeightWidthV2?.value != 0
        ? styles?.FooterImageHeightWidthV2?.value
          : themeColors?.FooterImageHeightWidthV2?.value;

    size = size > 500 ? 500 : size;

    const borderRadius =
      styles?.FooterImageBorderRadiusV2?.value !== ""
        ? `${styles?.FooterImageBorderRadiusV2?.value}px`
          : `${themeColors?.FooterImageBorderRadiusV2?.value}px`;
    return {
      height: size,
      width: size,
      borderRadius,
    };
  };

   const getFollowUsIconStyles = () => {
    let size =
      styles?.FooterFollowUsIconHeightWidthV2?.value != 0
        ? styles?.FooterFollowUsIconHeightWidthV2?.value
          : themeColors?.FooterFollowUsIconHeightWidthV2?.value;
    const color =
      styles?.FooterFollowUsIconColorV2?.value !== ""
        ? styles?.FooterFollowUsIconColorV2?.value
          : themeColors?.FooterFollowUsIconColorV2?.value;
    return {
      height: size,
      width: size,
      color,
    };
  };

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
      <Container>
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
            src={states.selectedVenue.photoURL
            ? `${states.storeImagesBaseUrl}/${states.selectedVenue.photoURL}`
            : '/assets/placeholder.png'}
            alt="Logo"
            style={{ ...getImageStyles() }}
          />
        </Box>


        <Box sx={{ display: "flex", flex: "1 1 300px", flexDirection: 'column', alignContent: "center" }}>
              <Typography sx={{ ...getFooterStyles("FooterVenueNameText") }} >{previewMode ? "Venue Name " : `${states.selectedVenue.name}`}</Typography>
            <Typography
              sx={{ display: "flex", gap: 0.5, alignItems: "center" }}
            >
              <Typography
                component="span"
                sx={{ ...getFooterStyles("FooterPhoneHeadingText") }}
              >
                Phone:
              </Typography>
              <Typography component="span" sx={{ ...getFooterStyles("FooterPhoneText") }}>
                {/* {previewMode
                  ? "000-111-222"
                  : footerPhone || states.selectedVenue.pointOfContactNumber} */}
                {footerPhone
                  ? footerPhone
: previewMode
                    ? "000-111-222"
                    : states.selectedVenue.pointOfContactNumber}

              </Typography>

            </Typography>
            <Typography sx={{ display: "flex", gap: 0.5 }}>
              <Typography component="span" sx={getFooterStyles("FooterEmailHeadingText")}>
                Email:
              </Typography>
              {/* < Typography sx={{ ...getFooterStyles("FooterEmailText") }}> {previewMode ? "info@example.com" : `${states.selectedVenue.ownerEmail}`}</Typography> */}
              <Typography component="span" sx={{ ...getFooterStyles("FooterEmailText") }}>
                {/* {previewMode
                  ? "info@example.com"
                  : footerEmail || states.selectedVenue.ownerEmail} */}

                {footerEmail
                  ? footerEmail
                  : previewMode
                    ? "info@example.com"
                    : states.selectedVenue.ownerEmail}

              </Typography>

            </Typography>

            <Typography sx={{ display: "flex", gap: 0.5 }}>
              <Typography component="span" sx={getFooterStyles("FooterAddressHeadingText")}>
                Address:
              </Typography>

              <Typography component="span" sx={{ ...getFooterStyles("FooterAddressText") }}> {previewMode ? "Dummy Plaza, Block A, Dummy City" : `${states.selectedVenue.venueAddressOne} ${states.selectedVenue.venueAddressTwo}`}</Typography>

            </Typography>


          </Box>

        <Box sx={{ flex: "1 1 200px" }}>
          <Typography sx={{ ...getFooterStyles("FooterOurTimingsText")  }}>
            Our Timings
          </Typography>
          <Box>
            {schedule.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 0.3, 
                }}
              >
                <Typography sx={getFooterStyles("FooterDaysText")}>
                  {item.day}
                </Typography>
                <Typography sx={getFooterStyles("FooterDateText")}>
                  {item.time}
                </Typography>
              </Box>
            ))}
          </Box>

        <Box mt={2}>
            <Typography sx={{ ...getFooterStyles("FooterFollowUsText") }}>
              Follow Us:
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              {socialLinks.map(({ name, url }, index) => {
                let icon = ""
                if(name == "Facebook"){
                  icon = <FacebookIcon />
                } else if (name == "Instagram"){
                  icon =  <InstagramIcon />
                } else if(name == "LinkedIn"){
                  icon =  <LinkedInIcon />
                } else if(name == "WhatsApp"){
                  icon =  <WhatsAppIcon />
                } else if(name == "Twitter"){
                  icon =  <TwitterIcon />
                } else if(name == "SanpChat"){
                  icon =  <CameraAltIcon />
                } 

                return (
                  <IconButton
                    key={`Footer2-${index}`}
                    size="small"
                    component="a"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    sx={{ ...getFollowUsIconStyles(), ml: 1 }}
                  >
                    {icon}
                  </IconButton>
              )})}
            </Box>
          </Box>

          <Box mt={2} sx={{ display: "flex", gap: 2 }}>
            {linksArray.map((link, index) => (
              <React.Fragment key={index}>
                {previewMode ? (
                  <Typography
                    variant="body2"
                    component="span"
                    sx={getFooterStyles("FooterLink")}
                    style={{ textDecoration: "underline", cursor: "default" }}
                  >
                    {link.name}
                  </Typography>
                ) : (
                  <Link
                    href={link.type === "url" ? link.url : `/${link.url}`}
                    color="inherit"
                    underline="hover"
                    sx={getFooterStyles("FooterLink")}
                    target={link.type === "url" ? "_blank" : "_self"}
                    rel={link.type === "url" ? "noopener noreferrer" : undefined}
                  >
                    {link.name}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          mt: 3,
          borderTop: styles?.FooterDividerColorV2?.value != ""
            ? `1px solid ${styles?.FooterDividerColorV2?.value}`
            : ` 1px solid ${themeColors?.FooterDividerColorV2?.value}px`,
          pt: 2,
          textAlign: "center",
        }}
      >
        <Typography sx={{...getFooterStyles("FooterPoweredByText")}} >
          © 2025 Powered by <Link href="#" sx={{...getFooterStyles("FooterEgoraText")}} >Egora.</Link>
        </Typography>
      </Box>
       </Container>
    </Box>
  );
}
