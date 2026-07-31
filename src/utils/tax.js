import {
  calculateCartItemGrossTotal,
  getCartItemPromotionDiscount,
} from './cart';

const toSafeNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const round2 = (value) => Number(toSafeNumber(value).toFixed(2));

const toId = (value) => {
  if (!value) return '';

  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }

  if (typeof value === 'object') {
    return toId(value?._id || value?.id || value?.itemId || value?.productId);
  }

  return '';
};

const isExplicitFalse = (value) => value === false || value === 'false';

export const isCartItemTaxApplicable = (item = {}) =>
  item?.isTaxApplicable === true || item?.isTaxApplicable === 'true';

const isActiveCartItem = (item = {}) =>
  item?.isVoidItem !== true && item?.isComplimentary !== true;

export const calculateTaxableItemsSubtotal = (items = []) => {
  if (!Array.isArray(items)) return 0;

  return items.reduce((total, item) => {
    if (!isActiveCartItem(item) || !isCartItemTaxApplicable(item)) {
      return total;
    }

    return total + calculateCartItemGrossTotal(item);
  }, 0);
};

export const calculateNonTaxableItemsSubtotal = (items = []) => {
  if (!Array.isArray(items)) return 0;

  return items.reduce((total, item) => {
    if (!isActiveCartItem(item) || isCartItemTaxApplicable(item)) {
      return total;
    }

    return total + calculateCartItemGrossTotal(item);
  }, 0);
};
export const calculateProportionalTaxableDiscount = ({
  discount = 0,
  taxableSubtotal = 0,
  cartSubtotal = 0,
} = {}) => {
  const safeDiscount = toSafeNumber(discount);
  const safeTaxableSubtotal = toSafeNumber(taxableSubtotal);
  const safeCartSubtotal = toSafeNumber(cartSubtotal);

  if (safeDiscount <= 0 || safeTaxableSubtotal <= 0 || safeCartSubtotal <= 0) {
    return 0;
  }

  return (safeDiscount * safeTaxableSubtotal) / safeCartSubtotal;
};

const getPromotionSnapshots = (cartMeta = {}) => {
  if (Array.isArray(cartMeta?.appliedPromotions)) {
    return cartMeta.appliedPromotions;
  }

  if (Array.isArray(cartMeta?.promotionSnapshot)) {
    return cartMeta.promotionSnapshot;
  }

  if (Array.isArray(cartMeta?.promotionObj?.promotions)) {
    return cartMeta.promotionObj.promotions;
  }

  return [];
};

export const calculateTaxablePromotionDiscount = ({
  items = [],
  cartMeta = {},
  totalPromotion,
} = {}) => {
  if (!Array.isArray(items)) return 0;

  const activeItems = items.filter(isActiveCartItem);
  const taxableItems = activeItems.filter(isCartItemTaxApplicable);

  if (taxableItems.length === 0) {
    return 0;
  }

  const hasExplicitTotal =
    totalPromotion !== undefined && totalPromotion !== null;

  const safeTotalPromotion = toSafeNumber(totalPromotion);
  if (hasExplicitTotal && safeTotalPromotion <= 0) {
    return 0;
  }

  const finalizeAmount = (amount) => {
    const safeAmount = Math.max(0, toSafeNumber(amount));

    return round2(
      hasExplicitTotal
        ? Math.min(safeAmount, safeTotalPromotion)
        : safeAmount
    );
  };

  const taxableCartItemIds = new Set(
    taxableItems.map((item) => toId(item?.cartItemId)).filter(Boolean)
  );

  const taxableItemIds = new Set(
    taxableItems
      .map((item) =>
        toId(
          item?.itemId ||
          item?.productId ||
          item?.product ||
          item?._id ||
          item?.id
        )
      )
      .filter(Boolean)
  );

  const appliedItems = getPromotionSnapshots(cartMeta).flatMap((promotion) =>
    Array.isArray(promotion?.appliedItems) ? promotion.appliedItems : []
  );

  if (appliedItems.length > 0) {
    const appliedTaxablePromotion = appliedItems.reduce(
      (total, appliedItem) => {
        const appliedCartItemId = toId(appliedItem?.cartItemId);
        const appliedItemId = toId(appliedItem?.itemId);

        const appliesToTaxableItem =
          (appliedCartItemId &&
            taxableCartItemIds.has(appliedCartItemId)) ||
          (appliedItemId && taxableItemIds.has(appliedItemId));

        return appliesToTaxableItem
          ? total + toSafeNumber(appliedItem?.discount)
          : total;
      },
      0
    );

    if (appliedTaxablePromotion > 0) {
      return finalizeAmount(appliedTaxablePromotion);
    }
  }

  const itemLevelTaxablePromotion = taxableItems.reduce(
    (total, item) => total + getCartItemPromotionDiscount(item),
    0
  );

  if (itemLevelTaxablePromotion > 0) {
    return finalizeAmount(itemLevelTaxablePromotion);
  }

  const allActiveItemsAreTaxable =
    activeItems.length > 0 && activeItems.every(isCartItemTaxApplicable);

  return allActiveItemsAreTaxable
    ? finalizeAmount(safeTotalPromotion)
    : 0;
};

export const calculateTaxableCartBreakdown = ({
  items = [],
  cartMeta = {},
  cartSubtotal = 0,
  manualDiscount = 0,
  promotion = 0,
  serviceFee = 0,
  tip = 0,
  deliveryFee = 0,
  platformFee = 0,
  isServiceFeeTaxable = true,
  isTipTaxable = true,
  isDeliveryFeeTaxable = true,
  isPlatformFeeTaxable = true,
} = {}) => {
  const taxableSubtotal = calculateTaxableItemsSubtotal(items);

  const nonTaxableSubtotal =
    calculateNonTaxableItemsSubtotal(items);

  const taxableManualDiscount =
    calculateProportionalTaxableDiscount({
      discount: manualDiscount,
      taxableSubtotal,
      cartSubtotal,
    });

  const taxablePromotion =
    calculateTaxablePromotionDiscount({
      items,
      cartMeta,
      totalPromotion: promotion,
    });

  const taxableServiceFee = isExplicitFalse(
    isServiceFeeTaxable
  )
    ? 0
    : toSafeNumber(serviceFee);

  const taxableTip = isExplicitFalse(isTipTaxable)
    ? 0
    : toSafeNumber(tip);

  const taxableDeliveryFee = isExplicitFalse(
    isDeliveryFeeTaxable
  )
    ? 0
    : toSafeNumber(deliveryFee);

  const taxablePlatformFee = isExplicitFalse(
    isPlatformFeeTaxable
  )
    ? 0
    : toSafeNumber(platformFee);

  const hasTaxableItems = taxableSubtotal > 0;

  const taxableBase = Math.max(
    taxableSubtotal -
    taxableManualDiscount -
    taxablePromotion +
    taxableServiceFee +
    taxableTip +
    taxableDeliveryFee +
    taxablePlatformFee,
    0
  );

  return {
    taxableSubtotal,
    nonTaxableSubtotal,
    taxableManualDiscount,
    taxablePromotion,
    taxableServiceFee,
    taxableTip,
    taxableDeliveryFee,
    taxablePlatformFee,
    hasTaxableItems,
    taxableBase,
  };
};

export const calculateTaxableCartBase = (payload = {}) =>
  calculateTaxableCartBreakdown(payload).taxableBase;

export const calculateAndRoundTax = (total, taxRate) =>
  round2(toSafeNumber(total) * toSafeNumber(taxRate));