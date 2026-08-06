import React, { useEffect, useMemo, useState } from 'react';
import { InputBase, IconButton, Paper, Container } from '@mui/material';
import Iconify from '../iconify';

const SearchBar = ({ prop, states, styles, themeColors, globalComponentStyles }) => {
  const { query, setQuery } = states ?? {};
  const [isExpanded, setIsExpanded] = useState(false);
  const [animatedText, setAnimatedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTextIndex, setActiveTextIndex] = useState(0);
  const shouldExpand = isExpanded || Boolean(query?.trim());

  const searchTerms = useMemo(() => {
    const configuredValue = prop?.editable?.SearchBarBackgroundText?.value;

    const values = Array.isArray(configuredValue)
      ? configuredValue
      : String(configuredValue || '').split(/[,|\n]/);

    const terms = values
      .map((value) =>
        String(value)
          .replace(/^search\s+for\s*/i, '')
          .trim()
      )
      .filter(Boolean);

    return terms.length ? terms : ['order'];
  }, [prop?.editable?.SearchBarBackgroundText?.value]);

  const activeSearchTerm = searchTerms[activeTextIndex % searchTerms.length];

  useEffect(() => {
    const hasFinishedTyping = animatedText === activeSearchTerm;
    const hasFinishedDeleting = animatedText === '';
    let delay = isDeleting ? 70 : 120;

    if (hasFinishedTyping && !isDeleting) delay = 1200;
    if (hasFinishedDeleting && isDeleting) delay = 350;

    const timeout = setTimeout(() => {
      if (hasFinishedTyping && !isDeleting) {
        setIsDeleting(true);
        return;
      }

      if (hasFinishedDeleting && isDeleting) {
        setIsDeleting(false);
        setActiveTextIndex((currentIndex) => (currentIndex + 1) % searchTerms.length);
        return;
      }

      setAnimatedText((currentText) =>
        isDeleting ? currentText.slice(0, -1) : activeSearchTerm.slice(0, currentText.length + 1)
      );
    }, delay);

    return () => clearTimeout(timeout);
  }, [activeSearchTerm, animatedText, isDeleting, searchTerms.length]);

  const iconColor =
    styles?.SearchBarIconColor?.value !== ''
      ? styles?.SearchBarIconColor?.value
      : themeColors?.SearchBarIconColor?.value;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsExpanded(false);
    }
  };

  return (
    <Container style={{ marginTop: '30px' }}>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        onFocus={() => setIsExpanded(true)}
        onBlur={handleBlur}
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: `2px solid ${styles?.SearchBarOutlineColor?.value !== ""
            ? styles?.SearchBarOutlineColor?.value
            : themeColors?.SearchBarOutlineColor?.value
            }`,
          borderRadius:
            styles?.SearchBarBorderRadius?.value !== ""
              ? `${styles?.SearchBarBorderRadius?.value}px`
              : `${themeColors?.SearchBarBorderRadius?.value || 0}px`,
          padding: '6px 12px',
          width: {
            xs: '100%',
            sm: shouldExpand ? '100%' : '50%',
          },
          transition: 'width 300ms ease',
          boxShadow: 'none',
          mx: 'auto',
        }}
      >
        <Iconify
          icon="eva:search-outline"
          width={
            styles?.SearchBarIconSize?.value !== ''
              ? styles?.SearchBarIconSize?.value
              : themeColors?.SearchBarIconSize?.value
          }
          height={
            styles?.SearchBarIconSize?.value !== ''
              ? styles?.SearchBarIconSize?.value
              : themeColors?.SearchBarIconSize?.value
          }
          color={iconColor}
        />
        <InputBase
          sx={{
            ml: 2,
            flex: 1,
            minWidth: 0,
            color:
              styles?.SearchBarTextColor?.value !== ""
                ? styles?.SearchBarTextColor?.value
                : globalComponentStyles?.Text?.color?.value !== ""
                  ? globalComponentStyles?.Text?.color?.value
                  : themeColors?.SearchBarTextColor?.value,
            '& input': {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
          }}
          placeholder={`Search for${animatedText ? ` ${animatedText}` : ''}`}
          inputProps={{ 'aria-label': 'search items' }}
          value={query ?? ''}
          onChange={(e) => setQuery?.(e.target.value)}
        />
        <IconButton
          type="submit"
          sx={{
            backgroundColor:
              styles?.SearchBarIconBackgroundColor?.value !== ''
                ? styles?.SearchBarIconBackgroundColor?.value
                : themeColors?.SearchBarIconBackgroundColor?.value,
            color: iconColor,
            p: 1,
            '&:hover': {
              backgroundColor: '#333',
            },
          }}
          aria-label="search"
        >
          <Iconify
            icon="eva:arrow-forward-fill"
            width={
              styles?.SearchBarIconSize?.value !== ''
                ? styles?.SearchBarIconSize?.value
                : themeColors?.SearchBarIconSize?.value
            }
            height={
              styles?.SearchBarIconSize?.value !== ''
                ? styles?.SearchBarIconSize?.value
                : themeColors?.SearchBarIconSize?.value
            }
            color={iconColor}
          />
        </IconButton>
      </Paper>
    </Container>
  );
};
export default SearchBar;
