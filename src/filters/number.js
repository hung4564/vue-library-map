export function formatNumber(number, locales = "en") {
  return new Intl.NumberFormat(locales).format(number);
}
