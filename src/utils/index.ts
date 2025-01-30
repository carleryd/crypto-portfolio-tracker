import { FetchedCurrency } from "../requests/currency";

const trimTrailingZeros = (numStr: string): string =>
  numStr.includes(".") ? numStr.replace(/0+$/, "").replace(/\.$/, "") : numStr;

export const getCurrencySummary = (currency: FetchedCurrency) =>
  `${currency.name} (${currency.symbol})`;

export const formatCurrencyAmount = (amount: number): string => {
  const fixed = amount.toFixed(2);

  const trimmed = trimTrailingZeros(fixed);

  return `$${trimmed}`;
};

export const formatCurrencyPrice = (amount: number): string => {
  const fixed = amount.toFixed(6);

  const trimmed = trimTrailingZeros(fixed);

  return `$${trimmed}`;
};
