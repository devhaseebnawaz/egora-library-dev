import React from "react";
import { AccountCircle, Menu, Search, ShoppingBagOutlined } from "@mui/icons-material";
import { getRetailProductGridCategories, styleValue } from "./retailShared";

export default function RetailHeader({ actions, layout, styles }) {
  const openCart = () => actions?.handleOpenCart?.();
  const count = actions?.getCartItem?.()?.items?.length || 0;
  const selectedCategories = getRetailProductGridCategories(layout);
  const navigationCategories = selectedCategories.length
    ? selectedCategories
    : [{ name: "Categories" }];
  const background = styleValue(styles, "RetailHeaderBackgroundColor", "#e7e8eb");
  const brandColor = styleValue(styles, "RetailHeaderBrandColor", "#111111");
  const brandAccentColor = styleValue(styles, "RetailHeaderBrandAccentColor", "#e97845");
  const brandSize = styleValue(styles, "RetailHeaderBrandTextSize", 39);
  const navColor = styleValue(styles, "RetailHeaderNavTextColor", "#25272b");
  const navSize = styleValue(styles, "RetailHeaderNavTextSize", 13);
  const navGap = styleValue(styles, "RetailHeaderNavGap", 22);
  const actionColor = styleValue(styles, "RetailHeaderActionIconColor", "#25272b");
  const actionSize = styleValue(styles, "RetailHeaderActionIconSize", 24);
  const badgeBackground = styleValue(styles, "RetailHeaderCartBadgeBackgroundColor", "#25272b");
  const badgeColor = styleValue(styles, "RetailHeaderCartBadgeTextColor", "#ffffff");
  const badgeSize = styleValue(styles, "RetailHeaderCartBadgeSize", 17);

  const openCategory = (category) => {
    actions?.handleCategoryClick?.(category);
    if (typeof document !== "undefined") {
      document.getElementById("retail-products")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return <header className="retail-header" style={{ background, "--retail-header-brand-color": brandColor, "--retail-header-brand-accent": brandAccentColor, "--retail-header-brand-size": `${brandSize}px`, "--retail-header-nav-color": navColor, "--retail-header-nav-size": `${navSize}px`, "--retail-header-nav-gap": `${navGap}px`, "--retail-header-action-color": actionColor, "--retail-header-action-size": `${actionSize}px`, "--retail-header-badge-background": badgeBackground, "--retail-header-badge-color": badgeColor, "--retail-header-badge-size": `${badgeSize}px` }}><div className="retail-header-top"><button className="retail-mobile-menu" type="button"><Menu /></button><button className="retail-brand" type="button" onClick={() => actions?.navigateToHome?.()}>EGORA<span>POS</span></button><div className="retail-header-actions"><a href="#account" aria-label="Account login"><AccountCircle /></a><button type="button" aria-label="Search" onClick={() => document.querySelector(".retail-search-trigger")?.click()}><Search /></button><button type="button" aria-label="Cart" onClick={openCart} className="retail-cart-button"><ShoppingBagOutlined /><b>{count}</b></button></div></div><nav className="retail-nav">{navigationCategories.map((category, index) => { const name = category?.name || category?.title; const key = category?.id || category?._id || `${name}-${index}`; return <button type="button" key={key} onClick={() => openCategory(category)}>{name}</button>; })}</nav></header>;
}
