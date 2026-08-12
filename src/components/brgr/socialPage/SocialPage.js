import React from 'react';
import { Box, Container, Link, Stack, Typography } from '@mui/material';
import Iconify from '../iconify';

const SOCIAL_CONFIG = {
  facebook: { label: 'Facebook', icon: 'eva:facebook-fill', color: '#1877f2' },
  instagram: { label: 'Instagram', icon: 'ant-design:instagram-filled', color: '#c13584' },
  linkedin: { label: 'LinkedIn', icon: 'eva:linkedin-fill', color: '#0a66c2' },
  whatsapp: { label: 'WhatsApp', icon: 'mdi:whatsapp', color: '#25d366' },
  twitter: { label: 'Twitter', icon: 'mdi:twitter', color: '#1d9bf0' },
  x: { label: 'X', icon: 'ri:twitter-x-fill', color: '#111111' },
  tiktok: { label: 'TikTok', icon: 'simple-icons:tiktok', color: '#111111' },
  snapchat: { label: 'Snapchat', icon: 'mdi:snapchat', color: '#fffc00' },
  youtube: { label: 'YouTube', icon: 'mdi:youtube', color: '#ff0000' },
  website: { label: 'Website', icon: 'mdi:web', color: '#555555' },
  email: { label: 'Email', icon: 'mdi:email', color: '#f08203' },
};

const normalizeSocialName = (name = '') =>
  String(name).toLowerCase().replace(/[^a-z0-9]/g, '');

const normalizeUrl = (url, socialName) => {
  const value = String(url || '').trim();
  if (!value) return '';
  if (/^(https?:|mailto:|tel:)/i.test(value)) return value;

  if (socialName === 'email') return `mailto:${value}`;
  if (socialName === 'whatsapp' && /^\+?[\d\s()-]+$/.test(value)) {
    return `https://wa.me/${value.replace(/\D/g, '')}`;
  }

  return `https://${value}`;
};

const styleValue = (styles, themeColors, globalComponentStyles, key, fallback) => {
  const localValue = styles?.[key]?.value;
  if (localValue !== '' && localValue !== undefined && localValue !== null) return localValue;

  const globalValue = globalComponentStyles?.Text?.[key]?.value;
  if (globalValue !== '' && globalValue !== undefined && globalValue !== null) return globalValue;

  const themeValue = themeColors?.[key]?.value;
  if (themeValue !== '' && themeValue !== undefined && themeValue !== null) return themeValue;

  return fallback;
};

const responsiveStyleValue = (styles, themeColors, key, fallback) => {
  const value = styles?.[key]?.value;
  const themeValue = themeColors?.[key]?.value;
  const responsiveValue = Array.isArray(value)
    ? value
    : Array.isArray(themeValue)
      ? themeValue
      : null;

  if (responsiveValue) {
    return {
      xs: responsiveValue[0] || fallback,
      sm: responsiveValue[1] || fallback,
      md: responsiveValue[2] || fallback,
      lg: responsiveValue[3] || fallback,
    };
  }
  return fallback;
};

