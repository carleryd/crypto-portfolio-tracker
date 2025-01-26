import {
  Autocomplete,
  Button,
  Grid2 as Grid,
  TextField,
  styled,
} from "@mui/material";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";

import { CurrencyTable } from "@/components/CurrencyTable";
import { StoredCurrency, useCurrencyStore } from "@/useCurrencyStore";
import { FetchedCurrency, fetchCurrencies } from "@/useFetchCoins";

export const Stuff = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const getCurrencySummary = (currency: FetchedCurrency) =>
  `${currency.name} (${currency.symbol})`;

const responseToStoredCurrency = (
  currency: FetchedCurrency,
): StoredCurrency => ({
  assetId: currency.id,
  name: currency.name,
  symbol: currency.symbol,
  quantity: 0,
  price: 0,
  totalValue: 0,
});

export const Home = () => {
  const { currencies, addCurrency } = useCurrencyStore();
  const [searchInput, setSearchInput] = useState("");
  const [currencyOptions, setCurrencyOptions] = useState<FetchedCurrency[]>([]);
  const [selectedOption, setSelectedOption] = useState<FetchedCurrency | null>(
    null,
  );

  const onClick = () => {
    if (selectedOption) {
      const newCurrency: StoredCurrency =
        responseToStoredCurrency(selectedOption);

      addCurrency(newCurrency);
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

  const handleSearchInputChange = useCallback(async (currencyName: string) => {
    const response = await fetchCurrencies(currencyName);

    const currencyOptions = response.coins;

    setCurrencyOptions(currencyOptions);

    console.log(response);
  }, []);

  useEffect(() => {
    const debounced = debounce(handleSearchInputChange, 1000);
    debounced(searchInput);

    return () => debounced.cancel();
  }, [handleSearchInputChange, searchInput]);

  return (
    <>
      <CurrencyTable currencies={currencies} />
      <Autocomplete
        filterOptions={(x) => x}
        onChange={onChange}
        onInputChange={onInputChange}
        options={currencyOptions}
        getOptionLabel={getCurrencySummary}
        renderInput={(params) => (
          <TextField {...params} label="Cryptocurrency" />
        )}
      />
      <Button onClick={onClick}>Add currency</Button>
    </>
  );
};
