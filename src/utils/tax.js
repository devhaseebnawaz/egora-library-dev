export const calculateAndRoundTax = (total, taxRate, discount) => {
  let t = total - discount
  const taxAmount = t * taxRate;
  const roundedTax = Math.round(taxAmount * 100) / 100;
  return roundedTax;
};
