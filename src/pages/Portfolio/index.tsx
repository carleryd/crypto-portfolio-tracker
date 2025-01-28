import { Button, Grid2 as Grid, Typography, styled } from "@mui/material";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CurrencyTable } from "@/components/CurrencyTable";
import { StoredCurrency, useCurrencyStore } from "@/hooks/useCurrencyStore";
import { FetchedCurrency, fetchCurrencyPriceUsd } from "@/requests/currency";

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
  const { addCurrency, currencies, editCurrency, getCurrency } =
    useCurrencyStore();
  const [isAddCurrencyModalOpen, setIsAddCurrencyModalOpen] = useState(false);
  const navigate = useNavigate();

  const updateCurrencyPrices = useCallback(
    async (currencyIds: string[]) => {
      const currencyPriceMap = await fetchCurrencyPriceUsd(currencyIds);

      currencyIds.forEach((currencyId) => {
        const currentUsdPrice = currencyPriceMap[currencyId]?.usd;
        const currency = getCurrency(currencyId);

        if (currentUsdPrice && currency) {
          const updatedCurrency = { ...currency, price: currentUsdPrice };

          editCurrency(updatedCurrency);
        }
      });
    },
    [getCurrency, editCurrency],
  );

  // TODO: Interval should fetch prices perhaps?

  const onClickAddNewHolding = useCallback(() => {
    setIsAddCurrencyModalOpen(true);
  }, [setIsAddCurrencyModalOpen]);

  const onCloseAddCurrencyModal = useCallback(() => {
    setIsAddCurrencyModalOpen(false);
  }, [setIsAddCurrencyModalOpen]);

  const onAddNewCurrency = useCallback(
    (fetchedCurrency: FetchedCurrency, quantity: number) => {
      const newCurrency: StoredCurrency = responseToStoredCurrency(
        fetchedCurrency,
        quantity,
      );

      addCurrency(newCurrency);
      setIsAddCurrencyModalOpen(false);
      updateCurrencyPrices([newCurrency.id]);
    },
    [addCurrency, setIsAddCurrencyModalOpen, updateCurrencyPrices],
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
      <Grid container justifyContent="center" alignItems="center">
        <Grid container>
          <Grid marginTop={1.5} marginBottom={3}>
            <Typography variant="h3">Portfolio</Typography>
          </Grid>
        </Grid>
      </Grid>
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
