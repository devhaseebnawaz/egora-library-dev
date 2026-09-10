import React from "react";
import { propItems, styleValue } from "./retailShared";

export default function RetailCategoryCarousel({ prop, actions, styles }) {
  const source = propItems(prop, "categories");
  const categories = source.length ? source : [{ name: "Face" }, { name: "Hair" }, { name: "Beard" }, { name: "Body" }, { name: "Fragrance" }];
  const variables = {
    "--retail-category-background": styleValue(styles, "RetailCategoryCarouselBackgroundColor", "#e7e8eb"),
    "--retail-category-text": styleValue(styles, "RetailCategoryCarouselTextColor", "#6f7074"),
    "--retail-category-hover": styleValue(styles, "RetailCategoryCarouselHoverColor", "#25272b"),
    "--retail-category-text-size": `${styleValue(styles, "RetailCategoryCarouselTextSize", 14)}px`,
    "--retail-category-label-size": `${styleValue(styles, "RetailCategoryCarouselLabelSize", 10)}px`,
    "--retail-category-icon-background": styleValue(styles, "RetailCategoryCarouselIconBackgroundColor", "#d4d7db"),
    "--retail-category-icon-color": styleValue(styles, "RetailCategoryCarouselIconColor", "#25272b"),
    "--retail-category-icon-size": `${styleValue(styles, "RetailCategoryCarouselIconSize", 30)}px`,
    "--retail-category-gap": `${styleValue(styles, "RetailCategoryCarouselItemGap", 28)}px`,
    "--retail-category-border": styleValue(styles, "RetailCategoryCarouselBorderColor", "#b9bbc0"),
  };
  return <section className="retail-category-strip" style={{ ...variables, background: variables["--retail-category-background"] }}><p>SHOP BY CATEGORY</p><div>{categories.map((category, index) => { const name = category?.name || category?.title || category; return <button type="button" key={`${name}-${index}`} onClick={() => actions?.handleCategoryClick?.(category)}><span className={`retail-category-icon retail-category-${index}`}>{['✦', '⌁', '⌁', '◌', '◉'][index % 5]}</span>{name}</button>; })}</div></section>;
}
