import React from "react";
import { Close } from "@mui/icons-material";
import { getProduct, money, styleValue } from "./retailShared";

export default function RetailCartDrawer({ states, actions, styles }) {
  const items = states?.cardItems?.items || [];
  const total = items.reduce((sum, item) => sum + getProduct(item).price, 0);
  const variables = {
    "--retail-drawer-text": styleValue(styles, "RetailCartDrawerTextColor", "#25272b"),
    "--retail-drawer-heading": styleValue(styles, "RetailCartDrawerHeadingColor", "#25272b"),
    "--retail-drawer-muted": styleValue(styles, "RetailCartDrawerMutedTextColor", "#777777"),
    "--retail-drawer-price": styleValue(styles, "RetailCartDrawerPriceColor", "#25272b"),
    "--retail-drawer-background": styleValue(styles, "RetailCartDrawerBackgroundColor", "#ffffff"),
    "--retail-drawer-button-background": styleValue(styles, "RetailCartDrawerButtonBackgroundColor", "#151515"),
    "--retail-drawer-button-text": styleValue(styles, "RetailCartDrawerButtonTextColor", "#ffffff"),
    "--retail-drawer-button-radius": `${styleValue(styles, "RetailCartDrawerButtonBorderRadius", 0)}px`,
    "--retail-drawer-icon-color": styleValue(styles, "RetailCartDrawerIconColor", "#25272b"),
    "--retail-drawer-icon-size": `${styleValue(styles, "RetailCartDrawerIconSize", 24)}px`,
    "--retail-drawer-divider": styleValue(styles, "RetailCartDrawerDividerColor", "#dddddd"),
    "--retail-drawer-progress": styleValue(styles, "RetailCartDrawerProgressColor", "#25272b"),
  };
  return <div className="retail-overlay"><aside className="retail-cart-drawer" style={{ ...variables, background: variables["--retail-drawer-background"] }}><div className="retail-cart-heading"><div><p className="retail-eyebrow">YOUR BAG</p><h2>Shopping cart <span>({items.length})</span></h2></div><button type="button" onClick={() => actions?.handleOpenCart?.()}><Close /></button></div><div className="retail-cart-progress"><strong>{total >= 1999 ? "You unlocked free delivery" : `${money(1999 - total)} away from free delivery`}</strong><i style={{ width: `${Math.min(100, Math.max(8, (total / 1999) * 100))}%` }} /></div>{items.length ? <div className="retail-cart-items">{items.map((raw, index) => { const item = getProduct(raw); return <div className="retail-cart-item" key={`${item.id || item.name}-${index}`}><div className="retail-cart-thumbnail">{item.image && <img src={item.image} alt="" />}</div><div><h3>{item.name}</h3><p>{item.category || "Product"}</p><strong>{money(item.price)}</strong></div><button type="button" onClick={() => actions?.handleRemoveFromCart?.(raw)}>×</button></div>; })}</div> : <div className="retail-cart-empty"><span>🛍</span><h3>Your cart is empty</h3><p>Discover something new for your routine.</p></div>}<div className="retail-cart-total"><span>Subtotal</span><strong>{money(total)}</strong><button type="button" className="retail-dark-button" onClick={() => actions?.naviagateCheckout?.()}>Checkout · {money(total)}</button></div></aside></div>;
}
