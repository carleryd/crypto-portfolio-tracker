import { Button, Grid2 as Grid, styled } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CurrencyTable } from "@/components/CurrencyTable";
import { FetchedCurrency, fetchCurrencyPriceUsd } from "@/currencyRequests";
import { StoredCurrency, useCurrencyStore } from "@/hooks/useCurrencyStore";

import { AddCurrencyModal } from "./components/AddCurrencyModal";

export const Stuff = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const populateCurrencyTotalValue = (currency: StoredCurrency) => ({
  ...currency,
  totalValue: currency.price ? currency.quantity * currency.price : null,
});

// TODO: Rehome
const responseToStoredCurrency = (
  currency: FetchedCurrency,
  quantity: number,
): StoredCurrency => ({
  id: currency.id,
  name: currency.name,
  symbol: currency.symbol,
  quantity,
  price: null,
});

export const Portfolio = () => {
  const { addCurrency, currencies, editCurrency } = useCurrencyStore();
  const [isAddCurrencyModalOpen, setIsAddCurrencyModalOpen] = useState(false);
  const navigate = useNavigate();

  const updateCurrencyPrices = useCallback(
    async (currencies: StoredCurrency[]) => {
      const currencyIds = currencies.map((currency) => currency.id);
      const currencyPriceMap = await fetchCurrencyPriceUsd(currencyIds);

      currencies.forEach((currency) => {
        const currentUsdPrice = currencyPriceMap[currency.id]?.usd;

        if (currentUsdPrice) {
          const updatedCurrency = { ...currency, price: currentUsdPrice };

          editCurrency(updatedCurrency);
        }
      });
    },
    [editCurrency],
  );

  useEffect(() => {
    updateCurrencyPrices(currencies);
  }, [updateCurrencyPrices, currencies]);

  const onClickAddNewHolding = useCallback(() => {
    setIsAddCurrencyModalOpen(true);
  }, [setIsAddCurrencyModalOpen]);

  const onCloseAddCurrencyModal = useCallback(() => {
    setIsAddCurrencyModalOpen(false);
  }, [setIsAddCurrencyModalOpen]);

  const onAddNewCurrency = useCallback(
    (newCurrency: FetchedCurrency, quantity: number) => {
      const asdf: StoredCurrency = responseToStoredCurrency(
        newCurrency,
        quantity,
      );

      addCurrency(asdf);
      setIsAddCurrencyModalOpen(false);
    },
    [addCurrency, setIsAddCurrencyModalOpen],
  );

  const onClickTableRow = useCallback(
    (currency: { id: string }) => {
      console.log(currency);
      navigate(`/currency/${currency.id}`);
    },
    [navigate],
  );

  return (
    <>
      <CurrencyTable
        currencies={currencies.map(populateCurrencyTotalValue)}
        onClickTableRow={onClickTableRow}
      />
      <Button onClick={onClickAddNewHolding}>Add new holding</Button>
      <AddCurrencyModal
        open={isAddCurrencyModalOpen}
        onClose={onCloseAddCurrencyModal}
        onAddNewCurrency={onAddNewCurrency}
      />
    </>
  );
};
