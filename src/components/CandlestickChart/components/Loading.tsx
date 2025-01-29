import { CircularProgress, Grid2 as Grid } from "@mui/material";

import { CANDLESTICK_CHART_DIMENSIONS } from "../utils";

const { HEIGHT, WIDTH } = CANDLESTICK_CHART_DIMENSIONS;

export const CandleStickChartLoadding = () => (
  <Grid
    container
    alignItems="center"
    justifyContent="center"
    width={WIDTH}
    height={HEIGHT}
  >
    <Grid>
      <CircularProgress size={WIDTH / 5} thickness={1} />
    </Grid>
  </Grid>
);
