import {
  Autocomplete,
  Button,
  Grid2 as Grid,
  Input,
  TextField,
  styled,
} from "@mui/material";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";

import { CurrencyTable } from "@/components/CurrencyTable";
import {
  FetchedCurrency,
  fetchCurrencyPriceUsd,
  searchCurrencies,
} from "@/currencyRequests";
import { StoredCurrency, useCurrencyStore } from "@/hooks/useCurrencyStore";

export const Stuff = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const getCurrencySummary = (currency: FetchedCurrency) =>
  `${currency.name} (${currency.symbol})`;

const responseToStoredCurrency = (
  currency: FetchedCurrency,
  quantity: number,
): StoredCurrency => ({
  assetId: currency.id,
  name: currency.name,
  symbol: currency.symbol,
  quantity,
  price: null,
});

const populateCurrencyTotalValue = (currency: StoredCurrency) => ({
  ...currency,
  totalValue: currency.price ? currency.quantity * currency.price : null,
});

export const Home = () => {
  const { currencies, addCurrency, editCurrency } = useCurrencyStore();
  const [searchInput, setSearchInput] = useState("");
  const [currencyOptions, setCurrencyOptions] = useState<FetchedCurrency[]>([]);
  const [selectedOption, setSelectedOption] = useState<FetchedCurrency | null>(
    null,
  );
  const [currencyQuantity, setCurrencyQuantity] = useState("");

  const onClick = () => {
    // TODO: Add validation
    if (selectedOption && Number(currencyQuantity)) {
      const newCurrency: StoredCurrency = responseToStoredCurrency(
        selectedOption,
        Number(currencyQuantity),
      );

      addCurrency(newCurrency);
      setSelectedOption(null);
      setCurrencyQuantity("");
    }
  };

  const onChange = (
    _event: React.SyntheticEvent,
    value: FetchedCurrency | null,
  ) => {
    setSelectedOption(value);
  };

  const onInputChange = (
    _event: React.SyntheticEvent,
    value: string | null,
  ) => {
    console.log("onInputChange", value);
    if (value) {
      setSearchInput(value);
    }
  };

  const onChangeCurrencyQuantity = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;

    if (value) {
      setCurrencyQuantity(value);
    }
  };

  const handleSearchInputChange = useCallback(async (currencyName: string) => {
    if (currencyName.length >= 2) {
      const response = await searchCurrencies(currencyName);

      const currencyOptions = response.coins;

      setCurrencyOptions(currencyOptions);

      console.log(response);
    }
  }, []);

  useEffect(() => {
    const debounced = debounce(handleSearchInputChange, 1000);
    debounced(searchInput);

    return () => debounced.cancel();
  }, [handleSearchInputChange, searchInput]);

  const updateCurrencyPrices = useCallback(
    async (currencies: StoredCurrency[]) => {
      const currencyIds = currencies.map((currency) => currency.assetId);
      const currencyPriceMap = await fetchCurrencyPriceUsd(currencyIds);

      currencies.forEach((currency) => {
        const currentUsdPrice = currencyPriceMap[currency.assetId]?.usd;

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

  return (
    <>
      <CurrencyTable currencies={currencies.map(populateCurrencyTotalValue)} />
      <Autocomplete
        value={selectedOption}
        filterOptions={(x) => x}
        onChange={onChange}
        onInputChange={onInputChange}
        options={currencyOptions}
        getOptionLabel={getCurrencySummary}
        renderInput={(params) => (
          <TextField {...params} label="Cryptocurrency" />
        )}
      />
      <Input
        value={currencyQuantity}
        placeholder="Amount"
        onChange={onChangeCurrencyQuantity}
      />
      <Button onClick={onClick}>Add currency</Button>
    </>
  );
};
