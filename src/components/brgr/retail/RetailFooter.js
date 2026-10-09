/* eslint-disable react/prop-types */
import React from "react";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import { getRetailProductGridCategories, propValue, resolveComponentStyles, styleValue } from "./retailShared";

const TikTokIcon = () => (
  <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" style={{ display: "block" }}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

// Same names the theme editor's social link picker offers.
const SOCIAL_ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  whatsapp: WhatsAppIcon,
  twitter: TwitterIcon,
  x: TwitterIcon,
  youtube: YouTubeIcon,
  snapchat: CameraAltIcon,
  tiktok: TikTokIcon,
  website: LanguageIcon,
  email: EmailIcon,
};

const SAMPLE_SOCIAL_LINKS = ["Instagram", "Facebook", "TikTok", "WhatsApp"].map((name) => ({ name, url: "" }));

const socialKey = (name) => String(name || "").toLowerCase().replace(/[^a-z0-9]/g, "");

const socialHref = (name, url) => {
  const value = String(url || "").trim();
  if (!value) return "";
  const key = socialKey(name);
  if (key === "email" && !/^mailto:/i.test(value)) return `mailto:${value}`;
  if (key === "whatsapp" && /^\+?[\d\s-]+$/.test(value)) return `https://wa.me/${value.replace(/\D/g, "")}`;
  if (/^(https?:|mailto:|tel:|\/|#)/i.test(value)) return value;
  return `https://${value}`;
};

const footerLinkHref = (link) => {
  const url = String(link?.url || "").trim();
  if (!url) return "#top";
  if (link?.type === "url" || /^(https?:|mailto:|tel:|\/|#)/i.test(url)) return url;
  return `/${url}`;
};

const venueAddress = (venue) => [venue?.venueAddressOne, venue?.venueAddressTwo].filter(Boolean).join(" ");

export default function RetailFooter({ actions, layout, prop, states, styles: componentStyles, themeColors, previewMode = false, isEditorPreview = false }) {
  // Sample entries only fill the editor preview; the live store shows real data.
  const editorPreview = previewMode || isEditorPreview;
  const theme = useTheme();
  const styles = resolveComponentStyles(componentStyles, themeColors);
  const categories = getRetailProductGridCategories(layout);
  const links = propValue(prop, "link", null) ?? propValue(prop, "links", []);
  const linkItems = Array.isArray(links) ? links : [];
  const savedSocialLinks = propValue(prop, "socialLinks", []);
  const socialLinks = (Array.isArray(savedSocialLinks) ? savedSocialLinks : []).filter(
    (item) => editorPreview || socialHref(item?.name, item?.url) || (item?.addCustomIcon && item?.customIcon)
  );
  const visibleSocialLinks = socialLinks.length || !editorPreview ? socialLinks : SAMPLE_SOCIAL_LINKS;
  // Custom inputs win; otherwise fall back to the selected venue, like the Simplex footer.
  const venue = states?.selectedVenue || {};
  const email = propValue(prop, "footerEmail", "") || (editorPreview ? "info@example.com" : venue?.ownerEmail || "");
  const phone = propValue(prop, "footerPhone", "") || (editorPreview ? "+92 300 0000000" : venue?.pointOfContactNumber || "");
  const address = propValue(prop, "footerAddress", "") || (editorPreview ? "Dummy Plaza, Block A, Dummy City" : venueAddress(venue));
  const color = styleValue(styles, "FooterTextColor", theme.palette.text.primary);
  const linkColor = styleValue(styles, "FooterLinkColor", color);
  const chooseCategory = (category) => {
    actions?.handleCategoryClick?.(category);
    document.getElementById("retail-products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const menu = categories.length || !editorPreview ? categories : ["Categories", "Azadi Bundles", "Hair", "Face", "Beard", "Build Your Own Bundle", "Fragrance", "Best Sellers", "All Products", "Deals", "Gifts", "Blog", "Loyalty Rewards", "Order Tracker"];
  return (
    <Box component="footer" sx={{ px: { xs: 3, md: 7 }, pt: 7, pb: 2.5, color, background: styleValue(styles, "FooterBackgroundColor", theme.palette.background.paper) }}>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0, 1fr)", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" }, gap: 4.5 }}>
        <Stack alignItems="flex-start" spacing={0.5}>
          <Typography component="h3" variant="subtitle2" sx={{ mb: 1.5, textTransform: "uppercase" }}>Menu</Typography>
          {menu.map((category, index) => <Button key={category?.id || category?._id || `${category?.name || category}-${index}`} onClick={() => chooseCategory(typeof category === "string" ? { name: category } : category)} sx={{ color: linkColor, p: 0.5, textTransform: "none", justifyContent: "flex-start" }}>{category?.name || category?.title || category}</Button>)}
        </Stack>
        <Stack alignItems="flex-start" spacing={1}>
          <Typography component="h3" variant="subtitle2" sx={{ mb: 0.5, textTransform: "uppercase" }}>Menu</Typography>
          {(linkItems.length || !editorPreview ? linkItems : ["Track Your Order", "Search", "About us", "Be Our Distributor", "FAQ", "Careers", "Contact Us", "Privacy Policy", "Refund Policy", "Terms of Service", "Other Stores"].map((label) => ({ label, url: "#top" }))).map((link, index) => <Link key={`${link?.label || link?.name}-${index}`} href={footerLinkHref(link)} target={link?.type === "url" ? "_blank" : undefined} rel={link?.type === "url" ? "noopener noreferrer" : undefined} variant="body2" sx={{ color: linkColor }}>{link?.label || link?.name}</Link>)}
        </Stack>
        <Stack spacing={1.5}>
          <Typography component="h3" variant="subtitle2" sx={{ textTransform: "uppercase" }}>Mini Bio</Typography>
          <Typography variant="body2">Egora POS is a simple solution for sales, inventory and customer management. We help growing businesses spend less time on admin and more time serving customers.</Typography>
          {address && <Typography variant="subtitle2">Store locations:</Typography>}
          {address && <Typography variant="body2" sx={{ overflowWrap: "anywhere" }}>{address}</Typography>}
        </Stack>
        <Stack alignItems="flex-start" spacing={1}>
          <Typography component="h3" variant="subtitle2" sx={{ mb: 0.5, textTransform: "uppercase" }}>Contact</Typography>
          {email && <Link href={`mailto:${email}`} variant="body2" sx={{ color: linkColor, overflowWrap: "anywhere" }}>{email}</Link>}
          {phone && <Link href={`tel:${String(phone).replace(/[^\d+]/g, "")}`} variant="body2" sx={{ color: linkColor }}>{phone}</Link>}
          {!!visibleSocialLinks.length && (
            <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1.5} sx={{ pt: 1 }}>
              {visibleSocialLinks.map((item, index) => {
                const href = socialHref(item?.name, item?.url);
                const Icon = SOCIAL_ICONS[socialKey(item?.name)] || LanguageIcon;
                const icon = item?.addCustomIcon && item?.customIcon
                  ? <Box component="img" src={item.customIcon} alt={item?.name || "Social icon"} sx={{ width: 22, height: 22, objectFit: "contain", display: "block" }} />
                  : <Icon fontSize="inherit" />;
                return (
                  <Link
                    key={`${item?.name || "social"}-${index}`}
                    href={href || undefined}
                    target={href ? "_blank" : undefined}
                    rel={href ? "noopener noreferrer" : undefined}
                    aria-label={item?.name || "Social link"}
                    underline="none"
                    sx={{ color: linkColor, fontSize: 22, display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 24, minHeight: 24, cursor: href ? "pointer" : "default" }}
                  >
                    {icon}
                  </Link>
                );
              })}
            </Stack>
          )}
        </Stack>
      </Box>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={1} sx={{ mt: 4.5, pt: 2, borderTop: 1, borderColor: "divider" }}>
        <Typography variant="caption">Managed By Egora</Typography>
        <Typography variant="caption">© {new Date().getFullYear()} Egora</Typography>
      </Stack>
    </Box>
  );
}
