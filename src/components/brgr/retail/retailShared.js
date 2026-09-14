import {
  calculateCartItemGrossTotal,
  calculateCartManualDiscount,
  calculateCartPromotion,
  calculateSubTotal,
} from "../../../utils/cart";
import {
  calculateAndRoundTax,
  calculateTaxableCartBase,
} from "../../../utils/tax";
import { calculeteDeliveryFee } from "../../../utils/calculeteDeliveryFee";
import { getPhotoURL } from "../../../utils/photoURL";

const toNumber = (value) => {
  const number = Number(String(value ?? 0).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(number) ? number : 0;
};

const round = (value) => Number(toNumber(value).toFixed(2));

const isEnabled = (value) => value !== false && value !== "false";

const isApplicable = (value) => value === true || value === "true";

export const money = (value) =>
  `Rs.${toNumber(value).toLocaleString("en-PK", {
    maximumFractionDigits: 2,
  })}`;

export const propValue = (prop, key, fallback) => prop?.editable?.[key]?.value ?? fallback;

export const propItems = (prop, key) => {
  const items = prop?.static?.[`display${key}`] || prop?.static?.[key];
  return Array.isArray(items) ? items : [];
};

const hasStyleValue = (value) => value !== undefined && value !== null && value !== "";

export const styleValue = (styles, keys, fallback) => {
  const names = Array.isArray(keys) ? keys : [keys];
  const value = names.map((key) => styles?.[key]?.value).find((entry) =>
    Array.isArray(entry)
      ? entry.some((item) => hasStyleValue(item) && item !== 0)
      : hasStyleValue(entry)
  );

  if (!hasStyleValue(value)) return fallback;
  // The editor stores mobile, tablet, laptop and desktop values in order.
  // Empty/zero array entries inherit their theme value; scalar zero is valid.
  if (Array.isArray(value)) {
    const breakpoints = ["xs", "sm", "md", "lg", "xl"];
    return value.map((entry, index) => {
      if (hasStyleValue(entry) && entry !== 0) return entry;
      if (Array.isArray(fallback)) return fallback[index] ?? null;
      if (fallback && typeof fallback === "object") return fallback[breakpoints[index]] ?? null;
      return fallback ?? null;
    });
  }
  return value;
};

// Saved lengths are CSS pixels, whereas numeric MUI spacing and radii are
// theme multipliers. Convert explicitly without flattening responsive values.
export const styleLength = (styles, keys, fallback) => {
  const toLength = (value) => {
    if (Array.isArray(value)) return value.map(toLength);
    if (value && typeof value === "object") {
      return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, toLength(entry)]));
    }
    return typeof value === "number" || (typeof value === "string" && /^-?\d+(\.\d+)?$/.test(value))
      ? `${value}px`
      : value;
  };
  return toLength(styleValue(styles, keys, fallback));
};

// Blank block settings inherit the selected theme; explicit settings win.
export const resolveComponentStyles = (styles = {}, themeColors = {}) => {
  const resolved = { ...themeColors };
  Object.entries(styles || {}).forEach(([key, style]) => {
    const value = style?.value;
    if (Array.isArray(value) ? value.some((entry) => hasStyleValue(entry) && entry !== 0) : hasStyleValue(value)) {
      const inherited = themeColors?.[key]?.value;
      resolved[key] = {
        ...style,
        value: Array.isArray(value)
          ? value.map((entry, index) => hasStyleValue(entry) && entry !== 0 ? entry : (Array.isArray(inherited) ? inherited[index] : inherited) ?? null)
          : value,
      };
    }
  });
  return resolved;
};

export const getRetailProductGridCategories = (layout) => {
  const categories = [];
  const seen = new Set();

  const addCategory = (category) => {
    const name = category?.name || category?.title;
    if (!name) return;

    const categoryId =
      category?.id ||
      category?._id ||
      category?.franchiseCategoryId?.id ||
      name;
    const key = String(categoryId).trim().toLowerCase();

    if (seen.has(key)) return;
    seen.add(key);
    categories.push(category);
  };

  Object.values(layout?.defaultLayout || layout || {}).forEach((section) => {
    if (!Array.isArray(section)) return;

    section.forEach((block) => {
      if (block?.component !== "RetailProductGrid") return;

      const displayCategories = block?.props?.static?.displaycategories;
      const staticCategories = block?.props?.static?.categories;
      const selectedCategories = displayCategories?.length
        ? displayCategories
        : staticCategories?.length
        ? staticCategories
        : [];

      selectedCategories.forEach(addCategory);
    });
  });

  return categories;
};

