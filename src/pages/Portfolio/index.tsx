import { Button, Grid2 as Grid, Typography, styled } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { CurrencyTable } from "@/components/CurrencyTable";
import { FetchedCurrency, fetchCurrencyPriceUsd } from "@/requests/currency";
import { StoredCurrency, useCurrencyStore } from "@/stores/useCurrencyStore";
import { useModalStore } from "@/stores/useModalStore";

import { AddCurrency } from "./components/AddCurrency";
import { EditCurrency } from "./components/EditCurrency";

export const Stuff = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const populateCurrencyTotalValue = (currency: StoredCurrency) => ({
  ...currency,
  totalValue: currency.price ? currency.quantity * currency.price : null,
});

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
  const { addCurrency, currencies, editCurrency, removeCurrency, getCurrency } =
    useCurrencyStore();
  const { open: openModal, close: closeModal } = useModalStore();
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

  const onClickAddNewHolding = useCallback(() => {
    const onAddNewCurrency = (
      fetchedCurrency: FetchedCurrency,
      quantity: number,
    ) => {
      const newCurrency: StoredCurrency = responseToStoredCurrency(
        fetchedCurrency,
        quantity,
      );

      addCurrency(newCurrency);
      updateCurrencyPrices([newCurrency.id]);
      closeModal();
    };

    openModal("Add new holding", () => (
      <AddCurrency onAddNewCurrency={onAddNewCurrency} />
    ));
  }, [closeModal, openModal, addCurrency, updateCurrencyPrices]);

  const onSelectCurrency = useCallback(
    (currency: { id: string }) => {
      navigate(`/currency/${currency.id}`);
    },
    [navigate],
  );

  const onSelectEditCurrency = useCallback(
    ({ id }: { id: string }) => {
      const currency = getCurrency(id);

      if (currency) {
        const onEditCurrency = (quantity: number) => {
          editCurrency({ ...currency, quantity });
          updateCurrencyPrices([id]);
          closeModal();
        };

        const onRemoveCurrency = () => {
          removeCurrency(id);
          closeModal();
        };

        openModal("Edit currency", () => (
          <EditCurrency
            currency={currency}
            onEditCurrency={onEditCurrency}
            onRemoveCurrency={onRemoveCurrency}
          />
        ));
      }
    },
    [
      getCurrency,
      openModal,
      closeModal,
      editCurrency,
      removeCurrency,
      updateCurrencyPrices,
    ],
  );

  return (
    <Grid
      container
      flexDirection="column"
      padding={2}
      justifyContent="center"
      alignItems="center"
    >
      <Grid marginBottom={3}>
        <Typography variant="h3">Crypto Portfolio Tracker</Typography>
      </Grid>
      <Grid padding={2}>
        <CurrencyTable
          currencies={currencies.map(populateCurrencyTotalValue)}
          onSelectCurrency={onSelectCurrency}
          onSelectEditCurrency={onSelectEditCurrency}
        />
      </Grid>
      <Grid padding={2}>
        <Button
          color="primary"
          variant="contained"
          onClick={onClickAddNewHolding}
        >
          Add new holding
        </Button>
      </Grid>
    </Grid>
  );
};
