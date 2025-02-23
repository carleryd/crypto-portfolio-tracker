import { create } from "zustand";
import { persist } from "zustand/middleware";

export type StoredCurrency = {
  id: string;
  name: string;
  symbol: string;
  quantity: number;
  price: number | null;
};

export type CurrencyStore = {
  currencies: StoredCurrency[];
  getCurrency: (currencyId: StoredCurrency["id"]) => StoredCurrency | null;
  addCurrency: (currency: StoredCurrency) => void;
  editCurrency: (currency: StoredCurrency) => void;
  removeCurrency: (id: string) => void;
};

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      currencies: [],
      getCurrency: (id: string): StoredCurrency | null =>
        get().currencies.find((currency) => currency.id === id) || null,
      addCurrency: (currency) =>
        set((state) => ({
          currencies: [...state.currencies, currency],
        })),
      editCurrency: (currency) =>
        set((state) => ({
          currencies: state.currencies.map((c) =>
            c.id === currency.id ? currency : c,
          ),
        })),
      removeCurrency: (id) =>
        set((state) => ({
          currencies: state.currencies.filter((currency) => currency.id !== id),
        })),
    }),
    { name: "portfolio-currencies" }, // Key used in localStorage
  ),
);