const numericPrice = (value) => {
  const parsed = Number(String(value ?? 0).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

export const resolveRetailImage = (value, imageBaseUrl = "") => {
  const rawImage =
    typeof value === "object" ? value?.url || value?.src || "" : value;
  const image = String(rawImage || "");

  if (!image) return "";

  const resolvedImage = getPhotoURL(image) || image;
  if (/^(https?:|data:|blob:|\/)/i.test(resolvedImage)) return resolvedImage;
  if (!imageBaseUrl) return resolvedImage;

  return `${String(imageBaseUrl).replace(/\/$/, "")}/${resolvedImage.replace(/^\//, "")}`;
};

export const getProduct = (item = {}, imageBaseUrl = "") => ({
  ...item,
  id: item.id || item._id,
  name: item.name || item.title || "Product",
  description: item.description || "",
  price: numericPrice(item.priceWithChoiceGroup ?? item.price ?? item.salePrice),
  image: resolveRetailImage(
    item.image || item.img || item.imageUrl || item.photoURL || item.thumbnail,
    imageBaseUrl
  ),
  category:
    item.category ||
    item.categoryName ||
    item.franchiseCategoryId?.name ||
    item.categoryId?.name ||
    "",
});

export const getItemQuantity = (item = {}) => Math.max(1, numericPrice(item.qty ?? item.quantity ?? 1));

export const getItemTotal = (item = {}) => {
  const calculated = Number(calculateCartItemGrossTotal(item));

  return calculated || getProduct(item).price * getItemQuantity(item);
};

export const getRetailOrderSummary = (states = {}, paymentMethod = "cash") => {
  const cardItems = states?.cardItems || {};
  const items = cardItems?.items || [];
  const franchise = states?.franchise || {};
  const configurations = franchise?.configurations || {};
  const serviceFeesObject = franchise?.serviceFeesObject || {};
  const orderType = "storeDelivery";
  const subTotal = toNumber(calculateSubTotal(items));
  const discount = toNumber(calculateCartManualDiscount(items, cardItems));
  const promotion = toNumber(calculateCartPromotion(items, cardItems));
  const netItemsTotal = Math.max(subTotal - discount - promotion, 0);
  const service = serviceFeesObject?.[orderType]?.[paymentMethod];
  let serviceFees = 0;

  if (
    configurations?.isServiceFeesApplicableOnStore &&
    isApplicable(service?.applicable)
  ) {
    serviceFees =
      service?.type === "Percentage"
        ? (netItemsTotal * toNumber(service?.amount)) / 100
        : toNumber(service?.amount);
  }
  const platformFees = configurations?.isPlatformFeeApplicableOnStore
    ? toNumber(franchise?.platformFees)
    : 0;
  let taxRate = 0;

  if (configurations?.isTaxApplicableOnStore) {
    taxRate =
      paymentMethod === "cash"
        ? toNumber(franchise?.storeTaxOnCash) / 100
        : toNumber(franchise?.storeTaxOnCard) / 100;
  }
  const sharedTaxPayload = {
    items,
    cartMeta: cardItems,
    cartSubtotal: subTotal,
    manualDiscount: discount,
    promotion,
    serviceFee: serviceFees,
    tip: 0,
    platformFee: platformFees,
    isServiceFeeTaxable: isEnabled(configurations?.isServiceFeeTaxableOnStore),
    isTipTaxable: isEnabled(configurations?.isTipTaxableOnStore),
    isPlatformFeeTaxable: isEnabled(configurations?.isPlatformFeeTaxableOnStore),
  };
  const provisionalTax = calculateAndRoundTax(
    calculateTaxableCartBase({ ...sharedTaxPayload, deliveryFee: 0 }),
    taxRate
  );
  const deliveryResult = calculeteDeliveryFee({
    states: { ...states, orderType },
    baseTotal: netItemsTotal + serviceFees + platformFees + provisionalTax,
  });
  const deliveryFees = configurations?.isDeliveryFeeApplicableOnStore
    ? toNumber(deliveryResult?.finalDeliveryFee)
    : 0;
  const tax = calculateAndRoundTax(
    calculateTaxableCartBase({
      ...sharedTaxPayload,
      deliveryFee: deliveryFees,
      isDeliveryFeeTaxable: isEnabled(
        configurations?.isDeliveryFeeTaxableOnStore
      ),
    }),
    taxRate
  );
  const total = round(
    netItemsTotal + serviceFees + platformFees + deliveryFees + tax
  );
  const deliveryFeesObject = {
    reason: deliveryResult?.reason || "none",
    waiveOff: deliveryFees === 0,
    waiveOffValue: toNumber(franchise?.deliveryFees),
  };

  return {
    items,
    subTotal: round(subTotal),
    discount: round(discount),
    promotion: round(promotion),
    serviceFees: round(serviceFees),
    platformFees: round(platformFees),
    deliveryFees: round(deliveryFees),
    tax: round(tax),
    total,
    deliveryMessage: deliveryResult?.message || "",
    orderPayload: {
      levelId: cardItems?.levelId,
      venueId:
        cardItems?.venueId || states?.selectedVenue?.id || states?.selectedVenue?._id,
      total,
      orderType,
      type: "store",
      paymentType: paymentMethod,
      tax: round(tax),
      subTotal: round(subTotal),
      tip: 0,
      discount: round(discount),
      discountObject:
        cardItems?.discountObject || {
          reason: discount > 0 ? "Promotion" : "",
          value: round(discount),
        },
      promotion: round(promotion),
      serviceFees: round(serviceFees),
      serviceFeesObject: serviceFees
        ? { [orderType]: { [paymentMethod]: service } }
        : {},
      platformFees: round(platformFees),
      deliveryFees: round(deliveryFees),
      deliveryFeesObject,
      isDeliveryFeesApplicable: true,
      location: states?.latLongForDelivery || "",
    },
  };
};
