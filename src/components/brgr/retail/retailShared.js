export const money = (value) => `Rs.${Number(value || 0).toLocaleString("en-PK")}`;

export const propValue = (prop, key, fallback) => prop?.editable?.[key]?.value ?? fallback;

export const propItems = (prop, key) => {
  const items = prop?.static?.[`display${key}`] || prop?.static?.[key];
  return Array.isArray(items) ? items : [];
};

export const styleValue = (styles, keys, fallback) => {
  const names = Array.isArray(keys) ? keys : [keys];
  const style = names.map((key) => styles?.[key]?.value).find((value) => value !== undefined && value !== "");
  return style === undefined ? fallback : style;
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

const resolveImage = (value, imageBaseUrl) => {
  if (!value) return "";

  const image = String(value);
  if (/^(https?:|data:|blob:|\/)/i.test(image)) return image;
  if (!imageBaseUrl) return image;

  return `${String(imageBaseUrl).replace(/\/$/, "")}/${image.replace(/^\//, "")}`;
};

export const getProduct = (item = {}, imageBaseUrl = "") => ({
  ...item,
  id: item.id || item._id,
  name: item.name || item.title || "Product",
  description: item.description || "",
  price: numericPrice(item.price ?? item.salePrice),
  image: resolveImage(
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
