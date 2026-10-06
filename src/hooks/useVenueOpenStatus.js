import { useEffect, useMemo, useState } from 'react';
import {
  getVenueOpenStatus,
  getVenueTimezone,
  getVenueClosedMessage,
  getPlaceOrderClosedMessage,
} from '../utils/venueTimings';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const getVenueId = (venue) => venue?._id || venue?.id;

// Latest hours for one venue straight from the backend, so a venue saved in
// the browser earlier (with old timings) is never trusted on its own.
export const fetchVenueStatus = async (venueId) => {
  const response = await fetch(`${backendUrl}/store/venueStatus?venueId=${encodeURIComponent(venueId)}`);
  if (!response.ok) throw new Error(`Venue status request failed: ${response.status}`);
  return response.json();
};

// Picks the venue whose hours apply. Fresh data from the venues list or the
// backend wins over the venue saved in the browser.
const resolveVenue = (venue, outlets = [], freshVenue = null) => {
  const venueId = getVenueId(venue);
  if (venue && typeof venue === 'object' && venueId) {
    if (freshVenue && String(getVenueId(freshVenue)) === String(venueId)) {
      return { ...venue, venueTimings: freshVenue.venueTimings, timezone: freshVenue.timezone };
    }
    const match = outlets.find((outlet) => String(getVenueId(outlet)) === String(venueId));
    return match?.venueTimings ? { ...venue, venueTimings: match.venueTimings } : venue;
  }
  return outlets.length === 1 ? outlets[0] : null;
};

/**
 * Open/closed status for the venue a customer is ordering from. The venue's
 * hours are re-fetched whenever the page loads or the venue changes, and the
 * status is recomputed every minute so a page left open flips on its own.
 * With no venue chosen yet and several venues, the store counts as closed
 * only when every venue is closed.
 */
export default function useVenueOpenStatus(venue, outlets = []) {
  const [now, setNow] = useState(() => new Date());
  const [freshVenue, setFreshVenue] = useState(null);
  const venueId = getVenueId(venue);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!venueId) return undefined;
    let active = true;
    fetchVenueStatus(venueId)
      .then((data) => {
        if (active) setFreshVenue(data);
      })
      .catch((error) => console.error('Error fetching venue status:', error));
    return () => {
      active = false;
    };
  }, [venueId]);

  return useMemo(() => {
    const hasFresh =
      !!freshVenue && String(getVenueId(freshVenue)) === String(venueId);
    const inOutlets = (outlets || []).some(
      (outlet) => outlet?.venueTimings && String(getVenueId(outlet)) === String(venueId)
    );
    // Don't judge from hours saved in the browser; wait for the latest ones.
    if (venueId && !hasFresh && !inOutlets) {
      return { isOpen: true, hasTimings: false, pending: true, venue, message: '', placeOrderMessage: '' };
    }

    const target = resolveVenue(venue, outlets || [], freshVenue);

    if (target) {
      const status = getVenueOpenStatus(target.venueTimings, { timeZone: getVenueTimezone(target), now });
      return {
        ...status,
        venue: target,
        message: status.isOpen ? '' : getVenueClosedMessage(target, status),
        placeOrderMessage: status.isOpen ? '' : getPlaceOrderClosedMessage(target, status),
      };
    }

    const withTimings = (outlets || []).filter((outlet) => outlet?.venueTimings);
    if (withTimings.length) {
      const statuses = withTimings.map((outlet) =>
        getVenueOpenStatus(outlet.venueTimings, { timeZone: getVenueTimezone(outlet), now })
      );
      if (statuses.every((status) => !status.isOpen)) {
        return {
          isOpen: false,
          hasTimings: true,
          venue: null,
          message: "All our branches are closed right now. You can browse the menu, but orders can't be placed until a branch opens.",
          placeOrderMessage: "All our branches are closed right now, so your order can't be placed.",
        };
      }
    }

    return { isOpen: true, hasTimings: false, venue: null, message: '', placeOrderMessage: '' };
  }, [venue, venueId, outlets, freshVenue, now]);
}
