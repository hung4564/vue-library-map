/**
 *
 * @param {Number} number
 * @param {String} [locales] Default: 'en-IN'
 */
export function formatNumber(number, locales = "vi") {
  return new Intl.NumberFormat(locales).format(number);
}

/**
 *
 * @param {Number} number
 * @param {String} [currency] Default: 'USD'
 * @param {String} [locales] Default: 'en-US'
 */
export function formatCurrency(number, currency = "USD", locales = "en-US") {
  return new Intl.NumberFormat(locales, { style: "currency", currency }).format(
    number
  );
}
