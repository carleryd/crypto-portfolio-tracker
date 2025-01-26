import { Grid2 as Grid, styled } from "@mui/material";

import { ROUTES, useTypedParams } from "@/constants";

export const Stuff = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

export const CurrencyDetails = () => {
  // TODO: Improve interface
  const { currencyId } = useTypedParams<typeof ROUTES.CURRENCY>();

  return <Stuff>Details {currencyId}</Stuff>;
};
