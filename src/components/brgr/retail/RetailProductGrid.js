/* eslint-disable react/prop-types */
import React, { useMemo, useState } from "react";
import { Add, Check } from "@mui/icons-material";
import { Box, Button, ButtonBase, CircularProgress, FormControl, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import {
  buildRetailCartItem,
  getProduct,
  getRetailApplicableChoiceGroups,
  getRetailDefaultVariant,
  isRetailTrue,
  money,
  propItems,
  propValue,
  resolveComponentStyles,
  styleLength,
  styleValue,
} from "./retailShared";

const getCategoryItems = (categories) => {
  const seen = new Set();

  return categories.flatMap((category) => {
    const categoryItems = Array.isArray(category?.items) ? category.items : [];

    return categoryItems.reduce((items, item, index) => {
      const itemId = item?.id || item?._id || `${category?.id || category?.name}-${index}`;
      if (seen.has(String(itemId))) return items;

      seen.add(String(itemId));
      items.push({
        ...item,
        category:
          item?.franchiseCategoryId?.name ||
          item?.categoryId?.name ||
          category?.name ||
          "",
      });
      return items;
    }, []);
  });
};

export default function RetailProductGrid({
  prop,
  actions,
  styles: componentStyles,
  themeColors,
  states,
  previewMode = false,
  isEditorPreview = false,
}) {
  const editorPreview = previewMode || isEditorPreview;
  const theme = useTheme();
  const styles = resolveComponentStyles(componentStyles, themeColors);
  const [sort, setSort] = useState("featured");
  const [addState, setAddState] = useState({});
  const categories = propItems(prop, "categories");
  const legacyItems = propItems(prop, "items");
  const title = propValue(prop, "title", "Curated essentials");
  const description = propValue(
    prop,
    "description",
    "Curated essentials for your best self."
  );
  const imageBaseUrl = states?.storeImagesBaseUrl || "";

  const products = useMemo(() => {
    const categoryItems = getCategoryItems(categories);
    const source = categoryItems.length ? categoryItems : legacyItems;

    return source.map((item) => getProduct(item, imageBaseUrl));
  }, [categories, imageBaseUrl, legacyItems]);

  const sortedProducts = useMemo(() => {
    if (sort === "price-low") {
      return [...products].sort((first, second) => first.price - second.price);
    }
    if (sort === "price-high") {
      return [...products].sort((first, second) => second.price - first.price);
    }
    return products;
  }, [products, sort]);

  if (!sortedProducts.length && !previewMode) return null;

  const openProduct = (product) => {
    if (editorPreview) {
      actions?.handleOpenCard?.(product);
      return;
    }

    if (actions?.navigateToProduct) {
      actions.navigateToProduct(product);
    }
  };

  const hasRequiredChoiceGroup = (product, variant) =>
    getRetailApplicableChoiceGroups(product, states?.choiceGroups || [], variant).some(
      (group) => isRetailTrue(group?.required)
    );

  const quickAdd = async (product) => {
    if (editorPreview) return;

    const productId = product.id || product._id || product.name;
    const variant = isRetailTrue(product?.hasVariant) ? getRetailDefaultVariant(product) : null;

    if ((isRetailTrue(product?.hasVariant) && !variant) || hasRequiredChoiceGroup(product, variant)) {
      openProduct(product);
      return;
    }

    setAddState((current) => ({ ...current, [productId]: "loading" }));

    try {
      const cartItem = buildRetailCartItem(product, {
        selectedVariant: variant,
        selectedGroups: [],
        quantity: 1,
      });
      const response = await actions?.handleAddToCart?.(cartItem, [], 1, "");

      if (response?.status === 201 || response?.status === 200) {
        setAddState((current) => ({ ...current, [productId]: "success" }));
        window.setTimeout(() => {
          setAddState((current) => {
            const next = { ...current };
            delete next[productId];
            return next;
          });
        }, 1800);
      } else {
        setAddState((current) => ({ ...current, [productId]: "error" }));
      }
    } catch {
      setAddState((current) => ({ ...current, [productId]: "error" }));
    }
  };

  const productList = sortedProducts;
  const headingColor = styleValue(styles, "RetailProductGridHeadingColor", theme.palette.text.primary);
  const descriptionColor = styleValue(styles, "RetailProductGridDescriptionColor", theme.palette.text.secondary);
  const productNameColor = styleValue(styles, "RetailProductGridProductNameColor", theme.palette.text.primary);
  const productDescriptionColor = styleValue(styles, "RetailProductGridProductDescriptionColor", theme.palette.text.secondary);
  const buttonSx = {
    mt: 2, py: 1.5, px: 2, minHeight: 48, justifyContent: "space-between",
    background: styleValue(styles, "RetailProductGridButtonBackgroundColor", "transparent"),
    color: styleValue(styles, "RetailProductGridButtonTextColor", theme.palette.primary.main),
    borderColor: styleValue(styles, "RetailProductGridButtonBorderColor", theme.palette.primary.main),
    borderRadius: styleLength(styles, "RetailProductGridButtonBorderRadius", theme.shape.borderRadius),
    "&:hover": {
      background: styleValue(styles, "RetailProductGridButtonHoverBackgroundColor", theme.palette.primary.main),
      color: styleValue(styles, "RetailProductGridButtonHoverTextColor", theme.palette.primary.contrastText),
      borderColor: styleValue(styles, "RetailProductGridButtonBorderColor", theme.palette.primary.main),
    },
  };

  return (
    <Box component="section" id="retail-products" sx={{ px: { xs: 2, md: 5 }, py: { xs: 5, md: 8 }, scrollMarginTop: 24, background: styleValue(styles, "RetailProductGridBackgroundColor", theme.palette.background.default) }}>
      <Stack direction={{ xs: "column", md: "row" }} alignItems={{ xs: "stretch", md: "flex-end" }} justifyContent="space-between" spacing={3} sx={{ pb: 3, mb: 4, borderBottom: 1, borderColor: "divider", color: headingColor }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="overline">The edit</Typography>
          <Typography component="h2" variant="h3" sx={{ color: headingColor, overflowWrap: "anywhere", fontSize: styleLength(styles, "RetailProductGridHeadingTextSize", { xs: 30, md: 42 }), mb: 1 }}>{title}</Typography>
          {description && <Typography variant="body2" sx={{ color: descriptionColor, fontSize: styleLength(styles, "RetailProductGridDescriptionTextSize", theme.typography.body2.fontSize) }}>{description}</Typography>}
        </Box>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ flexShrink: 0, justifyContent: "space-between", color: descriptionColor }}>
          <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>{productList.length} products</Typography>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <Select value={sort} onChange={(event) => setSort(event.target.value)} inputProps={{ "aria-label": "Sort products" }} sx={{ color: headingColor }}>
              <MenuItem value="featured">Featured</MenuItem>
              <MenuItem value="price-low">Price: low to high</MenuItem>
              <MenuItem value="price-high">Price: high to low</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>
      {productList.length ? (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0, 1fr)", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" }, columnGap: styleLength(styles, "RetailProductGridGap", 24), rowGap: styleLength(styles, "RetailProductGridRowGap", 48) }}>
          {productList.map((product, index) => {
            const productId = product.id || product._id || product.name;
            const status = addState[productId];
            return (
              <Paper component="article" elevation={0} key={product.id || `${product.name}-${index}`} sx={{
                minWidth: 0, overflow: "hidden", textAlign: "center", background: styleValue(styles, "RetailProductGridCardBackgroundColor", theme.palette.background.paper),
                borderRadius: styleLength(styles, "RetailProductGridCardBorderRadius", theme.shape.borderRadius),
                "&:hover [data-retail-product-image]": { transform: "scale(1.05)" },
                "&:hover [data-retail-quick-add], &:focus-within [data-retail-quick-add]": { opacity: 1, transform: "none" },
              }}>
                <Box sx={{ position: "relative", overflow: "hidden", height: styleLength(styles, "RetailProductGridImageHeight", { xs: 300, md: 310 }), background: styleValue(styles, "RetailProductGridImageBackgroundColor", theme.palette.action.hover), borderRadius: styleLength(styles, "RetailProductGridImageBorderRadius", theme.shape.borderRadius) }}>
                  <ButtonBase aria-label={`View ${product.name}`} onClick={() => openProduct(product)} sx={{ width: "100%", height: "100%", display: "block" }}>
                    <Box component="img" data-retail-product-image src={product.image || "/assets/placeholder.png"} alt={product.name} sx={{ width: "100%", height: "100%", objectFit: "contain", transition: theme.transitions.create("transform"), "@media (prefers-reduced-motion: reduce)": { transition: "none" } }} />
                  </ButtonBase>
                  <Button data-retail-quick-add variant="contained" onClick={(event) => { event.stopPropagation(); openProduct(product); }} sx={{ position: "absolute", bottom: 1.5, left: 1.5, right: 1.5, bgcolor: "background.paper", color: productNameColor, opacity: { xs: 1, md: 0 }, transform: { xs: "none", md: "translateY(6px)" }, transition: theme.transitions.create(["opacity", "transform"]), "&:hover": { bgcolor: "background.paper" }, "@media (hover: none)": { opacity: 1, transform: "none" } }}>View product</Button>
                </Box>
                <Box sx={{ px: 1.5, pb: 2 }}>
                  <Button fullWidth variant="outlined" onClick={() => quickAdd(product)} disabled={status === "loading" || status === "success"} aria-label={status === "success" ? `${product.name} added to cart` : `Add ${product.name} to cart`} sx={buttonSx}>{status === "loading" ? <CircularProgress size={17} color="inherit" sx={{ mx: "auto" }} /> : status === "success" ? <Check sx={{ mx: "auto" }} /> : <>{status === "error" ? "Try again" : "Add to cart"}<Add fontSize="small" /></>}</Button>
                  <Typography component="h3" variant="subtitle1" sx={{ mt: 2, mb: 0.75, color: productNameColor, fontSize: styleLength(styles, "RetailProductGridProductNameTextSize", theme.typography.subtitle1.fontSize), overflowWrap: "anywhere" }}>{product.name}</Typography>
                  {product.description && <Typography variant="body2" sx={{ color: productDescriptionColor, fontSize: styleLength(styles, "RetailProductGridProductDescriptionTextSize", theme.typography.body2.fontSize), display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}>{product.description}</Typography>}
                  {product.category && <Typography component="p" variant="caption" sx={{ mt: 1, color: productDescriptionColor, textTransform: "uppercase", letterSpacing: "0.08em" }}>{product.category}</Typography>}
                  <Typography sx={{ mt: 1, fontWeight: 700, color: styleValue(styles, "RetailProductGridPriceColor", theme.palette.text.primary) }}>{money(product.price)}</Typography>
                </Box>
              </Paper>
            );
          })}
        </Box>
      ) : (
        <Paper variant="outlined" sx={{ minHeight: 180, p: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1, borderStyle: "dashed", textAlign: "center", color: descriptionColor }}>
          <Typography variant="subtitle1" sx={{ color: headingColor }}>No products selected</Typography>
          <Typography variant="body2">Select one or more categories from the component settings.</Typography>
        </Paper>
      )}
    </Box>
  );
}
