import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  CircularProgress,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { uniqBy } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES, useTypedParams } from "@/constants";
import { StoredCurrency, useCurrencyStore } from "@/hooks/useCurrencyStore";
import {
  CurrencyHistoricalPriceUsdResponse,
  fetchCurrencyHistoricalPriceDataUsd,
} from "@/requests/currency";

import {
  CandlestickChart,
  TimeSeriesEntry,
} from "./components/CandlestickChart";

const convertData = (
  data: CurrencyHistoricalPriceUsdResponse,
): TimeSeriesEntry[] => {
  const converted = data.map(([time, open, high, low, close]) => ({
    time: format(new Date(time), "yyyy-MM-dd"),
    open,
    high,
    low,
    close,
  }));

  const uniqueDates = uniqBy(converted, ({ time }) => time);

  return uniqueDates;
};

export const CurrencyDetails = () => {
  // TODO: Improve interface
  const { getCurrency } = useCurrencyStore();
  const { currencyId } = useTypedParams<typeof ROUTES.CURRENCY>();
  const [currency, setCurrency] = useState<StoredCurrency | null>(null);
  const [timeSeries, setTimeSeries] = useState<TimeSeriesEntry[]>([]);
  const navigate = useNavigate();

  const fetchAndPrepareTimeSeriesData = useCallback(async () => {
    if (currencyId) {
      const data = await fetchCurrencyHistoricalPriceDataUsd(currencyId, 365);

      const convertedData: TimeSeriesEntry[] = convertData(data);

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
      <Button onClick={() => navigate(ROUTES.HOME)}>
        <ArrowBackIcon />
      </Button>
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
      <CandlestickChart timeSeries={timeSeries} />
    </Grid>
  );
};
