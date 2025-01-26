import { create } from "zustand";
import { persist } from "zustand/middleware";

export type StoredCurrency = {
  // TODO: Rename id?
  assetId: string;
  name: string;
  symbol: string;
  quantity: number;
  price: number | null;
};

export type CurrencyStore = {
  currencies: StoredCurrency[];
  addCurrency: (currency: StoredCurrency) => void;
  editCurrency: (currency: StoredCurrency) => void;
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
      editCurrency: (currency) =>
        set((state) => ({
          currencies: state.currencies.map((c) =>
            c.assetId === currency.assetId ? currency : c,
          ),
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
