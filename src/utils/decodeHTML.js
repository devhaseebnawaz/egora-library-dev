export const decodeHTML = (str) => {
  if (!str) return str;
  const textarea = document.createElement('textarea');
  textarea.innerHTML = str;
  return textarea.value;
}