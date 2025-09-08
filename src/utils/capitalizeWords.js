export default function capitalizeWords(name) {
  return name
    ?.split(/([^\w]+)/g)
    ?.map(word => {
      if (/^[a-zA-Z]/.test(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
      return word;
    })
    .join('');
}