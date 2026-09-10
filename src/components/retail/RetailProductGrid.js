import React, { useMemo, useState } from "react";
import {
  getProduct,
  money,
  propItems,
  propValue,
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
  styles,
  states,
  previewMode = false,
}) {
  const [sort, setSort] = useState("featured");
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

  const variables = {
    "--retail-grid-background": styleValue(styles, "RetailProductGridBackgroundColor", "#e7e8eb"),
    "--retail-grid-heading": styleValue(styles, "RetailProductGridHeadingColor", "#25272b"),
    "--retail-grid-heading-size": `${styleValue(styles, "RetailProductGridHeadingTextSize", 42)}px`,
    "--retail-grid-description": styleValue(styles, "RetailProductGridDescriptionColor", "#6f7074"),
    "--retail-grid-description-size": `${styleValue(styles, "RetailProductGridDescriptionTextSize", 14)}px`,
    "--retail-grid-column-gap": `${styleValue(styles, "RetailProductGridGap", 24)}px`,
    "--retail-grid-row-gap": `${styleValue(styles, "RetailProductGridRowGap", 48)}px`,
    "--retail-grid-card-background": styleValue(styles, "RetailProductGridCardBackgroundColor", "transparent"),
    "--retail-grid-card-radius": `${styleValue(styles, "RetailProductGridCardBorderRadius", 0)}px`,
    "--retail-grid-image-background": styleValue(styles, "RetailProductGridImageBackgroundColor", "#f1f2f3"),
    "--retail-grid-image-height": `${styleValue(styles, "RetailProductGridImageHeight", 310)}px`,
    "--retail-grid-image-radius": `${styleValue(styles, "RetailProductGridImageBorderRadius", 0)}px`,
    "--retail-grid-name": styleValue(styles, "RetailProductGridProductNameColor", "#25272b"),
    "--retail-grid-name-size": `${styleValue(styles, "RetailProductGridProductNameTextSize", 16)}px`,
    "--retail-grid-product-description": styleValue(styles, "RetailProductGridProductDescriptionColor", "#6f7074"),
    "--retail-grid-product-description-size": `${styleValue(styles, "RetailProductGridProductDescriptionTextSize", 13)}px`,
    "--retail-grid-price": styleValue(styles, "RetailProductGridPriceColor", "#25272b"),
    "--retail-grid-button-background": styleValue(styles, "RetailProductGridButtonBackgroundColor", "transparent"),
    "--retail-grid-button-text": styleValue(styles, "RetailProductGridButtonTextColor", "#25272b"),
    "--retail-grid-button-border": styleValue(styles, "RetailProductGridButtonBorderColor", "#7c7d80"),
    "--retail-grid-button-hover-background": styleValue(styles, "RetailProductGridButtonHoverBackgroundColor", "#25272b"),
    "--retail-grid-button-hover-text": styleValue(styles, "RetailProductGridButtonHoverTextColor", "#ffffff"),
    "--retail-grid-button-radius": `${styleValue(styles, "RetailProductGridButtonBorderRadius", 0)}px`,
  };

  if (!sortedProducts.length && !previewMode) return null;

  const openProduct = (product) => actions?.handleOpenCard?.(product);

  return (
    <section
      id="retail-products"
      className="retail-shop-section"
      style={{ ...variables, background: variables["--retail-grid-background"] }}
    >
      <div className="retail-section-heading">
        <div>
          <p className="retail-eyebrow">THE EDIT</p>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        <div className="retail-section-tools">
          <span>{sortedProducts.length} products</span>
          <select
            aria-label="Sort products"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price low</option>
            <option value="price-high">Price high</option>
          </select>
        </div>
      </div>

      {sortedProducts.length ? (
        <div className="retail-product-grid">
          {sortedProducts.map((product, index) => (
            <article
              className="retail-product-card"
              key={product.id || `${product.name}-${index}`}
            >
              <div className={`retail-product-image retail-tone-${index % 4}`}>
                <button
                  type="button"
                  className="retail-product-image-link"
                  aria-label={`View ${product.name}`}
                  onClick={() => openProduct(product)}
                >
                  <img
                    src={product.image || "/assets/placeholder.png"}
                    alt={product.name}
                  />
                </button>
                <button
                  type="button"
                  className="retail-quick-add"
                  onClick={() => openProduct(product)}
                >
                  Quick add
                </button>
              </div>

              <button
                type="button"
                className="retail-add-button"
                onClick={() => openProduct(product)}
              >
                Add to cart <b>+</b>
              </button>

              <div className="retail-product-info">
                <h3>{product.name}</h3>
                {product.description && (
                  <p className="retail-product-description">
                    {product.description}
                  </p>
                )}
                {product.category && (
                  <small className="retail-product-category">
                    {product.category}
                  </small>
                )}
                <p className="retail-product-price">{money(product.price)}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="retail-product-empty">
          <strong>No products selected</strong>
          <span>Select one or more categories from the component settings.</span>
        </div>
      )}
    </section>
  );
}
