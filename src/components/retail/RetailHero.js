import React from "react";
import { propValue, styleValue } from "./retailShared";

export default function RetailHero({ prop, styles }) {
  const images = propValue(prop, "carouselImages", []);
  const image = images?.[0]?.url || images?.[0] || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=85";
  return <section className="retail-hero" style={{ background: styleValue(styles, "HeroCarouselDisplayedImageBackgroundColor", "linear-gradient(110deg,#e8b4ad,#f5dacb 50%,#d2dfdc)") }}><div className="retail-hero-copy"><p className="retail-eyebrow">EGORA POS PLATFORM</p><h1>A smarter way<br />to run your business</h1><p>Simple sales, inventory and business tools built for growing teams.</p><button type="button" className="retail-dark-button" onClick={() => document.getElementById("retail-products")?.scrollIntoView({ behavior: "smooth" })}>Shop Now</button></div><div className="retail-hero-art" style={{ backgroundImage: `linear-gradient(90deg, rgba(231,232,235,.2), rgba(231,232,235,.7)), url(${image})` }}><div className="retail-hero-orb" /><div className="retail-hero-product retail-hero-product-one">EGORA<small>ESSENTIALS</small></div><div className="retail-hero-product retail-hero-product-two">POS<small>MADE SIMPLE</small></div><div className="retail-hero-stamp">THE ESSENTIALS<small>MADE FOR MEN</small></div></div></section>;
}
