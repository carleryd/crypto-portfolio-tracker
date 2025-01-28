import { CircularProgress, Grid2 as Grid, Typography } from "@mui/material";
import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";

import { ROUTES, useTypedParams } from "@/constants";
import { StoredCurrency, useCurrencyStore } from "@/hooks/useCurrencyStore";
import { fetchCurrencyHistoricalPriceDataUsd } from "@/requests/currency";

import {
  HistoricalPriceChart,
  TimeSeriesEntry,
} from "./components/HistoricalPriceChart";

const convertData = (data: number[][]): TimeSeriesEntry[] => {
  const converted = data.map(([time, value]) => ({
    time: format(new Date(time), "yyyy-MM-dd"),
    value,
  }));

  return converted.splice(0, converted.length - 2);
};

export const CurrencyDetails = () => {
  // TODO: Improve interface
  const { getCurrency } = useCurrencyStore();
  const { currencyId } = useTypedParams<typeof ROUTES.CURRENCY>();
  const [currency, setCurrency] = useState<StoredCurrency | null>(null);
  const [timeSeries, setTimeSeries] = useState<TimeSeriesEntry[]>([]);

  const fetchAndPrepareTimeSeriesData = useCallback(async () => {
    if (currencyId) {
      const data = await fetchCurrencyHistoricalPriceDataUsd(
        currencyId,
        90,
        "daily",
      );

      const convertedData: TimeSeriesEntry[] = convertData(data.prices);

      setTimeSeries(convertedData);
    }
  }, [currencyId]);

  useEffect(() => {
    fetchAndPrepareTimeSeriesData();
  }, [fetchAndPrepareTimeSeriesData, currencyId]);

  useEffect(() => {
    if (currencyId) {
      const currency = getCurrency(currencyId);

      if (!currency) {
        throw new Error("Currency not found in local storage");
      }

      setCurrency(currency);
    } else {
      // TODO: Can this be prevented higher up in the router?
      throw new Error("Path did not contain currencyId");
    }
  }, [currencyId, getCurrency]);

  // TODO: Ensure loading spinner is same height as content

  return (
    <Grid>
      <Grid container justifyContent="center" alignItems="center">
        <Grid container>
          <Grid marginTop={1.5} marginBottom={3}>
            {currency ? (
              <>
                <Typography variant="h3">{currency.name}</Typography>
                <Typography variant="h4">{currency.symbol}</Typography>
              </>
            ) : (
              <CircularProgress size={50} />
            )}
          </Grid>
        </Grid>
      </Grid>
      <HistoricalPriceChart timeSeries={timeSeries} />
    </Grid>
  );
};
