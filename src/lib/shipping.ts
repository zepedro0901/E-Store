// Only Portugal and the rest of the EU are served - see the shipping policy
// (src/i18n/dictionaries). Rates/thresholds below must stay in sync with that copy.
export const EU_COUNTRIES = [
  "Portugal",
  "Austria",
  "Belgium",
  "Bulgaria",
  "Croatia",
  "Cyprus",
  "Czechia",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hungary",
  "Ireland",
  "Italy",
  "Latvia",
  "Lithuania",
  "Luxembourg",
  "Malta",
  "Netherlands",
  "Poland",
  "Romania",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Sweden",
] as const;

export type EuCountry = (typeof EU_COUNTRIES)[number];

const PT_FLAT_SHIPPING_CENTS = 1000;
const EU_FLAT_SHIPPING_CENTS = 2000;
const PT_FREE_SHIPPING_THRESHOLD_CENTS = 5000;
const EU_FREE_SHIPPING_THRESHOLD_CENTS = 10000;

export function computeShippingCents(subtotalCents: number, country: string): number {
  const isPortugal = country === "Portugal";
  const threshold = isPortugal
    ? PT_FREE_SHIPPING_THRESHOLD_CENTS
    : EU_FREE_SHIPPING_THRESHOLD_CENTS;
  if (subtotalCents >= threshold) return 0;
  return isPortugal ? PT_FLAT_SHIPPING_CENTS : EU_FLAT_SHIPPING_CENTS;
}
