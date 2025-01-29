import { format } from "date-fns";
import { uniqBy } from "lodash";

import { CurrencyHistoricalOhlcUsdResponse } from "@/requests/currency";

import { CandlestickChartEntry } from ".";

export const prepareChartData = (
  data: CurrencyHistoricalOhlcUsdResponse,
): CandlestickChartEntry[] => {
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

export const CANDLESTICK_CHART_DIMENSIONS = {
  WIDTH: 600,
  HEIGHT: 450,
};
