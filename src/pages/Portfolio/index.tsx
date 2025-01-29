import { Button, Grid2 as Grid, Typography, styled } from "@mui/material";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CurrencyTable } from "@/components/CurrencyTable";
import { FetchedCurrency, fetchCurrencyPriceUsd } from "@/requests/currency";
import { StoredCurrency, useCurrencyStore } from "@/stores/useCurrencyStore";
import { useModalStore } from "@/stores/useModalStore";

import { AddCurrencyModal } from "./components/AddCurrencyModal";
import { EditCurrencyModal } from "./components/EditCurrencyModal";

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
  const { open: openModal } = useModalStore();
  const [isAddCurrencyModalOpen, setIsAddCurrencyModalOpen] = useState(false);
  const [isEditCurrencyModalOpen, setIsEditCurrencyModalOpen] = useState(false);
  const [currencyToEdit, setCurrencyToEdit] = useState<StoredCurrency | null>(
    null,
  );
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
    setCurrencyToEdit(null);
    setIsAddCurrencyModalOpen(false);
  }, [setIsAddCurrencyModalOpen]);

  const onCloseEditCurrencyModal = useCallback(() => {
    setIsEditCurrencyModalOpen(false);
  }, [setIsEditCurrencyModalOpen]);

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

  const onEditCurrency = useCallback(
    (currencyId: string, quantity: number) => {
      const newCurrency = getCurrency(currencyId);

      if (newCurrency) {
        editCurrency({ ...newCurrency, quantity });
      }

      setIsEditCurrencyModalOpen(false);
      updateCurrencyPrices([currencyId]);
    },
    [
      getCurrency,
      editCurrency,
      setIsEditCurrencyModalOpen,
      updateCurrencyPrices,
    ],
  );

  const onSelectCurrency = useCallback(
    (currency: { id: string }) => {
      navigate(`/currency/${currency.id}`);
    },
    [navigate],
  );

  const onSelectEditCurrency = useCallback(
    ({ id }: { id: string }) => {
      // const currency = getCurrency(id);
      // setCurrencyToEdit(currency);
      // setIsEditCurrencyModalOpen(true);

      openModal("Edit currency?");
    },
    [getCurrency, openModal],
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
        onSelectCurrency={onSelectCurrency}
        onSelectEditCurrency={onSelectEditCurrency}
      />
      <Button onClick={onClickAddNewHolding}>Add new holding</Button>
      <AddCurrencyModal
        open={isAddCurrencyModalOpen}
        onClose={onCloseAddCurrencyModal}
        onAddNewCurrency={onAddNewCurrency}
      />
      {
        /** TODO: This could be improved */ currencyToEdit && (
          <EditCurrencyModal
            open={isEditCurrencyModalOpen}
            currency={currencyToEdit}
            onClose={onCloseEditCurrencyModal}
            onEditCurrency={onEditCurrency}
          />
        )
      }
    </>
  );
};
