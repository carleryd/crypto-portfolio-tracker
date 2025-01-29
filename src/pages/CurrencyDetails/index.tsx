import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  CircularProgress,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RemoteDataView } from "@/components/RemoteData";
import { ROUTES, useTypedParams } from "@/constants";
import { fetchCurrencyHistoricalPriceDataUsd } from "@/requests/currency";
import { RemoteData, remoteData } from "@/requests/utils/remoteData";
import { StoredCurrency, useCurrencyStore } from "@/stores/useCurrencyStore";

import {
  CandlestickChart,
  CandlestickChartEntry,
} from "../../components/CandlestickChart";
import { CandleStickChartLoadding } from "../../components/CandlestickChart/components/Loading";
import { prepareChartData } from "../../components/CandlestickChart/utils";

export const CurrencyDetails = () => {
  // TODO: Improve interface
  const { getCurrency } = useCurrencyStore();
  const { currencyId } = useTypedParams<typeof ROUTES.CURRENCY>();
  const [currency, setCurrency] = useState<StoredCurrency | null>(null);
  const [timeSeries, setTimeSeries] = useState<
    RemoteData<CandlestickChartEntry[]>
  >(remoteData.notAsked);
  const navigate = useNavigate();

  const fetchAndPrepareTimeSeriesData = useCallback(async () => {
    if (currencyId) {
      setTimeSeries(remoteData.pending);
      const data = await fetchCurrencyHistoricalPriceDataUsd(currencyId, 365);

      const convertedData: CandlestickChartEntry[] = prepareChartData(data);

      setTimeSeries(remoteData.success(convertedData));
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

      <RemoteDataView
        remoteData={timeSeries}
        onSuccess={(data) => <CandlestickChart timeSeries={data} />}
        onFailure={(error) => <Typography>{error.message}</Typography>}
        onPending={() => <CandleStickChartLoadding />}
      />
    </Grid>
  );
};
