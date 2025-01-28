import { FetchedCurrency } from "../requests/currency";

export const getCurrencySummary = (currency: FetchedCurrency) =>
  `${currency.name} (${currency.symbol})`;

export const formatAssetAmount = (amount: number): string => {
  return amount.toFixed(2);
};
