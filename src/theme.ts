import { createTheme } from "@mui/material/styles";

export const THEME_BACKGROUND = {
  DEFAULT: "#3861fb",
  PAPER: "#FFFFFF",
};

const BLACK = "#222531";

const theme = createTheme({
  palette: {
    primary: { main: "#3861fb" },
    secondary: { main: "#FFFFFF" },
    background: {
      default: THEME_BACKGROUND.DEFAULT,
      paper: THEME_BACKGROUND.PAPER,
    },
    text: { primary: BLACK },
    info: { main: BLACK },
  },
});

export default theme;
