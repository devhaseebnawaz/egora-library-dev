export function calculeteDeliveryFee({ states, baseTotal }) {

    if (!states) { return { finalDeliveryFee: 0, reason: "none", message: "" } }

    const { franchise, latLongForDelivery, selectedVenue, orderType } = states ?? {}
    const { location } = selectedVenue ?? {};
    const { deliveryFees = 0, storeDeliveryMaxDistanceThreshold, storeDeliveryMaxOrderThreshold, configurations } = franchise ?? {};
    const { isDeliveryFeeApplicableOnStore, isDeliveryFeeMaxOrderThresholdApplicableOnStore, isDeliveryFeeMaxDistanceThresholdApplicableOnStore, isLocationRestrictedRegionBasedDeliveryOnStore } = configurations ?? {}
    const orderTotal = (Number(baseTotal) + ((isDeliveryFeeApplicableOnStore && orderType === "storeDelivery") ? Number(deliveryFees) : 0)).toFixed(2);

    if (orderType !== "storeDelivery") { return { finalDeliveryFee: 0, reason: "none", message: "" } }
    if (!isDeliveryFeeApplicableOnStore) { return { finalDeliveryFee: 0, reason: "none", message: "" } }
    if (!isLocationRestrictedRegionBasedDeliveryOnStore) { return { finalDeliveryFee: deliveryFees, reason: "none", message: "" } }
    if (!latLongForDelivery || !location) { return { finalDeliveryFee: deliveryFees, reason: "none", message: "" } }

    const userCoords = latLongForDelivery.split(",").map((v) => parseFloat(v.trim()));
    const venueCoords = location.split(",").map((v) => parseFloat(v.trim()));
    if (userCoords.length !== 2 || venueCoords.length !== 2 || userCoords.some(isNaN) || venueCoords.some(isNaN)) { return { finalDeliveryFee: 0, reason: "none", message: "" } }

    const [userLat, userLng] = userCoords;
    const [venueLat, venueLng] = venueCoords;
    const distance = getDistanceFromLatLonInMeters(userLat, userLng, venueLat, venueLng);
    const orderThresholdMet = isDeliveryFeeMaxOrderThresholdApplicableOnStore && orderTotal >= storeDeliveryMaxOrderThreshold;
    const distanceThresholdMet = isDeliveryFeeMaxDistanceThresholdApplicableOnStore && distance <= storeDeliveryMaxDistanceThreshold;

    let reason;
    let message;

    if (orderThresholdMet) {
        reason = "highOrderAmount";
        message = "Congrats! you got free delivery for this order.";
    } else if (distanceThresholdMet) {
        reason = "lessDistanceOrder";
        message = "Congrats! you got free delivery for this order.";
    } else {
        reason = "none";
        if (isDeliveryFeeMaxOrderThresholdApplicableOnStore && storeDeliveryMaxOrderThreshold) {
            const remaining = Number(storeDeliveryMaxOrderThreshold) - Number(orderTotal);
            if (remaining > 0) {
                message = `Add Rs. ${remaining.toFixed(0)} more to get free delivery.`;
            }
        }
    }

    const finalDeliveryFee = orderThresholdMet || distanceThresholdMet ? 0 : deliveryFees;
    return { finalDeliveryFee, reason, message };
}

function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
    const R = 6371e3
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
