export const calculateCartItemGrossTotal = (cartItem) => {
    const itemQuantity = Number(cartItem?.qty || 0);
    let itemTotal =
        parseFloat(
            cartItem?.priceWithChoiceGroup
                ? cartItem.priceWithChoiceGroup
                : cartItem?.price || 0
        ) * itemQuantity;

    if (cartItem?.selectedAddOns && cartItem.selectedAddOns.length > 0) {
        cartItem.selectedAddOns.forEach((addon) => {
            itemTotal += parseFloat(String(addon.price).replace("Rs. ", ""));
        });
    }

    return Number(itemTotal || 0);
};

export const getCartItemDiscount = (cartItem) =>
    Number(cartItem?.discountObject?.discount || 0);

export const calculateCartItemNetTotal = (cartItem) =>
    Math.max(calculateCartItemGrossTotal(cartItem) - getCartItemDiscount(cartItem), 0);

export const calculateCartDiscount = (cart = [], cartMeta = {}) => {
    const backendDiscount = Number(cartMeta?.discount || 0);
    if (backendDiscount > 0) return backendDiscount;

    if (!Array.isArray(cart)) return 0;

    return cart.reduce((total, cartItem) => total + getCartItemDiscount(cartItem), 0);
};

export const calculateSubTotal = (cart) => {
    if (!Array.isArray(cart) || cart.length === 0) return '0';

    const grandTotal = cart.reduce((total, cartItem) => (
        total + calculateCartItemGrossTotal(cartItem)
    ), 0);

    return `${grandTotal}`;
};

export const isApplicable = (value) => value === 'true';

export const calculateServiceFee = (
    states,
    mode,
    paymentOption,
    subTotal,
    discount,
) => {

    const { franchise } = states ?? {};
    const { serviceFeesObject, configurations } = franchise ?? {};
    const { isServiceFeesApplicableOnStore, isCashAvailableOnPickUp, isCashAvailableOnDelivery } = configurations ?? {};

    if (!isServiceFeesApplicableOnStore) return 0
    const modeCashAvailability = {
        storePickUp: isCashAvailableOnPickUp,
        storeDelivery: isCashAvailableOnDelivery
    };

    if (!modeCashAvailability[mode] && paymentOption === "cash") return 0
    const modeData = serviceFeesObject?.[mode];
    if (!modeData) return 0;
    const paymentData = modeData[paymentOption];
    if (paymentData?.applicable !== "true") return 0;
    let serviceFeeableSubtotal = Math.max(Number(subTotal || 0) - Number(discount || 0), 0);
    if (paymentData?.type === "Percentage") {
        return (serviceFeeableSubtotal * parseFloat(paymentData.amount)) / 100;
    } else {
        return parseFloat(paymentData.amount);
    }
};

export const calculateFinalTotal = (cart, tip, discount) => {
    if (!Array.isArray(cart) || cart.length === 0) return '0';

    const itemsTotal = cart.reduce((total, cartItem) => (
        total + calculateCartItemGrossTotal(cartItem)
    ), 0);

    const grandTotal = Math.max(itemsTotal - Number(discount || 0), 0) + parseFloat(tip > 0 ? tip : 0);
    return `${grandTotal}`;
};