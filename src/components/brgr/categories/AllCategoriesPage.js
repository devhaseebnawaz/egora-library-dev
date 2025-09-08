import React, { useState, useEffect, useRef } from "react";
import { Grid, Typography, Container, Box,useMediaQuery } from "@mui/material";
import { categories } from "../data/categories";
import Banner from "./Banner";
import CategoryLayout from "./CategoryLayout";
import ItemCard from "./ItemCard";
import { useTheme } from '@mui/material/styles';
import { getFontSize, getScreenSizeCategory } from "../../../utils/fontsize";

export default function AllCategoriesPage({ prop, actions, styles, states, themeColors, globalComponentStyles }) {
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
      styles?.AllCategoriesCategoryTextColor?.value !== ""
        ? styles?.AllCategoriesCategoryTextColor?.value
        : globalComponentStyles?.Text?.color?.value !== ""
          ? globalComponentStyles?.Text?.color?.value
          : themeColors?.AllCategoriesCategoryTextColor?.value,

    fontSize:
      styles?.AllCategoriesCategoryTextSize?.value[getScreenSizeCategory()] != 0
        ? styles?.AllCategoriesCategoryTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.AllCategoriesCategoryTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      styles?.AllCategoriesCategoryTextWeight?.value != ""
        ? styles?.AllCategoriesCategoryTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value :
          themeColors?.AllCategoriesCategoryTextWeight?.value,
    fontFamily:
      styles?.AllCategoriesCategoryTextFont?.value !== ""
        ? styles?.AllCategoriesCategoryTextFont?.value
        : globalComponentStyles?.Text?.fontFamily?.value !== ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.AllCategoriesCategoryTextFont?.value,

    fontStyle:
      styles?.AllCategoriesCategoryTextStyle?.value !== ""
        ? styles?.AllCategoriesCategoryTextStyle?.value
        : globalComponentStyles?.Text?.fontStyle?.value !== ""
          ? globalComponentStyles?.Text?.fontStyle?.value
          : themeColors?.AllCategoriesCategoryTextStyle?.value,
  };

  const values = prop.editable.categoryId.value;

  const valueIds = values.map(item => item.id);

  const sortedCategory = valueIds
    .map(id => products.find(cat => { 
      return  cat?.id === id || id?.toString() == cat?.franchiseCategoryId?.toString()
    }))
    .filter(Boolean);
    
  return (
    <Container style={{ marginTop: "30px" }}>
      {sortedCategory.map((category, index) => (
        <Box
          key={category.id}
          ref={categoryRefs.current[category.name]}
          data-category-name={category.name}
        >
          <CategoryLayout
          // banner={<Banner img={category.bannerImg} />}
          >
            {prop.editable.categoryId.value[index]?.img ?
              <Banner img={prop.editable.categoryId.value[index]?.img} /> :
              <Typography variant="h3" style={{ marginBottom: "16px", ...getCategoryNameStyles }}>
                {category.name}
              </Typography>
            }

            <Grid container spacing={2}>
              {category.items.map((item, index) => (
                <Grid item xs={6} sm={6} md={3} key={`categoryItem${item.id}`}>
                    <ItemCard key={`categoryItem${index}item`} globalComponentStyles={globalComponentStyles} themeColors={themeColors} styles={styles} item={item} actions={actions} states={states} />
                </Grid>
              ))}
            </Grid>
          </CategoryLayout>
        </Box>
      ))}
    </Container>
  );
}
