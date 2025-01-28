import { createChart } from "lightweight-charts";
import { FC, useEffect, useRef } from "react";

export type TimeSeriesEntry = {
  // TODO: Could make number-number-number but would need validation
  time: string;
  value: number;
};

type Props = {
  timeSeries: TimeSeriesEntry[];
};

export const HistoricalPriceChart: FC<Props> = ({ timeSeries }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && timeSeries) {
      const chart = createChart(ref.current, { width: 600, height: 450 });
      const lineSeries = chart.addLineSeries();
      lineSeries.setData(timeSeries);

      return () => {
        chart.remove();
      };
    }
  }, [ref, timeSeries]);

  return <div ref={ref} />;
};
