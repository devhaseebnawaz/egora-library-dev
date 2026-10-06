export const DEFAULT_VENUE_TIMEZONE = 'Asia/Karachi';

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const toBoolean = (value) => value === true || value === 'true';

const getZonedParts = (date, timeZone) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type) => parts.find((part) => part.type === type)?.value;
  return {
    day: get('weekday').toLowerCase(),
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  };
};

const toMinutes = (value, timeZone) => {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'string' && /^\d{1,2}:\d{2}(:\d{2})?$/.test(value.trim())) {
    const [hours, minutes] = value.trim().split(':').map(Number);
    return hours * 60 + minutes;
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return getZonedParts(date, timeZone).minutes;
};

const getDayRange = (venueTimings, day, timeZone) => {
  const timing = venueTimings?.[day];
  if (!timing || !toBoolean(timing.isOpen)) return null;
  const start = toMinutes(timing.startTime, timeZone);
  const end = toMinutes(timing.endTime, timeZone);
  if (start === null || end === null) return null;
  return { start, end, overnight: end <= start };
};

export const formatMinutes = (minutes) => {
  const hours24 = Math.floor(minutes / 60) % 24;
  const mins = minutes % 60;
  const suffix = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 || 12;
  return `${hours12}:${String(mins).padStart(2, '0')} ${suffix}`;
};

const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1);

export const getVenueOpenStatus = (venueTimings, options = {}) => {
  const timeZone = options.timeZone || DEFAULT_VENUE_TIMEZONE;
  const now = options.now || new Date();

  const hasTimings =
    !!venueTimings && typeof venueTimings === 'object' && DAYS.some((day) => venueTimings[day]);
  if (!hasTimings) {
    return { isOpen: true, hasTimings: false, closesAt: null, nextOpening: null };
  }

  const { day: today, minutes: nowMinutes } = getZonedParts(now, timeZone);
  const todayIndex = DAYS.indexOf(today);
  const yesterday = DAYS[(todayIndex + 6) % 7];

  const todayRange = getDayRange(venueTimings, today, timeZone);
  const yesterdayRange = getDayRange(venueTimings, yesterday, timeZone);

  if (yesterdayRange?.overnight && yesterdayRange.end !== yesterdayRange.start && nowMinutes < yesterdayRange.end) {
    return { isOpen: true, hasTimings, closesAt: formatMinutes(yesterdayRange.end), nextOpening: null };
  }

  if (todayRange) {
    const { start, end, overnight } = todayRange;
    const allDay = start === end;
    const open = allDay || (overnight ? nowMinutes >= start : nowMinutes >= start && nowMinutes < end);
    if (open) {
      return { isOpen: true, hasTimings, closesAt: allDay ? null : formatMinutes(end), nextOpening: null };
    }
    if (nowMinutes < start) {
      const time = formatMinutes(start);
      return {
        isOpen: false,
        hasTimings,
        closesAt: null,
        nextOpening: { day: today, time, label: `today at ${time}` },
      };
    }
  }

  for (let offset = 1; offset <= 7; offset += 1) {
    const day = DAYS[(todayIndex + offset) % 7];
    const range = getDayRange(venueTimings, day, timeZone);
    if (range) {
      const time = formatMinutes(range.start);
      const dayLabel = offset === 1 ? 'tomorrow' : capitalize(day);
      return {
        isOpen: false,
        hasTimings,
        closesAt: null,
        nextOpening: { day, time, label: `${dayLabel} at ${time}` },
      };
    }
  }

  return { isOpen: false, hasTimings, closesAt: null, nextOpening: null };
};

export const getVenueTimezone = (venue) => venue?.timezone || DEFAULT_VENUE_TIMEZONE;

export const isVenueOpenNow = (venue, now) =>
  getVenueOpenStatus(venue?.venueTimings, { timeZone: getVenueTimezone(venue), now }).isOpen;

export const getVenueClosedMessage = (venue, status) => {
  const name = venue?.name ? `${venue.name} is` : 'We are';
  const opening = status?.nextOpening?.label;
  return opening
    ? `${name} closed right now. We open ${opening}. You can browse the menu, but orders can't be placed until then.`
    : `${name} closed right now. You can browse the menu, but orders can't be placed at the moment.`;
};

export const getPlaceOrderClosedMessage = (venue, status) => {
  const name = venue?.name || 'This venue';
  const opening = status?.nextOpening?.label;
  return opening
    ? `${name} is closed right now, so your order can't be placed. Please order again ${opening}.`
    : `${name} is closed right now, so your order can't be placed.`;
};
