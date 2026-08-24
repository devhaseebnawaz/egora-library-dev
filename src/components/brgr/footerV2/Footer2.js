import React, { useState, useEffect } from "react";
import { Typography, Box, Link, Container } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { getScreenSizeCategory } from "../../../utils/fontsize";
import UniversalImage from "../../../UniversalImage";

const TikTokIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="currentColor"
    style={{ display: "block" }}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

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
  const phoneValue = footerPhone || (previewMode ? "000-111-222" : states.selectedVenue.pointOfContactNumber);
  const emailValue = footerEmail || (previewMode ? "info@example.com" : states.selectedVenue.ownerEmail);

  const [isShort, setIsShort] = useState(false);
  const [storeQuery, setStoreQuery] = useState("");

  const getFooterStyles = (type) => ({
    fontWeight:
      styles?.[type + "WeightV2"]?.value ||
      globalComponentStyles?.Text?.fontWeight?.value ||
      themeColors?.[type + "WeightV2"]?.value ||
      (type === "FooterVenueNameText" ? "700" : undefined),
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
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "contain",
      display: "block",
    };
  };

  const getImageStylesForCusomIcons = () => {
    const screen = getScreenSizeCategory();
    let size =
      styles?.FooterImageHeightWidthCustomIconV2?.value != 0
        ? styles?.FooterImageHeightWidthCustomIconV2?.value
        : themeColors?.FooterImageHeightWidthCustomIconV2?.value;

    size = size > 500 ? 500 : size;

    const borderRadius =
      styles?.FooterImageBorderRadiusCustomIconV2?.value !== ""
        ? `${styles?.FooterImageBorderRadiusCustomIconV2?.value}px`
        : `${themeColors?.FooterImageBorderRadiusCustomIconV2?.value}px`;
    return {
      height: size,
      width: size,
      borderRadius,
    };
  };

  const getFollowUsIconStyles = () => {
    const configuredSize =
      styles?.FooterFollowUsIconHeightWidthV2?.value != 0
        ? styles?.FooterFollowUsIconHeightWidthV2?.value
          : themeColors?.FooterFollowUsIconHeightWidthV2?.value;
    const size = Number(configuredSize) > 0 ? configuredSize : 24;
    const color =
      styles?.FooterFollowUsIconColorV2?.value !== ""
        ? styles?.FooterFollowUsIconColorV2?.value
          : themeColors?.FooterFollowUsIconColorV2?.value || "currentColor";
    return {
      height: size,
      width: size,
      color,
    };
  };

  useEffect(() => {
    setStoreQuery(window.location.search);
  }, []);

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
          flexWrap: "wrap",
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
              <Link
                component="a"
                href={`tel:${String(phoneValue || "").replace(/[^+\d]/g, "")}`}
                underline="always"
                sx={{
                  ...getFooterStyles("FooterPhoneText"),
                  cursor: "pointer",
                }}
              >
                {phoneValue}
              </Link>

            </Typography>
            <Typography sx={{ display: "flex", gap: 0.5 }}>
              <Typography component="span" sx={getFooterStyles("FooterEmailHeadingText")}>
                Email:
              </Typography>
              <Link
                component="a"
                href={`mailto:${emailValue || ""}`}
                underline="always"
                sx={{
                  ...getFooterStyles("FooterEmailText"),
                  cursor: "pointer",
                }}
              >
                {emailValue}
              </Link>

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
                {socialLinks.map(({ name, url, addCustomIcon, customIcon }, index) => {
                  const socialName = String(name || "")
                    .toLowerCase()
                    .replace(/[^a-z0-9]/g, "");

                  if (addCustomIcon && customIcon) {
                    return (
                        <UniversalImage
                          src={customIcon}
                          alt="Custom Icon"
                          layout="fill"
                          // objectFit="contain"
                          onError={() => console.log("Image failed to load")}
                          width="1em"
                          height="1em"
                          style={{ ...getImageStylesForCusomIcons() }}
                        />
                    );
                  }
                  let icon = null;
                  if (!(addCustomIcon && customIcon)) {
                    if (socialName === "facebook") icon = <FacebookIcon />;
                    else if (socialName === "instagram") icon = <InstagramIcon />;
                    else if (socialName === "linkedin") icon = <LinkedInIcon />;
                    else if (socialName === "whatsapp") icon = <WhatsAppIcon />;
                    else if (socialName === "twitter") icon = <TwitterIcon />;
                    else if (socialName === "sanpchat") icon = <CameraAltIcon />;
                    else if (socialName === "tiktok") {
                      icon = <TikTokIcon />;
                    }
                  }
                  return (
                    <Link
                      key={`Footer2-${index}`}
                      component="a"
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      underline="none"
                      sx={{
                        ...getFollowUsIconStyles(),
                        ml: 1,
                        minWidth: 24,
                        minHeight: 24,
                        flexShrink: 0,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecoration: "none",
                      }}
                    >
                      {icon}
                    </Link>
                  );
                })}
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
                    href={link.type === "url" ? link.url : `/${link.url}${storeQuery}`}
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
          marginBottom: states?.cardItems?.items?.length > 0 ? 8 : "none"
        }}
      >
        <Typography sx={{ ...getFooterStyles("FooterPoweredByText") }} >
            © {new Date().getFullYear()} Powered by <Link href="https://merchants.egora.pk/" target="_blank" rel="noopener noreferrer" sx={{ ...getFooterStyles("FooterEgoraText") }} >Egora.</Link>
        </Typography>
      </Box>
       </Container>
    </Box>
  );
}
