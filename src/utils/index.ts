import { FetchedCurrency } from "@/requests/currency";

export const getCurrencySummary = (currency: FetchedCurrency) =>
  `${currency.name} (${currency.symbol})`;

export const formatFinancial = (num: number): string => {
  const options =
    num < 1
      ? {
          maximumSignificantDigits: 5,
        }
      : {
          minimumFractionDigits: 0,
          maximumFractionDigits: 3,
        };

  return new Intl.NumberFormat("en-US", options).format(num);
};
