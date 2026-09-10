import React from "react";
import { styleValue } from "./retailShared";

export default function RetailFooter({ styles }) {
  const menu = ["Categories", "Azadi Bundles", "Hair", "Face", "Beard", "Build Your Own Bundle", "Fragrance", "Best Sellers", "All Products", "Deals", "Gifts", "Blog", "Loyalty Rewards", "Order Tracker"];
  return <footer className="retail-footer" style={{ background: styleValue(styles, "FooterBackgroundColor", "#080808"), color: styleValue(styles, "FooterTextColor", "#fff") }}><div className="retail-footer-grid"><div><h3>Menu</h3>{menu.map((item) => <button type="button" key={item}>{item}</button>)}</div><div><h3>Menu</h3>{["Track Your Order", "Search", "About us", "Be Our Distributor", "FAQ", "Careers", "Contact Us", "Privacy Policy", "Refund Policy", "Terms of Service", "Other Stores"].map((item) => <a href="#top" key={item}>{item}</a>)}</div><div><h3>Mini Bio</h3><p>Egora POS is a simple solution for sales, inventory and customer management. We help growing businesses spend less time on admin and more time serving customers.</p><strong>Store locations:</strong></div><div><h3>Contact</h3><a href="mailto:support@egora.com">support@egora.com</a><a href="tel:+923000000000">+92 300 0000000</a><p>◉　◎　♪　▶</p></div></div><div className="retail-footer-bottom"><span>Managed By Zain</span><span>© 2026, Egora POS</span></div></footer>;
}
