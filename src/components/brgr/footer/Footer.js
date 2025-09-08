import React , {useState,useEffect} from "react";
import { Typography, Box, Link } from "@mui/material";
import { getScreenSizeCategory } from '../../../utils/fontsize';

export default function CustomFooter({
  themeColors,
  prop,
  styles,
  globalComponentStyles,
  previewMode, 
  inFranchise = false
}) {

  const linksArray = prop?.editable?.links?.value || [];
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
      if(previewMode){
        setIsShort(false)
      } else if (bodyHeight <= viewportHeight) {
        setIsShort(true)
      }  else {
        setIsShort(false)
      }
    };
    checkHeight();
    window.addEventListener("resize", checkHeight);
    return () => window.removeEventListener("resize", checkHeight);
  }, []);


  return (
    <Box
      style={{
        width: "100%",
        padding: "4rem 0",
        backgroundColor:
          styles?.FooterBackgroundColor?.value ||
          themeColors?.FooterBackgroundColor?.value,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "8px",
        minHeight: "280px",
        padding: "25px 15px",
        justifyContent: "center",
        position: isShort && "fixed",
        bottom: isShort &&  "0",
      }}
    >
      <Typography
        variant="body2"
        component="span"
        sx={getFooterStyles("FooterText")}
      >
        Powered by
      </Typography>

      <Link
        href="#"
        color="inherit"
        underline="hover"
        sx={getFooterStyles("FooterLink")}
        style={{ fontWeight: "bold" }}
      >
        Egora
      </Link>

      {/* Render dynamic links */}
      {linksArray.map((link, index) => (
  <React.Fragment key={index}>
    <Typography
      variant="body2"
      component="span"
      sx={getFooterStyles("FooterText")}
    >
      |
    </Typography>

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
  );
}

