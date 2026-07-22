export function calculeteDeliveryFee({ states, baseTotal }) {
    if (!states) { return { finalDeliveryFee: 0, reason: "none", message: "" } }
    const { franchise, latLongForDelivery, selectedVenue, orderType } = states ?? {}
    const { location } = selectedVenue ?? {};
    const {
        deliveryFees = 0,
        deliveryFeeByDistance = [],
        storeDeliveryMaxDistanceThreshold,
        storeDeliveryMaxOrderThreshold,
        configurations,
    } = franchise ?? {};
    const {
        isDeliveryFeeApplicableOnStore,
        isDeliveryFeeMaxOrderThresholdApplicableOnStore,
        isDeliveryFeeMaxDistanceThresholdApplicableOnStore,
        isLocationRestrictedRegionBasedDeliveryOnStore,
        isRegionBasedDeliveryOnStore,
    } = configurations ?? {}

    if (orderType !== "storeDelivery") { return { finalDeliveryFee: 0, reason: "none", message: "" } }
    if (!isDeliveryFeeApplicableOnStore) { return { finalDeliveryFee: 0, reason: "none", message: "" } }

    const defaultDeliveryFee = Number(deliveryFees) || 0;
    let applicableDeliveryFee = defaultDeliveryFee;
    let distance;

    const canCalculateDistance = typeof latLongForDelivery === "string"
        && typeof location === "string"
        && latLongForDelivery.length > 0
        && location.length > 0;
    if (canCalculateDistance) {
        const userCoords = latLongForDelivery.split(",").map((value) => parseFloat(value.trim()));
        const venueCoords = location.split(",").map((value) => parseFloat(value.trim()));
        const coordinatesAreValid = userCoords.length === 2
            && venueCoords.length === 2
            && !userCoords.some(Number.isNaN)
            && !venueCoords.some(Number.isNaN);

        if (coordinatesAreValid) {
            const [userLat, userLng] = userCoords;
            const [venueLat, venueLng] = venueCoords;
            distance = getDistanceFromLatLonInMeters(userLat, userLng, venueLat, venueLng);
            applicableDeliveryFee = getDistanceBasedDeliveryFee({
                deliveryFeeByDistance,
                distanceInMeters: distance,
                fallbackFee: defaultDeliveryFee,
            });
        }
    }

    // Preserve the existing fallback behavior for region-based delivery when a
    // customer's exact location is not required or has not been selected yet.
    if (isRegionBasedDeliveryOnStore) {
        if (!isLocationRestrictedRegionBasedDeliveryOnStore || !latLongForDelivery) {
            applicableDeliveryFee = defaultDeliveryFee;
        }
    }

    const orderTotal = Number(baseTotal) + applicableDeliveryFee;
    const orderThresholdMet = isDeliveryFeeMaxOrderThresholdApplicableOnStore
        && Number(orderTotal) >= Number(storeDeliveryMaxOrderThreshold);
    const distanceThresholdMet = isDeliveryFeeMaxDistanceThresholdApplicableOnStore
        && Number.isFinite(distance)
        && (distance / 1000) <= Number(storeDeliveryMaxDistanceThreshold);

    let reason = "none";
    let message = "";

    if (orderThresholdMet) {
        reason = "highOrderAmount";
        message = "Congrats! you got free delivery for this order.";
    } else if (distanceThresholdMet) {
        reason = "lessDistanceOrder";
        message = "Congrats! you got free delivery for this order.";
    } else if (isDeliveryFeeMaxOrderThresholdApplicableOnStore && storeDeliveryMaxOrderThreshold) {
        const remaining = Number(storeDeliveryMaxOrderThreshold) - Number(orderTotal);
        if (remaining > 0) {
            message = `Add Rs. ${remaining.toFixed(0)} more to get free delivery.`;
        }
    }

    const finalDeliveryFee = orderThresholdMet || distanceThresholdMet ? 0 : applicableDeliveryFee;
    return { finalDeliveryFee, reason, message };
}

function getDistanceBasedDeliveryFee({ deliveryFeeByDistance, distanceInMeters, fallbackFee }) {
    if (!Array.isArray(deliveryFeeByDistance) || !Number.isFinite(distanceInMeters)) {
        return fallbackFee;
    }

    const distanceInKilometers = distanceInMeters / 1000;
    const matchingSlab = deliveryFeeByDistance
        .filter(({ distance, fee }) => Number.isFinite(Number(distance)) && Number.isFinite(Number(fee)))
        .sort((first, second) => Number(first.distance) - Number(second.distance))
        .find(({ distance }) => distanceInKilometers <= Number(distance));

    return matchingSlab ? Number(matchingSlab.fee) : fallbackFee;
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
