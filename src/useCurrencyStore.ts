import { create } from "zustand";
import { persist } from "zustand/middleware";

export type StoredCurrency = {
  assetId: string;
  name: string;
  symbol: string;
  quantity: number;
  // TODO: Get from API
  price: number;
  // TODO: Get from API
  totalValue: number;
};

export type CurrencyStore = {
  currencies: StoredCurrency[];
  addCurrency: (currency: StoredCurrency) => void;
  removeCurrency: (assetId: string) => void;
};

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set) => ({
      currencies: [],
      addCurrency: (currency) =>
        set((state) => ({
          currencies: [...state.currencies, currency],
        })),
      removeCurrency: (assetId) =>
        set((state) => ({
          currencies: state.currencies.filter(
            (currency) => currency.assetId !== assetId,
          ),
        })),
    }),
    { name: "portfolio-currencies" }, // Key used in localStorage
  ),
);
