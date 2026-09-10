import React, { useState } from "react";
import { Add, Close, Remove } from "@mui/icons-material";
import { getProduct, money, styleValue } from "./retailShared";

export default function RetailItemDetailModal({ states, actions, styles }) {
  const product = getProduct(states?.itemForDetailedModal || {});
  const [quantity, setQuantity] = useState(1);
  const add = () => actions?.handleAddToCart?.(product, states?.allChoiceGroups || [], quantity, "");
  const variables = {
    "--retail-detail-overlay": styleValue(styles, "RetailItemDetailOverlayColor", "rgba(0,0,0,.35)"),
    "--retail-detail-background": styleValue(styles, "RetailItemDetailBackgroundColor", "#ffffff"),
    "--retail-detail-text": styleValue(styles, "RetailItemDetailTextColor", "#25272b"),
    "--retail-detail-heading": styleValue(styles, "RetailItemDetailHeadingColor", "#25272b"),
    "--retail-detail-price": styleValue(styles, "RetailItemDetailPriceColor", "#25272b"),
    "--retail-detail-muted": styleValue(styles, "RetailItemDetailMutedTextColor", "#777777"),
    "--retail-detail-image-background": styleValue(styles, "RetailItemDetailImageBackgroundColor", "#e8ddd1"),
    "--retail-detail-installment-background": styleValue(styles, "RetailItemDetailInstallmentBackgroundColor", "#f1eee8"),
    "--retail-detail-close-color": styleValue(styles, "RetailItemDetailCloseIconColor", "#25272b"),
    "--retail-detail-close-size": `${styleValue(styles, "RetailItemDetailCloseIconSize", 24)}px`,
    "--retail-detail-divider": styleValue(styles, "RetailItemDetailDividerColor", "#b9bbc0"),
    "--retail-detail-quantity-background": styleValue(styles, "RetailItemDetailQuantityButtonBackgroundColor", "#ffffff"),
    "--retail-detail-quantity-border": styleValue(styles, "RetailItemDetailQuantityButtonBorderColor", "#b9bbc0"),
    "--retail-detail-quantity-icon": styleValue(styles, "RetailItemDetailQuantityIconColor", "#25272b"),
    "--retail-detail-viewing": styleValue(styles, "RetailItemDetailViewingTextColor", "#927d2e"),
    "--retail-detail-add-background": styleValue(styles, "RetailItemDetailAddButtonBackgroundColor", "#ffffff"),
    "--retail-detail-add-text": styleValue(styles, "RetailItemDetailAddButtonTextColor", "#151515"),
    "--retail-detail-buy-background": styleValue(styles, "RetailItemDetailBuyButtonBackgroundColor", "#151515"),
    "--retail-detail-buy-text": styleValue(styles, "RetailItemDetailBuyButtonTextColor", "#ffffff"),
    "--retail-detail-button-radius": `${styleValue(styles, "RetailItemDetailButtonBorderRadius", 0)}px`,
  };
  return <div className="retail-overlay" style={{ background: variables["--retail-detail-overlay"] }}><section className="retail-item-detail" style={{ ...variables, background: variables["--retail-detail-background"] }}><button className="retail-close" type="button" onClick={() => actions?.handleOpenCard?.()}><Close /></button><div className="retail-item-image">{product.image && <img src={product.image} alt={product.name} />}</div><div className="retail-item-info"><p className="retail-eyebrow">EGORA POS INVENTORY</p><h1>{product.name}</h1><div className="retail-underline" /><strong className="retail-detail-price">{money(product.price)}</strong><p className="retail-muted">Tax included</p><div className="retail-installment"><b>Egora Pay</b><span>Flexible payments for your business</span></div><label>Quantity</label><div className="retail-quantity"><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Remove /></button><span>{quantity}</span><button type="button" onClick={() => setQuantity(quantity + 1)}><Add /></button></div><p className="retail-viewing">● {12 + Number(product.id || 1)} customers are viewing this product</p><button type="button" className="retail-detail-add" onClick={add}>Add to cart</button><button type="button" className="retail-detail-buy" onClick={add}>Buy it now</button></div><div className="retail-description">Description <span>+</span></div></section></div>;
}