export default function SocialPage({
  themeColors,
  prop,
  styles,
  globalComponentStyles,
  states,
}) {
  const editable = prop?.editable || {};
  const title = editable.title?.value || 'Social Links';
  const subtitle = editable.subtitle?.value || '';
  const backgroundImage = editable.backgroundImage?.value || '';
  const socialLinks = (editable.socialLinks?.value || []).filter((link) => link?.url);

  return (
    <Box
      component="main"
      sx={{
        position: 'relative',
        minHeight: {
          xs: '75vh',
          md: '75vh',
          lg: '80vh'
        },
        display: 'flex',
        alignItems: 'center',
        py: { xs: 6, md: 9 },
        overflow: 'hidden',
        backgroundColor: styleValue(
          styles,
          themeColors,
          globalComponentStyles,
          'FollowPageBackgroundColor',
          '#eef1f4'
        ),
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {backgroundImage && (
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundColor: styleValue(
              styles,
              themeColors,
              globalComponentStyles,
              'FollowPageOverlayColor',
              '#000000'
            ),
          }}
        />
      )}

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <Typography
          component="h1"
          sx={{
            color: styleValue(
              styles,
              themeColors,
              globalComponentStyles,
              'FollowPageTitleColor',
              '#ffffff'
            ),
            fontSize: responsiveStyleValue(styles, themeColors, 'FollowPageTitleSize', 48),
            fontWeight: styleValue(
              styles,
              themeColors,
              globalComponentStyles,
              'FollowPageTitleWeight',
              700
            ),
            fontFamily: styleValue(
              styles,
              themeColors,
              globalComponentStyles,
              'FollowPageTitleFont',
              'inherit'
            ),
            lineHeight: 1.15,
            mb: 3,
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            sx={{
              display: 'inline-block',
              mt: 2.5,
              px: 3,
              py: 1.25,
              borderRadius: `${styleValue(
                styles,
                themeColors,
                globalComponentStyles,
                'FollowPageSubtitleBorderRadius',
                999
              )}px`,
              color: styleValue(
                styles,
                themeColors,
                globalComponentStyles,
                'FollowPageSubtitleColor',
                '#ffffff'
              ),
              bgcolor: styleValue(
                styles,
                themeColors,
                globalComponentStyles,
                'FollowPageSubtitleBackgroundColor',
                '#f08203'
              ),
              fontSize: responsiveStyleValue(styles, themeColors, 'FollowPageSubtitleSize', 16),
              fontWeight: styleValue(
                styles,
                themeColors,
                globalComponentStyles,
                'FollowPageSubtitleWeight',
                700
              ),
            }}
          >
            {subtitle}
          </Typography>
        )}

        <Stack spacing={1.5} sx={{ mt: 4, alignItems: 'center' }}>
          {socialLinks.map((link, index) => {
            const socialName = normalizeSocialName(link.name);
            const config = SOCIAL_CONFIG[socialName] || {
              label: link.name || 'Visit link',
              icon: 'mdi:link-variant',
              color: '#555555',
            };
            const href = normalizeUrl(link.url, socialName);

            return (
              <Link
                key={`${socialName || 'social'}-${index}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
                aria-label={`Open ${link.name || config.label}`}
                sx={{
                  width: '100%',
                  maxWidth: styleValue(
                    styles,
                    themeColors,
                    globalComponentStyles,
                    'FollowPageButtonWidth',
                    320
                  ),
                  minHeight: 52,
                  px: 2.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                  borderRadius: `${styleValue(
                    styles,
                    themeColors,
                    globalComponentStyles,
                    'FollowPageButtonBorderRadius',
                    999
                  )}px`,
                  bgcolor: styleValue(
                    styles,
                    themeColors,
                    globalComponentStyles,
                    'FollowPageButtonBackgroundColor',
                    '#ffffff'
                  ),
                  color: styleValue(
                    styles,
                    themeColors,
                    globalComponentStyles,
                    'FollowPageButtonTextColor',
                    '#333333'
                  ),
                  boxShadow: '0 4px 14px rgba(0,0,0,0.14)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  transition: 'transform 160ms ease, box-shadow 160ms ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.18)',
                  },
                  '&:focus-visible': {
                    outline: `3px solid ${config.color}`,
                    outlineOffset: 3,
                  },
                }}
              >
                <Box component="span">{link.name || config.label}</Box>
                {link.addCustomIcon && link.customIcon ? (
                  <Box
                    component="img"
                    src={link.customIcon}
                    alt=""
                    sx={{ width: 26, height: 26, objectFit: 'contain' }}
                  />
                ) : (
                  <Iconify icon={config.icon} width={25} sx={{ color: config.color }} />
                )}
              </Link>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
}
