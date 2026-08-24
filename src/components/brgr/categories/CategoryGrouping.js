import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { getScreenSizeCategory } from '../../../utils/fontsize';

const getId = (value) => {
  const franchiseId = value?.franchiseCategoryId;
  return String(value?.id || value?._id || franchiseId?.id || franchiseId?._id || franchiseId || value);
};

const useHorizontalScroll = () => {
  const ref = useRef(null);
  const [state, setState] = useState({ left: false, right: false, overflow: false });
  const update = () => {
    const element = ref.current;
    if (!element) return;
    const overflow = element.scrollWidth > element.clientWidth + 4;
    setState({
      left: element.scrollLeft > 4,
      right: overflow && element.scrollLeft + element.clientWidth < element.scrollWidth - 4,
      overflow
    });
  };
  useEffect(() => {
    update();
    const element = ref.current;
    element?.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      element?.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return { ref, ...state, update };
};

export default function CategoryGrouping({ prop = {}, layout = {}, styles, states, themeColors, categoryStyles }) {
  const displayCategories = prop.static?.displaycategories || [];
  const configuredCategories = prop.static?.categories || [];
  const legacyCategories = Object.values(layout.defaultLayout || {}).flat().find((block) => ['AllCategoriesPageV2', 'AllCategoriesPage'].includes(block?.component))?.props?.static?.displaycategories || [];
  const configuredSource = displayCategories.length ? displayCategories : configuredCategories;
  const categories = configuredSource.length ? configuredSource : legacyCategories;
  const groups = prop.editable?.groups?.value || prop.groups || layout.categoryGroups || [];
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef(null);
  const groupScroll = useHorizontalScroll();
  const categoryScroll = useHorizontalScroll();

  const categoryMap = useMemo(() => {
    const map = new Map();
    categories.forEach((category) => {
      [category?.id, category?._id, category?.franchiseCategoryId, category?.franchiseCategoryId?.id, category?.franchiseCategoryId?._id]
        .filter(Boolean).forEach((id) => map.set(String(id), category));
    });
    return map;
  }, [categories]);

  const categoryCarouselStyles = categoryStyles || Object.values(layout?.defaultLayout || {}).flat().find((block) => block?.component === 'CategoryCarousel')?.styles || {};

  const configuredGroups = groups.map((group) => ({
    ...group,
    categories: (group.categoryIds || group.categories || []).map((category) => categoryMap.get(getId(category)) || category).filter((category) => category?.name),
  }));
  const activeGroup = configuredGroups[activeGroupIndex] || configuredGroups[0];
  const activeCategories = activeGroup?.categories || [];
  const groupStyle = activeGroup?.style || {};
  const styleValue = (key, fallback) => {
    const value = styles?.[key]?.value ?? themeColors?.[key]?.value;
    return value === '' || value === null || value === undefined ? fallback : value;
  };
  const responsiveStyleValue = (key, fallback) => {
    const value = styleValue(key, fallback);
    if (!Array.isArray(value)) return value || fallback;
    return value[getScreenSizeCategory()] || value.find((item) => item !== 0) || fallback;
  };
  const categoryStyleValue = (key, fallback) => {
    const carouselKey = {
      CategoryGroupingCategoryRowBackgroundColor: 'CategoryCarouselBackgroundColor',
      CategoryGroupingCategoryRowTextColor: 'CategoryCarouselTextColor',
      CategoryGroupingCategoryRowActiveBackgroundColor: 'CategoryCarouselHoverColor',
      CategoryGroupingCategoryRowActiveTextColor: 'CategoryCarouselTextHoverColor',
      CategoryGroupingCategoryRowHoverBackgroundColor: 'CategoryCarouselHoverColor',
      CategoryGroupingCategoryRowHoverTextColor: 'CategoryCarouselTextHoverColor',
      CategoryGroupingCategoryRowTextSize: 'CategoryCarouselTextSize',
      CategoryGroupingCategoryRowFontWeight: 'CategoryCarouselTextWeight',
      CategoryGroupingCategoryRowFontFamily: 'CategoryCarouselTextFont',
      CategoryGroupingCategoryRowTextStyle: 'CategoryCarouselTextStyle',
      CategoryGroupingCategoryRowAlignment: 'CategoryCarouselAlignment',
    }[key];
    const value = categoryCarouselStyles?.[carouselKey]?.value ?? themeColors?.[carouselKey]?.value;
    const isUnset = value === '' || value === null || value === undefined || (Array.isArray(value) && value.every((item) => item === 0 || item === ''));
    if (isUnset) {
      return key === 'CategoryGroupingCategoryRowTextSize' && fallback === 14 ? [11, 15, 16, 16] : fallback;
    }
    return value;
  };
  const arrowStyleValue = (row, direction, key, fallback) => {
    if (row !== 'CategoryRow') return styleValue(`CategoryGrouping${row}${key}`, fallback);
    const carouselKey = direction === 'left'
      ? { ArrowColor: 'CategoryCarouselGoPrevIconColor', ArrowBackgroundColor: 'CategoryCarouselGoPrevIconBackgroundColor', ArrowIconSize: 'CategoryCarouselGoPrevIconHeightWidth' }[key]
      : { ArrowColor: 'CategoryCarouselGoNextIconColor', ArrowBackgroundColor: 'CategoryCarouselGoNextIconBackgroundColor', ArrowIconSize: 'CategoryCarouselGoNextIconHeightWidth' }[key];
    const value = categoryCarouselStyles?.[carouselKey]?.value ?? themeColors?.[carouselKey]?.value;
    const isUnset = value === '' || value === null || value === undefined || (Array.isArray(value) && value.every((item) => item === 0 || item === ''));
    return isUnset ? fallback : value;
  };
  const groupRowBackground = groupStyle.navBackground || styleValue('CategoryGroupingGroupRowBackgroundColor', '#fff');
  const groupTextColor = groupStyle.color || styleValue('CategoryGroupingGroupRowTextColor', '#8ca45d');
  const groupActiveBackground = groupStyle.activeBackground || styleValue('CategoryGroupingGroupRowActiveBackgroundColor', '#8ca45d');
  const groupActiveColor = groupStyle.activeColor || styleValue('CategoryGroupingGroupRowActiveTextColor', '#fff');
  const groupHoverBackground = groupStyle.hoverBackground || styleValue('CategoryGroupingGroupRowHoverBackgroundColor', '#8ca45d');
  const groupHoverColor = groupStyle.hoverColor || styleValue('CategoryGroupingGroupRowHoverTextColor', '#fff');
  const categoryRowBackground = categoryStyleValue('CategoryGroupingCategoryRowBackgroundColor', groupRowBackground);
  const categoryTextColor = groupStyle.categoryNavColor || categoryStyleValue('CategoryGroupingCategoryRowTextColor', '#8ca45d');
  const categoryActiveBackground = groupStyle.activeCategoryBackground || categoryStyleValue('CategoryGroupingCategoryRowActiveBackgroundColor', '#8ca45d');
  const categoryActiveColor = groupStyle.activeCategoryColor || categoryStyleValue('CategoryGroupingCategoryRowActiveTextColor', '#fff');
  const categoryHoverBackground = groupStyle.activeCategoryBackground || categoryStyleValue('CategoryGroupingCategoryRowHoverBackgroundColor', '#8ca45d');
  const categoryHoverColor = categoryStyleValue('CategoryGroupingCategoryRowHoverTextColor', '#fff');
  const scrollAmount = styleValue('CategoryGroupingArrowScrollAmount', 240);
  const arrowButton = (row, direction) => ({
    color: arrowStyleValue(row, direction, 'ArrowColor', '#ffffff'),
    backgroundColor: arrowStyleValue(row, direction, 'ArrowBackgroundColor', '#8ca45d'),
    width: row === 'CategoryRow' ? 36 : styleValue(`CategoryGrouping${row}ArrowButtonSize`, 36),
    height: row === 'CategoryRow' ? 36 : styleValue(`CategoryGrouping${row}ArrowButtonSize`, 36),
    borderRadius: row === 'CategoryRow' ? '50%' : styleValue(`CategoryGrouping${row}ArrowBorderRadius`, '50%'),
    '&:hover': {
      color: row === 'CategoryRow' ? '#ffffff' : styleValue(`CategoryGrouping${row}ArrowHoverColor`, '#ffffff'),
      backgroundColor: categoryCarouselStyles?.CategoryCarouselHoverColor?.value || (row === 'CategoryRow' ? '#6f8649' : styleValue(`CategoryGrouping${row}ArrowHoverBackgroundColor`, '#6f8649'))
    }
  });
  const renderArrow = (row, direction, visible, scroll) => scroll.overflow && visible && (
    <IconButton
      type="button"
      aria-label={`${direction === 'left' ? 'Scroll left' : 'Scroll right'} ${row.toLowerCase()} navigation`}
      onClick={() => scroll.ref.current?.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })}
      sx={{ ...arrowButton(row, direction), position: 'absolute', top: '50%', transform: 'translateY(-50%)', [direction]: row === 'CategoryRow' ? 8 : styleValue(`CategoryGrouping${row}ArrowOffset`, 8), zIndex: 2, boxShadow: styleValue('CategoryGroupingArrowShadow', '0 2px 6px rgba(0,0,0,0.16)') }}
    >
      {direction === 'left' ? <ArrowBackIosNew sx={{ fontSize: arrowStyleValue(row, direction, 'ArrowIconSize', 14), ml: 0.5 }} /> : <ArrowForwardIos sx={{ fontSize: arrowStyleValue(row, direction, 'ArrowIconSize', 14) }} />}
    </IconButton>
  );

  const selectGroup = (index) => {
    setActiveGroupIndex(index);
    const nextGroup = configuredGroups[index];
    const nextCategories = nextGroup?.categories || [];
    const ids = (nextGroup?.categoryIds || nextCategories).map(getId);
    states?.setCategoryGroupingCategoryIds?.(ids);
    setActiveCategoryId(nextCategories[0] ? getId(nextCategories[0]) : null);
  };

  useEffect(() => {
    if (configuredGroups.length) selectGroup(0);
  }, [groups.length]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      groupScroll.update();
      categoryScroll.update();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [configuredGroups.length, activeGroupIndex, activeCategories.length]);

  useEffect(() => {
    const updateScrollState = () => {
      if (navRef.current) setIsSticky(navRef.current.getBoundingClientRect().top <= 0);

      const stickyHeight = navRef.current?.getBoundingClientRect().height || 104;
      let activeCategory = activeCategories[0];
      activeCategories.forEach((category) => {
        const element = document.getElementById(`category-group-${getId(category)}`);
        if (element && element.getBoundingClientRect().top <= stickyHeight + 24) activeCategory = category;
      });
      if (activeCategory) setActiveCategoryId(getId(activeCategory));
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      window.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [activeGroupIndex, activeCategories]);

  useEffect(() => {
    const element = categoryScroll.ref.current;
    const button = element?.querySelector(`[data-category-id="${activeCategoryId}"]`);
    if (!element || !button) return;
    element.scrollTo({ left: Math.max(0, button.offsetLeft - ((element.clientWidth - button.offsetWidth) / 2)), behavior: 'smooth' });
  }, [activeCategoryId]);

  return (
    <Box ref={navRef} sx={{
      width: '100%', minHeight: isSticky ?
        responsiveStyleValue('CategoryGroupingStickyHeight', 104) : 0,
      backgroundColor: styleValue('CategoryGroupingBackgroundColor', 'transparent')
    }}>
      <Box sx={{
        position: isSticky ? 'fixed' : 'relative',
        top: 0,
        left: 0,
        right: 0,
        zIndex: styleValue('CategoryGroupingStickyZIndex', 1000),
        width: '100%',
        backgroundColor: groupRowBackground,
        boxShadow: isSticky ? styleValue('CategoryGroupingStickyShadow', '0 2px 8px rgba(0,0,0,0.08)') : 'none',
        border: styleValue('CategoryGroupingBorder', 'none')
      }}>
        <Box sx={{
          position: 'relative',
          backgroundColor: groupRowBackground,
          // borderBottom: `${styleValue('CategoryGroupingGroupRowBorderWidth', 1)}px solid ${styleValue('CategoryGroupingGroupRowBorderColor', '#eee')}`
        }}>
          {renderArrow('GroupRow', 'left', groupScroll.left, groupScroll)}
          {renderArrow('GroupRow', 'right', groupScroll.right, groupScroll)}
          <Box
            ref={groupScroll.ref}
            onScroll={groupScroll.update}
            sx={{
              display: 'flex',
              width: '100%',
              boxSizing: 'border-box',
              justifyContent: groupScroll.overflow ? 'flex-start' : styleValue('CategoryGroupingGroupRowAlignment', 'center'),
              alignItems: 'center', gap: styleValue('CategoryGroupingGroupRowGap', 2),
              overflowX: 'auto',
              py: styleValue('CategoryGroupingGroupRowPaddingVertical', 1),
              px: styleValue('CategoryGroupingGroupRowPaddingHorizontal', 1),
              pl: { xs: 2, sm: styleValue('CategoryGroupingGroupRowPaddingHorizontal', 1) },
              pr: { xs: 2, sm: styleValue('CategoryGroupingGroupRowPaddingHorizontal', 1) },
              scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' }
            }}>
            {configuredGroups.map((group, index) => (
              <Button key={group.id || group._id || group.name || index}
                onClick={() => selectGroup(index)}
                sx={{
                  flexShrink: 0,
                  width: 'max-content',
                  minWidth: 'max-content',
                  whiteSpace: 'nowrap',
                  borderRadius: styleValue('CategoryGroupingGroupRowBorderRadius', 2),
                  px: styleValue('CategoryGroupingGroupRowButtonPaddingHorizontal', 3),
                  py: styleValue('CategoryGroupingGroupRowButtonPaddingVertical', 1),
                  color: index === activeGroupIndex ? groupActiveColor : groupTextColor,
                  backgroundColor: index === activeGroupIndex ? groupActiveBackground : 'transparent',
                  fontSize: responsiveStyleValue('CategoryGroupingGroupRowTextSize', 14),
                  fontWeight: styleValue('CategoryGroupingGroupRowFontWeight', 'normal'),
                  fontFamily: styleValue('CategoryGroupingGroupRowFontFamily', 'inherit'),
                  fontStyle: styleValue('CategoryGroupingGroupRowTextStyle', 'normal'),
                  textTransform: styleValue('CategoryGroupingGroupRowTextTransform', 'none'),
                  '&:hover': { backgroundColor: groupHoverBackground, color: groupHoverColor }
                }}>
                {group.name || `Group ${index + 1}`}
              </Button>
            ))}
          </Box>
        </Box>
        {activeGroup && (
          <Box
            sx={{
              position: 'relative',
              backgroundColor: categoryStyleValue('CategoryGroupingCategoryRowBackgroundColor', categoryRowBackground)
            }}>
            <Box sx={{
              position: 'relative',
              width: '100%',
              maxWidth: '1370px',
              mx: 'auto'
            }}>
              {renderArrow('CategoryRow', 'left', categoryScroll.left, categoryScroll)}
              {renderArrow('CategoryRow', 'right', categoryScroll.right, categoryScroll)}
              <Box ref={categoryScroll.ref} onScroll={categoryScroll.update} sx={{
                display: 'flex',
                justifyContent: categoryScroll.overflow ? 'flex-start' : categoryStyleValue('CategoryGroupingCategoryRowAlignment', 'center'),
                alignItems: 'center', gap: categoryStyleValue('CategoryGroupingCategoryRowGap', 3),
                overflowX: 'auto', py: categoryStyleValue('CategoryGroupingCategoryRowPaddingVertical', 1.5),
                px: categoryStyleValue('CategoryGroupingCategoryRowPaddingHorizontal', 1),
                pl: { xs: 6, sm: categoryStyleValue('CategoryGroupingCategoryRowPaddingHorizontal', 1) },
                pr: { xs: 6, sm: categoryStyleValue('CategoryGroupingCategoryRowPaddingHorizontal', 1) },
                boxSizing: 'border-box', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' },
                // borderBottom: `${categoryStyleValue('CategoryGroupingCategoryRowBorderWidth', 1)}px solid ${categoryStyleValue('CategoryGroupingCategoryRowBorderColor', '#eee')}`
              }}>
                {activeCategories.map((category) => (
                  <Button
                    key={getId(category)}
                    data-category-id={getId(category)}
                    onClick={() => document.getElementById(`category-group-${getId(category)}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    sx={{
                      flexShrink: 0,
                      color: activeCategoryId === getId(category) ?
                        categoryStyleValue('CategoryGroupingCategoryRowActiveTextColor',
                          categoryActiveColor) : categoryStyleValue('CategoryGroupingCategoryRowTextColor', categoryTextColor),
                      backgroundColor: activeCategoryId === getId(category) ? categoryStyleValue('CategoryGroupingCategoryRowActiveBackgroundColor',
                        categoryActiveBackground) : 'transparent', borderRadius: categoryStyleValue('CategoryGroupingCategoryRowBorderRadius', 2),
                      px: categoryStyleValue('CategoryGroupingCategoryRowButtonPaddingHorizontal', 2),
                      py: categoryStyleValue('CategoryGroupingCategoryRowButtonPaddingVertical', 1),
                      fontSize: categoryStyleValue('CategoryGroupingCategoryRowTextSize', 14),
                      fontWeight: categoryStyleValue('CategoryGroupingCategoryRowFontWeight', 'normal'),
                      fontFamily: categoryStyleValue('CategoryGroupingCategoryRowFontFamily', 'inherit'),
                      fontStyle: categoryStyleValue('CategoryGroupingCategoryRowTextStyle', 'normal'),
                      textTransform: categoryStyleValue('CategoryGroupingCategoryRowTextTransform', 'none'),
                      whiteSpace: 'nowrap',
                      '&:hover': {
                        backgroundColor: categoryStyleValue('CategoryGroupingCategoryRowHoverBackgroundColor', categoryHoverBackground),
                        color: categoryStyleValue('CategoryGroupingCategoryRowHoverTextColor', categoryHoverColor)
                      }
                    }}>
                    {category.name}
                  </Button>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
