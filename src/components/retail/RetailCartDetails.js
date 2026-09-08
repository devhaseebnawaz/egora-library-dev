import React from "react";
import { Add, Delete, Remove } from "@mui/icons-material";
import { getProduct, money, styleValue } from "./retailShared";

export default function RetailCartDetails({ states, actions, styles }) {
  const items = states?.cardItems?.items || [];
  const total = items.reduce((sum, item) => sum + getProduct(item).price, 0);
  const variables = {
    "--retail-details-text": styleValue(styles, "RetailCartDetailsTextColor", "#25272b"),
    "--retail-details-heading": styleValue(styles, "RetailCartDetailsHeadingColor", "#25272b"),
    "--retail-details-muted": styleValue(styles, "RetailCartDetailsMutedTextColor", "#777777"),
    "--retail-details-background": styleValue(styles, "RetailCartDetailsBackgroundColor", "#e7e8eb"),
    "--retail-details-summary-background": styleValue(styles, "RetailCartDetailsSummaryBackgroundColor", "#ffffff"),
    "--retail-details-summary-text": styleValue(styles, "RetailCartDetailsSummaryTextColor", "#25272b"),
    "--retail-details-button-background": styleValue(styles, "RetailCartDetailsButtonBackgroundColor", "#151515"),
    "--retail-details-button-text": styleValue(styles, "RetailCartDetailsButtonTextColor", "#ffffff"),
    "--retail-details-button-radius": `${styleValue(styles, "RetailCartDetailsButtonBorderRadius", 0)}px`,
    "--retail-details-quantity-background": styleValue(styles, "RetailCartDetailsQuantityButtonBackgroundColor", "#ffffff"),
    "--retail-details-quantity-border": styleValue(styles, "RetailCartDetailsQuantityButtonBorderColor", "#b9bbc0"),
    "--retail-details-quantity-icon": styleValue(styles, "RetailCartDetailsQuantityIconColor", "#25272b"),
    "--retail-details-divider": styleValue(styles, "RetailCartDetailsDividerColor", "#b9bbc0"),
    "--retail-details-progress": styleValue(styles, "RetailCartDetailsProgressColor", "#25272b"),
  };
  return <section className="retail-cart-page" style={{ ...variables, background: variables["--retail-details-background"] }}><div className="retail-cart-page-main"><p className="retail-eyebrow">YOUR BAG</p><h1>Shopping Cart <span>({items.length} items)</span></h1><div className="retail-underline" /><div className="retail-shipping-progress">🚚 {total >= 1999 ? "Congratulations! You get free shipping." : `Add ${money(1999 - total)} for free shipping.`}<i style={{ width: `${Math.min(100, (total / 1999) * 100)}%` }} /></div>{items.length ? items.map((raw, index) => { const item = getProduct(raw); return <div className="retail-cart-page-item" key={`${item.id || item.name}-${index}`}><div className="retail-cart-thumbnail">{item.image && <img src={item.image} alt={item.name} />}</div><div><h3>{item.name}</h3><p>{money(item.price)}</p><div className="retail-quantity"><button type="button" onClick={() => actions?.updateItemFromCardDecByOne?.(raw)}><Remove /></button><span>1</span><button type="button" onClick={() => actions?.updateItemFromCardAddByOne?.(raw)}><Add /></button></div></div><strong>{money(item.price)}</strong><button type="button" onClick={() => actions?.handleRemoveFromCart?.(raw)}><Delete /></button></div>; }) : <div className="retail-empty-cart"><h2>Your cart is empty</h2><p>Continue shopping</p></div>}</div><aside className="retail-order-summary"><h2>Order summary</h2><div><span>Subtotal</span><strong>{money(total)}</strong></div><p>Tax included and shipping calculated at checkout</p><button type="button" className="retail-detail-buy" onClick={() => actions?.naviagateCheckout?.()}>🔒 Check out</button></aside></section>;
}
