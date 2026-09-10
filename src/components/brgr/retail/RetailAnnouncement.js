import React from "react";
import { propValue, styleValue } from "./retailShared";

const toMessages = (value) => {
  const entries = Array.isArray(value) ? value : [value];

  return entries
    .flatMap((entry) => String(entry ?? "").split(/\r?\n|\s*\|\s*/))
    .map((entry) => entry.trim())
    .filter(Boolean);
};

export default function RetailAnnouncement({ prop, styles }) {
  const messages = propValue(prop, "messages", propValue(prop, "text", [
    "Egora POS · Faster checkout for every business",
    "Inventory, sales and customer management in one place",
    "Built for growing businesses",
  ]));
  const values = toMessages(messages);
  const fontSize = styleValue(styles, "AnnouncementsBannerTextSize", 11);
  return <div className="retail-announcement" style={{ background: styleValue(styles, ["AnnouncementsBannerBackgroundColor", "RetailAnnouncementBackgroundColor"], "#080808"), color: styleValue(styles, ["AnnouncementsBannerTextColor", "RetailAnnouncementTextColor"], "#fff"), fontSize: Array.isArray(fontSize) ? fontSize[3] || 11 : fontSize }}><div className="retail-announcement-track">{[...values, ...values].map((message, index) => <span key={`${message}-${index}`}>{message}</span>)}</div></div>;
}
