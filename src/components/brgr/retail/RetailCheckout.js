import React, { useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import { getProduct, money, styleValue } from "./retailShared";

export default function RetailCheckout({ states, actions, styles }) {
  const items = states?.cardItems?.items || [];
  const total = items.reduce((sum, item) => sum + getProduct(item).price, 0);
  const [payment, setPayment] = useState("cod");
  const submit = (event) => { event.preventDefault(); actions?.handlePlaceOrder?.({ paymentMethod: payment }); };
  const variables = {
    "--retail-checkout-text": styleValue(styles, "RetailCheckoutTextColor", "#25272b"),
    "--retail-checkout-heading": styleValue(styles, "RetailCheckoutHeadingColor", "#25272b"),
    "--retail-checkout-description": styleValue(styles, "RetailCheckoutDescriptionColor", "#777777"),
    "--retail-checkout-header-background": styleValue(styles, "RetailCheckoutHeaderBackgroundColor", "#030303"),
    "--retail-checkout-header-text": styleValue(styles, "RetailCheckoutHeaderTextColor", "#ffffff"),
    "--retail-checkout-input-background": styleValue(styles, "RetailCheckoutInputBackgroundColor", "#ffffff"),
    "--retail-checkout-input-border": styleValue(styles, "RetailCheckoutInputBorderColor", "#b9bbc0"),
    "--retail-checkout-input-text": styleValue(styles, "RetailCheckoutInputTextColor", "#25272b"),
    "--retail-checkout-input-radius": `${styleValue(styles, "RetailCheckoutInputBorderRadius", 0)}px`,
    "--retail-checkout-summary-background": styleValue(styles, "RetailCheckoutSummaryBackgroundColor", "#ffffff"),
    "--retail-checkout-summary-text": styleValue(styles, "RetailCheckoutSummaryTextColor", "#25272b"),
    "--retail-checkout-button-background": styleValue(styles, "RetailCheckoutButtonBackgroundColor", "#030303"),
    "--retail-checkout-button-text": styleValue(styles, "RetailCheckoutButtonTextColor", "#ffffff"),
    "--retail-checkout-button-radius": `${styleValue(styles, "RetailCheckoutButtonBorderRadius", 0)}px`,
  };

  return <section className="retail-checkout-layout" style={{ background: styleValue(styles, "RetailCheckoutBackgroundColor", "#f5f1ea"), ...variables }}><header className="retail-checkout-header"><b>EGORA</b><small>POS</small><AccountCircle /></header><main className="retail-checkout"><form onSubmit={submit}><h2>Contact</h2><a href="#account">Sign in</a><input required placeholder="Email or mobile phone number" /><label><input type="checkbox" /> Email me with updates and offers</label><h2>Delivery</h2><select defaultValue="Pakistan"><option>Pakistan</option></select><div className="retail-two-fields"><input required placeholder="First name" /><input required placeholder="Last name" /></div><input required placeholder="Address" /><input placeholder="Apartment, suite, etc. (optional)" /><div className="retail-two-fields"><input required placeholder="City" /><input placeholder="Postal code (optional)" /></div><input required placeholder="Phone" /><h2>Payment</h2><p>All transactions are secure and encrypted.</p><label className="retail-choice"><input type="radio" checked={payment === "cod"} onChange={() => setPayment("cod")} /> Cash on Delivery (COD)</label><label className="retail-choice"><input type="radio" checked={payment === "card"} onChange={() => setPayment("card")} /> Card payment</label><button className="retail-checkout-submit" type="submit">Complete order</button></form><aside className="retail-checkout-summary"><div>{items.slice(0, 3).map((raw, index) => { const item = getProduct(raw); return <div className="retail-checkout-product" key={`${item.name}-${index}`}><div className="retail-cart-thumbnail">{item.image && <img src={item.image} alt="" />}</div><b>{item.name}</b><strong>{money(item.price)}</strong></div>; })}</div><input placeholder="Discount code" /><div><span>Subtotal</span><strong>{money(total)}</strong></div><div><span>Shipping</span><strong>FREE</strong></div><div className="retail-summary-total"><span>Total</span><strong>{money(total)}</strong></div></aside></main></section>;
}
