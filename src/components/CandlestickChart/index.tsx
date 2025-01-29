import { Box } from "@mui/material";
import { CandlestickData, createChart } from "lightweight-charts";
import { FC, useEffect, useRef } from "react";

import { CANDLESTICK_CHART_DIMENSIONS } from "./utils";

export type CandlestickChartEntry = CandlestickData<string>;

type Props = {
  timeSeries: CandlestickChartEntry[];
};

export const CandlestickChart: FC<Props> = ({ timeSeries }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && timeSeries) {
      const { WIDTH, HEIGHT } = CANDLESTICK_CHART_DIMENSIONS;
      const chart = createChart(ref.current, {
        width: WIDTH,
        height: HEIGHT,

        layout: {
          background: { color: "transparent" },
          textColor: "#000000",
        },
        grid: {
          vertLines: { color: "#000000" },
          horzLines: { color: "#000000" },
        },
      });
      const series = chart.addCandlestickSeries();
      series.setData(timeSeries);

      return () => {
        chart.remove();
      };
    }
  }, [ref, timeSeries]);

  return <Box ref={ref} />;
};
