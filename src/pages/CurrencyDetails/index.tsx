import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  CircularProgress,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  CandlestickChart,
  CandlestickChartEntry,
} from "@/components/CandlestickChart";
import { CandleStickChartLoadding } from "@/components/CandlestickChart/components/Loading";
import { prepareChartData } from "@/components/CandlestickChart/utils";
import { RemoteDataView } from "@/components/RemoteData";
import { ROUTES, useTypedParams } from "@/constants";
import { fetchCurrencyHistoricalPriceDataUsd } from "@/requests/currency";
import { RemoteData, remoteData } from "@/requests/utils/remoteData";
import { StoredCurrency, useCurrencyStore } from "@/stores/useCurrencyStore";
import { formatFinancial } from "@/utils";

export const CurrencyDetails = () => {
  const navigate = useNavigate();
  const { getCurrency } = useCurrencyStore();
  const { currencyId } = useTypedParams<typeof ROUTES.CURRENCY>();

  const [currency, setCurrency] = useState<StoredCurrency | null>(null);
  const [timeSeries, setTimeSeries] = useState<
    RemoteData<CandlestickChartEntry[]>
  >(remoteData.notAsked);

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
    const currency = getCurrency(currencyId);

    if (!currency) {
      throw new Error("Currency not found in local storage");
    }

    setCurrency(currency);
  }, [currencyId, getCurrency]);

  return (
    <Grid container padding={2.5} spacing={2.5}>
      <Grid>
        <Grid>
          <Button onClick={() => navigate(ROUTES.HOME)} size="large">
            <ArrowBackIcon color="info" />
          </Button>
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
          <Grid marginTop={1.5} marginBottom={3}>
            {currency ? (
              <Grid container flexDirection="column" padding={1} spacing={1.5}>
                <Grid
                  container
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="start"
                  spacing={0}
                >
                  <Typography fontSize={20} fontWeight={600}>
                    {currency.name}
                  </Typography>
                  <Typography fontSize={20} fontWeight={300} marginLeft={1}>
                    {currency.symbol}
                  </Typography>
                </Grid>
                <Typography fontSize={35} fontWeight={600}>
                  {currency.price ? `$${formatFinancial(currency.price)}` : "-"}
                </Typography>
                <Grid>
                  <Typography fontSize={16} fontWeight={600}>
                    Holdings
                  </Typography>
                  <Typography fontSize={20} fontWeight={400}>
                    {currency.price
                      ? `$${formatFinancial(currency.price * currency.quantity)}`
                      : "-"}
                  </Typography>
                  <Grid
                    container
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="start"
                    spacing={0}
                  >
                    <Typography fontSize={18} fontWeight={400}>
                      {formatFinancial(currency.quantity)}
                    </Typography>
                    <Typography fontSize={18} fontWeight={300} marginLeft={1}>
                      {currency.symbol}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <CircularProgress size={50} />
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid paddingTop={2}>
        <RemoteDataView
          remoteData={timeSeries}
          onSuccess={(data) => <CandlestickChart timeSeries={data} />}
          onFailure={(error) => <Typography>{error.message}</Typography>}
          onPending={() => <CandleStickChartLoadding />}
        />
      </Grid>
    </Grid>
  );
};
