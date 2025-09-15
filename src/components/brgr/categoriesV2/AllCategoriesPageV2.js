import React, { useState, useEffect, useRef } from "react";
import { Grid, Typography, Container, Box, useMediaQuery } from "@mui/material";
import { categories } from "../data/categories";
import BannerV2 from "../categoriesV2/BannerV2";
import CategoryLayout from "../categories/CategoryLayout";
import ItemCardV2 from "./ItemCardV2";
import { useTheme } from '@mui/material/styles';
import { getFontSize, getScreenSizeCategory } from "../../../utils/fontsize";

export default function AllCategoriesPageV2({ prop, actions, styles, states, themeColors, globalComponentStyles }) {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const categoryRefs = useRef({});

  const [products, setProducts] = useState(prop.static.displaycategories || []);

  const { query } = states ?? {}

  useEffect(() => {
    if (query && query.trim() !== "") {
      const filtered = (prop.static.displaycategories || []).map((category) => {
        const filteredItems = category.items?.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        );
        const isCategoryMatch = category.name.toLowerCase().includes(query.toLowerCase());

        if (isCategoryMatch || filteredItems.length > 0) {
          return {
            ...category,
            items: filteredItems.length > 0 ? filteredItems : category.items
          };
        }

        return null;
      }).filter(Boolean);

      setProducts(filtered);
    } else {
      setProducts(prop.static.displaycategories || []);
    }
  }, [states.query, prop.static.displaycategories]);

  // Setup ref for each category

  useEffect(() => {
    if (products.length > 0) {
      products.forEach((category) => {
        if (!categoryRefs.current[category.name]) {
          categoryRefs.current[category.name] = React.createRef();
        }
      });
    }
  }, [products]);

  useEffect(() => {
    if (
      states.selectedCategoryItem &&
      categoryRefs.current[states.selectedCategoryItem] &&
      states?.isManualScroll.current
    ) {
      const element = categoryRefs.current[states.selectedCategoryItem].current;
      const yOffset = mdDown ? 0 : -100;

      const y =
        element?.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });

      setTimeout(() => {
        states.isManualScroll.current = false;
      }, 500);
    }
  }, [states.selectedCategoryItem]);

  useEffect(() => {
    let observer = null;

    const observe = () => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const visibleCategory = entry.target.getAttribute('data-category-name');
              if (visibleCategory && visibleCategory !== states.selectedCategoryItem) {
                if (!states?.isManualScroll.current) {
                  states.setSelectedCategoryItem(visibleCategory);
                }
              }
            }
          });
        },
        {
          root: null,
          threshold: 0.5,
        }
      );

      Object.values(categoryRefs.current).forEach((ref) => {
        if (ref?.current) {
          observer.observe(ref.current);
        }
      });
    };

    const timeout = setTimeout(() => {
      observe();
    }, 200);

    return () => {
      clearTimeout(timeout);
      if (observer) observer.disconnect();
    };
  }, [products]);

  const getCategoryNameStyles = {
    color:
      styles?.AllCategoriesCategoryTextColorV2?.value !== ""
        ? styles?.AllCategoriesCategoryTextColorV2?.value
        : globalComponentStyles?.Text?.color?.value !== ""
          ? globalComponentStyles?.Text?.color?.value
          : themeColors?.AllCategoriesCategoryTextColorV2?.value,

    fontSize:
      styles?.AllCategoriesCategoryTextSizeV2?.value[getScreenSizeCategory()] != 0
        ? styles?.AllCategoriesCategoryTextSizeV2?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.AllCategoriesCategoryTextSizeV2?.value[getScreenSizeCategory()],
    fontWeight:
      styles?.AllCategoriesCategoryTextWeightV2?.value != ""
        ? styles?.AllCategoriesCategoryTextWeightV2?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value :
          themeColors?.AllCategoriesCategoryTextWeightV2?.value,
    fontFamily:
      styles?.AllCategoriesCategoryTextFontV2?.value !== ""
        ? styles?.AllCategoriesCategoryTextFontV2?.value
        : globalComponentStyles?.Text?.fontFamily?.value !== ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.AllCategoriesCategoryTextFontV2?.value,

    fontStyle:
      styles?.AllCategoriesCategoryTextStyleV2?.value !== ""
        ? styles?.AllCategoriesCategoryTextStyle?.value
        : globalComponentStyles?.Text?.fontStyle?.value !== ""
          ? globalComponentStyles?.Text?.fontStyleV2?.value
          : themeColors?.AllCategoriesCategoryTextStyleV2?.value,
  };

  const values = prop.editable.categoryId.value;

  const valueIds = values.map(item => item.id);

  const sortedCategory = valueIds
    .map(id => products.find(cat => {
      return cat?.id === id || id?.toString() == cat?.franchiseCategoryId?.toString()
    }))
    .filter(Boolean);

  return (
    <Container style={{ marginTop: "30px", 
    backgroundColor:
    styles?.AllCategoriesBackgroundColorV2?.value != ""
      ? styles?.AllCategoriesBackgroundColorV2?.value
      : globalComponentStyles?.Background?.color?.value != ""
        ? globalComponentStyles?.Background?.color?.value
        : themeColors?.AllCategoriesBackgroundColorV2?.value,
        padding: "10px"
     }}>
      {sortedCategory.map((category, index) => (
        <Box
          key={category.id}
          ref={categoryRefs.current[category.name]}
          data-category-name={category.name}
        >
          <CategoryLayout
          // banner={<Banner img={category.bannerImg} />}
          >
            <Typography variant="h3" style={{ marginBottom: "16px", ...getCategoryNameStyles }}>
              {category.name}
            </Typography>
            
            { styles?.AllCategoriesBannerImageShowV2?.value &&  <BannerV2 img={prop.editable.categoryId.value[index]?.img} styles={styles} themeColors={themeColors}  /> } 
            
            <Grid container spacing={2}>
              {category?.items?.map((item, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={`categoryItem${item.id}`}
                >
                  <ItemCardV2
                    key={`categoryItem${index}item`}
                    globalComponentStyles={globalComponentStyles}
                    themeColors={themeColors}
                    styles={styles}
                    item={item}
                    actions={actions}
                    states={states}
                  />
                </Grid>
              ))}
            </Grid>

          </CategoryLayout>
        </Box>
      ))}
    </Container>
  );
}