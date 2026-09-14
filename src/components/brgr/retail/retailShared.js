export const money = (value) => `Rs.${Number(value || 0).toLocaleString("en-PK")}`;

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
  if (!value) return "";

  const image = String(typeof value === "object" ? value.url || value.src || "" : value);
  if (/^(https?:|data:|blob:|\/)/i.test(image)) return image;
  if (!imageBaseUrl) return image;

  return `${String(imageBaseUrl).replace(/\/$/, "")}/${image.replace(/^\//, "")}`;
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

export const getItemTotal = (item = {}) => getProduct(item).price * getItemQuantity(item);
