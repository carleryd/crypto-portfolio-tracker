import { createChart } from "lightweight-charts";
import { FC, useEffect, useRef } from "react";

export type TimeSeriesEntry = {
  // TODO: Could make number-number-number but would need validation
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

type Props = {
  timeSeries: TimeSeriesEntry[];
};

export const CandlestickChart: FC<Props> = ({ timeSeries }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && timeSeries) {
      const chart = createChart(ref.current, { width: 600, height: 450 });
      const series = chart.addCandlestickSeries();
      series.setData(timeSeries);

      return () => {
        chart.remove();
      };
    }
  }, [ref, timeSeries]);

  return <div ref={ref} />;
};
