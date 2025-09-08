export const formatTime = (time) => {
  const options = { hour: "2-digit", minute: "2-digit", hour12: true };
  return new Intl.DateTimeFormat("en-US", options).format(time);
};

export const formatDate = (time) => {
  const options = { day: "numeric", month: "short", year: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(time);
};