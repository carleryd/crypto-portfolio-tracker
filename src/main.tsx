import {
  CssBaseline,
  Grid2 as Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";
import theme from "./theme";

// TODO: Add navigation to home when error
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      fallback={
        <Grid container width="100%" justifyContent="center">
          <Grid>
            <Typography variant="h3" marginBottom={2}>
              Something went wrong
            </Typography>
            <Typography>
              Please view console for detailed information.
            </Typography>
          </Grid>
        </Grid>
      }
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter basename="/crypto-portfolio-tracker">
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
);
