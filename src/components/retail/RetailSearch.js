import React, { useState } from "react";
import { Close, Search } from "@mui/icons-material";
import { propItems, styleValue } from "./retailShared";

export default function RetailSearch({ prop, styles }) {
  const [open, setOpen] = useState(false);
  const categories = propItems(prop, "categories");
  const labels = categories.length ? categories : ["All Products", "Face", "Hair", "Beard", "Body", "Fragrance", "Deals"];
  const color = styleValue(styles, "SearchBarTextColor", "#6f7074");
  return <section className={`retail-search ${open ? "retail-search-open" : ""}`} style={{ background: styleValue(styles, "SearchBarBackgroundColor", "#e7e8eb") }}><button type="button" className="retail-search-trigger" style={{ color, borderColor: styleValue(styles, "SearchBarOutlineColor", "#b9bbc0"), borderRadius: styleValue(styles, "SearchBarBorderRadius", 0) }} onClick={() => setOpen(true)}><Search /><span>Search our store...</span></button>{open && <div className="retail-search-panel"><div className="retail-search-input"><Search /><input autoFocus placeholder="Search our store..." /><button type="button" onClick={() => setOpen(false)} aria-label="Close search"><Close /></button></div><p>Main menu</p><div className="retail-search-menu">{labels.map((item, index) => <button type="button" key={`${item?.name || item}-${index}`}>{item?.name || item}</button>)}</div></div>}</section>;
}
