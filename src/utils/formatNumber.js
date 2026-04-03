// import numeral from 'numeral';

// // ----------------------------------------------------------------------

// export function fNumber(number) {
//   return numeral(number).format();
// }

// export function fCurrency(number) {
//   const format = number ? numeral(number).format('$0,0.00') : '';

//   return result(format, '.00');
// }

// export function fPercent(number) {
//   const format = number ? numeral(Number(number) / 100).format('0.0%') : '';

//   return result(format, '.0');
// }

// export function fShortenNumber(number) {
//   const format = number ? numeral(number).format('0.00a') : '';

//   return result(format, '.00');
// }

// export function fData(number) {
//   const format = number ? numeral(number).format('0.0 b') : '';

//   return result(format, '.0');
// }

// function result(format, key = '.00') {
//   const isInteger = format.includes(key);

//   return isInteger ? format.replace(key, '') : format;
// }

import numeral from "numeral";

// ----------------------------------------------------------------------

// export function fNumber(number) {
//   return numeral(number).format();
// }
export const truncateTo2 = (value) => {
  const num = Number(value || 0);
  return Math.trunc(num * 100) / 100;
};

export const formatTo2 = (value) => {
  return Number(value || 0).toFixed(2);
};

export const getStoreDisplayPrice = ({
  price,
  showTaxWithPrice,
  storeTaxOnCash,
}) => {
  const numericPrice = Number(String(price ?? 0).replace(/,/g, "").trim()) || 0;
  const basePrice = truncateTo2(numericPrice);

  if (!showTaxWithPrice) {
    return fNumberRound(basePrice);
  }

  const taxPercentage =
    Number(String(storeTaxOnCash ?? 0).replace(/,/g, "").trim()) || 0;

  const priceWithTax = basePrice + (basePrice * taxPercentage) / 100;

  return fNumberRound(priceWithTax);
};
export function fNumberRound(number) {
  if (number === null || number === undefined) return 0;

  const rounded = Math.round(Number(number));
  return numeral(rounded).format("0,0");
}

export function fNumber(number) {
  if (Number.isInteger(number)) {
    return numeral(number).format();
  } else {
    return numeral(number).format('0,0.[00]');
  }
}

export function fNumberForTwoDecimals(number) {
  return numeral(number).format('0,0.00');
}

export function fCurrency(number) {
  const format = number ? numeral(number).format("$0,0.00") : "";
  return result(format, ".00");
}

export function fCurrencyPKR(number) {
  const format = number ? numeral(number).format("Rs. 0,0.00") : "";
  return result(format, ".00");
}

export function fPercent(number) {
  const format = number ? numeral(Number(number) / 100).format("0.0%") : "";
  return result(format, ".0");
}

export function fShortenNumber(number) {
  const format = number ? numeral(number).format("0.00a") : "";
  return result(format, ".00");
}

export function fData(number) {
  const format = number ? numeral(number).format("0.0 b") : "";
  return result(format, ".0");
}

function result(format, key = ".00") {
  const isInteger = format.includes(key);
  return isInteger ? format.replace(key, "") : format;
}


export function roundNumberToFixed(number, decimals) {
  if (isNaN(number)) {
    return 0;
  }
  if (number % 1 === 0) {
    return number;
  } else {
    const factor = Math.pow(10, decimals);
    const roundedNumber = Math.round(number * factor) / factor;
    return Number(roundedNumber.toFixed(decimals));
  }
}

