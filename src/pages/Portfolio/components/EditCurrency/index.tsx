import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid2 as Grid, Input } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";

import { StoredCurrency } from "@/stores/useCurrencyStore";

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
  currency: StoredCurrency;
  onEditCurrency: (quantity: number) => void;
  onRemoveCurrency: () => void;
};

export const EditCurrency = ({
  currency,
  onEditCurrency,
  onRemoveCurrency,
}: Props) => {
  const [currencyQuantity, setCurrencyQuantity] = useState(currency.quantity);

  useEffect(() => {
    setCurrencyQuantity(currency.quantity);
  }, [currency]);

  const onChangeCurrencyQuantity = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;

    const parseResult = positiveNumberSchema.safeParse(value);

    if (parseResult.success) {
      setCurrencyQuantity(Number(value));
    }
  };

  // TODO: Prevent adding same currency twice
  const onClickEditCurrency = useCallback(() => {
    // TODO: Add validation
    const validNumberResult = validNumberSchema.safeParse(
      String(currencyQuantity),
    );

    if (validNumberResult.error) {
      alert("Invalid number");
      return;
    }

    onEditCurrency(currencyQuantity);
  }, [onEditCurrency, currencyQuantity]);

  const onClickRemoveCurrency = useCallback(() => {
    // TODO: Add confirmation
    onRemoveCurrency();
  }, [onRemoveCurrency]);

  return (
    <Grid
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      minWidth={400}
      minHeight="60vh"
    >
      <Grid padding={2}>
        <Input
          value={currencyQuantity}
          placeholder="Amount"
          onChange={onChangeCurrencyQuantity}
        />
      </Grid>
      <Grid padding={2}>
        <Button onClick={onClickEditCurrency}>Edit currency</Button>
      </Grid>
      <Grid padding={2}>
        <Button onClick={onClickRemoveCurrency}>
          <DeleteIcon /> Remove currency
        </Button>
      </Grid>
    </Grid>
  );
};
