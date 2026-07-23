import React, { useState } from 'react';
import { InputBase, IconButton, Paper, Container } from '@mui/material';
import Iconify from '../iconify';

const SearchBar = ({ prop, states, styles, themeColors, globalComponentStyles }) => {
  const { query, setQuery } = states ?? {};
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldExpand = isExpanded || Boolean(query?.trim());

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
            color:
              styles?.SearchBarTextColor?.value !== ''
                ? styles?.SearchBarTextColor?.value
                : globalComponentStyles?.Text?.color?.value !== ''
                  ? globalComponentStyles?.Text?.color?.value
                  : themeColors?.SearchBarTextColor?.value,
          }}
          placeholder={prop.editable.SearchBarBackgroundText.value}
          inputProps={{ 'aria-label': 'search items' }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
