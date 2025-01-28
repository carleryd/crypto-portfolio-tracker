import {
  Autocomplete,
  Button,
  Dialog,
  Grid2 as Grid,
  Input,
  TextField,
} from "@mui/material";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";

import { FetchedCurrency, searchCurrencies } from "@/requests/currency";
import { getCurrencySummary } from "@/utils/index";

const validNumberSchema = z.string().regex(/\b\d+(\.\d+)?\b/);

const positiveNumberSchema = z
  .string()
  .refine((value) => value === "" || /^[0-9.]+$/.test(value), {
    message: "Only positive numbers without leading zeros allowed",
  })
  .refine((value) => value === "" || parseFloat(value) > 0, {
    message: "Value must be greater than zero",
  });

type Props = {
  open: boolean;
  onClose: () => void;
  onAddNewCurrency: (newCurrency: FetchedCurrency, quantity: number) => void;
};

export const AddCurrencyModal = (props: Props) => {
  const [currencyQuantity, setCurrencyQuantity] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [currencyOptions, setCurrencyOptions] = useState<FetchedCurrency[]>([]);
  const [selectedOption, setSelectedOption] = useState<FetchedCurrency | null>(
    null,
  );

  const onChangeCurrencyQuantity = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;

    const parseResult = positiveNumberSchema.safeParse(value);

    if (parseResult.success) {
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

  // TODO: Prevent adding same currency twice
  const onClickAddCurrency = useCallback(() => {
    // TODO: Add validation
    const validNumberResult = validNumberSchema.safeParse(currencyQuantity);

    // TODO: Snackbar
    if (!selectedOption) {
      alert("No currency selected");
      return;
    }
    if (validNumberResult.error) {
      alert("Invalid number");
      return;
    }

    setCurrencyQuantity("");
    props.onAddNewCurrency(selectedOption, Number(currencyQuantity));
  }, [props, selectedOption, currencyQuantity]);

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

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <Grid
        container
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        minWidth={400}
        minHeight="60vh"
      >
        <Grid padding={2} minWidth={200}>
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
        </Grid>
        <Grid padding={2}>
          <Input
            value={currencyQuantity}
            placeholder="Amount"
            onChange={onChangeCurrencyQuantity}
          />
        </Grid>
        <Grid padding={2}>
          <Button onClick={onClickAddCurrency}>Add currency</Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};
