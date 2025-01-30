import { createTheme } from "@mui/material/styles";

export const THEME_BACKGROUND = {
  DEFAULT: "#1750AC",
  PAPER: "#FFFFFF",
};

const theme = createTheme({
  palette: {
    primary: { main: "#222531" },
    secondary: { main: "#FFFFFF" },
    background: {
      default: THEME_BACKGROUND.DEFAULT,
      paper: THEME_BACKGROUND.PAPER,
    },
    text: { primary: "#222531" },
  },
});

export default theme;
